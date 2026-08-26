import * as React from 'react';

export interface StepperProps {
  label?: string;
  value?: number;
  onChange?: (next: number) => void;
  min?: number;
  max?: number;
  /** Nudge amount. Durations step by 5, cycle counts by 1. */
  step?: number;
  /** Short unit shown next to the number, e.g. "min". */
  unit?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare function Stepper(props: StepperProps): JSX.Element;
