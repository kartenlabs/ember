import * as React from 'react';

/**
 * Primary action control. Pixel-type label, hard 2px offset shadow that
 * collapses on press.
 */
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  children?: React.ReactNode;
  /** primary = amber fill (retints per timer mode). secondary = outline. ghost = bare. danger = clay outline. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** Icon name from the Ember set, rendered before the label. */
  icon?: string;
  /** Icon name rendered after the label. */
  iconEnd?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare function Button(props: ButtonProps): JSX.Element;
