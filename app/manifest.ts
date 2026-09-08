import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.title,
    short_name: SITE.name,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#100E0C',
    theme_color: '#100E0C',
    icons: [
      { src: '/brand/ember-icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/ember-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
