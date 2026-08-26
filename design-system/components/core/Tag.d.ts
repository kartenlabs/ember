import * as React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** Filled with the mode accent. */
  selected?: boolean;
  /** Renders a small close glyph. Omit for read-only tags. */
  onRemove?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
}

export declare function Tag(props: TagProps): JSX.Element;
