import * as React from 'react';

export interface TabItem { value: string; label: string; icon?: string }

/**
 * Mode switcher (segmented) or view navigation (underline).
 */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: Array<TabItem | string>;
  value?: string;
  onChange?: (value: string) => void;
  /** segmented = boxed cells (mode switch). underline = accent rule (view nav). */
  variant?: 'segmented' | 'underline';
  fullWidth?: boolean;
}

export declare function Tabs(props: TabsProps): JSX.Element;
