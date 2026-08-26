/* The pure half of the timer: no React, no DOM, no clock of its own.
   Everything here is a function of its arguments, which is what makes it the
   one part of this app worth a test. lib/timer.test.ts covers it. */

import type { Mode, Settings } from './types';

/** Durations are always mm:ss. 25:00, never "25 minutes", never 0:25:00. */
export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}

/** Block length in seconds for the given mode. */
export function durationOf(mode: Mode, settings: Settings): number {
  return settings[mode] * 60;
}

/**
 * The session state machine, unchanged from the reference prototype:
 * focus runs `sets` times per cycle, each followed by a short break except the
 * last, which is followed by the long one. Any break returns to focus.
 *
 * `completed` is how many focus blocks are already done in this cycle, counted
 * before the one that just finished is added.
 */
export function nextAfter(finished: Mode, completed: number, sets: number): Mode {
  if (finished !== 'focus') return 'focus';
  return completed + 1 >= sets ? 'long' : 'short';
}

/**
 * How many focus blocks stand completed once `finished` ends. The count is a
 * cycle position, so the long break rolls it back to zero rather than letting
 * it climb forever.
 */
export function completedAfter(finished: Mode, completed: number, sets: number): number {
  if (finished === 'long') return 0;
  if (finished === 'focus') return Math.min(completed + 1, sets);
  return completed;
}

/** Counts read "4 of 6", never "4/6". */
export function countLabel(current: number, total: number): string {
  return `${current} of ${total}`;
}

/**
 * The overline over the countdown: `FOCUS · 3 OF 6`. Breaks carry no set
 * number — nothing about a break is the third of anything.
 */
export function overlineFor(mode: Mode, completed: number, sets: number, modeLabel: string): string {
  if (mode !== 'focus') return modeLabel;
  const position = Math.min(completed + 1, sets);
  return `${modeLabel} · ${position} OF ${sets}`.toUpperCase();
}
