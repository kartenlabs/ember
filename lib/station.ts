/* Who the ambient station actually belongs to.
 *
 * Ember hosts no music. The strip is a YouTube embed and nothing else, so the
 * honest thing to print over it is the video's own title and channel rather
 * than a station name we invented. YouTube's oEmbed endpoint hands both over
 * without a key.
 *
 * Server-side only, and cached for a day — this is a credit line, not live
 * data. The known values are hardcoded as the fallback so a failed fetch, an
 * offline build or a rate limit still ships a correct credit.
 */

export const STATION_VIDEO_ID = 'tRsQsTMvPNg';

export interface Station {
  videoId: string;
  title: string;
  author: string;
  url: string;
}

const FALLBACK: Station = {
  videoId: STATION_VIDEO_ID,
  title: 'Claude FM — music for thinking and building',
  author: 'Claude',
  url: `https://www.youtube.com/watch?v=${STATION_VIDEO_ID}`,
};

/** Strip emoji out of a title. The product never shows emoji, including
 *  borrowed ones, and the pixel type has no glyphs for them anyway. */
function clean(title: string): string {
  return title
    .replace(/[\p{Extended_Pictographic}️]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export async function getStation(videoId: string = STATION_VIDEO_ID): Promise<Station> {
  const watch = `https://www.youtube.com/watch?v=${videoId}`;
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(watch)}&format=json`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as { title?: string; author_name?: string };
    return {
      videoId,
      title: clean(data.title ?? FALLBACK.title),
      author: data.author_name ?? FALLBACK.author,
      url: watch,
    };
  } catch {
    return videoId === STATION_VIDEO_ID ? FALLBACK : { ...FALLBACK, videoId, url: watch };
  }
}
