import { NavItem } from '@/types/navigation';

export const navigationItems: NavItem[] = [
  { label: 'nav.home', href: '/' },
  { 
    label: 'nav.about', 
    href: '/about',
    children: [
      { label: 'nav.aboutSub.whoWeAre', href: '/about/who-we-are' },
      { label: 'nav.aboutSub.ourMissions', href: '/about/our-missions' },
      { label: 'nav.aboutSub.ourVisions', href: '/about/our-visions' },
      { label: 'nav.aboutSub.ourService', href: '/about/our-service' }
    ]
  },
  {
    label: 'nav.program',
    href: '/program',
    children: [
      { label: 'nav.programSub.assosiate', href: '/program/associate' },
      { label: 'nav.programSub.engineer', href: '/program/engineer' },
      { label: 'nav.programSub.master', href: '/program/master' },
      { label: 'nav.programSub.doctor', href: '/program/doctor' }
    ]
  },
  { 
    label: 'nav.research', 
    href: '/research',
    children: [
      { label: 'nav.researchSub.laboratory', href: '/research/laboratory' },
      { label: 'nav.researchSub.publications', href: '/research/publications' },
      { label: 'nav.researchSub.softwareTools', href: '/research/software-tools' }
    ]
  },
  { 
    label: 'nav.calendar', 
    href: '/calendar',
    children: [
      { label: 'nav.calendarSub.academicCalendar', href: '/calendar/academic-calendar' },
      { label: 'nav.calendarSub.seminarEvent', href: '/calendar/seminar-event' },
      { label: 'nav.calendarSub.timetable', href: '/calendar/timetable' }
    ]
  },
  { 
    label: 'nav.project', 
    href: '/projects',
    children: [
      { label: 'nav.projectSub.incubationCenter', href: '/projects/incubation-center' },
      { label: 'nav.projectSub.erasmusAlien', href: '/projects/erasmus-alien' },
      { label: 'nav.projectSub.erasmusMontus', href: '/projects/erasmus-montus' },
      { label: 'nav.projectSub.erasmusHitihe', href: '/projects/erasmus-hitihe' },
      { label: 'nav.projectSub.others', href: '/projects/others' }
    ]
  },
  { 
    label: 'nav.facultyStaff', 
    href: '/faculty-staff',
    children: [
      { label: 'nav.facultyStaffSub.staff', href: '/faculty-staff/staff' },
      { label: 'nav.facultyStaffSub.staffMobility', href: '/faculty-staff/staff-mobility' },
      { label: 'nav.facultyStaffSub.guestLecturer', href: '/faculty-staff/guest-lecturer' }
    ]
  }
];

