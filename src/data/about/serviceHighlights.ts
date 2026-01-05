import type { LucideIcon } from 'lucide-react';
import { HeartHandshake, Wrench, Beaker, Cpu } from 'lucide-react';

export type ServiceHighlight = {
  title: string;
  content: string;
  icon: LucideIcon;
};

export const serviceHighlights: ServiceHighlight[] = [
  {
    title: 'Social Contribution',
    content:
      'We partner on projects that contribute to national development and community impact.',
    icon: HeartHandshake,
  },
  {
    title: 'Development Skill',
    content:
      'We blend solid methodology, problem-solving experience, and clean code to deliver maintainable solutions.',
    icon: Wrench,
  },
  {
    title: 'Research Capability',
    content:
      'Strong research background with local and international collaborators across multiple domains.',
    icon: Beaker,
  },
  {
    title: 'Powerful Computing Unit',
    content: 'Advanced computing resources to support demanding research and engineering workloads.',
    icon: Cpu,
  },
];
