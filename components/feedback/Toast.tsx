'use client';

import React from 'react';
import { Icon } from '../core/Icon';
import { IconButton } from '../core/IconButton';

const TONES = {
  neutral: { color: 'var(--text-secondary)', icon: 'clock' },
  success: { color: 'var(--state-success)', icon: 'check' },
  warning: { color: 'var(--state-warning)', icon: 'bell-ring' },
  danger:  { color: 'var(--state-danger)', icon: 'close' },
};

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pixel uppercase, two or three words: SESSION LOGGED. */
  title?: string;
  /** One sentence. */
  message?: string;
  tone?: keyof typeof TONES;
  icon?: string;
  action?: () => void;
  actionLabel?: string;
  onDismiss?: () => void;
}

export function Toast({ title, message, tone = 'neutral', icon, action, actionLabel, onDismiss, style, ...rest }: ToastProps) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <div
      role="status"
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)',
        minWidth: 300, maxWidth: 420, padding: 'var(--space-5)',
        background: 'var(--surface-raised)',
        border: 'var(--border-width) solid var(--border-default)',
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--shadow-pixel)',
        animation: 'em-step-in var(--duration-medium) var(--ease-step) both',
        ...style,
      }}
      {...rest}
    >
      <span style={{ color: t.color, display: 'flex', marginTop: 1 }}>
        <Icon name={icon || t.icon} size={16} />
      </span>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {title && <span style={{
          fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)',
          letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--text-primary)',
        }}>{title}</span>}
        {message && <span style={{
          fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', lineHeight: 1.5, color: 'var(--text-secondary)',
        }}>{message}</span>}
        {actionLabel && (
          <button type="button" onClick={action} style={{
            alignSelf: 'flex-start', marginTop: 4, padding: 0,
            background: 'none', border: 0, borderBottom: '1px solid var(--accent-mode)',
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
            color: 'var(--accent-mode)', cursor: 'pointer',
          }}>{actionLabel}</button>
        )}
      </div>
      {onDismiss && <IconButton icon="close" label="Dismiss" variant="ghost" size="sm" onClick={onDismiss} />}
    </div>
  );
}
