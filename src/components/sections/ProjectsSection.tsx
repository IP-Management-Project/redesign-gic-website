'use client';
import { useTranslations } from 'next-intl';
import { ProjectCard } from './ProjectCard';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';
import { motion } from 'framer-motion';

export function ProjectsSection() {
  const t = useTranslations('projects');

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wide uppercase">{t('subtitle')}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t('title')}
            </h2>
          </div>
          <div className="mt-6 md:mt-0">
            <Link href="/projects">
              <Button variant="primary" className="group">
                {t('viewWorks')}
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              layout={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

