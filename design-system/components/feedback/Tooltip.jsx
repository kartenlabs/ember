import React from 'react';

export function Tooltip({ children, label, side = 'top', shortcut, style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top:    { bottom: '100%', left: '50%', transform: 'translate(-50%, -6px)' },
    bottom: { top: '100%', left: '50%', transform: 'translate(-50%, 6px)' },
    left:   { right: '100%', top: '50%', transform: 'translate(-6px, -50%)' },
    right:  { left: '100%', top: '50%', transform: 'translate(6px, -50%)' },
  }[side];

  return (
    <span
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
      style={{ position: 'relative', display: 'inline-flex', ...style }}
      {...rest}
    >
      {children}
      {open && (
        <span role="tooltip" style={{
          position: 'absolute', ...pos, zIndex: 40,
          display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
          padding: '4px 8px', whiteSpace: 'nowrap',
          background: 'var(--surface-inverse)', color: 'var(--text-inverse)',
          border: 0, borderRadius: 'var(--radius-xs)',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
          boxShadow: 'var(--shadow-pixel-sm)',
        }}>
          {label}
          {shortcut && (
            <kbd style={{
              fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)',
              padding: '1px 4px', border: '1px solid currentColor', opacity: 0.6, borderRadius: 2,
            }}>{shortcut}</kbd>
          )}
        </span>
      )}
    </span>
  );
}
