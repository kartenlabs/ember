import React from 'react';

export const ICON_NAMES = ['play','pause','reload','sliders','sliders-horizontal','volume-3','volume-x','music','audio-waveform','clock','hourglass','coffee','leaf','moon','sun','bell','bell-ring','bell-off','check','check-double','close','chevron-down','chevron-up','chevron-left','chevron-right','plus','minus','chart-bar-big','home','trash','more-vertical','repeat','power','checkbox','checkbox-on','radio','list-box','expand','collapse','monitor'];

/* Icons are 24x24 bitmap-grid SVGs (Pixelarticons). They are masked rather
   than <img>-ed so they inherit currentColor like a glyph would. Set
   window.EMBER_ICON_BASE once per page if assets/ sits somewhere else. */
export function iconBase() {
  return (typeof window !== 'undefined' && window.EMBER_ICON_BASE) || './assets/icons';
}

export function Icon({ name, src, size = 16, color, title, style, ...rest }) {
  const url = src || `${iconBase()}/${name}.svg`;
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
