import * as React from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: React.ReactNode;
  description?: string;
  checked?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare function Radio(props: RadioProps): JSX.Element;
