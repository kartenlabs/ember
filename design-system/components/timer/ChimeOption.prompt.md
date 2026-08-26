Row in the chime picker — select on the left, audition on the right.

```jsx
<ChimeOption name="temple bell" description="Two soft strikes, long tail."
  bars={[2,8,5,9,3,6,2]} selected={v==='bell'} onSelect={…} onPlay={…} />
```

- Every chime must be auditionable in place; picking a sound you cannot hear is the one thing this screen must not do.
- Names are lowercase mono, descriptions are one plain sentence about the sound, never marketing.
