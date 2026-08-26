'use client';

/* One context for the whole app.
 *
 * It lives in the root layout rather than in a page so the countdown keeps
 * running while you move between Timer, Log and Settings. Routing away from a
 * timer that then quietly stops would be the worst bug this app could have.
 */

import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { playChime } from '@/lib/chimes';
import { askToNotify, notify } from '@/lib/notify';
import {
  loadSessions, loadSettings, saveSessions, saveSettings,
} from '@/lib/storage';
import type { Station } from '@/lib/station';
import { durationOf } from '@/lib/timer';
import { useTimer, type TimerApi } from '@/lib/useTimer';
import {
  DEFAULT_SETTINGS, MODE_TEXT, type Mode, type Session, type Settings,
} from '@/lib/types';

export interface ToastState {
  tone: 'neutral' | 'success' | 'warning' | 'danger';
  /** Pixel uppercase, two or three words. */
  title: string;
  /** One sentence. */
  message: string;
}

interface EmberContext {
  /** Who the ambient stream actually belongs to. Resolved on the server. */
  station: Station;
  settings: Settings;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  sessions: Session[];
  clearToday: () => void;
  timer: TimerApi;
  /** Seconds in the current block, for the progress bar. */
  total: number;
  full: boolean;
  enterFull: () => void;
  exitFull: () => void;
  toast: ToastState | null;
  showToast: (t: ToastState) => void;
  dismissToast: () => void;
  /** Auditions a chime at the current volume. */
  preview: (id: string) => void;
  previewing: string | null;
}

const Ctx = createContext<EmberContext | null>(null);

export function useEmber(): EmberContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useEmber must be used inside <EmberProvider>');
  return ctx;
}

function startOfToday(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function EmberProvider(
  { station, children }: { station: Station; children: React.ReactNode },
) {
  // Both server and client render the defaults, so first paint matches and
  // the stored values arrive in an effect. Anything else is a hydration error.
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [full, setFull] = useState(false);
  const [previewing, setPreviewing] = useState<string | null>(null);
  /* State, deliberately not a ref. A ref flipped inside the load effect is
     already true when the save effects run in that same flush, so they write
     the pre-load defaults straight over the stored data — and under Strict
     Mode the load effect then runs a second time and reads back the blanks it
     just caused. As state, this only turns true on the render that carries the
     loaded values, so the first save can never precede the first load. */
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- the stored settings
       and log live in localStorage, which does not exist on the server. First
       paint has to be the defaults so server and client agree; the real values
       can only arrive after mount. */
    setSettings(loadSettings());
    setSessions(loadSessions());
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => { if (hydrated) saveSettings(settings); }, [hydrated, settings]);
  useEffect(() => { if (hydrated) saveSessions(sessions); }, [hydrated, sessions]);

  /* Theme lives on <html>, set here and pre-set by the inline script in
     layout.tsx so a stored Daylight preference never flashes night first. */
  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
  }, [settings.theme]);

  const setSetting = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((s) => ({ ...s, [key]: value }));
  }, []);

  const showToast = useCallback((t: ToastState) => setToast(t), []);
  const dismissToast = useCallback(() => setToast(null), []);

  // Toasts clear themselves. Four seconds is long enough to read one sentence.
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(id);
  }, [toast]);

  // Written in an effect, not during render: a ref mutated mid-render is not
  // safe under concurrent rendering. onComplete only fires from a timer tick,
  // long after effects have flushed.
  const settingsRef = useRef(settings);
  useEffect(() => { settingsRef.current = settings; }, [settings]);

  const onComplete = useCallback((mode: Mode, minutes: number) => {
    const s = settingsRef.current;
    playChime(s.chime, s.volume);
    notify(`${MODE_TEXT[mode]} complete`, `${minutes} minutes logged.`);
    setSessions((rows) => [
      ...rows,
      { id: `${Date.now()}`, startedAt: Date.now() - minutes * 60_000, mode, minutes, task: s.task },
    ]);
    if (mode === 'focus') {
      setToast({
        tone: 'neutral',
        title: 'Session logged',
        message: `${minutes} minutes added to today.`,
      });
    }
  }, []);

  const timer = useTimer(settings, onComplete, askToNotify);
  const total = durationOf(timer.mode, settings);

  /* ── Full screen ────────────────────────────────────────────────
     requestFullscreen rejects without a user gesture, so both calls swallow.
     The fullscreenchange listener is the important half: pressing Escape exits
     natively without telling React, and the overlay would be left up. */
  const enterFull = useCallback(() => {
    setFull(true);
    document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  const exitFull = useCallback(() => {
    setFull(false);
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  }, []);

  useEffect(() => {
    const sync = () => { if (!document.fullscreenElement) setFull(false); };
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);

  /* ── Keyboard ───────────────────────────────────────────────────
     Space toggles, R resets, S skips, F goes full screen — except while the
     user is typing, where every one of those is a character they meant. */
  const { toggle, reset, skip } = timer;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.code === 'Space') { e.preventDefault(); toggle(); return; }
      switch (e.key.toLowerCase()) {
        case 'r': reset(); break;
        case 's': skip(); break;
        // Routed through the same pair the button uses, so the key also asks
        // the browser for real full screen instead of only drawing the overlay.
        case 'f': if (full) exitFull(); else enterFull(); break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle, reset, skip, full, enterFull, exitFull]);

  const preview = useCallback((id: string) => {
    setPreviewing(id);
    const seconds = playChime(id, settingsRef.current.volume) || 1;
    setTimeout(() => setPreviewing((p) => (p === id ? null : p)), seconds * 1000);
  }, []);

  const clearToday = useCallback(() => {
    const cutoff = startOfToday();
    setSessions((rows) => {
      const kept = rows.filter((r) => r.startedAt < cutoff);
      const dropped = rows.length - kept.length;
      setToast({
        tone: 'neutral',
        title: 'Today cleared',
        message: dropped === 1 ? '1 session removed.' : `${dropped} sessions removed.`,
      });
      return kept;
    });
  }, []);

  const value = useMemo<EmberContext>(() => ({
    station, settings, setSetting, sessions, clearToday, timer, total,
    full, enterFull, exitFull,
    toast, showToast, dismissToast, preview, previewing,
  }), [
    station, settings, setSetting, sessions, clearToday, timer, total,
    full, enterFull, exitFull, toast, showToast, dismissToast, preview, previewing,
  ]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
