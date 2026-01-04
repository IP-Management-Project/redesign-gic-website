import Image from 'next/image';
import { Project } from '@/types/content';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';

interface ProjectCardProps {
  project: Project;
  layout?: 'left' | 'right';
}

export function ProjectCard({ project, layout = 'left' }: ProjectCardProps) {
  const isLeftLayout = layout === 'left';
  const projectLink = project.slug ? `/projects/${project.slug}` : '#';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <div
        className={`flex flex-col ${
          isLeftLayout ? 'lg:flex-row' : 'lg:flex-row-reverse'
        } gap-8 lg:gap-12 items-center bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300`}
      >
        {/* Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {project.description}
          </p>

          <Link href={projectLink}>
            <button className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-4 transition-all duration-300">
              Learn more
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

