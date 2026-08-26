import * as React from 'react';

export interface FullScreenTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  seconds?: number;
  running?: boolean;
  mode?: 'focus' | 'short' | 'long';
  /** Pixel overline above the countdown, e.g. "Focus · 3 of 6". */
  label?: string;
  completed?: number;
  current?: number;
  sets?: number;
  /** Session label shown small, top left. */
  task?: string;
  /** YouTube video id for the background station. */
  videoId?: string;
  station?: string;
  track?: string;
  /** Set false for a bare board with no video behind. */
  showVideo?: boolean;
  /** Scrim strength over the video, 0–100. 72 is the default reading level. */
  dim?: number;
  /** Chrome fades after four idle seconds. Set false to pin it — thumbnails, docs, screenshots. */
  idleFade?: boolean;
  /** False on a session that has never run, so the CTA reads "Start" rather than "Resume". */
  started?: boolean;
  onToggle?: () => void;
  onReset?: () => void;
  onSkip?: () => void;
  onExit?: () => void;
}

export declare function FullScreenTimer(props: FullScreenTimerProps): JSX.Element;
