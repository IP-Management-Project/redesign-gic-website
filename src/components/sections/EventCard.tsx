import Image from 'next/image';
import { Event } from '@/types/content';
import { formatDate } from '@/utils/format';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';

interface EventCardProps {
  event: Event;
  layout?: 'left' | 'right';
}

export function EventCard({ event, layout = 'left' }: EventCardProps) {
  const locale = useLocale();
  const isLeftLayout = layout === 'left';
  const eventDate = new Date(event.date);
  const day = eventDate.getDate().toString().padStart(2, '0');
  const month = eventDate.toLocaleString(locale, { month: 'short' }).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div
        className={`flex flex-col ${
          isLeftLayout ? 'lg:flex-row' : 'lg:flex-row-reverse'
        } gap-4 lg:gap-6 items-stretch`}
      >
        {/* Date Sidebar */}
        <div className="lg:w-40 flex-shrink-0 flex lg:flex-col justify-start items-start lg:justify-start lg:items-start pt-2">
          <div className="text-4xl lg:text-5xl font-bold text-blue-600 leading-none">
            {day}
          </div>
          <p className="text-xs lg:text-sm font-semibold text-gray-600 ml-2 lg:ml-0 lg:mt-1">
            {month}
          </p>
          <p className="text-xs lg:text-sm font-semibold text-gray-600 ml-2 lg:ml-0">
            {eventDate.getFullYear()}
          </p>
        </div>

        {/* Image & Content */}
        <div className="flex-1 flex flex-col md:flex-row gap-4 lg:gap-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-3">
          {/* Image */}
          <div className="w-full md:w-40 lg:w-48 relative flex-shrink-0">
            <div className="relative aspect-[4/3] md:aspect-square bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden rounded-lg">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 lg:p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-2">
                {event.description}
              </p>
              {event.descriptionKm && (
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  {event.descriptionKm}
                </p>
              )}
            </div>

            <Link href={`/events/${event.id}`}>
              <button className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-300 mt-3">
                See more
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

