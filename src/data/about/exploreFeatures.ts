import type { LucideIcon } from 'lucide-react';
import { GraduationCap, BookOpen, Users, Briefcase } from 'lucide-react';

export type ExploreFeature = {
  icon: LucideIcon;
  key: string;
  color: string;
};

export const exploreFeatures: ExploreFeature[] = [
  {
    icon: GraduationCap,
    key: 'futureStudents',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: BookOpen,
    key: 'academicPrograms',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Users,
    key: 'teachingMethodologies',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Briefcase,
    key: 'careerOpportunities',
    color: 'bg-orange-100 text-orange-600',
  },
];
