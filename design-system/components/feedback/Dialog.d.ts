import * as React from 'react';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  /** Pixel-type heading, sentence case, under six words. */
  title?: string;
  /** Accent overline above the title, e.g. "Focus complete". */
  overline?: string;
  children?: React.ReactNode;
  /** Right-aligned action row — usually two Buttons. */
  footer?: React.ReactNode;
  onClose?: () => void;
  /** CSS width value. Defaults to --width-panel (420px). */
  width?: string;
}

export declare function Dialog(props: DialogProps): JSX.Element;
