'use client';

import React from 'react';
import { Icon } from './Icon';

const SIZES = {
  sm: { height: 'var(--height-control-sm)', padding: 'var(--pad-control-sm)', font: 'var(--text-2xs)', icon: 16, gap: 'var(--space-2)' },
  md: { height: 'var(--height-control-md)', padding: 'var(--pad-control-md)', font: 'var(--text-xs)', icon: 16, gap: 'var(--space-3)' },
  lg: { height: 'var(--height-control-lg)', padding: 'var(--pad-control-lg)', font: 'var(--text-sm)', icon: 24, gap: 'var(--space-3)' },
};

const VARIANTS = {
  primary:   { bg: 'var(--accent-mode)', fg: 'var(--text-inverse)', border: 'transparent', shadow: true },
  secondary: { bg: 'transparent', fg: 'var(--text-primary)', border: 'var(--border-default)', shadow: true },
  ghost:     { bg: 'transparent', fg: 'var(--text-secondary)', border: 'transparent', shadow: false },
  danger:    { bg: 'transparent', fg: 'var(--state-danger)', border: 'var(--state-danger)', shadow: true },
};

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  children?: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  /** Icon name, leading. */
  icon?: string;
  iconEnd?: string;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export function Button({
  children, variant = 'primary', size = 'md', icon, iconEnd, fullWidth = false,
  disabled = false, type = 'button', style, ...rest
}: ButtonProps) {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const lift = v.shadow && !disabled;

  return (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: s.gap, width: fullWidth ? '100%' : undefined,
        minHeight: s.height, padding: s.padding,
        fontFamily: 'var(--font-pixel)', fontSize: s.font, fontWeight: 700,
        letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase',
        color: v.fg,
        background: v.bg === 'transparent'
          ? (hover && !disabled ? 'var(--surface-raised)' : 'transparent')
          : v.bg,
        filter: hover && !disabled && v.bg !== 'transparent' ? 'brightness(1.08)' : 'none',
        border: `var(--border-width) solid ${v.border === 'transparent' && hover && !disabled && variant === 'ghost' ? 'var(--border-subtle)' : v.border}`,
        borderRadius: 'var(--radius-xs)',
        // The signature interaction: on press the hard shadow collapses and
        // the element sits down on the board.
        boxShadow: lift ? (press ? 'none' : 'var(--shadow-pixel-sm)') : 'none',
        transform: lift && press ? 'translate(2px, 2px)' : 'none',
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'var(--transition-control)',
        ...style,
      }}
      {...rest}
    >
      {icon ? <Icon name={icon} size={s.icon} /> : null}
      {children ? <span>{children}</span> : null}
      {iconEnd ? <Icon name={iconEnd} size={s.icon} /> : null}
    </button>
  );
}
