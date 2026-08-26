'use client';

import React from 'react';
import { Icon } from './Icon';

const SIZES = { sm: 30, md: 40, lg: 52 };
const GLYPH = { sm: 16, md: 16, lg: 24 };

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  icon: string;
  /** Required: the button has no text of its own. */
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: keyof typeof SIZES;
  /** A persistent state (muted, looping), not hover. */
  active?: boolean;
  style?: React.CSSProperties;
}

export function IconButton({
  icon, label, variant = 'secondary', size = 'md', active = false,
  disabled = false, style, ...rest
}: IconButtonProps) {
  const box = SIZES[size] || SIZES.md;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const filled = variant === 'primary';

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active || undefined}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: box, height: box, padding: 0,
        color: filled ? 'var(--text-inverse)' : (active ? 'var(--accent-mode)' : 'var(--text-secondary)'),
        background: filled ? 'var(--accent-mode)' : (hover && !disabled ? 'var(--surface-raised)' : 'transparent'),
        filter: hover && !disabled && filled ? 'brightness(1.08)' : 'none',
        border: `var(--border-width) solid ${filled ? 'transparent' : (active ? 'var(--border-accent)' : 'var(--border-default)')}`,
        borderRadius: 'var(--radius-xs)',
        boxShadow: variant === 'ghost' || disabled ? 'none' : (press ? 'none' : 'var(--shadow-pixel-sm)'),
        transform: press && variant !== 'ghost' ? 'translate(2px, 2px)' : 'none',
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'var(--transition-control)',
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={GLYPH[size] || 16} />
    </button>
  );
}
