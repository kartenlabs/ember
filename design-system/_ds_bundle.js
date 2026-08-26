/* @ds-bundle: {"format":4,"namespace":"EmberDesignSystem_e9992d","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"ICON_NAMES","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Slider","sourcePath":"components/forms/Slider.jsx"},{"name":"Stepper","sourcePath":"components/forms/Stepper.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"ChimeOption","sourcePath":"components/timer/ChimeOption.jsx"},{"name":"FullScreenTimer","sourcePath":"components/timer/FullScreenTimer.jsx"},{"name":"NowPlaying","sourcePath":"components/timer/NowPlaying.jsx"},{"name":"EMBER_STATION_VIDEO","sourcePath":"components/timer/RadioPlayer.jsx"},{"name":"RadioPlayer","sourcePath":"components/timer/RadioPlayer.jsx"},{"name":"SessionDots","sourcePath":"components/timer/SessionDots.jsx"},{"name":"TimerDisplay","sourcePath":"components/timer/TimerDisplay.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"3ac20515cac5","components/core/Button.jsx":"98dbdfbed277","components/core/Card.jsx":"16feb62f4aa7","components/core/Icon.jsx":"52099214146d","components/core/IconButton.jsx":"144feaa63358","components/core/Tag.jsx":"ad557faf6c68","components/feedback/Dialog.jsx":"7643bb8ff0f2","components/feedback/ProgressBar.jsx":"f991486b5418","components/feedback/Toast.jsx":"183ec7969ec7","components/feedback/Tooltip.jsx":"979f94592719","components/forms/Checkbox.jsx":"400d7b18c46c","components/forms/Input.jsx":"289fd42cd0fb","components/forms/Radio.jsx":"a7ca835dfec8","components/forms/Select.jsx":"739aae380805","components/forms/Slider.jsx":"11278b6db629","components/forms/Stepper.jsx":"0dae69369356","components/forms/Switch.jsx":"6d388f453343","components/navigation/Tabs.jsx":"90948ff1df00","components/timer/ChimeOption.jsx":"a2b1a74299f9","components/timer/FullScreenTimer.jsx":"fe1d8cbd7ffa","components/timer/NowPlaying.jsx":"5fa363445e3e","components/timer/RadioPlayer.jsx":"822c6a5cfa8e","components/timer/SessionDots.jsx":"6a5230c46cb5","components/timer/TimerDisplay.jsx":"737b2fcdbdea","ui_kits/ember-app/App.jsx":"dbc6a8343c49","ui_kits/ember-app/AppShell.jsx":"c9ec1d304b6a","ui_kits/ember-app/LogScreen.jsx":"1425efc782fc","ui_kits/ember-app/SettingsScreen.jsx":"47b99405b865","ui_kits/ember-app/TimerScreen.jsx":"c325d8f7095d","ui_kits/ember-app/chime.js":"1527d1f54287"},"inlinedExternals":[],"unexposedExports":[{"name":"iconBase","sourcePath":"components/core/Icon.jsx"}]} */

(() => {

const __ds_ns = (window.EmberDesignSystem_e9992d = window.EmberDesignSystem_e9992d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  children,
  title,
  meta,
  tone = 'default',
  padding = 'default',
  lifted = false,
  grid = false,
  style,
  ...rest
}) {
  const toneBorder = {
    default: 'var(--border-subtle)',
    accent: 'var(--accent-mode)',
    quiet: 'transparent'
  }[tone] || 'var(--border-subtle)';
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      background: tone === 'quiet' ? 'var(--surface-sunken)' : 'var(--surface-card)',
      border: `var(--border-width) solid ${toneBorder}`,
      borderRadius: 'var(--radius-sm)',
      boxShadow: lifted ? 'var(--shadow-pixel)' : 'none',
      padding: padding === 'none' ? 0 : padding === 'tight' ? 'var(--pad-card-tight)' : 'var(--pad-card)',
      backgroundImage: grid ? 'radial-gradient(var(--border-subtle) 1px, transparent 1px)' : undefined,
      backgroundSize: grid ? '8px 8px' : undefined,
      transition: 'var(--transition-surface)',
      ...style
    }
  }, rest), (title || meta) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      marginBottom: 'var(--space-5)'
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-pixel)',
      fontWeight: 700,
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, title), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, meta)), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ICON_NAMES = ['play', 'pause', 'reload', 'sliders', 'sliders-horizontal', 'volume-3', 'volume-x', 'music', 'audio-waveform', 'clock', 'hourglass', 'coffee', 'leaf', 'moon', 'sun', 'bell', 'bell-ring', 'bell-off', 'check', 'check-double', 'close', 'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'plus', 'minus', 'chart-bar-big', 'home', 'trash', 'more-vertical', 'repeat', 'power', 'checkbox', 'checkbox-on', 'radio', 'list-box', 'expand', 'collapse', 'monitor'];

/* Icons are 24x24 bitmap-grid SVGs (Pixelarticons). They are masked rather
   than <img>-ed so they inherit currentColor like a glyph would. Set
   window.EMBER_ICON_BASE once per page if assets/ sits somewhere else. */
function iconBase() {
  return typeof window !== 'undefined' && window.EMBER_ICON_BASE || './assets/icons';
}
function Icon({
  name,
  src,
  size = 16,
  color,
  title,
  style,
  ...rest
}) {
  const url = src || `${iconBase()}/${name}.svg`;
  return /*#__PURE__*/React.createElement("span", _extends({
    role: title ? 'img' : 'presentation',
    "aria-label": title,
    "aria-hidden": title ? undefined : true,
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      flex: '0 0 auto',
      backgroundColor: color || 'currentColor',
      WebkitMaskImage: `url("${url}")`,
      maskImage: `url("${url}")`,
      WebkitMaskSize: '100% 100%',
      maskSize: '100% 100%',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { ICON_NAMES, iconBase, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  focus: 'var(--accent-focus)',
  short: 'var(--accent-break-short)',
  long: 'var(--accent-break-long)',
  info: 'var(--state-info)',
  neutral: 'var(--text-muted)'
};
function Badge({
  children,
  tone = 'neutral',
  icon,
  solid = false,
  style,
  ...rest
}) {
  const c = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      padding: '3px 6px',
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 400,
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: solid ? 'var(--text-inverse)' : c,
      background: solid ? c : 'transparent',
      border: `var(--border-width) solid ${solid ? 'transparent' : c}`,
      borderRadius: 'var(--radius-xs)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    style: {
      width: 12,
      height: 12
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: 'var(--height-control-sm)',
    padding: 'var(--pad-control-sm)',
    font: 'var(--text-2xs)',
    icon: 16,
    gap: 'var(--space-2)'
  },
  md: {
    height: 'var(--height-control-md)',
    padding: 'var(--pad-control-md)',
    font: 'var(--text-xs)',
    icon: 16,
    gap: 'var(--space-3)'
  },
  lg: {
    height: 'var(--height-control-lg)',
    padding: 'var(--pad-control-lg)',
    font: 'var(--text-sm)',
    icon: 24,
    gap: 'var(--space-3)'
  }
};
const VARIANTS = {
  primary: {
    bg: 'var(--accent-mode)',
    fg: 'var(--text-inverse)',
    border: 'transparent',
    shadow: true
  },
  secondary: {
    bg: 'transparent',
    fg: 'var(--text-primary)',
    border: 'var(--border-default)',
    shadow: true
  },
  ghost: {
    bg: 'transparent',
    fg: 'var(--text-secondary)',
    border: 'transparent',
    shadow: false
  },
  danger: {
    bg: 'transparent',
    fg: 'var(--state-danger)',
    border: 'var(--state-danger)',
    shadow: true
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconEnd,
  fullWidth = false,
  disabled = false,
  type = 'button',
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const lift = v.shadow && !disabled;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      width: fullWidth ? '100%' : undefined,
      minHeight: s.height,
      padding: s.padding,
      fontFamily: 'var(--font-pixel)',
      fontSize: s.font,
      fontWeight: 700,
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: v.fg,
      background: v.bg === 'transparent' ? hover && !disabled ? 'var(--surface-raised)' : 'transparent' : v.bg,
      filter: hover && !disabled && v.bg !== 'transparent' ? 'brightness(1.08)' : 'none',
      border: `var(--border-width) solid ${v.border === 'transparent' && hover && !disabled && variant === 'ghost' ? 'var(--border-subtle)' : v.border}`,
      borderRadius: 'var(--radius-xs)',
      boxShadow: lift ? press ? 'none' : 'var(--shadow-pixel-sm)' : 'none',
      transform: lift && press ? 'translate(2px, 2px)' : 'none',
      opacity: disabled ? 0.4 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'var(--transition-control)',
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }) : null, children ? /*#__PURE__*/React.createElement("span", null, children) : null, iconEnd ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconEnd,
    size: s.icon
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 30,
  md: 40,
  lg: 52
};
const GLYPH = {
  sm: 16,
  md: 16,
  lg: 24
};
function IconButton({
  icon,
  label,
  variant = 'secondary',
  size = 'md',
  active = false,
  disabled = false,
  style,
  ...rest
}) {
  const box = SIZES[size] || SIZES.md;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const filled = variant === 'primary';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    "aria-pressed": active || undefined,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: box,
      height: box,
      padding: 0,
      color: filled ? 'var(--text-inverse)' : active ? 'var(--accent-mode)' : 'var(--text-secondary)',
      background: filled ? 'var(--accent-mode)' : hover && !disabled ? 'var(--surface-raised)' : 'transparent',
      filter: hover && !disabled && filled ? 'brightness(1.08)' : 'none',
      border: `var(--border-width) solid ${filled ? 'transparent' : active ? 'var(--border-accent)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-xs)',
      boxShadow: variant === 'ghost' || disabled ? 'none' : press ? 'none' : 'var(--shadow-pixel-sm)',
      transform: press && variant !== 'ghost' ? 'translate(2px, 2px)' : 'none',
      opacity: disabled ? 0.4 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'var(--transition-control)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: GLYPH[size] || 16
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tag({
  children,
  selected = false,
  onRemove,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const interactive = Boolean(onClick);
  return /*#__PURE__*/React.createElement("span", _extends({
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    role: interactive ? 'button' : undefined,
    tabIndex: interactive ? 0 : undefined,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      height: 24,
      padding: '0 8px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 500,
      color: selected ? 'var(--text-inverse)' : 'var(--text-secondary)',
      background: selected ? 'var(--accent-mode)' : hover && interactive ? 'var(--surface-raised)' : 'var(--surface-sunken)',
      border: `var(--border-width) solid ${selected ? 'transparent' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-xs)',
      cursor: interactive ? 'pointer' : 'default',
      transition: 'var(--transition-control)',
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    },
    style: {
      display: 'inline-flex',
      padding: 0,
      background: 'none',
      border: 0,
      color: 'inherit',
      cursor: 'pointer',
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "close",
    size: 16,
    style: {
      width: 12,
      height: 12
    }
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Dialog({
  open = true,
  title,
  overline,
  children,
  footer,
  onClose,
  width = 'var(--width-panel)',
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-8)',
      background: 'var(--scrim)',
      backdropFilter: 'var(--blur-scrim)'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title,
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--surface-card)',
      border: 'var(--border-width-thick) solid var(--border-default)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-pixel-lg)',
      animation: 'em-step-in var(--duration-medium) var(--ease-step) both',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 'var(--space-5)',
      padding: 'var(--space-6) var(--space-6) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, overline && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--accent-mode)'
    }
  }, overline), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-pixel)',
      fontWeight: 700,
      fontSize: 'var(--text-lg)',
      letterSpacing: 'var(--tracking-pixel)',
      lineHeight: 1.25,
      color: 'var(--text-primary)'
    }
  }, title)), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "close",
    label: "Close",
    variant: "ghost",
    size: "sm",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5) var(--space-6)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)'
    }
  }, children), footer && /*#__PURE__*/React.createElement("footer", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'var(--space-3)',
      padding: 'var(--space-5) var(--space-6)',
      borderTop: 'var(--border-width) solid var(--border-subtle)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Segmented pixel meter. Used for elapsed session time and for anything
   that fills. Never a rounded, animated, gradient bar. */
function ProgressBar({
  value = 0,
  cells = 40,
  label,
  showValue = false,
  size = 'md',
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  const lit = Math.round(pct / 100 * cells);
  const h = size === 'sm' ? 4 : size === 'lg' ? 12 : 8;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      ...style
    }
  }, rest), (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--space-4)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-secondary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": Math.round(pct),
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    style: {
      display: 'flex',
      gap: 2,
      width: '100%'
    }
  }, Array.from({
    length: cells
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: h,
      background: i < lit ? 'var(--accent-mode)' : 'var(--surface-sunken)',
      transition: 'background-color var(--duration-instant) var(--ease-step)'
    }
  }))));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: {
    color: 'var(--text-secondary)',
    icon: 'clock'
  },
  success: {
    color: 'var(--state-success)',
    icon: 'check'
  },
  warning: {
    color: 'var(--state-warning)',
    icon: 'bell-ring'
  },
  danger: {
    color: 'var(--state-danger)',
    icon: 'close'
  }
};
function Toast({
  title,
  message,
  tone = 'neutral',
  icon,
  action,
  actionLabel,
  onDismiss,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-4)',
      minWidth: 300,
      maxWidth: 420,
      padding: 'var(--space-5)',
      background: 'var(--surface-raised)',
      border: 'var(--border-width) solid var(--border-default)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-pixel)',
      animation: 'em-step-in var(--duration-medium) var(--ease-step) both',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.color,
      display: 'flex',
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon || t.icon,
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)'
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-primary)'
    }
  }, title), message && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      lineHeight: 1.5,
      color: 'var(--text-secondary)'
    }
  }, message), actionLabel && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: action,
    style: {
      alignSelf: 'flex-start',
      marginTop: 4,
      padding: 0,
      background: 'none',
      border: 0,
      borderBottom: '1px solid var(--accent-mode)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--accent-mode)',
      cursor: 'pointer'
    }
  }, actionLabel)), onDismiss && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "close",
    label: "Dismiss",
    variant: "ghost",
    size: "sm",
    onClick: onDismiss
  }));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tooltip({
  children,
  label,
  side = 'top',
  shortcut,
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translate(-50%, -6px)'
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translate(-50%, 6px)'
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translate(-6px, -50%)'
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translate(6px, -50%)'
    }
  }[side];
  return /*#__PURE__*/React.createElement("span", _extends({
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, rest), children, open && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      ...pos,
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: '4px 8px',
      whiteSpace: 'nowrap',
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      border: 0,
      borderRadius: 'var(--radius-xs)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      boxShadow: 'var(--shadow-pixel-sm)'
    }
  }, label, shortcut && /*#__PURE__*/React.createElement("kbd", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      padding: '1px 4px',
      border: '1px solid currentColor',
      opacity: 0.6,
      borderRadius: 2
    }
  }, shortcut)));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const uid = id || React.useId();
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-4)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: uid,
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 1,
      height: 1
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 18,
      height: 18,
      marginTop: 1,
      flex: '0 0 auto',
      background: checked ? 'var(--accent-mode)' : 'var(--surface-sunken)',
      border: `var(--border-width) solid ${checked ? 'transparent' : hover ? 'var(--border-strong)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-xs)',
      color: 'var(--text-inverse)',
      transition: 'var(--transition-control)'
    }
  }, checked ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16
  }) : null), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)',
      lineHeight: 1.3
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      lineHeight: 1.5
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  icon,
  suffix,
  size = 'md',
  id,
  value,
  onChange,
  disabled = false,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const uid = id || React.useId();
  const height = size === 'sm' ? 'var(--height-control-sm)' : 'var(--height-control-md)';
  const border = error ? 'var(--state-danger)' : focus ? 'var(--border-accent)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      height,
      padding: '0 10px',
      background: 'var(--surface-sunken)',
      border: `var(--border-width) solid ${border}`,
      borderRadius: 'var(--radius-xs)',
      color: 'var(--text-muted)',
      opacity: disabled ? 0.4 : 1,
      transition: 'var(--transition-control)'
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16
  }) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: uid,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      height: '100%',
      background: 'none',
      border: 0,
      outline: 'none',
      padding: 0,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)',
      letterSpacing: 'var(--tracking-mono)'
    }
  }, rest)), suffix ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, suffix) : null), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      lineHeight: 1.4,
      color: error ? 'var(--state-danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  description,
  checked = false,
  onChange,
  name,
  value,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const uid = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-4)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: uid,
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 1,
      height: 1
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 18,
      height: 18,
      marginTop: 1,
      flex: '0 0 auto',
      background: 'var(--surface-sunken)',
      border: `var(--border-width) solid ${checked ? 'var(--border-accent)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-xs)',
      transition: 'var(--transition-control)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: checked ? 'var(--accent-mode)' : 'transparent',
      transition: 'var(--transition-control)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)',
      lineHeight: 1.3
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      lineHeight: 1.5
    }
  }, description)));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  value,
  onChange,
  options = [],
  disabled = false,
  id,
  style,
  ...rest
}) {
  const uid = id || React.useId();
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: 'var(--height-control-md)',
      background: 'var(--surface-sunken)',
      border: `var(--border-width) solid ${focus ? 'var(--border-accent)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-xs)',
      opacity: disabled ? 0.4 : 1,
      transition: 'var(--transition-control)'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: uid,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: '100%',
      padding: '0 34px 0 10px',
      background: 'none',
      border: 0,
      outline: 'none',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, rest), options.map(o => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v,
      style: {
        background: 'var(--ink-800)'
      }
    }, l);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 10,
      display: 'flex',
      color: 'var(--text-muted)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Slider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Stepped fill: the track is drawn as discrete cells so the value reads
   as a number of blocks rather than a continuous smear. */
function Slider({
  label,
  value = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  cells = 20,
  valueLabel,
  disabled = false,
  style,
  ...rest
}) {
  const pct = (value - min) / (max - min || 1);
  const lit = Math.round(pct * cells);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      ...style
    }
  }, (label || valueLabel) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 'var(--space-4)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), valueLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-secondary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, valueLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: 20,
      opacity: disabled ? 0.4 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2,
      width: '100%',
      pointerEvents: 'none'
    }
  }, Array.from({
    length: cells
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: 'var(--height-bar)',
      background: i < lit ? 'var(--accent-mode)' : 'var(--surface-sunken)',
      outline: i < lit ? 'none' : '1px solid var(--border-subtle)',
      outlineOffset: -1,
      transition: 'background-color var(--duration-instant) var(--ease-step)'
    }
  }))), /*#__PURE__*/React.createElement("input", _extends({
    type: "range",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: onChange,
    disabled: disabled,
    "aria-label": label,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      opacity: 0,
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, rest))));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Slider.jsx", error: String((e && e.message) || e) }); }

// components/forms/Stepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Stepper({
  label,
  value = 0,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  unit,
  disabled = false,
  style,
  ...rest
}) {
  const set = next => {
    const clamped = Math.min(max, Math.max(min, next));
    if (clamped !== value && onChange) onChange(clamped);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "minus",
    label: "Decrease",
    size: "sm",
    onClick: () => set(value - step),
    disabled: disabled || value <= min
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center',
      gap: 4,
      minWidth: 84,
      height: 'var(--height-control-sm)',
      padding: '0 8px',
      background: 'var(--surface-sunken)',
      border: 'var(--border-width) solid var(--border-subtle)',
      borderRadius: 'var(--radius-xs)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-md)',
      fontWeight: 700,
      color: 'var(--text-primary)',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 'var(--height-control-sm)'
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, unit)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "plus",
    label: "Increase",
    size: "sm",
    onClick: () => set(value + step),
    disabled: disabled || value >= max
  })));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  id,
  style,
  ...rest
}) {
  const uid = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: uid,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-6)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)',
      lineHeight: 1.3
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      lineHeight: 1.5
    }
  }, description)), /*#__PURE__*/React.createElement("input", _extends({
    id: uid,
    type: "checkbox",
    role: "switch",
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 1,
      height: 1
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      flex: '0 0 auto',
      width: 40,
      height: 20,
      background: checked ? 'var(--accent-mode)' : 'var(--surface-sunken)',
      border: `var(--border-width) solid ${checked ? 'transparent' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-xs)',
      transition: 'background-color var(--duration-fast) var(--ease-step)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: checked ? 21 : 2,
      width: 15,
      height: 14,
      background: checked ? 'var(--text-inverse)' : 'var(--text-muted)',
      transition: 'left var(--duration-fast) var(--ease-step)'
    }
  })));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Two shapes, one component:
   segmented — a boxed row of equal cells, used for the mode switcher.
   underline — an unboxed row with a 2px accent rule, used for view nav. */
function Tabs({
  items = [],
  value,
  onChange,
  variant = 'segmented',
  fullWidth = false,
  style,
  ...rest
}) {
  const segmented = variant === 'segmented';
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'inline-flex',
      gap: segmented ? 0 : 'var(--space-6)',
      width: fullWidth ? '100%' : undefined,
      padding: segmented ? 3 : 0,
      background: segmented ? 'var(--surface-sunken)' : 'transparent',
      border: segmented ? 'var(--border-width) solid var(--border-subtle)' : 0,
      borderBottom: segmented ? undefined : 'var(--border-width) solid var(--border-subtle)',
      borderRadius: segmented ? 'var(--radius-xs)' : 0,
      ...style
    }
  }, rest), items.map(it => {
    const v = typeof it === 'string' ? it : it.value;
    const label = typeof it === 'string' ? it : it.label;
    const icon = typeof it === 'string' ? undefined : it.icon;
    const on = v === value;
    return /*#__PURE__*/React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      type: "button",
      onClick: () => onChange && onChange(v),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-3)',
        flex: fullWidth ? 1 : undefined,
        height: segmented ? 30 : 34,
        padding: segmented ? '0 12px' : '0 0 8px',
        marginBottom: segmented ? 0 : -1,
        fontFamily: 'var(--font-pixel)',
        fontSize: 'var(--text-2xs)',
        fontWeight: on ? 700 : 400,
        letterSpacing: 'var(--tracking-overline)',
        textTransform: 'uppercase',
        color: on ? segmented ? 'var(--text-inverse)' : 'var(--text-primary)' : 'var(--text-muted)',
        background: on && segmented ? 'var(--accent-mode)' : 'transparent',
        border: 0,
        borderBottom: segmented ? 0 : `var(--border-width-thick) solid ${on ? 'var(--accent-mode)' : 'transparent'}`,
        borderRadius: segmented ? 'var(--radius-xs)' : 0,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'var(--transition-control)'
      }
    }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: icon,
      size: 16
    }) : null, label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/timer/ChimeOption.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* A pickable sound. The bar pattern is a fixed decorative signature per
   chime, not a real waveform — it just gives each option a silhouette. */
function ChimeOption({
  name,
  description,
  bars = [3, 7, 5, 9, 4, 6, 2],
  selected = false,
  onSelect,
  onPlay,
  playing = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onSelect,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    role: "radio",
    "aria-checked": selected,
    tabIndex: 0,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      padding: 'var(--space-4) var(--space-5)',
      background: selected ? 'var(--surface-raised)' : hover ? 'var(--surface-raised)' : 'var(--surface-sunken)',
      border: `var(--border-width) solid ${selected ? 'var(--border-accent)' : 'var(--border-subtle)'}`,
      borderRadius: 'var(--radius-xs)',
      cursor: 'pointer',
      transition: 'var(--transition-control)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 18,
      height: 18,
      flex: '0 0 auto',
      border: `var(--border-width) solid ${selected ? 'var(--border-accent)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-xs)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: selected ? 'var(--accent-mode)' : 'transparent'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
      color: 'var(--text-primary)'
    }
  }, name), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      lineHeight: 1.5
    }
  }, description)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 2,
      height: 20
    },
    "aria-hidden": "true"
  }, bars.map((b, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 3,
      height: b * 2,
      background: selected || playing ? 'var(--accent-mode)' : 'var(--border-default)',
      transition: 'background-color var(--duration-fast) var(--ease-step)'
    }
  }))), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: playing ? 'pause' : 'play',
    label: playing ? 'Stop preview' : `Preview ${name}`,
    size: "sm",
    variant: "secondary",
    onClick: e => {
      e.stopPropagation();
      onPlay && onPlay();
    }
  }));
}
Object.assign(__ds_scope, { ChimeOption });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/timer/ChimeOption.jsx", error: String((e && e.message) || e) }); }

// components/timer/NowPlaying.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The radio strip. Ambient audio running under a session: a scanline
   field, a marquee title, and the smallest possible transport. */
function NowPlaying({
  track,
  station = 'ember fm',
  playing = false,
  muted = false,
  onToggle,
  onMute,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      padding: 'var(--space-4) var(--space-5)',
      background: 'var(--surface-card)',
      backgroundImage: 'repeating-linear-gradient(to bottom, var(--scanline) 0 1px, transparent 1px 3px)',
      border: 'var(--border-width) solid var(--border-subtle)',
      borderRadius: 'var(--radius-xs)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: playing ? 'pause' : 'play',
    label: playing ? 'Pause audio' : 'Play audio',
    size: "sm",
    variant: "secondary",
    onClick: onToggle
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      color: playing ? 'var(--accent-mode)' : 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "audio-waveform",
    size: 16,
    style: {
      animation: playing ? 'em-breathe var(--duration-ambient) var(--ease-in-out) infinite' : 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, station), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, track)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: muted ? 'volume-x' : 'volume-3',
    label: muted ? 'Unmute' : 'Mute',
    size: "sm",
    variant: "ghost",
    active: muted,
    onClick: onMute
  }));
}
Object.assign(__ds_scope, { NowPlaying });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/timer/NowPlaying.jsx", error: String((e && e.message) || e) }); }

// components/timer/RadioPlayer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The radio, for real. Ambient audio is never bundled with Ember — it is a
   YouTube embed, so the stream stays on its own rights holder's player.
   Controls talk to the iframe over the YouTube postMessage API. */
const EMBER_STATION_VIDEO = 'tRsQsTMvPNg';
function RadioPlayer({
  videoId = EMBER_STATION_VIDEO,
  station = 'ember fm',
  track,
  layout = 'strip',
  autoplay = false,
  style,
  ...rest
}) {
  const frameRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(autoplay);
  const [muted, setMuted] = React.useState(autoplay);
  const send = func => {
    const el = frameRef.current;
    if (!el || !el.contentWindow) return;
    el.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func,
      args: []
    }), '*');
  };
  const toggle = () => {
    send(playing ? 'pauseVideo' : 'playVideo');
    setPlaying(!playing);
  };
  const mute = () => {
    send(muted ? 'unMute' : 'mute');
    setMuted(!muted);
  };
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&playsinline=1${autoplay ? '&autoplay=1&mute=1' : ''}`;
  const panel = layout === 'panel';
  const screen = /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: '0 0 auto',
      width: panel ? '100%' : 96,
      aspectRatio: '16 / 9',
      background: 'var(--surface-sunken)',
      border: 'var(--border-width) solid var(--border-default)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    ref: frameRef,
    src: src,
    title: track || station,
    allow: "autoplay; encrypted-media; picture-in-picture",
    referrerPolicy: "strict-origin-when-cross-origin",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      border: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      backgroundImage: 'repeating-linear-gradient(to bottom, var(--scanline) 0 1px, transparent 1px 3px)'
    }
  }));
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: panel ? 'column' : 'row',
      alignItems: panel ? 'stretch' : 'center',
      gap: 'var(--space-5)',
      padding: 'var(--space-4) var(--space-5)',
      background: 'var(--surface-card)',
      border: 'var(--border-width) solid var(--border-subtle)',
      borderRadius: 'var(--radius-xs)',
      ...style
    }
  }, rest), screen, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: playing ? 'pause' : 'play',
    label: playing ? 'Pause radio' : 'Play radio',
    size: "sm",
    variant: "secondary",
    onClick: toggle
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: playing ? 'var(--accent-mode)' : 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "audio-waveform",
    size: 16,
    style: {
      animation: playing ? 'em-breathe var(--duration-ambient) var(--ease-in-out) infinite' : 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, station), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, track || 'youtube stream')), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: muted ? 'volume-x' : 'volume-3',
    label: muted ? 'Unmute' : 'Mute',
    size: "sm",
    variant: "ghost",
    active: muted,
    onClick: mute
  })));
}
Object.assign(__ds_scope, { EMBER_STATION_VIDEO, RadioPlayer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/timer/RadioPlayer.jsx", error: String((e && e.message) || e) }); }

// components/timer/SessionDots.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Cycle tracker: one cell per session in the current set. The long-break
   cell at the end is clay so the shape of the afternoon is readable. */
function SessionDots({
  total = 4,
  completed = 0,
  current = -1,
  showLongBreak = true,
  size = 12,
  label,
  style,
  ...rest
}) {
  const cells = Array.from({
    length: total
  });
  const cell = (bg, border, key, blink) => /*#__PURE__*/React.createElement("span", {
    key: key,
    style: {
      width: size,
      height: size,
      background: bg,
      border: `1px solid ${border}`,
      animation: blink ? 'em-breathe var(--duration-breath) var(--ease-in-out) infinite' : 'none'
    }
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)'
    },
    "aria-label": `${completed} of ${total} sessions done`
  }, cells.map((_, i) => i < completed ? cell('var(--accent-focus)', 'var(--accent-focus)', i, false) : i === current ? cell('transparent', 'var(--accent-focus)', i, true) : cell('transparent', 'var(--border-default)', i, false)), showLongBreak && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size / 2
    }
  }), cell(completed >= total ? 'var(--accent-break-long)' : 'transparent', 'var(--accent-break-long)', 'long', false))));
}
Object.assign(__ds_scope, { SessionDots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/timer/SessionDots.jsx", error: String((e && e.message) || e) }); }

// components/timer/TimerDisplay.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function pad(n) {
  return String(Math.max(0, Math.floor(n))).padStart(2, '0');
}

/* The centrepiece. Pixel numerals, tabular, with a colon that blinks on
   the second while running and holds steady when paused. */
function TimerDisplay({
  seconds = 0,
  running = false,
  mode = 'focus',
  label,
  size = 'lg',
  style,
  ...rest
}) {
  const fontSize = {
    sm: 'var(--text-3xl)',
    md: 'var(--display-sm)',
    lg: 'var(--display-md)',
    xl: 'var(--display-lg)'
  }[size] || 'var(--display-md)';
  const mm = pad(seconds / 60);
  const ss = pad(seconds % 60);
  const accent = {
    focus: 'var(--accent-focus)',
    short: 'var(--accent-break-short)',
    long: 'var(--accent-break-long)'
  }[mode] || 'var(--accent-focus)';
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-mode": mode,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-4)',
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: accent
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    role: "timer",
    "aria-label": `${mm} minutes ${ss} seconds remaining`,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      fontFamily: 'var(--font-pixel)',
      fontWeight: 700,
      fontSize,
      lineHeight: 1,
      letterSpacing: '0.02em',
      fontVariantNumeric: 'tabular-nums',
      color: running ? 'var(--text-primary)' : 'var(--text-secondary)',
      transition: 'color var(--duration-slow) var(--ease-in-out)'
    }
  }, /*#__PURE__*/React.createElement("span", null, mm), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '0 0.08em',
      animation: running ? 'em-blink 1s steps(1,end) infinite' : 'none',
      opacity: running ? undefined : 0.5
    }
  }, ":"), /*#__PURE__*/React.createElement("span", null, ss)));
}
Object.assign(__ds_scope, { TimerDisplay });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/timer/TimerDisplay.jsx", error: String((e && e.message) || e) }); }

// components/timer/FullScreenTimer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Full-screen session. The station plays full-bleed behind a warm scrim and
   scanlines; the countdown sits on top at display-lg. Chrome fades out after
   a few idle seconds and comes back on any movement — the screen is meant to
   be looked away from. */
function FullScreenTimer({
  seconds = 0,
  running = false,
  mode = 'focus',
  label,
  completed = 0,
  current = -1,
  sets = 4,
  task,
  videoId = __ds_scope.EMBER_STATION_VIDEO,
  station = 'ember fm',
  track = 'music for thinking and building',
  showVideo = true,
  dim = 72,
  idleFade = true,
  started = true,
  onToggle,
  onReset,
  onSkip,
  onExit,
  style,
  ...rest
}) {
  const frameRef = React.useRef(null);
  const [muted, setMuted] = React.useState(true);
  const [idle, setIdle] = React.useState(false);
  React.useEffect(() => {
    if (!idleFade) return;
    let t = setTimeout(() => setIdle(true), 4000);
    const wake = () => {
      setIdle(false);
      clearTimeout(t);
      t = setTimeout(() => setIdle(true), 4000);
    };
    window.addEventListener('mousemove', wake);
    window.addEventListener('keydown', wake);
    return () => {
      clearTimeout(t);
      window.removeEventListener('mousemove', wake);
      window.removeEventListener('keydown', wake);
    };
  }, [idleFade]);
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape' && onExit) onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onExit]);
  const send = func => {
    const el = frameRef.current;
    if (!el || !el.contentWindow) return;
    el.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func,
      args: []
    }), '*');
  };
  const toggleMute = () => {
    send(muted ? 'unMute' : 'mute');
    setMuted(!muted);
  };
  const chrome = {
    opacity: idle ? 0 : 1,
    transition: 'opacity var(--duration-slow) var(--ease-in-out)',
    pointerEvents: idle ? 'none' : 'auto'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-mode": mode,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 90,
      overflow: 'hidden',
      background: 'var(--surface-app)',
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, rest), showVideo && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    ref: frameRef,
    title: track,
    tabIndex: -1,
    src: `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${videoId}`,
    allow: "autoplay; encrypted-media",
    referrerPolicy: "strict-origin-when-cross-origin",
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '178vh',
      height: '100.5vh',
      minWidth: '100.5vw',
      minHeight: '56.25vw',
      transform: 'translate(-50%, -50%)',
      border: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--surface-app)',
      opacity: dim / 100
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'repeating-linear-gradient(to bottom, var(--scanline) 0 1px, transparent 1px 3px)'
    }
  })), /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-6)',
      padding: 'var(--space-6) var(--space-8)',
      ...chrome
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontWeight: 700,
      fontSize: 'var(--text-md)',
      letterSpacing: '.06em',
      color: 'var(--text-primary)'
    }
  }, "ember"), task && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, task)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "audio-waveform",
    size: 16,
    style: {
      animation: 'em-breathe var(--duration-ambient) var(--ease-in-out) infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)'
    }
  }, station, " \xB7 ", track)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: muted ? 'volume-x' : 'volume-3',
    label: muted ? 'Unmute station' : 'Mute station',
    size: "sm",
    variant: "ghost",
    active: muted,
    onClick: toggleMute
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "collapse",
    label: "Leave full screen",
    size: "sm",
    onClick: onExit
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-8)',
      padding: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.TimerDisplay, {
    seconds: seconds,
    running: running,
    mode: mode,
    label: label,
    size: "xl"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      ...chrome
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "reload",
    label: "Reset",
    onClick: onReset
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    icon: running ? 'pause' : 'play',
    onClick: onToggle,
    style: {
      minWidth: 176
    }
  }, running ? 'Pause' : started ? 'Resume' : 'Start'), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "chevron-right",
    label: "Skip",
    onClick: onSkip
  }))), /*#__PURE__*/React.createElement("footer", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-6)',
      padding: 'var(--space-6) var(--space-8)',
      ...chrome
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.SessionDots, {
    label: "Set",
    total: sets,
    completed: completed,
    current: current
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "esc to exit")));
}
Object.assign(__ds_scope, { FullScreenTimer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/timer/FullScreenTimer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ember-app/App.jsx
try { (() => {
const MIN = 60;
const MODE_TEXT = {
  focus: 'Focus',
  short: 'Short break',
  long: 'Long break'
};
function App() {
  const ns = window.EmberDesignSystem_e9992d;
  const {
    Dialog,
    Button,
    Toast
  } = ns;
  const FullScreenTimer = ns.FullScreenTimer;
  const [view, setView] = React.useState('Timer');
  const [theme, setTheme] = React.useState('dark');
  const [mode, setMode] = React.useState('focus');
  const [settings, setSettings] = React.useState({
    focus: 25,
    short: 5,
    long: 15,
    sets: 4,
    volume: 60,
    autoBreak: true,
    autoFocus: false,
    awake: true,
    task: 'deep work'
  });
  const [chime, setChime] = React.useState('bell');
  const [running, setRunning] = React.useState(false);
  const [seconds, setSeconds] = React.useState(25 * MIN);
  const [completed, setCompleted] = React.useState(2);
  const [done, setDone] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [full, setFull] = React.useState(false);
  const [playing, setPlaying] = React.useState(true);
  const [muted, setMuted] = React.useState(false);
  const [sessions, setSessions] = React.useState([{
    at: '09:12',
    task: 'deep work',
    mode: 'focus',
    length: '25:00'
  }, {
    at: '09:42',
    task: 'deep work',
    mode: 'short',
    length: '05:00'
  }, {
    at: '10:15',
    task: 'inbox sweep',
    mode: 'focus',
    length: '25:00'
  }]);
  React.useEffect(() => {
    window.EMBER_CHIME_ID = chime;
  }, [chime]);
  const total = settings[mode] * MIN;
  React.useEffect(() => {
    setSeconds(settings[mode] * MIN);
    setRunning(false);
  }, [mode, settings.focus, settings.short, settings.long]);
  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => {
      if (s <= 1) {
        finish();
        return 0;
      }
      return s - 1;
    }), 1000);
    return () => clearInterval(id);
  });
  function finish() {
    setRunning(false);
    if (window.emberChime) window.emberChime(chime, muted ? 0 : settings.volume);
    const at = new Date().toTimeString().slice(0, 5);
    const len = String(settings[mode]).padStart(2, '0') + ':00';
    setSessions(s => [...s, {
      at,
      task: settings.task,
      mode,
      length: len
    }]);
    if (mode === 'focus') setCompleted(c => Math.min(c + 1, settings.sets));
    setDone(mode);
  }
  function nextAfter(finished) {
    if (finished === 'focus') return completed + 1 >= settings.sets ? 'long' : 'short';
    return 'focus';
  }
  function acceptNext() {
    const next = nextAfter(done);
    if (next === 'focus' && done === 'long') setCompleted(0);
    setMode(next);
    setDone(null);
    setTimeout(() => setRunning(true), 60);
  }
  function skip() {
    setRunning(false);
    setMode(nextAfter(mode));
    setToast({
      tone: 'neutral',
      title: 'Skipped ahead',
      message: 'Nothing was logged for that one.'
    });
  }
  function reset() {
    setSeconds(total);
    setRunning(false);
    setToast({
      tone: 'neutral',
      title: 'Timer reset',
      message: `Back to ${settings[mode]} minutes.`
    });
  }
  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(id);
  }, [toast]);
  React.useEffect(() => {
    const onKey = e => {
      if (e.code === 'Space') {
        e.preventDefault();
        setRunning(r => !r);
      }
      if (e.key === 'r') reset();
      if (e.key === 's') skip();
      if (e.key === 'f') enterFull();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
  function enterFull() {
    setFull(true);
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
  }
  function exitFull() {
    setFull(false);
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
  }
  const LABEL = {
    focus: 'Focus complete',
    short: 'Break over',
    long: 'Long break over'
  };
  const NEXT_LABEL = {
    focus: 'Start break',
    short: 'Back to focus',
    long: 'Back to focus'
  };
  return /*#__PURE__*/React.createElement(window.AppShell, {
    view: view,
    onView: setView,
    theme: theme,
    onTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    mode: mode
  }, view === 'Timer' && /*#__PURE__*/React.createElement(window.TimerScreen, {
    mode: mode,
    onMode: setMode,
    seconds: seconds,
    total: total,
    running: running,
    onToggle: () => setRunning(!running),
    onReset: reset,
    onSkip: skip,
    completed: completed,
    current: completed,
    sets: settings.sets,
    task: settings.task,
    playing: playing,
    muted: muted,
    onPlaying: setPlaying,
    onMuted: setMuted,
    chimeName: (window.EMBER_CHIMES || []).find(c => c.id === chime)?.name || chime,
    onFullScreen: enterFull,
    radioSilent: full
  }), view === 'Log' && /*#__PURE__*/React.createElement(window.LogScreen, {
    sessions: sessions
  }), view === 'Settings' && /*#__PURE__*/React.createElement(window.SettingsScreen, {
    settings: settings,
    onSet: (k, v) => setSettings(s => ({
      ...s,
      [k]: v
    })),
    chime: chime,
    onChime: setChime,
    theme: theme,
    onTheme: setTheme
  }), /*#__PURE__*/React.createElement(Dialog, {
    open: Boolean(done),
    overline: done ? LABEL[done] : '',
    title: done === 'focus' ? 'Take five?' : 'Ready to go again?',
    onClose: () => setDone(null),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setDone(null)
    }, "Not yet"), /*#__PURE__*/React.createElement(Button, {
      icon: done === 'focus' ? 'coffee' : 'hourglass',
      onClick: acceptNext
    }, done ? NEXT_LABEL[done] : ''))
  }, done === 'focus' ? `Session ${Math.min(completed, settings.sets)} of ${settings.sets} logged. ${settings.focus} minutes.` : 'That break is done. The next focus block is ready when you are.'), full && FullScreenTimer && /*#__PURE__*/React.createElement(FullScreenTimer, {
    seconds: seconds,
    running: running,
    mode: mode,
    label: `${MODE_TEXT[mode]} · ${Math.min(completed + 1, settings.sets)} of ${settings.sets}`,
    completed: completed,
    current: running ? completed : -1,
    sets: settings.sets,
    task: settings.task,
    started: seconds !== settings[mode] * MIN,
    onToggle: () => setRunning(!running),
    onReset: reset,
    onSkip: skip,
    onExit: exitFull
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 24,
      bottom: 24,
      zIndex: 80
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: toast.tone,
    title: toast.title,
    message: toast.message,
    onDismiss: () => setToast(null)
  })));
}
Object.assign(window, {
  App
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ember-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ember-app/AppShell.jsx
try { (() => {
function AppShell({
  view,
  onView,
  theme,
  onTheme,
  mode,
  children
}) {
  const {
    Tabs,
    IconButton,
    Tooltip
  } = window.EmberDesignSystem_e9992d;
  return /*#__PURE__*/React.createElement("div", {
    "data-theme": theme === 'light' ? 'light' : undefined,
    "data-mode": mode,
    style: {
      minHeight: '100%',
      background: 'var(--surface-app)',
      display: 'flex',
      justifyContent: 'center',
      padding: '32px 20px 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "em-grid-bg",
    style: {
      width: '100%',
      maxWidth: 'var(--width-app)',
      border: 'var(--border-width) solid var(--border-subtle)',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--surface-app)',
      boxShadow: 'var(--shadow-pixel-lg)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-6)',
      padding: '14px 20px',
      borderBottom: 'var(--border-width) solid var(--border-subtle)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontWeight: 700,
      fontSize: 'var(--text-lg)',
      letterSpacing: '.06em',
      color: 'var(--text-primary)'
    }
  }, "ember"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "a quiet timer")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "underline",
    value: view,
    onChange: onView,
    items: ['Timer', 'Log', 'Settings']
  }), /*#__PURE__*/React.createElement(Tooltip, {
    label: theme === 'light' ? 'Night' : 'Daylight',
    side: "left"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: theme === 'light' ? 'moon' : 'sun',
    label: "Toggle theme",
    size: "sm",
    onClick: onTheme
  })))), /*#__PURE__*/React.createElement("main", {
    style: {
      padding: 'var(--space-8)'
    }
  }, children)));
}
Object.assign(window, {
  AppShell
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ember-app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ember-app/LogScreen.jsx
try { (() => {
const WEEK = [{
  d: 'mon',
  n: 6
}, {
  d: 'tue',
  n: 4
}, {
  d: 'wed',
  n: 8
}, {
  d: 'thu',
  n: 5
}, {
  d: 'fri',
  n: 7
}, {
  d: 'sat',
  n: 2
}, {
  d: 'sun',
  n: 0
}];
function Bars() {
  const max = 8;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 'var(--space-4)',
      height: 132
    }
  }, WEEK.map(x => /*#__PURE__*/React.createElement("div", {
    key: x.d,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      gap: 2,
      height: 100,
      width: '100%'
    }
  }, Array.from({
    length: max
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      height: 10,
      background: max - i <= x.n ? 'var(--accent-focus)' : 'var(--surface-sunken)'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, x.d))));
}
function Stat({
  label,
  value,
  unit
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontWeight: 700,
      fontSize: 'var(--text-2xl)',
      color: 'var(--text-primary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, unit)));
}
function LogScreen({
  sessions
}) {
  const {
    Card,
    Badge,
    Tag,
    Tabs
  } = window.EmberDesignSystem_e9992d;
  const [range, setRange] = React.useState('Week');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Today",
    value: sessions.length,
    unit: "sessions"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Focused",
    value: sessions.length * 25,
    unit: "min"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Streak",
    value: "9",
    unit: "days"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Best day",
    value: "wed",
    unit: "8 sessions"
  })), /*#__PURE__*/React.createElement(Card, {
    title: "This week",
    meta: "32 sessions"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "segmented",
    value: range,
    onChange: setRange,
    items: ['Week', 'Month']
  }), /*#__PURE__*/React.createElement(Bars, null))), /*#__PURE__*/React.createElement(Card, {
    title: "Today",
    meta: `${sessions.length} logged`,
    padding: "none"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, sessions.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)',
      padding: 'var(--space-4) var(--space-6)',
      borderTop: i === 0 ? 0 : 'var(--border-width) solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      width: 52
    }
  }, s.at), /*#__PURE__*/React.createElement(Tag, null, s.task), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: s.mode
  }, s.mode === 'focus' ? 'Focus' : s.mode === 'short' ? 'Short' : 'Long'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, s.length))), sessions.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-8)',
      textAlign: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, "Nothing logged yet. Start a session and it lands here."))));
}
Object.assign(window, {
  LogScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ember-app/LogScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ember-app/SettingsScreen.jsx
try { (() => {
function SettingsScreen({
  settings,
  onSet,
  chime,
  onChime,
  theme,
  onTheme
}) {
  const {
    Card,
    Stepper,
    Switch,
    Slider,
    Select,
    ChimeOption,
    Button,
    Input
  } = window.EmberDesignSystem_e9992d;
  const [previewing, setPreviewing] = React.useState(null);
  const play = id => {
    setPreviewing(id);
    const dur = window.emberChime ? window.emberChime(id, settings.volume) : 1;
    setTimeout(() => setPreviewing(null), dur * 1000);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-6)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Lengths",
    meta: "minutes"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Stepper, {
    label: "Focus",
    value: settings.focus,
    step: 5,
    min: 5,
    max: 90,
    unit: "min",
    onChange: v => onSet('focus', v)
  }), /*#__PURE__*/React.createElement(Stepper, {
    label: "Short break",
    value: settings.short,
    step: 1,
    min: 1,
    max: 15,
    unit: "min",
    onChange: v => onSet('short', v)
  }), /*#__PURE__*/React.createElement(Stepper, {
    label: "Long break",
    value: settings.long,
    step: 5,
    min: 10,
    max: 45,
    unit: "min",
    onChange: v => onSet('long', v)
  }), /*#__PURE__*/React.createElement(Stepper, {
    label: "Sessions before a long break",
    value: settings.sets,
    min: 2,
    max: 8,
    onChange: v => onSet('sets', v)
  }))), /*#__PURE__*/React.createElement(Card, {
    title: "Flow"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Auto-start breaks",
    description: "Rolls into the break without asking.",
    checked: settings.autoBreak,
    onChange: () => onSet('autoBreak', !settings.autoBreak)
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Auto-start next focus",
    description: "Keeps the set moving after a break.",
    checked: settings.autoFocus,
    onChange: () => onSet('autoFocus', !settings.autoFocus)
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Keep the screen awake",
    checked: settings.awake,
    onChange: () => onSet('awake', !settings.awake)
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Theme",
    value: theme,
    onChange: e => onTheme(e.target.value),
    options: [{
      value: 'dark',
      label: 'Night'
    }, {
      value: 'light',
      label: 'Daylight'
    }]
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Chime",
    meta: "plays at zero"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, (window.EMBER_CHIMES || []).map(c => /*#__PURE__*/React.createElement(ChimeOption, {
    key: c.id,
    name: c.name,
    description: c.description,
    bars: c.bars,
    selected: chime === c.id,
    playing: previewing === c.id,
    onSelect: () => onChime(c.id),
    onPlay: () => play(c.id)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Volume",
    value: settings.volume,
    valueLabel: settings.volume + '%',
    onChange: e => onSet('volume', +e.target.value)
  })))), /*#__PURE__*/React.createElement(Card, {
    title: "Session label"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "What you are working on",
    value: settings.task,
    onChange: e => onSet('task', e.target.value),
    hint: "Shows on the timer and in your log."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    size: "sm",
    icon: "trash"
  }, "Clear today"))))));
}
Object.assign(window, {
  SettingsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ember-app/SettingsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ember-app/TimerScreen.jsx
try { (() => {
const MODE_LABEL = {
  focus: 'Focus',
  short: 'Short break',
  long: 'Long break'
};
function TimerScreen({
  mode,
  onMode,
  seconds,
  total,
  running,
  onToggle,
  onReset,
  onSkip,
  completed,
  current,
  sets,
  task,
  playing,
  muted,
  onPlaying,
  onMuted,
  chimeName,
  onFullScreen,
  radioSilent
}) {
  const ns = window.EmberDesignSystem_e9992d;
  const {
    TimerDisplay,
    SessionDots,
    ProgressBar,
    Tabs,
    Button,
    IconButton,
    Tooltip,
    Badge,
    Tag
  } = ns;
  // Falls back to the player-less strip if the bundle predates RadioPlayer.
  const RadioPlayer = ns.RadioPlayer || ns.NowPlaying;
  const pct = total ? (total - seconds) / total * 100 : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "segmented",
    value: mode,
    onChange: onMode,
    items: [{
      value: 'focus',
      label: 'Focus',
      icon: 'hourglass'
    }, {
      value: 'short',
      label: 'Short',
      icon: 'coffee'
    }, {
      value: 'long',
      label: 'Long',
      icon: 'leaf'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(SessionDots, {
    total: sets,
    completed: completed,
    current: running ? current : -1
  }), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Full screen",
    shortcut: "F"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "expand",
    label: "Full screen",
    onClick: onFullScreen
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-7)',
      padding: 'var(--space-9) 0 var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(TimerDisplay, {
    seconds: seconds,
    running: running,
    mode: mode,
    size: "lg",
    label: `${MODE_LABEL[mode]} · ${Math.min(completed + 1, sets)} of ${sets}`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Tooltip, {
    label: "Reset",
    shortcut: "R"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "reload",
    label: "Reset",
    onClick: onReset
  })), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    icon: running ? 'pause' : 'play',
    onClick: onToggle,
    style: {
      minWidth: 176
    }
  }, running ? 'Pause' : seconds === total ? 'Start' : 'Resume'), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Skip ahead",
    shortcut: "S"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-right",
    label: "Skip",
    onClick: onSkip
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Tag, null, task), /*#__PURE__*/React.createElement(Badge, {
    tone: mode,
    solid: running
  }, running ? 'Running' : 'Paused'))), /*#__PURE__*/React.createElement(ProgressBar, {
    value: pct,
    cells: 48
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 240px',
      gap: 'var(--space-5)',
      alignItems: 'stretch'
    }
  }, !radioSilent && /*#__PURE__*/React.createElement(RadioPlayer, {
    track: "music for thinking and building"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: 'var(--space-4) var(--space-5)',
      border: 'var(--border-width) solid var(--border-subtle)',
      borderRadius: 'var(--radius-xs)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-pixel)',
      fontSize: 'var(--text-2xs)',
      letterSpacing: 'var(--tracking-overline)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "chime"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-secondary)',
      flex: 1
    }
  }, chimeName), /*#__PURE__*/React.createElement(IconButton, {
    icon: "bell-ring",
    label: "Preview chime",
    size: "sm",
    variant: "ghost",
    onClick: () => window.emberChime && window.emberChime(window.EMBER_CHIME_ID || 'bell', 60)
  }))));
}
Object.assign(window, {
  TimerScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ember-app/TimerScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ember-app/chime.js
try { (() => {
/* Tiny WebAudio chime bank so the picker can actually be auditioned.
   Real Ember ships sampled sounds; these are stand-ins with the same shape. */
(function () {
  var ctx;
  function audio() {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }
  var RECIPES = {
    bell: {
      partials: [880, 1320, 1760],
      decay: 2.4,
      type: 'sine',
      strikes: 2,
      gap: 0.55
    },
    wood: {
      partials: [420, 900],
      decay: 0.22,
      type: 'triangle',
      strikes: 1,
      gap: 0
    },
    marimba: {
      partials: [523, 1046],
      decay: 0.9,
      type: 'sine',
      strikes: 3,
      gap: 0.16
    },
    glass: {
      partials: [1320, 1980, 2640],
      decay: 1.6,
      type: 'sine',
      strikes: 1,
      gap: 0
    },
    hum: {
      partials: [196, 294],
      decay: 3.2,
      type: 'sine',
      strikes: 1,
      gap: 0
    }
  };
  function strike(r, at, vol) {
    var a = audio();
    r.partials.forEach(function (f, i) {
      var o = a.createOscillator(),
        g = a.createGain();
      o.type = r.type;
      o.frequency.value = f;
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(vol / 100 * (0.22 / (i + 1)), at + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, at + r.decay);
      o.connect(g);
      g.connect(a.destination);
      o.start(at);
      o.stop(at + r.decay + 0.05);
    });
  }
  window.emberChime = function (kind, volume) {
    var r = RECIPES[kind] || RECIPES.bell,
      a = audio(),
      t = a.currentTime + 0.02;
    for (var i = 0; i < r.strikes; i++) strike(r, t + i * r.gap, volume == null ? 60 : volume);
    return r.decay + r.strikes * r.gap;
  };
  window.EMBER_CHIMES = [{
    id: 'bell',
    name: 'temple bell',
    description: 'Two soft strikes, long tail.',
    bars: [2, 8, 5, 9, 3, 6, 2]
  }, {
    id: 'wood',
    name: 'wood block',
    description: 'One dry knock. Nothing lingers.',
    bars: [9, 3, 1, 1, 1, 1, 1]
  }, {
    id: 'marimba',
    name: 'soft marimba',
    description: 'Three rising notes.',
    bars: [3, 5, 7, 5, 3, 2, 1]
  }, {
    id: 'glass',
    name: 'glass',
    description: 'Bright and short, like a rim tap.',
    bars: [7, 9, 4, 2, 1, 1, 1]
  }, {
    id: 'hum',
    name: 'low hum',
    description: 'Barely there. For shared rooms.',
    bars: [4, 4, 5, 4, 4, 3, 3]
  }];
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ember-app/chime.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.ChimeOption = __ds_scope.ChimeOption;

__ds_ns.FullScreenTimer = __ds_scope.FullScreenTimer;

__ds_ns.NowPlaying = __ds_scope.NowPlaying;

__ds_ns.EMBER_STATION_VIDEO = __ds_scope.EMBER_STATION_VIDEO;

__ds_ns.RadioPlayer = __ds_scope.RadioPlayer;

__ds_ns.SessionDots = __ds_scope.SessionDots;

__ds_ns.TimerDisplay = __ds_scope.TimerDisplay;

})();
