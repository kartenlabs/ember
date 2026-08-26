import * as React from 'react';

/**
 * Segmented pixel meter for session elapsed time and any 0–100 fill.
 */
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100. */
  value?: number;
  /** Segment count. 40 for a full-width session bar, 12–20 when narrow. */
  cells?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export declare function ProgressBar(props: ProgressBarProps): JSX.Element;
