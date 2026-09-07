/* localStorage, guarded. Every read can run during SSR, in a private window,
   or against a quota-full origin, so every read returns the fallback rather
   than throwing. No module-scope access — that alone breaks the build. */

import { DEFAULT_SETTINGS, type Mode, type Session, type Settings } from './types.ts';

const KEY = {
  settings: 'ember.settings',
  sessions: 'ember.sessions',
  timer: 'ember.timer',
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Full or blocked. The app keeps working from memory for this session.
  }
}

export function loadSettings(): Settings {
  const raw = read<unknown>(KEY.settings, null);
  const settings = { ...DEFAULT_SETTINGS };
  if (!isRecord(raw)) return settings;
  const ranges = { focus: [5, 90], short: [1, 15], long: [10, 45], sets: [2, 8], volume: [0, 100] } as const;
  for (const key of Object.keys(ranges) as Array<keyof typeof ranges>) {
    const value = raw[key];
    const [min, max] = ranges[key];
    if (typeof value === 'number' && Number.isFinite(value)) {
      settings[key] = Math.max(min, Math.min(max, Math.round(value)));
    }
  }
  for (const key of ['autoBreak', 'autoFocus'] as const) {
    if (typeof raw[key] === 'boolean') settings[key] = raw[key];
  }
  if (raw.theme === 'dark' || raw.theme === 'light') settings.theme = raw.theme;
  if (typeof raw.chime === 'string' && ['bell', 'wood', 'marimba', 'glass', 'hum'].includes(raw.chime)) settings.chime = raw.chime;
  if (typeof raw.task === 'string') settings.task = raw.task;
  return settings;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isMode(value: unknown): value is Mode {
  return value === 'focus' || value === 'short' || value === 'long';
}

function finiteNumber(value: unknown, min: number, max: number): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max;
}

export function saveSettings(s: Settings): void {
  write(KEY.settings, s);
}

export function loadSessions(): Session[] {
  const rows = read<unknown>(KEY.sessions, []);
  if (!Array.isArray(rows)) return [];
  const ids = new Set<string>();
  return rows.filter((row): row is Session => {
    if (!isRecord(row) || typeof row.id !== 'string' || !row.id || ids.has(row.id)
      || !isMode(row.mode) || !finiteNumber(row.startedAt, 0, 8.64e15)
      || !finiteNumber(row.minutes, 1 / 60, 90) || typeof row.task !== 'string') return false;
    ids.add(row.id);
    return true;
  });
}

export function saveSessions(rows: Session[]): void {
  write(KEY.sessions, rows);
}

/** What a running or paused timer needs to come back after a reload. */
export interface TimerState {
  mode: Mode;
  completed: number;
  /** Epoch ms the current block ends. null while paused. */
  endsAt: number | null;
  /** Seconds held on the clock while paused. */
  held: number;
  /** False until this block has actually run, so the CTA can read START. */
  started: boolean;
  /** Snapshot taken on first start; settings edits apply to the next block. */
  block?: { minutes: number; startedAt: number; task: string };
  done?: { finished: Mode; next: Mode; minutes: number } | null;
}

export function loadTimer(): TimerState | null {
  const raw = read<unknown>(KEY.timer, null);
  if (!isRecord(raw) || !isMode(raw.mode)
    || !finiteNumber(raw.completed, 0, 8) || !Number.isInteger(raw.completed)
    || !finiteNumber(raw.held, 0, 5400) || typeof raw.started !== 'boolean'
    || !(raw.endsAt === null || finiteNumber(raw.endsAt, 1, 8.64e15))) return null;
  const timer: TimerState = {
    mode: raw.mode, completed: raw.completed, held: raw.held,
    started: raw.started, endsAt: raw.endsAt,
  };
  if (isRecord(raw.block) && finiteNumber(raw.block.minutes, 1 / 60, 90)
    && finiteNumber(raw.block.startedAt, 0, 8.64e15) && typeof raw.block.task === 'string') {
    timer.block = { minutes: raw.block.minutes, startedAt: raw.block.startedAt, task: raw.block.task };
  }
  if (raw.endsAt === null && isRecord(raw.done) && isMode(raw.done.finished)
    && isMode(raw.done.next) && finiteNumber(raw.done.minutes, 1 / 60, 90)) {
    timer.done = { finished: raw.done.finished, next: raw.done.next, minutes: raw.done.minutes };
  }
  return timer;
}

export function saveTimer(t: TimerState): void {
  write(KEY.timer, t);
}
