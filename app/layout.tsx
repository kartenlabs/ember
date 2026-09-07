import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Instrument_Sans, Silkscreen } from 'next/font/google';
import { EmberProvider } from './providers';
import { AppShell } from '@/components/app/AppShell';
import { getStation } from '@/lib/station';
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

export const metadata: Metadata = {
  title: 'ember — a quiet timer',
  description: 'A pomodoro timer with a chime at the end and an ambient radio strip underneath.',
};

export const viewport: Viewport = {
  themeColor: '#100E0C',
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
