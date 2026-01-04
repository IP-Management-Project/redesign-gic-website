'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { InternshipPartner } from '@/types/content';
import { motion, AnimatePresence } from 'framer-motion';

interface InternshipPartnersProps {
  partners: InternshipPartner[];
}

export function InternshipPartners({
  partners
}: InternshipPartnersProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partners.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, [partners.length]);

  const getPartnerIndex = (offset: number) => {
    return (currentIndex + offset) % partners.length;
  };

  const displayPartners = [
    partners[getPartnerIndex(0)],
    partners[getPartnerIndex(1)],
    partners[getPartnerIndex(2)]
  ];

  return (
    <div className="w-full">
      {/* Featured Carousel */}
      <div className="flex items-center justify-center gap-8 lg:gap-16">
        {/* Left Partner - Small */}
        <motion.div
          key={`left-${displayPartners[0].id}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 0.6 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block flex-shrink-0 relative w-40 h-40"
        >
          <Image
            src={displayPartners[0].logo}
            alt={displayPartners[0].name}
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Center Partner - Large Featured */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`center-${displayPartners[1].id}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 relative w-80 h-80 lg:w-96 lg:h-96 group hover:scale-105 duration-300"
          >
            <Image
              src={displayPartners[1].logo}
              alt={displayPartners[1].name}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </motion.div>
        </AnimatePresence>

        {/* Right Partner - Small */}
        <motion.div
          key={`right-${displayPartners[2].id}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 0.6 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block flex-shrink-0 relative w-40 h-40"
        >
          <Image
            src={displayPartners[2].logo}
            alt={displayPartners[2].name}
            fill
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-12 flex items-center justify-center gap-2">
        {partners.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            animate={{
              scale: index === currentIndex ? 1 : 0.6,
              opacity: index === currentIndex ? 1 : 0.4
            }}
            transition={{ duration: 0.3 }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to partner ${index + 1}`}
          />
        ))}
      </div>

      {/* Info Text */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          {currentIndex + 1} of {partners.length} internship partners
        </p>
      </div>
    </div>
  );
}

