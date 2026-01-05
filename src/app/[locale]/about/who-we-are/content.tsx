'use client';

import { motion } from 'framer-motion';
import { whoWeAreSections } from '@/data/about/whoWeAreSections';

export function WhoWeAreContent() {
  return (
    <div className="bg-white min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header Section */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Who We Are?
            </h1>
            <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
          </motion.div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 md:space-y-16">
          {whoWeAreSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
            >
              <div className="border-l-4 border-blue-600 pl-6 md:pl-8 hover:border-blue-700 transition-colors duration-300">
                {/* Section Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <section.icon className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Section Content */}
                <p className="text-base md:text-lg text-gray-700 leading-relaxed md:leading-loose">
                  {section.content}
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
            Building the future of Information and Communication Engineering in Cambodia
          </p>
        </motion.div>
      </div>
    </div>
  );
}
