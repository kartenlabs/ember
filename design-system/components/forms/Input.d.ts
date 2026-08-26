import * as React from 'react';

/**
 * Single-line text field. Sunken well, 1px border that turns amber on focus.
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'style'> {
  /** Pixel-type overline above the field. */
  label?: string;
  /** Sentence-case helper text below. */
  hint?: string;
  /** Replaces hint and turns the border clay. */
  error?: string;
  /** Leading icon name. */
  icon?: string;
  /** Trailing unit, e.g. "min". */
  suffix?: string;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

export declare function Input(props: InputProps): JSX.Element;
