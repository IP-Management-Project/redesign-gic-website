import { routing } from '@/lib/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function CalendarPage() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Calendar
        </h1>
        <div className="max-w-4xl">
          <p className="text-lg text-gray-700 leading-relaxed">
            Content for Calendar page will be added here.
          </p>
        </div>
      </div>
    </div>
  );
}

