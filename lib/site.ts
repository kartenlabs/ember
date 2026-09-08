/* One place for the strings that would otherwise be retyped in the layout,
   the sitemap, the manifest, the footer and every info page. Values come from
   brand-kit/03-web-seo/metadata.json and brand-kit/00-guide/START-HERE.md. */

export const SITE = {
  name: 'Ember',
  title: 'Ember — a quiet pomodoro timer',
  tagline: 'a quiet timer',
  description:
    'Make room for one thing. Ember pairs adjustable focus and break timers with gentle chimes, an optional ambient station, and a session log stored in your browser.',
  url: 'https://ember.kartenlabs.com',
  company: 'kartenlabs',
  companyUrl: 'https://kartenlabs.com',
  repo: 'https://github.com/kartenlabs/ember',
} as const;

export const REPO = {
  root: SITE.repo,
  issues: `${SITE.repo}/issues`,
  newIssue: `${SITE.repo}/issues/new/choose`,
  contributing: `${SITE.repo}/blob/main/CONTRIBUTING.md`,
  license: `${SITE.repo}/blob/main/LICENSE`,
  thirdParty: `${SITE.repo}/blob/main/THIRD-PARTY.md`,
  conduct: `${SITE.repo}/blob/main/CODE_OF_CONDUCT.md`,
  security: `${SITE.repo}/blob/main/SECURITY.md`,
} as const;

/* Shown on the legal pages. Bump when the wording materially changes, not on
   every typo — a date that moves for nothing tells the reader nothing. */
export const POLICY_UPDATED = '8 September 2026';
