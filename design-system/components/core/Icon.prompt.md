Masked pixel glyph from the Ember icon set — use it anywhere an icon appears, never a hand-drawn SVG or emoji.

```jsx
<Icon name="coffee" size={16} />
<Icon name="play" size={24} title="Start session" />
```

- Inherits `currentColor`, so it tints with its parent's text colour.
- Sizes are 16 / 24 / 32 only; the bitmap grid smears at odd sizes.
- `ICON_NAMES` lists everything shipped in `assets/icons/`. Ask for a new asset rather than substituting a different icon library.
- Set `window.EMBER_ICON_BASE = '../../assets/icons'` before mount when the page is not at project root.
