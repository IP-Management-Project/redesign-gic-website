import Image from 'next/image';
import { Event } from '@/types/content';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/utils/format';
import { useLocale } from 'next-intl';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const locale = useLocale();

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {event.title}
            </h3>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
              {event.descriptionKm && (
                <p className="text-gray-700 leading-relaxed">
                  {event.descriptionKm}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {formatDate(event.date, locale)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

