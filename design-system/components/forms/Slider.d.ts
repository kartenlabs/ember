import * as React from 'react';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  /** Number of visible cells in the track. Keep it 12–24. */
  cells?: number;
  /** Right-aligned mono readout, e.g. "60%". */
  valueLabel?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare function Slider(props: SliderProps): JSX.Element;
