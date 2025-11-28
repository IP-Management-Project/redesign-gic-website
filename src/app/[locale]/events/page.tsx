import { useTranslations } from 'next-intl';
import { EventCard } from '@/components/sections/EventCard';
import { events } from '@/data/events';

export default function EventsPage() {
  const t = useTranslations('events');

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="space-y-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

