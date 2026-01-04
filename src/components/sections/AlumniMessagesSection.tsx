'use client';
import { useTranslations } from 'next-intl';
import { TestimonialCard } from './TestimonialCard';
import { testimonials } from '@/data/testimonials';
import { PaginationDots } from '@/components/ui/PaginationDots';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AlumniMessagesSection() {
  const t = useTranslations('alumniMessages');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear from our amazing alumni and current students about their experiences at GIC
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-blue-600 hover:text-white transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Single Featured Testimonial */}
          <div className="overflow-hidden py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <TestimonialCard testimonial={testimonials[current]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center gap-6">
          <PaginationDots 
            total={testimonials.length} 
            current={current}
            onSelect={setCurrent}
          />
          <span className="text-sm text-gray-500">
            {current + 1} / {testimonials.length}
          </span>
        </div>
      </div>
    </section>
  );
}

