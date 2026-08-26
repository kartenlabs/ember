import React from 'react';

function pad(n) { return String(Math.max(0, Math.floor(n))).padStart(2, '0'); }

/* The centrepiece. Pixel numerals, tabular, with a colon that blinks on
   the second while running and holds steady when paused. */
export function TimerDisplay({
  seconds = 0, running = false, mode = 'focus', label,
  size = 'lg', style, ...rest
}) {
  const fontSize = { sm: 'var(--text-3xl)', md: 'var(--display-sm)', lg: 'var(--display-md)', xl: 'var(--display-lg)' }[size] || 'var(--display-md)';
  const mm = pad(seconds / 60);
  const ss = pad(seconds % 60);
  const accent = { focus: 'var(--accent-focus)', short: 'var(--accent-break-short)', long: 'var(--accent-break-long)' }[mode] || 'var(--accent-focus)';

  return (
    <div
      data-mode={mode}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', ...style }}
      {...rest}
    >
      {label && (
        <span style={{
          fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)',
          letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase',
          color: accent,
        }}>{label}</span>
      )}
      <div
        role="timer" aria-label={`${mm} minutes ${ss} seconds remaining`}
        style={{
          display: 'flex', alignItems: 'baseline',
          fontFamily: 'var(--font-pixel)', fontWeight: 700, fontSize,
          lineHeight: 1, letterSpacing: '0.02em',
          fontVariantNumeric: 'tabular-nums',
          color: running ? 'var(--text-primary)' : 'var(--text-secondary)',
          transition: 'color var(--duration-slow) var(--ease-in-out)',
        }}
      >
        <span>{mm}</span>
        <span style={{
          padding: '0 0.08em',
          animation: running ? 'em-blink 1s steps(1,end) infinite' : 'none',
          opacity: running ? undefined : 0.5,
        }}>:</span>
        <span>{ss}</span>
      </div>
    </div>
  );
}
