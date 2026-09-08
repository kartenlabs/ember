import Link from 'next/link';
import { InfoPage } from '@/components/app/InfoPage';

export const metadata = { title: 'Not found' };

export default function NotFound() {
  return (
    <InfoPage overline="404" title="That page isn't here.">
      <p>
        The link may be old, or the address slightly off. Nothing is broken on your
        end.
      </p>
      <p>
        <Link href="/">Back to the timer</Link>
      </p>
    </InfoPage>
  );
}
