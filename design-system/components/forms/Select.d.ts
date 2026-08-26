import * as React from 'react';

export interface SelectOption { value: string; label: string }

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'style'> {
  label?: string;
  options?: Array<SelectOption | string>;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare function Select(props: SelectProps): JSX.Element;
