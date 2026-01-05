import type { LucideIcon } from 'lucide-react';
import {
  Beaker,
  ShieldCheck,
  Laptop,
  Database,
  Cpu,
  FlaskRound,
  Fingerprint,
} from 'lucide-react';

export type ServiceItem = {
  slug: string;
  title: string;
  content: string;
  icon: LucideIcon;
  detail?: string[];
  bullets?: string[];
};

export const serviceItems: ServiceItem[] = [
  {
    slug: 'research-project',
    title: 'Research Project',
    content: 'Collaborative research initiatives led by experienced faculty and students.',
    icon: Beaker,
    detail: [
      "We plan, design, and implement concepts and transform them into services and products according to the users' needs.",
      'Our main research thematics include:',
    ],
    bullets: [
      'Data science (big data architecture design, analysis, and virtualization)',
      'Data security (IoT eco-system using technologies such as Blockchain, smart contract...)',
      'Natural Language Processing (text recognition, speech recognition...)',
      'Computer Vision (object detection, scene analysis, visual attention...)',
    ],
  },
  {
    slug: 'it-consultant',
    title: 'IT Consultant',
    content: 'Advisory on systems, infrastructure, and digital transformation.',
    icon: ShieldCheck,
    detail: [
      'We provide expertise for organizations in need of technological solutions, such as database, networks and software platforms.',
      'We can execute and implement IT needs on preferred platforms, set up, configure, and migrate systems and services, and advise on security vulnerabilities, outdated systems, and hardware upgrades.',
    ],
  },
  {
    slug: 'system-design-and-development',
    title: 'System Design & Development',
    content: 'End-to-end solution design, build, and maintenance with robust methodologies.',
    icon: Laptop,
    detail: [
      'System Design and Development involves the integration of ICT into business operation. Common steps include:',
    ],
    bullets: [
      'Gathering domain knowledge',
      'Analyzing the existing system',
      'Analyzing the feasibility of integrating ICT into business operation',
      'Suggesting technology to be used',
      'Designing and implementing the system',
      'Deploying the system',
      'Training users and gathering feedback',
    ],
  },
  {
    slug: 'supply-chain-management-system',
    title: 'Supply Chain Management System',
    content: 'Custom SCM platforms tailored to operational needs and scale.',
    icon: Database,
    detail: [
      'Supply Chain Management System helps operate business logic, services, and administrative operations. We diagnose customer problems or needs along with the ERP application.',
      'ERP (Enterprise Resource Planning) based on Odoo technology; we embed or customize key modules including:',
    ],
    bullets: [
      'Inventory System',
      'CRM (Customer Relationship Management System)',
      'Sale and Purchase Management',
      'Point of Sale and Sale Coupon',
      'Other modules based on customer needs',
    ],
  },
  {
    slug: 'high-performance-computing',
    title: 'High-Performance Computing',
    content: 'Performance-focused compute solutions for intensive workloads.',
    icon: Cpu,
    detail: [
      'We design and deploy high-performance computing solutions tailored to demanding research and engineering workloads.',
    ],
  },
  {
    slug: 'e-learning-service',
    title: 'E-learning Service',
    content: 'Design, production, and deployment of quality e-learning content.',
    icon: FlaskRound,
    detail: [
      'Services provided by the E-Learning Center include:',
    ],
    bullets: [
      'Content Development',
      'Content Operation',
      'Basic Content Development Training',
      'E-learning Development Consultancy',
      'Studio Renting and Recording',
      'Please visit the website for further information.',
    ],
  },
  {
    slug: 'biometric-facial-attendance-system',
    title: 'Biometric Facial Attendance System',
    content: 'Reliable biometric attendance with secure data handling.',
    icon: Fingerprint,
    detail: [
      'Our biometric attendance system provides advanced security and comfort, focusing on facial recognition for speed and reliability.',
      'It ensures accurate attendance without requiring employees to take additional actions, improving experience over fingerprint-only systems.',
      'We provide complete and flexible solutions for biometric facial attendance systems to fit various needs.',
    ],
  },
  {
    slug: 'database-analysis-and-design',
    title: 'Database Analysis & Design',
    content: 'Database planning, optimization, and implementation aligned to your requirements.',
    icon: Database,
    detail: [
      'We design databases grounded in solid theory with performance in mind, and value domain knowledge to meet requirements.',
      'Deliverables include:',
    ],
    bullets: [
      'Conceptual design: structures that meet requirements and remain technology-independent',
      'Physical design: construction plan based on chosen technology',
      'Analysis and refinement of existing databases for current performance and future growth',
    ],
  },
];
