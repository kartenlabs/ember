'use client';

import React from 'react';
import { IconButton } from '../core/IconButton';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  /** Sentence case: "Take five?" */
  title?: string;
  /** Pixel uppercase, tinted with the mode accent. */
  overline?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  width?: string;
}

export function Dialog({
  open = true, title, overline, children, footer, onClose,
  width = 'var(--width-panel)', style, ...rest
}: DialogProps) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--space-8)',
        background: 'var(--scrim)', backdropFilter: 'var(--blur-scrim)',
      }}
      onClick={onClose}
    >
      <div
        role="dialog" aria-modal="true" aria-label={title}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: width,
          background: 'var(--surface-card)',
          border: 'var(--border-width-thick) solid var(--border-default)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-pixel-lg)',
          animation: 'em-step-in var(--duration-medium) var(--ease-step) both',
          ...style,
        }}
        {...rest}
      >
        <header style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          gap: 'var(--space-5)', padding: 'var(--space-6) var(--space-6) 0',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {overline && <span style={{
              fontFamily: 'var(--font-pixel)', fontSize: 'var(--text-2xs)',
              letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--accent-mode)',
            }}>{overline}</span>}
            {title && <h2 style={{
              margin: 0, fontFamily: 'var(--font-pixel)', fontWeight: 700,
              fontSize: 'var(--text-lg)', letterSpacing: 'var(--tracking-pixel)',
              lineHeight: 1.25, color: 'var(--text-primary)',
            }}>{title}</h2>}
          </div>
          {onClose && <IconButton icon="close" label="Close" variant="ghost" size="sm" onClick={onClose} />}
        </header>
        <div style={{ padding: 'var(--space-5) var(--space-6)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          {children}
        </div>
        {footer && (
          <footer style={{
            display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)',
            padding: 'var(--space-5) var(--space-6)',
            borderTop: 'var(--border-width) solid var(--border-subtle)',
          }}>{footer}</footer>
        )}
      </div>
    </div>
  );
}
