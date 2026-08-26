'use client';

import React from 'react';
import { Icon } from './Icon';

/* lowercase mono: tags carry what the user typed, not what the product says. */

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  selected?: boolean;
  onRemove?: (e: React.MouseEvent) => void;
}

export function Tag({ children, selected = false, onRemove, onClick, style, ...rest }: TagProps) {
  const [hover, setHover] = React.useState(false);
  const interactive = Boolean(onClick);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
        height: 24, padding: '0 8px',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 500,
        color: selected ? 'var(--text-inverse)' : 'var(--text-secondary)',
        background: selected ? 'var(--accent-mode)' : (hover && interactive ? 'var(--surface-raised)' : 'var(--surface-sunken)'),
        border: `var(--border-width) solid ${selected ? 'transparent' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-xs)',
        cursor: interactive ? 'pointer' : 'default',
        transition: 'var(--transition-control)',
        ...style,
      }}
      {...rest}
    >
      {children}
      {onRemove && (
        <button
          type="button" aria-label="Remove"
          onClick={(e) => { e.stopPropagation(); onRemove(e); }}
          style={{
            display: 'inline-flex', padding: 0, background: 'none', border: 0,
            color: 'inherit', cursor: 'pointer', opacity: 0.7,
          }}
        >
          <Icon name="close" size={16} style={{ width: 12, height: 12 }} />
        </button>
      )}
    </span>
  );
}
