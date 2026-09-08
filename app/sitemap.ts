import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/* Public content only. /log and /settings are views onto data that lives in
   one person's browser — there is nothing there for a crawler to index, and
   the brand kit's integration notes are explicit that a browser-local log is
   not public data. */
const ROUTES = ['/', '/about', '/privacy', '/license'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE.url}${path === '/' ? '' : path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'monthly' : 'yearly',
    priority: path === '/' ? 1 : 0.5,
  }));
}
