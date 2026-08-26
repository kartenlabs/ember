Panel container for a group of related controls or stats.

```jsx
<Card title="Session log" meta="4 of 6">
  …rows…
</Card>
<Card tone="accent" lifted>…</Card>
```

- 3px radius, 1px border, no blur. Shadows are hard offsets and only on `lifted`.
- Use at most one `lifted` card per screen; flat cards read as part of the board.
- Header title is a pixel-type overline, not a heading — keep it short and uppercase.
