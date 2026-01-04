'use client';
import { useTranslations } from 'next-intl';
import { PartnerCarousel } from './PartnerCarousel';
import { universityPartners } from '@/data/partners';
import { motion } from 'framer-motion';

export function PartnersSection() {
  const t = useTranslations('partners');

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('description')}
          </p>
        </motion.div>

        <PartnerCarousel partners={universityPartners} />
      </div>
    </section>
  );
}

