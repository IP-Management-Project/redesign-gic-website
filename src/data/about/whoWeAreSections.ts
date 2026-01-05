import type { LucideIcon } from 'lucide-react';
import { Building2, BookOpen, Microscope, Globe, Smartphone } from 'lucide-react';

export type WhoWeAreSection = {
  title: string;
  content: string;
  icon: LucideIcon;
};

export const whoWeAreSections: WhoWeAreSection[] = [
  {
    title: 'Our Foundation',
    content:
      "Founded in 1988, the Department of Information and Communication Engineering, also known as Département de Génie d'Informatique et Communication (GIC) in French, has formed more than one thousand engineers and technicians in computer science who are now participating actively in the development of both public and private sectors.",
    icon: Building2,
  },
  {
    title: 'Our Programs',
    content:
      'Our programs are built based on a very solid curriculum which covers fundamental theories in computer science and information technologies. Upon completion of the programs, students will be able to gain technical expertise consisting of critical thinking and problem solving skills involving analysis, design, implementation, and evaluation of computer-based systems. The programs also give an introduction to research in advanced domains, such as machine learning and distributed systems. In addition to the technical competency, our programs are enhanced with soft skills development through teamwork tasks in class and obligatory internships to a real working environment for the readiness of the students into their professional life.',
    icon: BookOpen,
  },
  {
    title: 'Our Research',
    content:
      'Our research unit has been working on a variety of research fields consisting of data science and processing of natural language focusing on Khmer including OCR (Optical Character Recognition), ASR (Automatic Speech Recognition), MT (Machine Translation), and TTS (Text to Speech). We have been working in these domains for decades with both local and international partners.',
    icon: Microscope,
  },
  {
    title: 'ASEAN Cyber University',
    content:
      'We are working on an ASEAN Cyber University project supported by KOICA to produce high quality e-learning courses which have been used at ITC and other universities in Cambodia under the blended learning strategy. All courses are developed by qualified teams (Instructional Design, Content Development, Studio Engineer, and Subject Matter Experts) trained by experts from South Korea and Cambodia.',
    icon: Globe,
  },
  {
    title: 'Mobile Technology Program',
    content:
      'In 2013, the department started a Master program of Computer Science in Mobile Technology. This program focuses on technologies, development, and research related to mobile applications such as application development on iOS and Android, Mobile Ecosystem, Mobile Network, Data Security, Data Mining and Big Data. We have helped organize many ICT events, such as ICT Career Expo, Barcamp Phnom Penh, Mobile Camp Asia, Techno Innovation Challenge, Technnovation Cambodia.',
    icon: Smartphone,
  },
];
