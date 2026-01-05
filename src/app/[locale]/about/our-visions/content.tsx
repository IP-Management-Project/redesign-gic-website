'use client';

import { motion } from 'framer-motion';
import { visions } from '@/data/about/visions';

export function OurVisionsContent() {
  return (
    <div className="bg-white min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header Section */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Visions
            </h1>
            <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
            <p className="text-lg text-gray-600 mt-6">Our vision is to:</p>
          </motion.div>
        </div>

        {/* Vision Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {visions.map((vision, index) => (
            <motion.div
              key={vision.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
            >
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg border border-blue-100 p-6 md:p-8 hover:shadow-lg hover:border-blue-300 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 bg-blue-100 rounded-lg">
                  <vision.icon className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {vision.title}
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  {vision.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Accent */}
        <motion.div
          className="mt-16 md:mt-20 pt-12 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <p className="text-gray-600 text-lg">
            Building a brighter future through technology and innovation
          </p>
        </motion.div>
      </div>
    </div>
  );
}
