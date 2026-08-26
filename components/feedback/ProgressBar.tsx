'use client';

import React from 'react';

/* Segmented pixel meter. Used for elapsed session time and for anything
   that fills. Never a rounded, animated, gradient bar. */
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0-100. Clamped. */
  value?: number;
  /** 40 across a full-width card, 12-20 in a narrow one. */
  cells?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({ value = 0, cells = 40, label, showValue = false, size = 'md', style, ...rest }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  const lit = Math.round((pct / 100) * cells);
  const h = size === 'sm' ? 4 : (size === 'lg' ? 12 : 8);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', ...style }} {...rest}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
          {label && <span style={{
            fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)',
            letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--text-muted)',
          }}>{label}</span>}
          {showValue && <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums',
          }}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}
        style={{ display: 'flex', gap: 2, width: '100%' }}>
        {Array.from({ length: cells }).map((_, i) => (
          <span key={i} style={{
            flex: 1, height: h,
            background: i < lit ? 'var(--accent-mode)' : 'var(--surface-sunken)',
            transition: 'background-color var(--duration-instant) var(--ease-step)',
          }} />
        ))}
      </div>
    </div>
  );
}
