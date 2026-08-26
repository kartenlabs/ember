import React from 'react';
import { Icon } from './Icon.jsx';

const TONES = {
  focus:   'var(--accent-focus)',
  short:   'var(--accent-break-short)',
  long:    'var(--accent-break-long)',
  info:    'var(--state-info)',
  neutral: 'var(--text-muted)',
};

export function Badge({ children, tone = 'neutral', icon, solid = false, style, ...rest }) {
  const c = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
        padding: '3px 6px',
        fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)', fontWeight: 400,
        letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase',
        color: solid ? 'var(--text-inverse)' : c,
        background: solid ? c : 'transparent',
        border: `var(--border-width) solid ${solid ? 'transparent' : c}`,
        borderRadius: 'var(--radius-xs)',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {icon ? <Icon name={icon} size={16} style={{ width: 12, height: 12 }} /> : null}
      {children}
    </span>
  );
}
