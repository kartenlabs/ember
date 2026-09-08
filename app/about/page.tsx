import { InfoPage, InfoSection } from '@/components/app/InfoPage';
import { SITE, REPO } from '@/lib/site';

export const metadata = {
  title: 'About',
  description: SITE.description,
  alternates: { canonical: '/about' },
};

export default function Page() {
  return (
    <InfoPage overline="About" title="A quiet pomodoro timer.">
      <p>
        Ember is a calm browser-based pomodoro timer from {SITE.company}. A warm pixel
        interface keeps the countdown, the work and break rhythm, and the playback
        controls close at hand. Focus, short-break and long-break lengths are
        adjustable, and five completion chimes can be previewed before you pick one.
        There is no account, and nothing to sign up for.
      </p>

      <InfoSection title="How it works">
        <ul>
          <li>Set a focus length, a short break and a long break. The defaults are 25, 5 and 15 minutes.</li>
          <li>The countdown runs. At zero, the chime you chose plays and the session is logged.</li>
          <li>The five chimes are synthesised at play time from oscillators. No audio file is bundled or downloaded.</li>
          <li>Two themes, Night and Daylight. Fullscreen sessions and keyboard controls for start, reset, skip and fullscreen.</li>
          <li>An optional ambient station sits beside the timer. It only loads if you press play.</li>
        </ul>
      </InfoSection>

      <InfoSection title="Open source">
        <p>
          Ember is open source under the MIT licence, and contributions are welcome —
          bug reports, fixes, and ideas alike. The code, the design tokens and the
          brand kit all live in one repository.
        </p>
        <p>
          Start with the{' '}
          <a href={REPO.contributing} target="_blank" rel="noreferrer">contributing guide</a>,
          browse{' '}
          <a href={REPO.issues} target="_blank" rel="noreferrer">open issues</a>, or{' '}
          <a href={REPO.newIssue} target="_blank" rel="noreferrer">open a new one</a>.
          If something is broken or unclear, saying so is a contribution.
        </p>
      </InfoSection>

      <InfoSection title="The station">
        <p>
          The ambient station currently features Claude FM, published by Claude and
          embedded through YouTube. Ember does not host, copy or redistribute that
          audio; playback happens inside YouTube&rsquo;s own player, on YouTube&rsquo;s terms.
        </p>
        <p>
          Ember is an independent {SITE.company} project. It is not affiliated with,
          sponsored by, or endorsed by Anthropic. Claude and Anthropic are trademarks
          of Anthropic PBC, and appear here only as the honest credit for the
          embedded video.
        </p>
      </InfoSection>

      <InfoSection title="Who made it">
        <p>
          A project by <a href={SITE.companyUrl} target="_blank" rel="noreferrer">{SITE.company}</a>.
          See the <a href="/license">licence and credits</a> for the typefaces, icons
          and software Ember is built on, and the{' '}
          <a href="/privacy">privacy page</a> for exactly what it stores.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
