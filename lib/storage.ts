/* localStorage, guarded. Every read can run during SSR, in a private window,
   or against a quota-full origin, so every read returns the fallback rather
   than throwing. No module-scope access — that alone breaks the build. */

import { DEFAULT_SETTINGS, type Mode, type Session, type Settings } from './types';

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
  // Spread over the defaults so a stored blob written by an older version is
  // topped up rather than leaving new keys undefined.
  return { ...DEFAULT_SETTINGS, ...read<Partial<Settings>>(KEY.settings, {}) };
}

export function saveSettings(s: Settings): void {
  write(KEY.settings, s);
}

export function loadSessions(): Session[] {
  const rows = read<Session[]>(KEY.sessions, []);
  return Array.isArray(rows) ? rows : [];
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
}

export function loadTimer(): TimerState | null {
  return read<TimerState | null>(KEY.timer, null);
}

export function saveTimer(t: TimerState): void {
  write(KEY.timer, t);
}
