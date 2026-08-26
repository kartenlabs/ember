import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Checkbox({ label, description, checked = false, onChange, disabled = false, id, style, ...rest }) {
  const uid = id || React.useId();
  const [hover, setHover] = React.useState(false);
  return (
    <label
      htmlFor={uid}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, ...style,
      }}
    >
      <input
        id={uid} type="checkbox" checked={checked} onChange={onChange} disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }} {...rest}
      />
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 18, height: 18, marginTop: 1, flex: '0 0 auto',
        background: checked ? 'var(--accent-mode)' : 'var(--surface-sunken)',
        border: `var(--border-width) solid ${checked ? 'transparent' : (hover ? 'var(--border-strong)' : 'var(--border-default)')}`,
        borderRadius: 'var(--radius-xs)',
        color: 'var(--text-inverse)',
        transition: 'var(--transition-control)',
      }}>
        {checked ? <Icon name="check" size={16} /> : null}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.3 }}>{label}</span>
        {description && (
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.5 }}>{description}</span>
        )}
      </span>
    </label>
  );
}
