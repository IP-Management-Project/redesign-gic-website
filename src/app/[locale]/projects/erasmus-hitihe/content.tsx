'use client';

import { erasmusHitiheData } from '@/data/erasmus-hitihe';
import { motion } from 'framer-motion';
import { ChevronRight, FileText, Calendar, MapPin } from 'lucide-react';

export function ErasmusHitiheContent() {
  const { summary, meetingAndTraining, documents } = erasmusHitiheData;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block mb-4">
              <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                {erasmusHitiheData.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {erasmusHitiheData.title}
            </h1>
            <p className="text-gray-600 text-lg">
              {erasmusHitiheData.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Project Summary Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{summary.title}</h2>
          <div className="space-y-6">
            {summary.content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: false }}
                className="text-gray-700 text-lg leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </section>

        {/* Meeting and Training Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{meetingAndTraining.title}</h2>
          <div className="space-y-4">
            {meetingAndTraining.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: false }}
              >
                <a
                  href={item.documentUrl}
                  className="block border-l-4 border-gray-300 pl-6 py-4 hover:bg-gray-50 transition-colors rounded-r-lg group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1 ml-4" />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Documents Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{documents.title}</h2>
          <div className="space-y-4">
            {documents.files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: false }}
              >
                <a
                  href={file.documentUrl}
                  className="flex border-l-4 border-gray-300 pl-6 py-3 hover:bg-gray-50 transition-colors rounded-r-lg group"
                >
                  <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1 mr-3" />
                  <div className="flex-1 flex items-start justify-between">
                    <div className="text-left">
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {file.title}
                      </h3>
                      {file.date && <p className="text-sm text-gray-500 mt-1">{file.date}</p>}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
