import * as React from 'react';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'style'> {
  children?: React.ReactNode;
  /** Pixel-type overline in the card header. Two or three words. */
  title?: string;
  /** Right-aligned mono metadata in the header (counts, durations). */
  meta?: React.ReactNode;
  /** accent = mode-coloured border. quiet = sunken, borderless. */
  tone?: 'default' | 'accent' | 'quiet';
  padding?: 'default' | 'tight' | 'none';
  /** Hard 4px offset shadow. Reserve for the one card in front. */
  lifted?: boolean;
  /** Dot-grid texture behind the content. */
  grid?: boolean;
  style?: React.CSSProperties;
}

export declare function Card(props: CardProps): JSX.Element;
