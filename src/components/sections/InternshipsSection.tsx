import { useTranslations } from 'next-intl';
import { InternshipPartners } from './InternshipPartners';
import { internshipPartners } from '@/data/internships';

export function InternshipsSection() {
  const t = useTranslations('internships');

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          {t('title')}
        </h2>

        <InternshipPartners partners={internshipPartners} />
      </div>
    </section>
  );
}

