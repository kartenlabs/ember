The one action control — use for anything the user commits to (start, save, skip, reset).

```jsx
<Button variant="primary" size="lg" icon="play">Start focus</Button>
<Button variant="secondary" icon="reload">Reset</Button>
<Button variant="ghost" size="sm">Skip break</Button>
```

- One primary per view. Everything else is secondary or ghost.
- `primary` fills with `--accent-mode`, so it turns sage on a short break and clay on a long one automatically when an ancestor sets `data-mode`.
- Labels are pixel-type uppercase and stay under three words. Never sentence case.
- `danger` is an outline, never a filled red block.
