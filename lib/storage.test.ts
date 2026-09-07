import assert from 'node:assert/strict';
import test, { type TestContext } from 'node:test';
import { loadSettings, loadSessions, loadTimer, saveSettings } from './storage.ts';
import { DEFAULT_SETTINGS } from './types.ts';

function storage(t: TestContext, values: Record<string, string>) {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'window');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: {
    localStorage: { getItem: (key: string) => values[key] ?? null, setItem: (key: string, value: string) => { values[key] = value; } },
  } });
  t.after(() => {
    if (previous) Object.defineProperty(globalThis, 'window', previous);
    else Reflect.deleteProperty(globalThis, 'window');
  });
}

test('missing, malformed, and wrongly shaped settings use defaults', (t) => {
  const values: Record<string, string> = {};
  storage(t, values);
  for (const raw of ['', '{broken', 'null', '[]', '42', '"text"']) {
    values['ember.settings'] = raw;
    assert.deepEqual(loadSettings(), DEFAULT_SETTINGS);
  }
});

test('settings validate fields independently and constrain numeric ranges', (t) => {
  storage(t, { 'ember.settings': JSON.stringify({ focus: -5, short: '5', long: 100, sets: 3.4, volume: null, theme: 'light', task: {}, chime: 'missing', autoBreak: 'false', autoFocus: true }) });
  assert.deepEqual(loadSettings(), { ...DEFAULT_SETTINGS, focus: 5, long: 45, sets: 3, theme: 'light', autoFocus: true });
});

test('valid old settings retain defaults for new fields', (t) => {
  storage(t, { 'ember.settings': '{"focus":45,"task":"writing"}' });
  assert.deepEqual(loadSettings(), { ...DEFAULT_SETTINGS, focus: 45, task: 'writing' });
});

test('session loading keeps valid rows and rejects invalid or duplicate rows', (t) => {
  const row = { id: '1', startedAt: 1000, mode: 'focus', minutes: 25, task: 'writing' };
  storage(t, { 'ember.sessions': JSON.stringify([null, {}, row, row, { ...row, id: '2', mode: 'other' }, { ...row, id: '3', task: {} }]) });
  assert.deepEqual(loadSessions(), [row]);
});

test('timer loading validates the snapshot and supports legacy snapshots', (t) => {
  const timer = { mode: 'focus', completed: 1, endsAt: null, held: 60, started: true };
  const values = { 'ember.timer': JSON.stringify(timer) };
  storage(t, values);
  assert.deepEqual(loadTimer(), timer);
  for (const bad of [null, {}, { ...timer, mode: 'other' }, { ...timer, held: -1 }, { ...timer, endsAt: 'tomorrow' }, { ...timer, completed: 100 }]) {
    values['ember.timer'] = JSON.stringify(bad);
    assert.equal(loadTimer(), null);
  }
  const snapshot = { ...timer, block: { minutes: 25, startedAt: 1000, task: 'writing' }, done: { finished: 'focus', next: 'short', minutes: 25 } };
  values['ember.timer'] = JSON.stringify(snapshot);
  assert.deepEqual(loadTimer(), snapshot);
});

test('blocked storage never breaks reads or writes', (t) => {
  storage(t, {});
  Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
  assert.deepEqual(loadSettings(), DEFAULT_SETTINGS);
  assert.deepEqual(loadSessions(), []);
  assert.equal(loadTimer(), null);
  assert.doesNotThrow(() => saveSettings(DEFAULT_SETTINGS));
});
