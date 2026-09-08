import { InfoPage, InfoSection } from '@/components/app/InfoPage';
import { REPO, POLICY_UPDATED } from '@/lib/site';

export const metadata = {
  title: 'Privacy',
  description:
    'What Ember stores and what it does not. No account, no server, no analytics, no cookies. Everything you set or log stays in your browser.',
  alternates: { canonical: '/privacy' },
};

export default function Page() {
  return (
    <InfoPage overline="Privacy" title="What Ember stores, and what it doesn't." updated={POLICY_UPDATED}>
      <p>
        Ember has no account system, no server of its own, and no database. Everything
        you set and everything you log is written to your own browser and stays there.
        There is nothing for us to read, because none of it is ever sent anywhere.
      </p>

      <InfoSection title="What is stored on your device">
        <p>
          Ember writes three keys to <code>localStorage</code> on the site&rsquo;s own origin:
        </p>
        <ul>
          <li>
            <code>ember.settings</code> — your focus, short-break and long-break lengths,
            sets per cycle, volume, auto-start choices, chosen chime, theme, and the task
            name you type.
          </li>
          <li>
            <code>ember.sessions</code> — your session log: for each completed block, a
            local id, the time it started, the mode, its length in minutes, and the task
            name.
          </li>
          <li>
            <code>ember.timer</code> — a recovery snapshot of the running timer, so a
            reload or a closed tab does not lose the block you are in.
          </li>
        </ul>
        <p>
          The task name is free text that you write. It is stored exactly as typed and it
          never leaves your browser, so treat it as a private note to yourself. To erase
          all of it, clear site data for this site in your browser settings.
        </p>
      </InfoSection>

      <InfoSection title="What Ember does not do">
        <ul>
          <li>No analytics of any kind. No Google Analytics, no Vercel Analytics, no Plausible, no Sentry, no product telemetry.</li>
          <li>No cookies. Ember sets none, for any purpose.</li>
          <li>No advertising, no tracking pixels, no fingerprinting, no third-party scripts.</li>
          <li>No account, no email collection, no newsletter, no sync between devices.</li>
          <li>
            No font requests to Google. The three typefaces are downloaded at build time
            and served from this site&rsquo;s own origin, so your browser never contacts a
            font CDN.
          </li>
        </ul>
      </InfoSection>

      <InfoSection title="The one third party: YouTube">
        <p>
          The ambient station is a YouTube embed. Ember does not host or proxy the audio.
          The player is not loaded when the page opens — it is only inserted after you
          press play on the station, or open a fullscreen session, which is a deliberate
          choice so that visiting Ember does not contact Google at all.
        </p>
        <p>
          Once you do start it, your browser connects to{' '}
          <code>youtube-nocookie.com</code> and YouTube receives what any site receives
          when you load a video: your IP address, your user agent, and the video you
          requested. That mode limits personalisation cookies, but playback still runs on
          YouTube&rsquo;s own player with its advertising and analytics intact, under{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            Google&rsquo;s privacy policy
          </a>{' '}
          and{' '}
          <a href="https://www.youtube.com/t/terms" target="_blank" rel="noreferrer">
            YouTube&rsquo;s terms
          </a>. If you never press play, none of that happens.
        </p>
        <p>
          The station&rsquo;s title and channel credit shown beside the player is fetched once
          a day by the site itself, not by your browser, and carries nothing about you.
        </p>
      </InfoSection>

      <InfoSection title="Notifications">
        <p>
          If you allow them, Ember shows a system notification when a block ends. It is
          created locally by your browser and asks your permission first. There is no push
          service and no server involved, and nothing is transmitted to produce it.
        </p>
      </InfoSection>

      <InfoSection title="Hosting">
        <p>
          The site is delivered by a hosting provider, which — like any web host — may keep
          standard request logs such as IP address, user agent and requested URL for
          delivery and abuse prevention. Ember adds no logging of its own on top of that.
        </p>
      </InfoSection>

      <InfoSection title="Changes and questions">
        <p>
          If this policy changes materially, the date at the top of the page changes with
          it. The page itself is version-controlled, so the full history is public. For
          questions, please{' '}
          <a href={REPO.newIssue} target="_blank" rel="noreferrer">open an issue</a> on the
          repository.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
