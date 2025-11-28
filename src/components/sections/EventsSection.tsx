import { useTranslations } from 'next-intl';
import { EventCard } from './EventCard';
import { events } from '@/data/events';
import { Link } from '@/lib/i18n/routing';

export function EventsSection() {
  const t = useTranslations('events');

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="space-y-8 mb-8">
          {events.slice(0, 2).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/events"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {t('viewAll')} →
          </Link>
        </div>
      </div>
    </section>
  );
}

