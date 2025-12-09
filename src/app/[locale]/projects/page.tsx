import { useTranslations } from 'next-intl';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/Button';
import { routing } from '@/lib/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function ProjectsPage() {
  const t = useTranslations('projects');

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <p className="text-sm text-gray-600 mb-2">{t('subtitle')}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('title')}
            </h1>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="primary">{t('viewWorks')}</Button>
          </div>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              layout={index === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

