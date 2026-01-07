export const engineerProgram = {
  title: 'Information and Communication Engineering',
  about: {
    description:
      'Information and Communication Engineering Program is a 5 years program.',
    details: [
      'The first 2 two years is call Troncommun Program in which students from all department will study math, physics, chimie, introduction to programming, introduction to technical drawing, English, French, introduction to marketing, introduction to management, philosophy, Khmer History and administration.',
      'Starting from the third year, students will take courses based on their major. In third year curriculum focuses on fundamental theory in computer science. The fourth year curriculum focuses technologies and professional course. Students are required to do an internship during the vacation.',
      'The first Semester of the fifth year, students are introduced to research with more advanced course such as Artificial Intelligence, Natural Language Processing, Image Processing, Distributed System and Software Project Management accompanied with final year project. An internship of at least 12 weeks is an obligatory for graduation. At the end of the internship students need to conduct a thesis and present their work to the jury. Check out the complete curriculum here.',
    ],
  },
  curriculum: {
    description:
      'Below is the complete curriculum of Information and Communication Engineering Program starting from 3rd semester (1year) to 5th year. 5 Course in French represents lectures, TDI (Travaux Dirigés) in French represents tutorials, and TP (Travaux Pratiques) in French represents practicals.',
    semesters: [
      {
        name: 'Semester V (3 Semester 3)',
        subjects: [
          {
            subject: 'Algorithm and Programming',
            code: 'GIC/ALAP',
            hours: { course: 128, td: 64, tp: 144, total: 368 },
            credits: { c: 8, td: 0, tp: 4.5, total: 16.0 },
          },
          // Add more subjects...
        ],
      },
      // Add more semesters...
    ],
  },
  entranceSelection: {
    description:
      'High school graduate students are eligible for engineer program entrance exam in October of each year. The exam is composed of 3 tests, math, physics and chemie, and logical reasoning.',
    details: [
      'The top 1500 students who pass the exam can enroll in one of the department (GEE, GC, and GIM) from the chosen faculty. Each year, the Ministry of Education, Youth and Sport and ITC provide 80 scholarships (for 5 years) to students who got good score during the entrance exam.',
    ],
  },
};
