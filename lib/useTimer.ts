'use client';

/* The countdown.
 *
 * This is the one part of the reference prototype that is rewritten rather
 * than ported. The prototype decrements a counter inside a setInterval whose
 * useEffect has no dependency array, so the interval is rebuilt on every
 * render and the clock is only ever as accurate as the browser's willingness
 * to run timers. Hidden tabs get throttled hard, so a 25 minute block
 * backgrounded for 25 minutes comes back with most of its time left.
 *
 * So: the source of truth is `endsAt`, an epoch timestamp. Ticks read the wall
 * clock and never accumulate, which makes a throttled tab, a reload and a
 * sleeping laptop all self-correcting. That is also why `endsAt` is persisted.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { completedAfter, durationOf, nextAfter } from './timer';
import { loadTimer, saveTimer } from './storage';
import type { Mode, Settings } from './types';

/** Ticks well under a second so the display never sits on a stale value.
 *  Each tick is one subtraction, not a wakeup — this is not a busy loop. */
const TICK_MS = 200;

/** What just ended, and what the machine offers next. Deciding `next` at
 *  finish time, while the old set count is still in hand, avoids having to
 *  reverse the arithmetic later. */
export interface Handoff {
  finished: Mode;
  next: Mode;
}

export interface TimerApi {
  mode: Mode;
  secondsLeft: number;
  running: boolean;
  /** False until this block has actually run, so the CTA reads START, not
   *  RESUME. The full-screen view gets this wrong the moment you fake it. */
  started: boolean;
  completed: number;
  /** Set while the hand-off dialog should be open. */
  done: Handoff | null;
  toggle: () => void;
  reset: () => void;
  skip: () => void;
  chooseMode: (next: Mode) => void;
  /** Take the block the machine offers next, and start it. */
  acceptNext: () => void;
  dismissDone: () => void;
}

export function useTimer(
  settings: Settings,
  onComplete: (mode: Mode, minutes: number) => void,
  onFirstStart?: () => void,
): TimerApi {
  const [mode, setMode] = useState<Mode>('focus');
  const [completed, setCompleted] = useState(0);
  const [endsAt, setEndsAt] = useState<number | null>(null);
  /** Seconds on the clock while paused; also a fresh block's full length. */
  const [held, setHeld] = useState(() => durationOf('focus', settings));
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState<Handoff | null>(null);
  /** Only meaningful while running; the wall clock writes it on every tick. */
  const [ticked, setTicked] = useState(held);

  const running = endsAt !== null;

  /* Derived, not stored. An idle block always shows the full length of its
     mode, which is also how a duration edited in Settings takes effect — no
     effect required, and no way for the two to disagree. A finished block
     holds 0 until its hand-off is dealt with. */
  const idle = !running && !started && !done;
  const secondsLeft = running ? ticked : idle ? durationOf(mode, settings) : held;

  // Read through a ref so the tick effect depends only on `endsAt` and never
  // tears down mid-block because a parent happened to re-render. Written in an
  // effect, not during render: a ref mutated mid-render is not safe under
  // concurrent rendering, and effects flush long before any tick fires.
  const latest = useRef({ settings, onComplete, mode, completed });
  useEffect(() => {
    latest.current = { settings, onComplete, mode, completed };
  });

  /* ── Restore ────────────────────────────────────────────────────
     One shot, after mount. Never during render: the server has no
     localStorage, and a countdown derived from Date.now() on the server is a
     guaranteed hydration mismatch on every load. */
  /* State, not a ref, for the same reason as in the provider: a ref would be
     true while the save effect below still holds the pre-load values, and that
     effect would blank the stored block before it had been read. */
  const [restored, setRestored] = useState(false);
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- reading an external
       store (localStorage) once on mount is exactly what an effect is for.
       This cannot move into render: the server has no localStorage, and a
       countdown derived from Date.now() during SSR mismatches on hydration. */
    const saved = loadTimer();
    setRestored(true);
    if (!saved) return;
    setMode(saved.mode);
    setCompleted(saved.completed);
    if (saved.endsAt && saved.endsAt > Date.now()) {
      // Still running, and the wall clock says exactly how much is left.
      setStarted(true);
      setEndsAt(saved.endsAt);
      setTicked(Math.ceil((saved.endsAt - Date.now()) / 1000));
    } else if (saved.endsAt) {
      // It ran out while the app was closed. Arm a fresh block rather than
      // chiming for something that finished an hour ago.
      setStarted(false);
      setHeld(0);
    } else {
      setStarted(saved.started);
      setHeld(saved.held);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  /* ── Persist ────────────────────────────────────────────────────
     Only the values a reload cannot re-derive. */
  useEffect(() => {
    if (!restored) return;
    saveTimer({ mode, completed, endsAt, held, started });
  }, [restored, mode, completed, endsAt, held, started]);

  /* ── Finish ─────────────────────────────────────────────────────
     Re-entrancy guarded: a tick and a visibilitychange can land in the same
     frame, and logging the block twice would be very hard to notice. */
  const finishing = useRef(false);
  const finish = useCallback(() => {
    if (finishing.current) return;
    finishing.current = true;
    const { settings: s, onComplete: cb, mode: m, completed: c } = latest.current;
    setEndsAt(null);
    setHeld(0);
    setStarted(false);
    setCompleted(completedAfter(m, c, s.sets));
    setDone({ finished: m, next: nextAfter(m, c, s.sets) });
    cb(m, s[m]);
    finishing.current = false;
  }, []);

  /* ── Tick ───────────────────────────────────────────────────────
     Also bound to visibilitychange, so returning to a throttled tab is
     corrected on the frame it repaints rather than on the next interval. */
  useEffect(() => {
    if (endsAt === null) return;
    const tick = () => {
      const left = Math.ceil((endsAt - Date.now()) / 1000);
      if (left <= 0) finish();
      else setTicked(left);
    };
    tick();
    const id = setInterval(tick, TICK_MS);
    document.addEventListener('visibilitychange', tick);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [endsAt, finish]);

  const start = useCallback((seconds: number) => {
    onFirstStart?.();
    setEndsAt(Date.now() + seconds * 1000);
    setStarted(true);
  }, [onFirstStart]);

  const toggle = useCallback(() => {
    if (endsAt === null) {
      const left = secondsLeft > 0 ? secondsLeft : durationOf(mode, latest.current.settings);
      start(left);
    } else {
      // Pause: freeze what the clock says right now, then drop the deadline.
      // `started` stays true, so the derivation holds this value rather than
      // snapping back to the full length.
      const left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setHeld(left);
      setEndsAt(null);
    }
  }, [endsAt, secondsLeft, mode, start]);

  /* Back to a fresh block. `held` is irrelevant once started is false — the
     derivation above takes over and reads the current mode's length. */
  const armIdle = useCallback(() => {
    setEndsAt(null);
    setStarted(false);
    setDone(null);
    setHeld(0);
  }, []);

  const reset = useCallback(() => armIdle(), [armIdle]);

  const chooseMode = useCallback((next: Mode) => {
    setMode(next);
    armIdle();
  }, [armIdle]);

  /** Skip logs nothing, and earns nothing: the set count only moves for a
   *  focus block you actually sat through. */
  const skip = useCallback(() => {
    const { settings: s, completed: c } = latest.current;
    const next = nextAfter(mode, c, s.sets);
    setMode(next);
    armIdle();
  }, [mode, armIdle]);

  const acceptNext = useCallback(() => {
    if (!done) return;
    const next = done.next;
    setDone(null);
    setMode(next);
    setHeld(0);
    start(durationOf(next, latest.current.settings));
  }, [done, start]);

  const dismissDone = useCallback(() => setDone(null), []);

  /* ── Auto-start ─────────────────────────────────────────────────
     Rolls into the next block without the dialog, when the user asked it to. */
  useEffect(() => {
    if (!done) return;
    const wants = done.finished === 'focus' ? settings.autoBreak : settings.autoFocus;
    if (!wants) return;
    const id = setTimeout(acceptNext, 60);
    return () => clearTimeout(id);
  }, [done, settings.autoBreak, settings.autoFocus, acceptNext]);

  return {
    mode, secondsLeft, running, started, completed, done,
    toggle, reset, skip, chooseMode, acceptNext, dismissDone,
  };
}
