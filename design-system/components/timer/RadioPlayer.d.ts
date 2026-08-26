import * as React from 'react';

/** The station Ember ships with. */
export declare const EMBER_STATION_VIDEO: string;

export interface RadioPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** YouTube video id. Defaults to the Ember station stream. */
  videoId?: string;
  /** Pixel overline above the track line. Defaults to "ember fm". */
  station?: string;
  /** Track or stream name, lowercase mono. */
  track?: string;
  /** strip = 96px player beside the controls. panel = full-width 16:9. */
  layout?: 'strip' | 'panel';
  /** Starts muted-autoplay (the only autoplay browsers allow). */
  autoplay?: boolean;
}

export declare function RadioPlayer(props: RadioPlayerProps): JSX.Element;
