Native dropdown, restyled — for closed lists of six or more (theme, chime pack, week start).

```jsx
<Select label="Chime pack" value={pack} onChange={e => set(e.target.value)}
  options={[{value:'bells',label:'Temple bells'},{value:'wood',label:'Wood block'}]} />
```

- Two or three options belong in `Tabs` (segmented) instead.
- Pixel chevron only; never a unicode arrow.
