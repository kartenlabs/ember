import * as React from 'react';

export interface SessionDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sessions in the set before a long break. Usually 4. */
  total?: number;
  completed?: number;
  /** Index of the running session; its cell breathes. */
  current?: number;
  /** Trailing clay cell standing for the long break. */
  showLongBreak?: boolean;
  /** Cell edge in px. 12 default, 8 in dense chrome. */
  size?: number;
  label?: string;
}

export declare function SessionDots(props: SessionDotsProps): JSX.Element;
