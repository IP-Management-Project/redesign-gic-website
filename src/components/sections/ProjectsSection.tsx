import { useTranslations } from 'next-intl';
import { ProjectCard } from './ProjectCard';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/i18n/routing';

export function ProjectsSection() {
  const t = useTranslations('projects');

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <p className="text-sm text-gray-600 mb-2">{t('subtitle')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('title')}
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/projects">
              <Button variant="primary">{t('viewWorks')}</Button>
            </Link>
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
    </section>
  );
}

