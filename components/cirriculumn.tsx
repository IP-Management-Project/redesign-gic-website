"use client";

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";

// Types for better developer experience
export interface CurriculumCourse {
  subject: string;
  code: string;
  hC: number;
  hTD: number;
  hTP: number;
  credit: number;
}

export type CurriculumData = Record<string, CurriculumCourse[]>;

interface CurriculumSectionProps {
  title?: string;
  description?: string;
  data?: CurriculumData;
}

// THE DEFAULT DATA (Fallback)
const DEFAULT_CURRICULUM: CurriculumData = {
  "Semester V": [
    { subject: "Algorithm and Programming", code: "GICI3ALP", hC: 16, hTD: 16, hTP: 0, credit: 1.5 },
    { subject: "Combinational and Sequential Logics", code: "GICI3CSL", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
    { subject: "Discrete Mathematics", code: "GICI3DM", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
    { subject: "Electronics", code: "GICI3ELE", hC: 16, hTD: 0, hTP: 0, credit: 1.0 },
    { subject: "Information Systems Analysis and Design", code: "GICI3SAD", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
    { subject: "Introduction to Computer Systems and Networks", code: "GICI3CSN", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
    { subject: "Soft Skills", code: "GICI3SS", hC: 16, hTD: 0, hTP: 0, credit: 1.0 },
    { subject: "Statistics", code: "GICI3STA", hC: 16, hTD: 32, hTP: 0, credit: 2.0 },
    { subject: "English I", code: "XXXIXXLAN", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
    { subject: "French I", code: "XXXIXXLFR", hC: 0, hTD: 0, hTP: 64, credit: 2.0 },
  ],
  "Semester VI": [
    { subject: "Automata Theory", code: "GICI3AT", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
    { subject: "Database", code: "GICI3DB", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
    { subject: "Introduction to Programming Environment", code: "GICI3PE", hC: 16, hTD: 0, hTP: 0, credit: 1.0 },
    { subject: "MATLAB", code: "GICI3MAT", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
    { subject: "Object-Oriented Programming (OOP)", code: "GICI3OOP", hC: 16, hTD: 16, hTP: 32, credit: 2.5 },
    { subject: "Research Methodology", code: "GICI3RM", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
    { subject: "Theoretical Computer Science", code: "GICI3TCS", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
    { subject: "Web Design", code: "GICI3WD", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
    { subject: "English II", code: "XXXIXXLAN", hC: 0, hTD: 0, hTP: 64, credit: 2.0 },
    { subject: "French II", code: "XXXIXXLFR", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
  ],
  "Semester VII": [
    { subject: "Advanced Computer Architecture", code: "GICI4ACA", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
    { subject: "Compilation", code: "GICI4COM", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
    { subject: "Human Computer Interaction", code: "GICI4HCI", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
    { subject: "Internet Programming I", code: "GICI4IP1", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
    { subject: "Networks I", code: "GICI4NET1", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
    { subject: "Operating Systems", code: "GICI4OS", hC: 32, hTD: 0, hTP: 32, credit: 3.0 },
    { subject: "Software Engineering", code: "GICI4SE", hC: 32, hTD: 16, hTP: 16, credit: 3.0 },
    { subject: "Telecommunications", code: "GICI4TEL", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
    { subject: "English I", code: "XXXIXXLAN", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
    { subject: "French I", code: "XXXIXXLFR", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
  ],
  "Semester VIII": [
    { subject: "Advanced DBMS", code: "GICI4DBMS", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
    { subject: "Distributed Systems", code: "GICI4DS", hC: 16, hTD: 0, hTP: 32, credit: 2.0 },
    { subject: "Internet Programming II", code: "GICI4IP2", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
    { subject: "Introduction to Mobile App Dev.", code: "GICI4MDEV", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
    { subject: "Network Design", code: "GICI4ND", hC: 16, hTD: 0, hTP: 0, credit: 1.0 },
    { subject: "Networks II", code: "GICI4NET2", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
    { subject: "DevOps", code: "GICI4SDO", hC: 16, hTD: 0, hTP: 32, credit: 2.0 },
    { subject: "Systems and Networks Administration", code: "GICI4SNA", hC: 16, hTD: 16, hTP: 16, credit: 2.0 },
    { subject: "English II", code: "XXXIXXLAN", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
    { subject: "French II", code: "XXXIXXLFR", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
    { subject: "Internship Report", code: "GICI4INT", hC: 0, hTD: 0, hTP: 0, credit: 2.0 },
  ],
  "Semester IX": [
    { subject: "Artificial Intelligence", code: "GICI5AI", hC: 32, hTD: 0, hTP: 0, credit: 2.0 },
    { subject: "Cloud Computing", code: "GICI5CC", hC: 32, hTD: 0, hTP: 16, credit: 2.5 },
    { subject: "Data Mining", code: "GICI5DM", hC: 16, hTD: 0, hTP: 0, credit: 1.0 },
    { subject: "Image Processing", code: "GICI5IP", hC: 32, hTD: 0, hTP: 16, credit: 2.5 },
    { subject: "Information Security (InfoSec)", code: "GICI5IS", hC: 16, hTD: 0, hTP: 16, credit: 1.5 },
    { subject: "IT Project Management", code: "GICI5PM", hC: 16, hTD: 16, hTP: 0, credit: 1.5 },
    { subject: "Natural Language Processing", code: "GICI5NLP", hC: 32, hTD: 0, hTP: 16, credit: 2.5 },
    { subject: "Network Security", code: "GICI5NS", hC: 16, hTD: 0, hTP: 32, credit: 2.0 },
    { subject: "English", code: "XXXIXXLAN", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
    { subject: "French", code: "XXXIXXLFR", hC: 0, hTD: 0, hTP: 32, credit: 1.0 },
  ],
  "Semester X": [
    { subject: "Final Year Internship", code: "GICI5INT", hC: 0, hTD: 0, hTP: 0, credit: 9.0 },
  ],
};

export function CurriculumSection({
  title = "Course Details",
  description = "Explore the specialized academic path for the Major years (Semester V - X). Total program credits: 161.5 (including 64 foundation credits).",
  data = DEFAULT_CURRICULUM
}: CurriculumSectionProps) {
  return (
    <section className="py-20 bg-background transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl font-black tracking-tighter mb-4">{title}</h2>
          <p className="text-default-500 font-medium max-w-2xl">{description}</p>
        </div>

        <Tabs 
          aria-label="Curriculum Semesters" 
          color="primary" 
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider overflow-x-auto",
            cursor: "w-full bg-blue-600",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-blue-600 font-bold"
          }}
        >
          {Object.entries(data).map(([semester, courses]) => (
            <Tab key={semester} title={semester}>
              <Card className="mt-6 border-none shadow-none bg-transparent">
                <CardBody className="px-0">
                  <Table 
                    aria-label={`Table for ${semester}`}
                    classNames={{
                        wrapper: "bg-content1 dark:bg-zinc-900 shadow-sm border border-divider rounded-2xl",
                        th: "bg-default-100 dark:bg-zinc-800 text-default-600 font-black uppercase text-[10px] tracking-widest",
                        td: "py-4 font-medium text-sm border-b border-divider/50 last:border-none"
                    }}
                  >
                    <TableHeader>
                      <TableColumn>SUBJECT</TableColumn>
                      <TableColumn>CODE</TableColumn>
                      <TableColumn align="center">C (hrs)</TableColumn>
                      <TableColumn align="center">TD (hrs)</TableColumn>
                      <TableColumn align="center">TP (hrs)</TableColumn>
                      <TableColumn align="end">CREDITS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-bold text-foreground">{course.subject}</TableCell>
                          <TableCell className="font-mono text-[11px] text-default-400">{course.code}</TableCell>
                          <TableCell className="text-center">{course.hC}</TableCell>
                          <TableCell className="text-center">{course.hTD}</TableCell>
                          <TableCell className="text-center">{course.hTP}</TableCell>
                          <TableCell className="text-end font-black text-blue-600">{course.credit.toFixed(1)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>

        {/* Legend / Key */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "C: Lectures (Cours)" },
              { label: "TD: Supervised Practical (Tutorials)" },
              { label: "TP: Lab Work (Labs)" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-default-50 border border-divider">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-xs font-bold text-default-600">{item.label}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}