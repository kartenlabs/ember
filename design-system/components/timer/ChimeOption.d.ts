import * as React from 'react';

export interface ChimeOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Sound name, lowercase mono, e.g. "temple bell". */
  name: string;
  /** One short sentence describing how it sounds. */
  description?: string;
  /** 5–9 bar heights (1–10) forming this chime's silhouette. Decorative. */
  bars?: number[];
  selected?: boolean;
  onSelect?: () => void;
  onPlay?: () => void;
  /** Preview is currently sounding: bars light and the button shows pause. */
  playing?: boolean;
}

export declare function ChimeOption(props: ChimeOptionProps): JSX.Element;
