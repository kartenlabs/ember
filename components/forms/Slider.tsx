'use client';

import React from 'react';

/* Stepped fill: the track is drawn as discrete cells so the value reads
   as a number of blocks rather than a continuous smear. */
export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style' | 'value' | 'min' | 'max' | 'step'> {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  /** Visible track cells. Keep between 12 and 24 or they stop reading as cells. */
  cells?: number;
  /** Mono readout on the right, e.g. "60%". */
  valueLabel?: string;
  style?: React.CSSProperties;
}

export function Slider({
  label, value = 50, onChange, min = 0, max = 100, step = 1,
  cells = 20, valueLabel, disabled = false, style, ...rest
}: SliderProps) {
  const pct = (value - min) / (max - min || 1);
  const lit = Math.round(pct * cells);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', ...style }}>
      {(label || valueLabel) && (
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
          {label && <span style={{
            fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)',
            letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--text-muted)',
          }}>{label}</span>}
          {valueLabel && <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums',
          }}>{valueLabel}</span>}
        </div>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: 20, opacity: disabled ? 0.4 : 1 }}>
        <div style={{ display: 'flex', gap: 2, width: '100%', pointerEvents: 'none' }}>
          {Array.from({ length: cells }).map((_, i) => (
            <span key={i} style={{
              flex: 1, height: 'var(--height-bar)',
              background: i < lit ? 'var(--accent-mode)' : 'var(--surface-sunken)',
              outline: i < lit ? 'none' : '1px solid var(--border-subtle)',
              outlineOffset: -1,
              transition: 'background-color var(--duration-instant) var(--ease-step)',
            }} />
          ))}
        </div>
        <input
          type="range" min={min} max={max} step={step} value={value} onChange={onChange} disabled={disabled}
          aria-label={label}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            margin: 0, opacity: 0, cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          {...rest}
        />
      </div>
    </div>
  );
}
