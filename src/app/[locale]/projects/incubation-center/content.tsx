'use client';

import Image from 'next/image';
import { incubationCenterData } from '@/data/incubation-center';
import { motion } from 'framer-motion';

export function IncubationCenterContent() {
  const { about, whatWeDo, pastActivities } = incubationCenterData;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className=" text-black py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {incubationCenterData.title}
            </h1>
            <p className="text-black text-lg">
              {incubationCenterData.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* About Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                <Image
                  src={about.image}
                  alt="Incubation Center Building"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="md:col-span-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{about.title}</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {about.description}
              </p>
              
              {/* Key Points */}
              <div className="space-y-4">
                {about.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full  text-black flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">{whatWeDo.title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {whatWeDo.services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                viewport={{ once: false }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
              >
                {/* Service Image */}
                <div className="relative h-40 mb-4 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Service Content */}
                <div>
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Past Activities Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">{pastActivities.title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pastActivities.activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: false }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors flex"
              >
                {/* Activity Image */}
                <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Activity Content */}
                <div className="p-4 flex flex-col justify-center flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{activity.title}</h3>
                  <p className="text-xs text-gray-500 font-medium">{activity.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
