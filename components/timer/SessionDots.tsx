'use client';

import React from 'react';

/* Cycle tracker: one cell per session in the current set. The long-break
   cell at the end is clay so the shape of the afternoon is readable. */
export interface SessionDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  total?: number;
  completed?: number;
  /** Index of the running cell, or -1 for none. It breathes at 4s. */
  current?: number;
  showLongBreak?: boolean;
  /** 12 default, 8 when dense. */
  size?: number;
  label?: string;
}

export function SessionDots({
  total = 4, completed = 0, current = -1, showLongBreak = true,
  size = 12, label, style, ...rest
}: SessionDotsProps) {
  const cells = Array.from({ length: total });
  const cell = (bg: string, border: string, key: React.Key, blink: boolean) => (
    <span key={key} style={{
      width: size, height: size,
      background: bg, border: `1px solid ${border}`,
      animation: blink ? 'em-breathe var(--duration-breath) var(--ease-in-out) infinite' : 'none',
    }} />
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', ...style }} {...rest}>
      {label && (
        <span style={{
          fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)',
          letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--text-muted)',
        }}>{label}</span>
      )}
      <div style={{ display: 'flex', gap: 'var(--space-2)' }} aria-label={`${completed} of ${total} sessions done`}>
        {cells.map((_, i) =>
          i < completed
            ? cell('var(--accent-focus)', 'var(--accent-focus)', i, false)
            : i === current
              ? cell('transparent', 'var(--accent-focus)', i, true)
              : cell('transparent', 'var(--border-default)', i, false)
        )}
        {showLongBreak && (
          <>
            <span style={{ width: size / 2 }} />
            {cell(completed >= total ? 'var(--accent-break-long)' : 'transparent', 'var(--accent-break-long)', 'long', false)}
          </>
        )}
      </div>
    </div>
  );
}
