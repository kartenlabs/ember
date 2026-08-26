import * as React from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pixel overline, two or three words. */
  title?: string;
  /** One sentence, sans, no exclamation marks. */
  message?: string;
  tone?: 'neutral' | 'success' | 'warning' | 'danger';
  /** Overrides the tone's default icon. */
  icon?: string;
  action?: () => void;
  /** Underlined mono text link, e.g. "Undo". */
  actionLabel?: string;
  onDismiss?: () => void;
}

export declare function Toast(props: ToastProps): JSX.Element;
