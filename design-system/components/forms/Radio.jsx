import React from 'react';

export function Radio({ label, description, checked = false, onChange, name, value, disabled = false, id, style, ...rest }) {
  const uid = id || React.useId();
  return (
    <label
      htmlFor={uid}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, ...style,
      }}
    >
      <input
        id={uid} type="radio" name={name} value={value} checked={checked} onChange={onChange} disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 1, height: 1 }} {...rest}
      />
      {/* Square outer, square inner: the pixel grid has no circles. */}
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 18, height: 18, marginTop: 1, flex: '0 0 auto',
        background: 'var(--surface-sunken)',
        border: `var(--border-width) solid ${checked ? 'var(--border-accent)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-xs)',
        transition: 'var(--transition-control)',
      }}>
        <span style={{
          width: 8, height: 8,
          background: checked ? 'var(--accent-mode)' : 'transparent',
          transition: 'var(--transition-control)',
        }} />
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
