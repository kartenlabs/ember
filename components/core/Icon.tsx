import React from 'react';

/* Pixelarticons (MIT, © 2019 Gerrit Halfmann) — see public/icons/LICENSE.txt.
   24x24 bitmap-grid SVGs, masked rather than <img>-ed so they inherit
   currentColor like a glyph would. That inheritance is the whole point: it is
   what lets an icon retint with --accent-mode for free. An <img> loses it. */

export const ICON_NAMES = ['play','pause','reload','sliders','sliders-horizontal','volume-3','volume-x','music','audio-waveform','clock','hourglass','coffee','leaf','moon','sun','bell','bell-ring','bell-off','check','check-double','close','chevron-down','chevron-up','chevron-left','chevron-right','plus','minus','chart-bar-big','home','trash','more-vertical','repeat','power','checkbox','checkbox-on','radio','list-box','expand','collapse','monitor'] as const;

/* The reference resolved this from a window global. In Next the icons are
   static assets under public/, so the path is a constant and nothing has to
   run before first paint. */
export const ICON_BASE = '/icons';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** File stem in public/icons, e.g. "coffee". */
  name?: string;
  /** Full URL, when the glyph is not one of ours. */
  src?: string;
  /** 16 inline and in controls, 24 in lg controls and transport, 32+ for a
   *  feature glyph. Never an odd size — the bitmap grid smears. */
  size?: number;
  color?: string;
  /** Given only when the icon carries meaning no adjacent text carries. */
  title?: string;
}

export function Icon({ name, src, size = 16, color, title, style, ...rest }: IconProps) {
  const url = src || `${ICON_BASE}/${name}.svg`;
  return (
    <span
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{
        display: 'inline-block',
        width: size, height: size, flex: '0 0 auto',
        backgroundColor: color || 'currentColor',
        WebkitMaskImage: `url("${url}")`, maskImage: `url("${url}")`,
        WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        ...style,
      }}
      {...rest}
    />
  );
}
