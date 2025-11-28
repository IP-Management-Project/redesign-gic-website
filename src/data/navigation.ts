import { NavItem } from '@/types/navigation';

export const navigationItems: NavItem[] = [
  { label: 'nav.home', href: '/' },
  { label: 'nav.about', href: '/about' },
  {
    label: 'nav.program',
    href: '/program',
    children: []
  },
  { label: 'nav.research', href: '/research' },
  { label: 'nav.calendar', href: '/calendar' },
  { label: 'nav.project', href: '/projects' },
  { label: 'nav.facultyStaff', href: '/faculty-staff' }
];

