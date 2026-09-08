import { TimerScreen } from '@/components/app/TimerScreen';
import { SITE } from '@/lib/site';

/* From brand-kit/03-web-seo/structured-data.json. Deliberately free of prices,
   ratings, review counts and user numbers: the kit's rule is that structured
   data may only assert what the visible page actually supports. */
const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web browser',
  isAccessibleForFree: true,
  publisher: { '@type': 'Organization', name: SITE.company, url: SITE.companyUrl },
  featureList: [
    'Adjustable focus, short break and long break lengths',
    'Five synthesized completion chimes',
    'Night and Daylight themes',
    'Optional ambient station embedded from YouTube',
    'Session log stored in browser local storage',
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <TimerScreen />
    </>
  );
}
