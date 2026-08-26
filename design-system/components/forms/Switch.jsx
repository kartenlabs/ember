import React from 'react';

export function Switch({ label, description, checked = false, onChange, disabled = false, id, style, ...rest }) {
  const uid = id || React.useId();
  return (
    <label
      htmlFor={uid}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 'var(--space-6)', cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1, ...style,
      }}
    >
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {label && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.3 }}>{label}</span>}
        {description && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.5 }}>{description}</span>}
      </span>
      <input
        id={uid} type="checkbox" role="switch" checked={checked} onChange={onChange} disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }} {...rest}
      />
      {/* Two-frame sprite: the knob jumps, it does not slide. */}
      <span style={{
        position: 'relative', flex: '0 0 auto',
        width: 40, height: 20,
        background: checked ? 'var(--accent-mode)' : 'var(--surface-sunken)',
        border: `var(--border-width) solid ${checked ? 'transparent' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-xs)',
        transition: 'background-color var(--duration-fast) var(--ease-step)',
      }}>
        <span style={{
          position: 'absolute', top: 2, left: checked ? 21 : 2,
          width: 15, height: 14,
          background: checked ? 'var(--text-inverse)' : 'var(--text-muted)',
          transition: 'left var(--duration-fast) var(--ease-step)',
        }} />
      </span>
    </label>
  );
}
