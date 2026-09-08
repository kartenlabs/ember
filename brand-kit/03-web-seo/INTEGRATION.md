# Web and SEO integration

These are **deployment-ready assets and metadata examples**, not a change already installed in the app. Product URL supplied by the owner: https://ember.kartenlabs.com. The live deployment and its SEO output were not audited as part of producing this kit.

## Files to deploy

1. Copy `images/ember-og-1200x630.png` to the site's public `/brand/ember-og-1200x630.png`. Use the PNG in social metadata. The WebP is a smaller alternative for a rendered web page, not a required duplicate social tag.
2. Use `favicons/favicon.ico`, `icon.svg`, or the 32/48 px PNGs for browser icons. Use `ember-icon-180.png` as an Apple touch icon. The 192 and 512 exports are available for a web app manifest if the application implements one.
3. Copy the canonical URL, title, description, and Open Graph values from `metadata.json` into the site's metadata implementation. The intended image URL must resolve publicly before testing a share preview.
4. Add the large-image social card type. Confirm the particular platform's @kartenlabs account before adding a site/creator handle. No individual author handle is assumed.
5. Apply `structured-data.json` only where the visible page supports those statements. It intentionally has no prices, ratings, review counts, user counts, or endorsements. It describes the app; it is not a claim of eligibility for Google's software-app rich results.

The existing application uses the Next.js App Router. Follow the metadata guidance bundled with the installed Next.js version when integrating. Do not deploy the complete brand-kit source folder as application static assets: publish only the chosen images and metadata.

## Suggested on-page copy

H1: **A quiet pomodoro timer.**

Supporting line: **Adjust your focus and breaks. Choose a chime. Settle into a session with an optional ambient soundtrack.**

Current station line: **Currently featuring Claude FM — music for thinking and building — by Claude, embedded via YouTube.**

Short product image alt: **Ember timer in Night theme, with a 25-minute focus block and controls to start, reset, or skip.**

If using a log capture, append: **Sample session data shown.** If using a screenshot containing the media area, describe that external media is omitted in the capture.

## Verification after deployment

Check page-source metadata, absolute image URLs, HTTP status, image dimensions, favicon links, and mobile rendering. Inspect previews using the platform's current sharing tools. Confirm the production URL is canonical and not a localhost or staging address. Existing previews may be cached.

Only add pages to a sitemap that are meant to be publicly indexed. Browser-local logs do not represent public user profiles or public data. Do not expose session history in structured data.

For structured data, use Google's [Rich Results Test](https://search.google.com/test/rich-results) and [software-app guidance](https://developers.google.com/search/docs/appearance/structured-data/software-app). No search ranking or concentration benefit is promised by this kit.
