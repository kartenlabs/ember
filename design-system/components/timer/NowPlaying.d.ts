import * as React from 'react';

export interface NowPlayingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current track, lowercase mono, e.g. "rain on the window — side b". */
  track?: string;
  /** Station line above the track. Defaults to "ember fm". */
  station?: string;
  playing?: boolean;
  muted?: boolean;
  onToggle?: () => void;
  onMute?: () => void;
}

export declare function NowPlaying(props: NowPlayingProps): JSX.Element;
