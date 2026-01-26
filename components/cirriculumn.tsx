"use client";

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { useCurriculumData } from "@/hooks/useCurriculumData";
import type { CurriculumCourse, CurriculumData, CurriculumLegendItem } from "@/hooks/useCurriculumData";

export type { CurriculumCourse, CurriculumData } from "@/hooks/useCurriculumData";

interface CurriculumSectionProps {
  title?: string;
  description?: string;
  data?: CurriculumData;
  legend?: CurriculumLegendItem[];
}

export function CurriculumSection({
  title = "Course Details",
  description = "Explore the specialized academic path for the Major years (Semester V - X). Total program credits: 161.5 (including 64 foundation credits).",
  data,
  legend
}: CurriculumSectionProps) {
  const { data: curriculumData } = useCurriculumData();
  const resolvedData = data ?? curriculumData?.curriculum ?? {};
  const legendItems = legend ?? curriculumData?.legend ?? [];
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
          {Object.entries(resolvedData).map(([semester, courses]) => (
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
            {legendItems.map((item, idx) => (
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
