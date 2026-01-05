import type { LucideIcon } from 'lucide-react';
import { Target, Users, Briefcase, Heart } from 'lucide-react';

export type Mission = {
  title: string;
  content: string;
  icon: LucideIcon;
};

export const missions: Mission[] = [
  {
    title: 'Produce Highly Qualified Graduates',
    content:
      'Our main mission is to produce highly qualified graduates from both undergraduate and higher education in computer science. Meanwhile, we also focus on both providing professional ethics and encouraging patriotism.',
    icon: Target,
  },
  {
    title: 'Develop Hard & Soft Skills',
    content:
      'Students gain not only hard skills but also related soft skills such as communication and teamwork, which are very important in working environment. As a result, most of our graduates get their successful careers both in public and private sectors.',
    icon: Users,
  },
  {
    title: 'Diverse Career Paths',
    content:
      'For instance, our alumni are working as IT professionals, researchers, lecturers, entrepreneurs, and consultants. Some of them are running their startups or businesses. Some have become the workforce for the government, academic sectors and research institutions, and others have been working in various private business sectors such as IT software solution, network solution, telecommunication IT infrastructure, Media and broadcasting, finance and banking, business intelligence, security exchange, transportation, etc.',
    icon: Briefcase,
  },
  {
    title: 'Professional Excellence',
    content:
      'We are committed to fostering professional excellence and ethical practices among our students and alumni. Our programs are designed to prepare graduates who not only possess technical expertise but also demonstrate strong values in their professional and personal lives.',
    icon: Heart,
  },
];
