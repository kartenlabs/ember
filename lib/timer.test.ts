/* The state machine and the clock format. Run with: npm test
   These are the two things here that can break silently — everything else in
   the app is visual and shows its own bugs. */

import assert from 'node:assert/strict';
import test from 'node:test';
import { completedAfter, countLabel, formatTime, nextAfter, overlineFor } from './timer.ts';

test('formatTime is always mm:ss', () => {
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(59), '00:59');
  assert.equal(formatTime(60), '01:00');
  assert.equal(formatTime(1500), '25:00');
  assert.equal(formatTime(3599), '59:59');
  // Never negative, and never a stray decimal from a fractional tick.
  assert.equal(formatTime(-5), '00:00');
  assert.equal(formatTime(90.7), '01:30');
});

test('a focus block is followed by a short break until the last of the set', () => {
  const sets = 4;
  assert.equal(nextAfter('focus', 0, sets), 'short');
  assert.equal(nextAfter('focus', 1, sets), 'short');
  assert.equal(nextAfter('focus', 2, sets), 'short');
  // The fourth focus block completes the set, so this one earns the long break.
  assert.equal(nextAfter('focus', 3, sets), 'long');
});

test('every break is followed by focus', () => {
  assert.equal(nextAfter('short', 2, 4), 'focus');
  assert.equal(nextAfter('long', 3, 4), 'focus');
});

test('the set count climbs on focus, holds on a short break, resets on the long one', () => {
  assert.equal(completedAfter('focus', 0, 4), 1);
  assert.equal(completedAfter('short', 1, 4), 1);
  assert.equal(completedAfter('focus', 3, 4), 4);
  assert.equal(completedAfter('long', 4, 4), 0);
  // Never past the set size, however the count got there.
  assert.equal(completedAfter('focus', 4, 4), 4);
});

test('a full cycle returns to where it started', () => {
  const sets = 4;
  let mode: 'focus' | 'short' | 'long' = 'focus';
  let completed = 0;
  const seen: string[] = [];
  for (let i = 0; i < 8; i++) {
    seen.push(mode);
    const next = nextAfter(mode, completed, sets);
    completed = completedAfter(mode, completed, sets);
    mode = next;
  }
  assert.deepEqual(seen, [
    'focus', 'short', 'focus', 'short', 'focus', 'short', 'focus', 'long',
  ]);
  assert.equal(mode, 'focus');
  assert.equal(completed, 0);
});

test('counts read "4 of 6", never "4/6"', () => {
  assert.equal(countLabel(4, 6), '4 of 6');
});

test('the overline numbers focus blocks and leaves breaks unnumbered', () => {
  assert.equal(overlineFor('focus', 2, 6, 'FOCUS'), 'FOCUS · 3 OF 6');
  assert.equal(overlineFor('focus', 0, 4, 'FOCUS'), 'FOCUS · 1 OF 4');
  // The last block of the set does not read "5 of 4".
  assert.equal(overlineFor('focus', 4, 4, 'FOCUS'), 'FOCUS · 4 OF 4');
  assert.equal(overlineFor('short', 2, 4, 'SHORT BREAK'), 'SHORT BREAK');
  assert.equal(overlineFor('long', 3, 4, 'LONG BREAK'), 'LONG BREAK');
});
