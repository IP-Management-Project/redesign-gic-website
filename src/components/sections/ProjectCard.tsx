import Image from 'next/image';
import { Project } from '@/types/content';

interface ProjectCardProps {
  project: Project;
  layout?: 'left' | 'right';
}

export function ProjectCard({ project, layout = 'left' }: ProjectCardProps) {
  const isLeftLayout = layout === 'left';

  return (
    <div
      className={`flex flex-col ${
        isLeftLayout ? 'md:flex-row' : 'md:flex-row-reverse'
      } gap-6 items-center`}
    >
      {/* Image */}
      <div className="flex-1">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {project.title}
        </h3>
        <p className="text-gray-700 leading-relaxed">{project.description}</p>
      </div>
    </div>
  );
}

