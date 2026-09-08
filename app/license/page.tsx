import { InfoPage, InfoSection } from '@/components/app/InfoPage';
import { SITE, REPO } from '@/lib/site';

export const metadata = {
  title: 'Licence and credits',
  description:
    'Ember is open source under the MIT licence. Credits for the typefaces, icons, software and the embedded ambient station.',
  alternates: { canonical: '/license' },
};

const MIT = `MIT License

Copyright (c) 2026 kartenlabs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

export default function Page() {
  return (
    <InfoPage overline="Licence" title="Licence and credits.">
      <p>
        Ember is open source. The application code is released under the MIT licence,
        which means you may use, modify and redistribute it, including commercially, so
        long as the copyright notice travels with it.
      </p>

      <InfoSection title="Ember">
        <pre>{MIT}</pre>
      </InfoSection>

      <InfoSection title="Typefaces">
        <p>
          All three are open-licensed under the SIL Open Font License 1.1 and are
          self-hosted at build time. No font binary is committed to the repository.
        </p>
        <ul>
          <li><strong>Silkscreen</strong> — the wordmark, countdown and overlines. © Jason Kottke.</li>
          <li><strong>IBM Plex Mono</strong> — numbers, metadata, labels and credits. © IBM Corp.</li>
          <li><strong>Instrument Sans</strong> — the sentences you are reading. © Instrument.</li>
        </ul>
        <p>
          The original brief asked for Vercel&rsquo;s pixel typeface. It is not publicly
          licensed for redistribution, so it is not used and no copy of it exists in
          this repository. Silkscreen stands in its place.
        </p>
      </InfoSection>

      <InfoSection title="Icons">
        <p>
          <a href="https://pixelarticons.com" target="_blank" rel="noreferrer">Pixelarticons</a>{' '}
          by Gerrit Halfmann, MIT licensed, © 2019. The licence requires its copyright
          notice to travel with the files, so the full text ships beside them in the
          repository and stays there.
        </p>
      </InfoSection>

      <InfoSection title="Chimes">
        <p>
          The five end-of-session chimes are Ember&rsquo;s own. They are not samples and not
          files: each is synthesised at play time from oscillators and gain envelopes.
          Nothing is downloaded and nothing is bundled.
        </p>
      </InfoSection>

      <InfoSection title="The ambient station">
        <p>
          The station is a YouTube embed and nothing else. Ember does not host, copy,
          cache, proxy, download or re-encode any of that audio. Playback happens inside
          YouTube&rsquo;s own player, served by YouTube, subject to YouTube&rsquo;s terms.
        </p>
        <p>
          The station currently featured is Claude FM, published by Claude. Claude and
          Anthropic are trademarks of Anthropic PBC. They appear here only as the factual
          attribution of the embedded video. Ember is an independent {SITE.company}{' '}
          project and is not affiliated with, sponsored by, or endorsed by Anthropic, and
          does not use those marks as its own branding.
        </p>
      </InfoSection>

      <InfoSection title="Software">
        <p>
          Next.js, React and the build toolchain are MIT licensed. Run <code>npm ls</code>{' '}
          in the repository for the resolved tree.
        </p>
      </InfoSection>

      <InfoSection title="The full notices">
        <p>
          This page is a summary. The complete third-party notices, including the reasons
          certain choices are load-bearing, live in{' '}
          <a href={REPO.thirdParty} target="_blank" rel="noreferrer">THIRD-PARTY.md</a>, and
          the licence itself in{' '}
          <a href={REPO.license} target="_blank" rel="noreferrer">LICENSE</a>.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
