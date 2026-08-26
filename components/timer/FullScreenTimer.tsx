'use client';

import React from 'react';
import { Icon } from '../core/Icon';
import { IconButton } from '../core/IconButton';
import { Button } from '../core/Button';
import { TimerDisplay } from './TimerDisplay';
import { SessionDots } from './SessionDots';
import { EMBER_STATION_VIDEO } from './RadioPlayer';

/* Full-screen session. The station plays full-bleed behind a warm scrim and
   scanlines; the countdown sits on top at display-lg. Chrome fades out after
   a few idle seconds and comes back on any movement — the screen is meant to
   be looked away from.

   Two rules, both learned the hard way:
     1. Never mount two players of the same stream. Whatever renders this must
        unmount the timer-view radio strip first, or pass showVideo={false}.
        Two embeds drift apart the instant either is unmuted.
     2. `started` must reflect reality, or a session that has never run offers
        you RESUME. */

/** Below roughly 60 the countdown stops being readable over the video. */
const DIM_FLOOR = 60;

export interface FullScreenTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  seconds?: number;
  running?: boolean;
  mode?: 'focus' | 'short' | 'long';
  label?: string;
  completed?: number;
  current?: number;
  sets?: number;
  /** lowercase mono, what the user typed they are working on. */
  task?: string;
  videoId?: string;
  station?: string;
  track?: string;
  showVideo?: boolean;
  /** Scrim opacity over the video, 0-100. Floored at 60. */
  dim?: number;
  /** Set false to hold the chrome open for a screenshot. */
  idleFade?: boolean;
  /** False on a session that has never run, so the CTA reads START. */
  started?: boolean;
  onToggle?: () => void;
  onReset?: () => void;
  onSkip?: () => void;
  onExit?: () => void;
}

export function FullScreenTimer({
  seconds = 0, running = false, mode = 'focus', label,
  completed = 0, current = -1, sets = 4, task,
  videoId = EMBER_STATION_VIDEO, station = 'now playing', track,
  showVideo = true, dim = 72, idleFade = true, started = true,
  onToggle, onReset, onSkip, onExit, style, ...rest
}: FullScreenTimerProps) {
  const frameRef = React.useRef<HTMLIFrameElement | null>(null);
  const [muted, setMuted] = React.useState(true);
  const [idle, setIdle] = React.useState(false);

  React.useEffect(() => {
    if (!idleFade) return;
    let t = setTimeout(() => setIdle(true), 4000);
    const wake = () => {
      setIdle(false);
      clearTimeout(t);
      t = setTimeout(() => setIdle(true), 4000);
    };
    window.addEventListener('mousemove', wake);
    window.addEventListener('keydown', wake);
    return () => { clearTimeout(t); window.removeEventListener('mousemove', wake); window.removeEventListener('keydown', wake); };
  }, [idleFade]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && onExit) onExit(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onExit]);

  const send = (func: string) => {
    const el = frameRef.current;
    if (!el || !el.contentWindow) return;
    el.contentWindow.postMessage(JSON.stringify({ event: 'command', func, args: [] }), '*');
  };
  const toggleMute = () => { send(muted ? 'unMute' : 'mute'); setMuted(!muted); };

  const chrome: React.CSSProperties = {
    opacity: idle ? 0 : 1,
    transition: 'opacity var(--duration-slow) var(--ease-in-out)',
    pointerEvents: idle ? 'none' : 'auto',
  };

  const credit = track ? `${station} · ${track}` : station;

  return (
    <div
      data-mode={mode}
      style={{
        position: 'fixed', inset: 0, zIndex: 90, overflow: 'hidden',
        background: 'var(--surface-app)',
        display: 'flex', flexDirection: 'column',
        ...style,
      }}
      {...rest}
    >
      {showVideo && (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {/* 16:9 cover: over-size on both axes so any viewport ratio fills. */}
          <iframe
            ref={frameRef} title={track || station} tabIndex={-1}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${videoId}`}
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              position: 'absolute', top: '50%', left: '50%',
              width: '178vh', height: '100.5vh', minWidth: '100.5vw', minHeight: '56.25vw',
              transform: 'translate(-50%, -50%)', border: 0,
            }}
          />
          <span style={{ position: 'absolute', inset: 0, background: 'var(--surface-app)', opacity: Math.max(DIM_FLOOR, dim) / 100 }} />
          <span style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(to bottom, var(--scanline) 0 1px, transparent 1px 3px)',
          }} />
        </div>
      )}

      <header style={{
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 'var(--space-6)', padding: 'var(--space-6) var(--space-8)', ...chrome,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)' }}>
          <span style={{ fontFamily: 'var(--font-pixel)', fontWeight: 700, fontSize: 'var(--text-md)', letterSpacing: '.06em', color: 'var(--text-primary)' }}>ember</span>
          {task && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{task}</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--text-muted)', minWidth: 0 }}>
            <Icon name="audio-waveform" size={16} style={{ animation: 'em-breathe var(--duration-ambient) var(--ease-in-out) infinite' }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '40vw',
            }}>{credit}</span>
          </span>
          <IconButton icon={muted ? 'volume-x' : 'volume-3'} label={muted ? 'Unmute station' : 'Mute station'} size="sm" variant="ghost" active={muted} onClick={toggleMute} />
          <IconButton icon="collapse" label="Leave full screen" size="sm" onClick={onExit} />
        </div>
      </header>

      <div style={{
        position: 'relative', flex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 'var(--space-8)', padding: 'var(--space-8)',
      }}>
        {/* Everything else here fades. The countdown never does. */}
        <TimerDisplay seconds={seconds} running={running} mode={mode} label={label} size="xl" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', ...chrome }}>
          <IconButton icon="reload" label="Reset" onClick={onReset} />
          <Button size="lg" icon={running ? 'pause' : 'play'} onClick={onToggle} style={{ minWidth: 176 }}>
            {running ? 'Pause' : started ? 'Resume' : 'Start'}
          </Button>
          <IconButton icon="chevron-right" label="Skip" onClick={onSkip} />
        </div>
      </div>

      <footer style={{
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 'var(--space-6)', padding: 'var(--space-6) var(--space-8)', ...chrome,
      }}>
        <SessionDots label="Set" total={sets} completed={completed} current={current} />
        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>esc to exit</span>
      </footer>
    </div>
  );
}
