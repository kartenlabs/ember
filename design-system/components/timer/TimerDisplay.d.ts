import * as React from 'react';

/**
 * The countdown itself — pixel numerals with a colon that blinks per second.
 */
export interface TimerDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remaining seconds. */
  seconds?: number;
  /** Blinks the colon and brightens the numerals. */
  running?: boolean;
  /** Tints the label and sets data-mode for descendants. */
  mode?: 'focus' | 'short' | 'long';
  /** Pixel overline above the numerals, e.g. "Focus · 3 of 6". */
  label?: string;
  /** lg (96px) is the app default; xl (128px) is full-screen only. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export declare function TimerDisplay(props: TimerDisplayProps): JSX.Element;
