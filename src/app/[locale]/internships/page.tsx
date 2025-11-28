import { useTranslations } from 'next-intl';
import { InternshipPartners } from '@/components/sections/InternshipPartners';
import { internshipPartners } from '@/data/internships';

export default function InternshipsPage() {
  const t = useTranslations('internships');

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          {t('title')}
        </h1>

        <InternshipPartners partners={internshipPartners} />
      </div>
    </div>
  );
}

