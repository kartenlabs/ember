Mono-type chip for user-authored labels: task names, project tags, filters.

```jsx
<Tag selected onClick={pick}>deep work</Tag>
<Tag onRemove={drop}>writing</Tag>
```

- Mono type and lowercase — tags are the user's words, so they are never uppercased.
- Badge is for system state; Tag is for user content. Do not mix them.
