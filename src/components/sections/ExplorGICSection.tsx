'use client';
import { useTranslations } from 'next-intl';
import { GraduationCap, BookOpen, Users, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: GraduationCap,
    key: 'futureStudents',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: BookOpen,
    key: 'academicPrograms',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: Users,
    key: 'teachingMethodologies',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: Briefcase,
    key: 'careerOpportunities',
    color: 'bg-orange-100 text-orange-600'
  }
];

export function ExplorGICSection() {
  const t = useTranslations('home.exploreGIC');

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Video Section */}
          <motion.div
            className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-white"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src={t('videoUrl')}
              title="Explore GIC"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>

          {/* Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.key}
                  className="flex gap-4 items-start bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`p-3 rounded-lg ${feature.color} flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {t(`${feature.key}.title`)}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {t(`${feature.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}