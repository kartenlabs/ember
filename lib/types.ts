/* Shared shapes. Kept in one place because the timer, the storage layer and
   every screen all speak in these three nouns. */

export type Mode = 'focus' | 'short' | 'long';
export type Theme = 'dark' | 'light';

/** Everything the Settings screen owns. Persisted whole. */
export interface Settings {
  /** Block lengths, in minutes. */
  focus: number;
  short: number;
  long: number;
  /** Focus blocks per cycle, before the long break. */
  sets: number;
  volume: number;
  autoBreak: boolean;
  autoFocus: boolean;
  chime: string;
  theme: Theme;
  /** What the user is working on. Shows on the timer and in the log. */
  task: string;
}

/** One finished block. `startedAt` is epoch ms so the log can group by day. */
export interface Session {
  id: string;
  startedAt: number;
  mode: Mode;
  minutes: number;
  task: string;
}

export const DEFAULT_SETTINGS: Settings = {
  focus: 25,
  short: 5,
  long: 15,
  sets: 4,
  volume: 60,
  autoBreak: false,
  autoFocus: false,
  chime: 'bell',
  theme: 'dark',
  task: 'deep work',
};

/** Sentence-case, for hints and dialog copy. */
export const MODE_TEXT: Record<Mode, string> = {
  focus: 'Focus',
  short: 'Short break',
  long: 'Long break',
};

/** Pixel uppercase, for overlines and tab labels. */
export const MODE_LABEL: Record<Mode, string> = {
  focus: 'FOCUS',
  short: 'SHORT BREAK',
  long: 'LONG BREAK',
};

export const MODE_ICON: Record<Mode, string> = {
  focus: 'hourglass',
  short: 'coffee',
  long: 'leaf',
};
