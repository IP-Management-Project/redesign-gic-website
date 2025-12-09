import { useTranslations } from 'next-intl';
import { TestimonialCard } from '@/components/sections/TestimonialCard';
import { testimonials } from '@/data/testimonials';
import { PaginationDots } from '@/components/ui/PaginationDots';
import { routing } from '@/lib/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function AlumniMessagesPage() {
  const t = useTranslations('alumniMessages');

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          {t('title')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <PaginationDots total={5} current={0} />
      </div>
    </div>
  );
}

