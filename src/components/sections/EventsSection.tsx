'use client';
import { useTranslations } from 'next-intl';
import { EventCard } from './EventCard';
import { events } from '@/data/events';
import { Link } from '@/lib/i18n/routing';
import { motion } from 'framer-motion';

export function EventsSection() {
  const t = useTranslations('events');

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <div className="space-y-8 mb-10">
          {events.slice(0, 4).map((event, index) => (
            <EventCard 
              key={event.id} 
              event={event}
              layout={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold hover:gap-3 transition-all duration-300"
          >
            {t('viewAll')} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

