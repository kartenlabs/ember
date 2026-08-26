One-of-many choice in a vertical list — square, not round, because the grid has no circles.

```jsx
<Radio name="chime" label="Temple bell" description="Two soft strikes." checked={v==='bell'} onChange={…} />
```

- Always in a group of 2–6 with a pixel overline above the group.
- For picking a chime, prefer `ChimeOption` — it adds an audition button.
