import React from 'react';
import { Icon } from '../core/Icon.jsx';

/* Two shapes, one component:
   segmented — a boxed row of equal cells, used for the mode switcher.
   underline — an unboxed row with a 2px accent rule, used for view nav. */
export function Tabs({ items = [], value, onChange, variant = 'segmented', fullWidth = false, style, ...rest }) {
  const segmented = variant === 'segmented';
  return (
    <div
      role="tablist"
      style={{
        display: 'inline-flex', gap: segmented ? 0 : 'var(--space-6)',
        width: fullWidth ? '100%' : undefined,
        padding: segmented ? 3 : 0,
        background: segmented ? 'var(--surface-sunken)' : 'transparent',
        border: segmented ? 'var(--border-width) solid var(--border-subtle)' : 0,
        borderBottom: segmented ? undefined : 'var(--border-width) solid var(--border-subtle)',
        borderRadius: segmented ? 'var(--radius-xs)' : 0,
        ...style,
      }}
      {...rest}
    >
      {items.map((it) => {
        const v = typeof it === 'string' ? it : it.value;
        const label = typeof it === 'string' ? it : it.label;
        const icon = typeof it === 'string' ? undefined : it.icon;
        const on = v === value;
        return (
          <button
            key={v} role="tab" aria-selected={on} type="button"
            onClick={() => onChange && onChange(v)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: 'var(--space-3)', flex: fullWidth ? 1 : undefined,
              height: segmented ? 30 : 34, padding: segmented ? '0 12px' : '0 0 8px',
              marginBottom: segmented ? 0 : -1,
              fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)', fontWeight: on ? 700 : 400,
              letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase',
              color: on ? (segmented ? 'var(--text-inverse)' : 'var(--text-primary)') : 'var(--text-muted)',
              background: on && segmented ? 'var(--accent-mode)' : 'transparent',
              border: 0,
              borderBottom: segmented ? 0 : `var(--border-width-thick) solid ${on ? 'var(--accent-mode)' : 'transparent'}`,
              borderRadius: segmented ? 'var(--radius-xs)' : 0,
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'var(--transition-control)',
            }}
          >
            {icon ? <Icon name={icon} size={16} /> : null}
            {label}
          </button>
        );
      })}
    </div>
  );
}
