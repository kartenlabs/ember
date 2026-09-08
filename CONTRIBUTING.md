# Contributing to Ember

Thanks for taking a look. Bug reports, fixes, and ideas are all welcome, and so
is telling us that something is unclear — that counts as a contribution too.

## Getting set up

```
npm install
npm run dev          # http://localhost:3000
```

Node 20 or newer. There is nothing else to configure: no environment variables,
no API keys, no database, no account.

## Running the checks

```
npm run lint         # eslint
npm test             # unit tests, Node's built-in runner
npm run test:e2e     # Playwright, against a real production build
```

`npm run test:e2e` builds the app and serves it on port 3104 before running, so
it takes a minute or two. It is the check most likely to catch a real
regression, and CI runs all three on every pull request.

## House rules

These are the conventions that keep the codebase the way it is. They are worth
reading before a first pull request, because most review comments are one of
these.

**No new dependencies.** The app ships with exactly three: `next`, `react` and
`react-dom`. If something seems to need a fourth, open an issue first and let's
talk about it — most of the time a few lines does the job, and every dependency
is a thing that can break at 3am.

**No CSS framework, no preprocessor, no CSS modules.** Styling is plain CSS
custom properties. The design tokens live in `app/globals.css`; components use
inline `style` objects whose values are `var(--token)` references. Add a token
rather than a hard-coded value, and keep to the 4px spacing scale.

**Type roles are fixed.** Silkscreen is for the wordmark, countdowns and short
overlines, and never for body copy. Instrument Sans is for sentences. IBM Plex
Mono is for numbers, URLs, credits and metadata.

**Nothing may overflow at 320px.** The Playwright suite asserts this on every
route at four viewports, and asserts that no page produces console errors. If
you add a route, add it to the list in `tests/app.spec.ts`.

**Accessibility is not optional.** Controls need real labels, focus must stay
visible, and anything that changes without a click needs an `aria-live` region.
The existing components show the pattern.

## Things that are load-bearing

A few decisions look like they could be simplified but cannot. They carry
comments in the source explaining why; please read the comment before changing
the code around it.

- **The YouTube player is a real, visible YouTube embed.** Ember hosts, copies
  and proxies no audio. Hiding the iframe to fake an audio-only widget would put
  the project outside YouTube's terms. The iframe is deliberately not mounted
  until the user presses play, which is a privacy measure, not an oversight —
  see the comment at the top of `components/timer/RadioPlayer.tsx`.
- **The station credit prints the real title and channel.** It is someone else's
  work; the honest credit is their name.
- **The chimes are synthesised, never sampled.** No audio file belongs in this
  repository.
- **Third-party licences travel with their files.** `public/icons/LICENSE.txt`
  stays where it is. If you add an asset, add its licence and record it in
  [THIRD-PARTY.md](./THIRD-PARTY.md).
- **`app/globals.css` is generated from `design-system/tokens/`.** Change tokens
  at the source, not only in the copy.

## Pull requests

- Branch from `main` and keep the change focused on one thing.
- Run the three checks above before pushing.
- Describe what changed and why. A screenshot helps for anything visual, and
  both themes are worth showing if you touched colour.
- If the change affects what data the app stores or what it contacts over the
  network, say so explicitly — `app/privacy/page.tsx` may need updating in the
  same pull request.

## Reporting bugs and asking for features

Use the [issue templates](https://github.com/kartenlabs/ember/issues/new/choose).
For anything security-related, please follow [SECURITY.md](./SECURITY.md)
instead of opening a public issue.

By contributing, you agree that your contributions are licensed under the
project's [MIT licence](./LICENSE), and to the
[Code of Conduct](./CODE_OF_CONDUCT.md).
