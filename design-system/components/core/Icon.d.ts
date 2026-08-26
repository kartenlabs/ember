import * as React from 'react';

export declare const ICON_NAMES: string[];
export declare function iconBase(): string;

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** File stem in assets/icons, e.g. "play". Ignored when `src` is given. */
  name?: string;
  /** Explicit URL to a 24x24 pixel-grid SVG. */
  src?: string;
  /** Square edge in px. Use 16 inline, 24 in controls, 32+ for feature glyphs. */
  size?: number;
  /** Overrides currentColor. Prefer inheriting. */
  color?: string;
  /** Accessible label. Omit for decorative icons. */
  title?: string;
}

export declare function Icon(props: IconProps): JSX.Element;
