Square single-glyph control for transport and chrome actions (play, mute, settings, close).

```jsx
<IconButton icon="pause" label="Pause" variant="primary" size="lg" />
<IconButton icon="volume-3" label="Mute" active />
<IconButton icon="close" label="Close" variant="ghost" size="sm" />
```

- Always square, never pill. `lg` (52px) is the transport size; `md` is chrome; `sm` only inside dense rows.
- `active` marks a persistent toggle (looping, muted), not hover.
