import { routing } from '@/lib/i18n/routing';
import { OurServiceContent } from './content';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function OurServicePage() {
  return <OurServiceContent />;
}
