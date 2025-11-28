import { useTranslations } from 'next-intl';
import { TestimonialCard } from './TestimonialCard';
import { testimonials } from '@/data/testimonials';
import { PaginationDots } from '@/components/ui/PaginationDots';

export function AlumniMessagesSection() {
  const t = useTranslations('alumniMessages');

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {testimonials.slice(0, 4).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <PaginationDots total={5} current={0} />
      </div>
    </section>
  );
}

