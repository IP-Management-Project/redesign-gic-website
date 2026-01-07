'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { erasmusAlienData } from '@/data/erasmus-alien';
import { motion } from 'framer-motion';
import { ChevronRight, FileText } from 'lucide-react';

export function ErasmusAlienContent() {
  const locale = useLocale();
  const { summary, consortiumMeeting, training, documents } = erasmusAlienData;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {erasmusAlienData.title}
            </h1>
            <p className="text-gray-600 text-lg">
              {erasmusAlienData.tagline}
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

        {/* Consortium Meeting Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{consortiumMeeting.title}</h2>
          <div className="space-y-4">
            {consortiumMeeting.meetings.map((meeting, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: false }}
              >
                <Link
                  href={`/${locale}/projects/erasmus-alien/meeting/${meeting.slug}`}
                  className="block border-l-4 border-gray-300 pl-6 py-3 hover:bg-gray-50 transition-colors rounded-r-lg group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {meeting.title}
                      </h3>
                      {meeting.date && <p className="text-sm text-gray-500 mt-1">{meeting.date}</p>}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Training Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{training.title}</h2>
          <div className="space-y-4">
            {training.workshops.map((workshop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: false }}
              >
                <Link
                  href={`/${locale}/projects/erasmus-alien/training/${workshop.slug}`}
                  className="block border-l-4 border-gray-300 pl-6 py-3 hover:bg-gray-50 transition-colors rounded-r-lg group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {workshop.title}
                      </h3>
                      {workshop.date && <p className="text-sm text-gray-500 mt-1">{workshop.date}</p>}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                  </div>
                </Link>
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
                <Link
                  href={`/${locale}/projects/erasmus-alien/document/${file.slug}`}
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
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
