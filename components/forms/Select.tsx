'use client';

import React from 'react';
import { Icon } from '../core/Icon';

export interface SelectOption { value: string; label: string }

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'style'> {
  label?: string;
  options?: Array<SelectOption | string>;
  style?: React.CSSProperties;
}

export function Select({ label, value, onChange, options = [], disabled = false, id, style, ...rest }: SelectProps) {
  // Called unconditionally: a hook behind || is skipped when id is given.
  const autoId = React.useId();
  const uid = id || autoId;
  const [focus, setFocus] = React.useState(false);
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
        position: 'relative', display: 'flex', alignItems: 'center',
        height: 'var(--height-control-md)',
        background: 'var(--surface-sunken)',
        border: `var(--border-width) solid ${focus ? 'var(--border-accent)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-xs)',
        opacity: disabled ? 0.4 : 1,
        transition: 'var(--transition-control)',
      }}>
        <select
          id={uid} value={value} onChange={onChange} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            appearance: 'none', WebkitAppearance: 'none',
            width: '100%', height: '100%', padding: '0 34px 0 10px',
            background: 'none', border: 0, outline: 'none',
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)',
            color: 'var(--text-primary)', cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          {...rest}
        >
          {options.map((o) => {
            const v = typeof o === 'string' ? o : o.value;
            const l = typeof o === 'string' ? o : o.label;
            return <option key={v} value={v} style={{ background: 'var(--surface-sunken)' }}>{l}</option>;
          })}
        </select>
        <span style={{ position: 'absolute', right: 10, display: 'flex', color: 'var(--text-muted)', pointerEvents: 'none' }}>
          <Icon name="chevron-down" size={16} />
        </span>
      </div>
    </div>
  );
}
