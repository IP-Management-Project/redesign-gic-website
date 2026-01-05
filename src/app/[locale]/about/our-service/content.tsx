'use client';

import { motion } from 'framer-motion';
import { serviceHighlights } from '@/data/about/serviceHighlights';
import { serviceItems } from '@/data/about/serviceItems';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export function OurServiceContent() {
  const locale = useLocale();

  return (
    <div className="bg-white min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-14 md:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-3xl">
              An expert team combining skilled programmers, experienced researchers, and students—committed to delivering quality outcomes for every engagement.
            </p>
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-14">
          {serviceHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              className="h-full"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
            >
              <div className="h-full rounded-lg border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-6 md:p-7 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
                <div className="mb-4 inline-flex p-3 bg-blue-100 rounded-lg">
                  <item.icon className="w-6 h-6 text-blue-700" strokeWidth={1.5} />
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-8"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-3">What We Deliver</h3>
            <p className="text-gray-600 max-w-3xl">
              From research collaborations to production-grade systems, we provide focused services that align with your goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceItems.map((service, index) => (
              <motion.div
                key={service.title}
                className="h-full"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '0px 0px -12% 0px' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.06 }}
              >
                <div className="h-full rounded-lg border border-gray-100 bg-white p-5 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-4 inline-flex p-3 bg-blue-50 rounded-lg">
                    <service.icon className="w-6 h-6 text-blue-700" strokeWidth={1.6} />
                  </div>
                  <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h4>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {service.content}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={`/${locale}/about/our-service/${service.slug}`}
                      className="text-blue-600 font-semibold hover:text-blue-700"
                    >
                      See more →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Accent */}
        <motion.div
          className="pt-12 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <p className="text-gray-600 text-lg">
            Ready to collaborate? Let’s build impactful solutions together.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
