import { useTranslations } from 'next-intl';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { projects } from '@/data/projects';
import { routing } from '@/lib/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ProjectsPage() {
  const t = useTranslations('projects');

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wide uppercase">{t('subtitle')}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Explore our latest projects and innovations that showcase our commitment to excellence in technology and education.
          </p>
        </div>

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
    </div>
  );
}

