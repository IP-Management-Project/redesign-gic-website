import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { PaginationDots } from '@/components/ui/PaginationDots';

export function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/huawei-competition.jpg"
          alt="Hero banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            {t('description')}
          </p>
        </div>

        {/* Pagination Dots */}
        <div className="mt-8">
          <PaginationDots total={3} current={0} />
        </div>
      </div>
    </section>
  );
}

