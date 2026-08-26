import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** Tones map to the three timer modes plus info/neutral. */
  tone?: 'focus' | 'short' | 'long' | 'info' | 'neutral';
  icon?: string;
  /** Filled instead of outlined. Use for the currently running mode only. */
  solid?: boolean;
}

export declare function Badge(props: BadgeProps): JSX.Element;
