import type { LucideIcon } from 'lucide-react';
import { Eye, Users, BookOpen, Beaker } from 'lucide-react';

export type Vision = {
  title: string;
  content: string;
  icon: LucideIcon;
};

export const visions: Vision[] = [
  {
    title: 'Human Resource Development',
    content: 'Actively participate in human resource development in ICT.',
    icon: Users,
  },
  {
    title: 'Related Domains',
    content: 'Contribute in the development of related domains.',
    icon: BookOpen,
  },
  {
    title: 'Higher Education',
    content: 'Contribute in the development of higher education of the country.',
    icon: Eye,
  },
  {
    title: 'Research Excellence',
    content: 'Conduct fruitful research that meet the needs of the country.',
    icon: Beaker,
  },
];
