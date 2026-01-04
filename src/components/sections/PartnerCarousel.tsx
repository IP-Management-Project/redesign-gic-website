'use client';

import Image from 'next/image';
import { Partner } from '@/types/content';
import { motion } from 'framer-motion';

interface PartnerCarouselProps {
  partners: Partner[];
}

export function PartnerCarousel({
  partners
}: PartnerCarouselProps) {
  // Duplicate partners for infinite scroll effect
  const extendedPartners = [...partners, ...partners];

  return (
    <div className="w-full">
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-12 lg:gap-16 justify-start items-center"
          initial={{ x: 0 }}
          animate={{ x: -1500 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop'
          }}
        >
          {extendedPartners.map((partner, index) => (
            <motion.div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 relative w-32 h-32 lg:w-40 lg:h-40 group hover:scale-110 duration-300"
              whileHover={{ scale: 1.2 }}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer Info */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-600 text-sm">
          Partnering with {partners.length}+ leading universities worldwide
        </p>
      </motion.div>
    </div>
  );
}

