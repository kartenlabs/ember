import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Instrument_Sans, Silkscreen } from 'next/font/google';
import { EmberProvider } from './providers';
import { AppShell } from '@/components/app/AppShell';
import { getStation } from '@/lib/station';
import { SITE } from '@/lib/site';
import './globals.css';

/* next/font downloads these at build time and serves them from our own origin,
   so no request reaches Google from the browser and there is no layout shift.
   All three are open-licensed (OFL); see THIRD-PARTY.md.

   Silkscreen is a substitution — the brief asked for Vercel's pixel typeface,
   which is not licensed for redistribution. Swapping in a licensed face means
   changing --font-pixel in globals.css and nothing else. */
const pixel = Silkscreen({
  weight: ['400', '700'], subsets: ['latin'], display: 'swap', variable: '--font-pixel-src',
});
const mono = IBM_Plex_Mono({
  weight: ['400', '500', '600'], subsets: ['latin'], display: 'swap', variable: '--font-mono-src',
});
const sans = Instrument_Sans({
  weight: ['400', '500', '600'], subsets: ['latin'], display: 'swap', variable: '--font-sans-src',
});

/* Icons are not declared here on purpose: app/favicon.ico, app/icon.svg and
   app/apple-icon.png are picked up by Next's file conventions, which emit the
   link tags themselves. Declaring them twice is how you get duplicates. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s — ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: 'Ember — a quiet timer with an ambient soundtrack',
    description:
      'Adjust your focus and breaks. Choose a chime. Settle into a session with optional ambient music. A project by kartenlabs.',
    url: SITE.url,
    images: [{
      url: '/brand/ember-og-1200x630.png',
      width: 1200,
      height: 630,
      alt: 'Ember by kartenlabs. Make room for one thing. A quiet pomodoro timer displaying 25:00.',
    }],
  },
  twitter: { card: 'summary_large_image', site: '@kartenlabs' },
};

/* Both themes declared, so the browser chrome matches whichever one is on
   rather than always claiming night. */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#100E0C' },
    { media: '(prefers-color-scheme: light)', color: '#F6F1E7' },
  ],
};

/* Theme before paint. Reading this in an effect instead would show one frame
   of night to everyone who chose Daylight. Kept deliberately tiny and total:
   any failure leaves the default night theme, which is correct. */
const NO_FLASH = `
try{var s=JSON.parse(localStorage.getItem('ember.settings')||'{}');
if(s.theme==='light')document.documentElement.dataset.theme='light';}catch(e){}
`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Resolved once on the server and cached for a day: this is a credit line,
  // not live data. Falls back to known values when the fetch fails.
  const station = await getStation();

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${pixel.variable} ${mono.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
      </head>
      <body style={{ minHeight: '100dvh' }}>
        <EmberProvider station={station}>
          <AppShell>{children}</AppShell>
        </EmberProvider>
      </body>
    </html>
  );
}
