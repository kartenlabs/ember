# Security policy

## Reporting a vulnerability

Please report security issues privately, through GitHub's private vulnerability
reporting: go to the [Security tab](https://github.com/kartenlabs/ember/security)
and choose **Report a vulnerability**. That opens a private advisory visible only
to the maintainers.

Please do not open a public issue for a security problem.

Include what you found, how to reproduce it, and what an attacker could do with
it. A proof of concept helps, but is not required.

This is a small project maintained in spare time. Expect an acknowledgement
within about a week. There is no bug bounty.

## Scope

Ember has no backend, no account system and no database. Everything it stores is
in the visitor's own browser. That rules out most of the usual categories, and
makes the realistic surface fairly narrow:

- Cross-site scripting, including via the task name a user types, which is
  rendered in the timer and the session log.
- Anything that causes data in `localStorage` to be exfiltrated or corrupted.
- Problems in how the YouTube embed is framed or addressed, including the
  `postMessage` origin check in `components/timer/RadioPlayer.tsx`.
- Dependency vulnerabilities that are actually reachable from the app.

## Not in scope

- Anything about YouTube's own player, advertising or tracking. Ember embeds the
  rights holder's player deliberately and does not control it; see
  [THIRD-PARTY.md](./THIRD-PARTY.md) and [the privacy page](https://ember.kartenlabs.com/privacy).
- Missing security headers with no demonstrated impact.
- Reports produced solely by an automated scanner, with no working scenario.
- Denial of service against the hosting provider.
