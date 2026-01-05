import { routing } from '@/lib/i18n/routing';
import { serviceItems } from '@/data/about/serviceItems';
import Link from 'next/link';

export function generateStaticParams() {
  const locales = routing.locales;
  const slugs = serviceItems.map((s) => s.slug);
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = serviceItems.find((item) => item.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">Service not found</h1>
          <Link href={`/${locale}/about/our-service`} className="text-blue-600 font-semibold hover:text-blue-700">
            Back to services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="mb-10">
          <Link href={`/${locale}/about/our-service`} className="text-blue-600 font-semibold hover:text-blue-700">
            ← Back to services
          </Link>
        </div>

        <div className="mb-8">
          <div className="inline-flex p-3 bg-blue-50 rounded-lg mb-4">
            <service.icon className="w-7 h-7 text-blue-700" strokeWidth={1.6} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{service.title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">{service.content}</p>
        </div>

        {service.detail && (
          <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed mb-8">
            {service.detail.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        )}

        {service.bullets && service.bullets.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Details</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {service.bullets.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
