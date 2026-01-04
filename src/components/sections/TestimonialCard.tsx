import Image from 'next/image';
import { Testimonial } from '@/types/content';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
      <div className="grid md:grid-cols-[300px_1fr] gap-8 p-8 md:p-10">
        {/* Large Profile Image */}
        <div className="relative aspect-square md:aspect-auto md:h-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed italic">
              "{testimonial.message}"
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border-t pt-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {testimonial.name}
            </h3>
            <p className="text-gray-600 text-lg">
              {testimonial.affiliation}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

