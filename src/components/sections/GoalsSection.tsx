import { useTranslations } from 'next-intl';

export function GoalsSection() {
  const t = useTranslations('home.goals');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  );
}

