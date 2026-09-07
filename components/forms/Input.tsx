'use client';

import React from 'react';
import { Icon } from '../core/Icon';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style' | 'size'> {
  /** Pixel uppercase overline above the field. */
  label?: string;
  /** Sentence case, states the consequence. */
  hint?: string;
  error?: string;
  icon?: string;
  suffix?: string;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

export function Input({
  label, hint, error, icon, suffix, size = 'md', id,
  value, onChange, disabled = false, style, ...rest
}: InputProps) {
  const [focus, setFocus] = React.useState(false);
  // Called unconditionally: a hook behind || is skipped when id is given.
  const autoId = React.useId();
  const uid = id || autoId;
  const height = size === 'sm' ? 'var(--height-control-sm)' : 'var(--height-control-md)';
  const border = error ? 'var(--state-danger)' : (focus ? 'var(--border-accent)' : 'var(--border-default)');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', ...style }}>
      {label && (
        <label htmlFor={uid} style={{
          fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)',
          letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>{label}</label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
        height, padding: '0 10px',
        background: 'var(--surface-sunken)',
        border: `var(--border-width) solid ${border}`,
        borderRadius: 'var(--radius-xs)',
        color: 'var(--text-muted)',
        opacity: disabled ? 0.4 : 1,
        transition: 'var(--transition-control)',
      }}>
        {icon ? <Icon name={icon} size={16} /> : null}
        <input
          id={uid} value={value} onChange={onChange} disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={hint || error ? `${uid}-description` : undefined}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0, height: '100%',
            background: 'none', border: 0, outline: 'none', padding: 0,
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)',
            color: 'var(--text-primary)', letterSpacing: 'var(--tracking-mono)',
          }}
          {...rest}
        />
        {suffix ? (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{suffix}</span>
        ) : null}
      </div>
      {(hint || error) && (
        <span id={`${uid}-description`} style={{
          fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', lineHeight: 1.4,
          color: error ? 'var(--state-danger)' : 'var(--text-muted)',
        }}>{error || hint}</span>
      )}
    </div>
  );
}
