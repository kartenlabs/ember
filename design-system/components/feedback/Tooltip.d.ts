import * as React from 'react';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  /** Two to four words, sentence case. */
  label: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Keyboard hint rendered as a pixel kbd chip, e.g. "Space". */
  shortcut?: string;
}

export declare function Tooltip(props: TooltipProps): JSX.Element;
