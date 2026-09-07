'use client';

import React from 'react';
import { IconButton } from '../core/IconButton';

export interface DialogProps extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, 'onClose'> {
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
  const ref = React.useRef<HTMLDialogElement>(null);
  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    return () => { if (dialog.open) dialog.close(); };
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-label={title}
      onCancel={(event) => { event.preventDefault(); onClose?.(); }}
      className="em-dialog"
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]');
        if (!controls.length) { event.preventDefault(); return; }
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first.focus();
        }
      }}
      style={{
        width: 'calc(100% - 32px)', maxWidth: width, maxHeight: 'calc(100dvh - 32px)',
        padding: 0, color: 'var(--text-primary)',
        background: 'var(--surface-card)',
        border: 'var(--border-width-thick) solid var(--border-default)',
        borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-pixel-lg)',
        ...style,
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose?.();
      }}
      {...rest}
    >
      <div
        style={{
          animation: 'em-step-in var(--duration-medium) var(--ease-step) both',
        }}
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
    </dialog>
  );
}
