import { routing } from '@/lib/i18n/routing';
import { WhoWeAreContent } from './content';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function WhoWeArePage() {
  return <WhoWeAreContent />;
}
