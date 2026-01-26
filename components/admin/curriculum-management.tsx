"use client";

import type { CurriculumCourse } from "@/hooks/useCurriculumData";
import type {
  CurriculumProgramData,
  CurriculumProgramKey,
} from "@/hooks/useCurriculumManagementData";

import React from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { Tabs, Tab } from "@heroui/tabs";

import {
  curriculumProgramMeta,
  useCurriculumManagementData,
  useUpdateCurriculumManagementData,
} from "@/hooks/useCurriculumManagementData";

type CurriculumManagementProps = {
  programKey: CurriculumProgramKey;
};

type EditingRow = {
  semester: string;
  courseIndex: number;
  mode: "edit" | "add";
};

type DraftCourse = {
  subject: string;
  code: string;
  hC: string;
  hTD: string;
  hTP: string;
  credit: string;
};

type NumberField = keyof Pick<CurriculumCourse, "hC" | "hTD" | "hTP">;

const numberFields: NumberField[] = ["hC", "hTD", "hTP"];

const toDraft = (course: CurriculumCourse): DraftCourse => ({
  subject: course.subject,
  code: course.code,
  hC: String(course.hC),
  hTD: String(course.hTD),
  hTP: String(course.hTP),
  credit: String(course.credit),
});

const blankCourse: CurriculumCourse = {
  subject: "",
  code: "",
  hC: 0,
  hTD: 0,
  hTP: 0,
  credit: 0,
};

const blankDraft = () => toDraft(blankCourse);

const parseNumber = (value: string, fallback: number) => {
  if (value.trim() === "") return fallback;
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
};

const toCourse = (
  draft: DraftCourse,
  fallback: CurriculumCourse,
): CurriculumCourse => {
  const nextCourse: CurriculumCourse = {
    ...fallback,
    subject: draft.subject.trim(),
    code: draft.code.trim(),
    credit: parseNumber(draft.credit, fallback.credit),
  };

  numberFields.forEach((field) => {
    nextCourse[field] = parseNumber(draft[field], fallback[field]);
  });

  return nextCourse;
};

const hasCourseChanges = (course: CurriculumCourse, draft: DraftCourse) =>
  course.subject !== draft.subject ||
  course.code !== draft.code ||
  numberFields.some(
    (field) => course[field] !== parseNumber(draft[field], course[field]),
  ) ||
  course.credit !== parseNumber(draft.credit, course.credit);

const getSemesterTotalCredits = (courses: CurriculumCourse[]) =>
  courses.reduce((total, course) => total + course.credit, 0);

const renderNumberCell = ({
  course,
  field,
  isEditing,
  draft,
  onDraftChange,
}: {
  course: CurriculumCourse;
  field: NumberField;
  isEditing: boolean;
  draft: DraftCourse;
  onDraftChange: (field: keyof DraftCourse, value: string) => void;
}) => (
  <TableCell key={`${course.code}-${field}`} className="text-center">
    {isEditing ? (
      <Input
        aria-label={`${field} hours`}
        inputMode="decimal"
        size="sm"
        type="number"
        value={draft[field]}
        onValueChange={(value) => onDraftChange(field, value)}
      />
    ) : (
      course[field]
    )}
  </TableCell>
);

function CurriculumTable({
  programKey,
  semester,
  courses,
  editingRow,
  draft,
  onEdit,
  onCancel,
  onDraftChange,
  onSave,
  onAdd,
  onDelete,
  disableActions,
  isSaving,
}: {
  programKey: CurriculumProgramKey;
  semester: string;
  courses: CurriculumCourse[];
  editingRow: EditingRow | null;
  draft: DraftCourse | null;
  onEdit: (row: EditingRow, course: CurriculumCourse) => void;
  onCancel: () => void;
  onDraftChange: (field: keyof DraftCourse, value: string) => void;
  onSave: () => void;
  onAdd: (semester: string, nextIndex: number) => void;
  onDelete: (semester: string, courseIndex: number) => void;
  disableActions: boolean;
  isSaving: boolean;
}) {
  const totalCredits = getSemesterTotalCredits(courses);
  const isAddingRow =
    editingRow?.semester === semester && editingRow.mode === "add";
  const coursesForDisplay = isAddingRow ? [...courses, blankCourse] : courses;

  return (
    <Card className="border border-divider bg-content1 shadow-sm">
      <CardHeader className="flex flex-col items-start gap-2 border-b border-divider/80">
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {curriculumProgramMeta[programKey].label}
            </p>
            <h3 className="text-lg font-semibold text-foreground">
              {semester}
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button
              color="primary"
              isDisabled={disableActions}
              size="sm"
              variant="flat"
              onPress={() => onAdd(semester, courses.length)}
            >
              Add subject
            </Button>
            <div className="rounded-full border border-divider/80 bg-default-50 px-4 py-2 text-xs font-semibold text-default-600">
              Total credits: {totalCredits.toFixed(1)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="gap-4">
        <Table
          aria-label={`${semester} curriculum management table`}
          classNames={{
            wrapper:
              "rounded-2xl border border-divider/80 bg-background shadow-none",
            th: "bg-default-100 text-[10px] font-black uppercase tracking-widest text-default-600",
            td: "border-b border-divider/60 py-4 text-sm font-medium last:border-none",
          }}
        >
          <TableHeader>
            <TableColumn>SUBJECT</TableColumn>
            <TableColumn>CODE</TableColumn>
            <TableColumn align="center">C (hrs)</TableColumn>
            <TableColumn align="center">TD (hrs)</TableColumn>
            <TableColumn align="center">TP (hrs)</TableColumn>
            <TableColumn align="end">CREDITS</TableColumn>
            <TableColumn align="end">ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {coursesForDisplay.map((course, courseIndex) => {
              const isEditing =
                editingRow?.semester === semester &&
                editingRow.courseIndex === courseIndex &&
                draft !== null;
              const rowDraft = isEditing
                ? (draft ?? blankDraft())
                : toDraft(course);

              return (
                <TableRow key={`${semester}-${course.code}-${courseIndex}`}>
                  <TableCell className="font-semibold text-foreground">
                    {isEditing ? (
                      <Input
                        aria-label="Subject"
                        size="sm"
                        value={rowDraft.subject}
                        onValueChange={(value) =>
                          onDraftChange("subject", value)
                        }
                      />
                    ) : (
                      course.subject
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-default-500">
                    {isEditing ? (
                      <Input
                        aria-label="Course code"
                        size="sm"
                        value={rowDraft.code}
                        onValueChange={(value) => onDraftChange("code", value)}
                      />
                    ) : (
                      course.code
                    )}
                  </TableCell>
                  {numberFields.map((field) =>
                    renderNumberCell({
                      course,
                      field,
                      isEditing,
                      draft: rowDraft,
                      onDraftChange,
                    }),
                  )}
                  <TableCell className="text-end">
                    {isEditing ? (
                      <Input
                        aria-label="Course credits"
                        className="ml-auto max-w-[120px]"
                        inputMode="decimal"
                        size="sm"
                        type="number"
                        value={rowDraft.credit}
                        onValueChange={(value) =>
                          onDraftChange("credit", value)
                        }
                      />
                    ) : (
                      <span className="font-black text-blue-600">
                        {course.credit.toFixed(1)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap justify-end gap-2">
                      {isEditing ? (
                        <>
                          <Button size="sm" variant="flat" onPress={onCancel}>
                            Cancel
                          </Button>
                          <Button
                            color="primary"
                            isLoading={isSaving}
                            size="sm"
                            onPress={onSave}
                          >
                            Save
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            isDisabled={disableActions}
                            size="sm"
                            variant="flat"
                            onPress={() =>
                              onEdit(
                                { semester, courseIndex, mode: "edit" },
                                course,
                              )
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            color="danger"
                            isDisabled={disableActions}
                            size="sm"
                            variant="light"
                            onPress={() => onDelete(semester, courseIndex)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}

export function CurriculumManagement({
  programKey,
}: CurriculumManagementProps) {
  const { data, isLoading, isFetching } =
    useCurriculumManagementData(programKey);
  const updateCurriculum = useUpdateCurriculumManagementData(programKey);

  const [editingRow, setEditingRow] = React.useState<EditingRow | null>(null);
  const [draft, setDraft] = React.useState<DraftCourse | null>(null);

  const programData: CurriculumProgramData | undefined = data;
  const semesters = programData ? Object.entries(programData.curriculum) : [];

  const handleEdit = (row: EditingRow, course: CurriculumCourse) => {
    setEditingRow(row);
    setDraft(toDraft(course));
  };

  const handleAdd = (semester: string, nextIndex: number) => {
    setEditingRow({ semester, courseIndex: nextIndex, mode: "add" });
    setDraft(blankDraft());
  };

  const handleCancel = () => {
    setEditingRow(null);
    setDraft(null);
  };

  const handleSave = () => {
    if (!programData || !editingRow || !draft) return;

    const courses = programData.curriculum[editingRow.semester];
    const currentCourse = courses?.[editingRow.courseIndex] ?? blankCourse;

    if (editingRow.mode === "edit") {
      if (!courses?.[editingRow.courseIndex]) return;

      if (!hasCourseChanges(currentCourse, draft)) {
        handleCancel();

        return;
      }
    }

    const nextCourse = toCourse(draft, currentCourse);
    const updates =
      editingRow.mode === "add"
        ? [{ type: "add", semester: editingRow.semester, course: nextCourse }]
        : [
            {
              type: "update",
              semester: editingRow.semester,
              courseIndex: editingRow.courseIndex,
              changes: nextCourse,
            },
          ];

    updateCurriculum.mutate(
      {
        programKey,
        updates,
      },
      {
        onSuccess: () => handleCancel(),
      },
    );
  };

  const handleDelete = (semester: string, courseIndex: number) => {
    updateCurriculum.mutate(
      {
        programKey,
        updates: [{ type: "delete", semester, courseIndex }],
      },
      {
        onSuccess: () => {
          if (
            editingRow &&
            editingRow.semester === semester &&
            editingRow.courseIndex === courseIndex
          ) {
            handleCancel();
          }
        },
      },
    );
  };

  if (isLoading && !programData) {
    return (
      <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-divider">
        <Spinner label="Loading curriculum" />
      </div>
    );
  }

  if (!programData) {
    return (
      <div className="rounded-2xl border border-danger/40 bg-danger/5 p-6 text-sm text-danger">
        Unable to load curriculum data for this program.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Curriculum management
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {programData.program.label}
          </h1>
          <p className="max-w-3xl text-sm text-default-500">
            {programData.program.description}
          </p>
        </div>
        {isFetching ? (
          <div className="flex items-center gap-2 rounded-full border border-divider/80 bg-default-50 px-4 py-2 text-xs font-semibold text-default-500">
            <Spinner size="sm" /> Syncing changes
          </div>
        ) : null}
      </div>

      <Tabs
        aria-label="Curriculum semesters"
        classNames={{
          tabList:
            "w-full gap-6 overflow-x-auto rounded-none border-b border-divider p-0",
          cursor: "w-full bg-blue-600",
          tab: "h-12 max-w-fit px-0",
          tabContent:
            "font-bold text-default-500 group-data-[selected=true]:text-blue-600",
        }}
        color="primary"
        variant="underlined"
      >
        {semesters.map(([semester, courses]) => (
          <Tab key={semester} title={semester}>
            <div className="mt-6">
              <CurriculumTable
                courses={courses}
                disableActions={
                  updateCurriculum.isPending || editingRow !== null
                }
                draft={draft}
                editingRow={editingRow}
                isSaving={updateCurriculum.isPending}
                programKey={programKey}
                semester={semester}
                onAdd={handleAdd}
                onCancel={handleCancel}
                onDelete={handleDelete}
                onDraftChange={(field, value) =>
                  setDraft((prev) =>
                    prev ? { ...prev, [field]: value } : prev,
                  )
                }
                onEdit={handleEdit}
                onSave={handleSave}
              />
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
