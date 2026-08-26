'use client';

import React from 'react';
import { IconButton } from '../core/IconButton';

export interface StepperProps {
  label?: string;
  value?: number;
  onChange?: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Mono unit beside the number, e.g. "min". */
  unit?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Stepper({
  label, value = 0, onChange, min = 0, max = 999, step = 1, unit,
  disabled = false, style, ...rest
}: StepperProps) {
  const set = (next: number) => {
    const clamped = Math.min(max, Math.max(min, next));
    if (clamped !== value && onChange) onChange(clamped);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', ...style }} {...rest}>
      {label && (
        <span style={{
          fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)',
          letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>{label}</span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <IconButton icon="minus" label="Decrease" size="sm" onClick={() => set(value - step)} disabled={disabled || value <= min} />
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4,
          minWidth: 84, height: 'var(--height-control-sm)', padding: '0 8px',
          background: 'var(--surface-sunken)',
          border: 'var(--border-width) solid var(--border-subtle)',
          borderRadius: 'var(--radius-xs)',
        }}>
          <span style={{
            fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-md)', fontWeight: 700,
            color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums',
            lineHeight: 'var(--height-control-sm)',
          }}>{value}</span>
          {unit && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{unit}</span>
          )}
        </div>
        <IconButton icon="plus" label="Increase" size="sm" onClick={() => set(value + step)} disabled={disabled || value >= max} />
      </div>
    </div>
  );
}
