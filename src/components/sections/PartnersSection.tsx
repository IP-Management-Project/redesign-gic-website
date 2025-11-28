import { useTranslations } from 'next-intl';
import { PartnerCarousel } from './PartnerCarousel';
import { universityPartners } from '@/data/partners';

export function PartnersSection() {
  const t = useTranslations('partners');

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          {t('title')}
        </h2>

        <PartnerCarousel partners={universityPartners} />
      </div>
    </section>
  );
}

