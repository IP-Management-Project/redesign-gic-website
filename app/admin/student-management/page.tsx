"use client";

import React, { useMemo, useState } from "react";
import { addToast } from "@heroui/toast";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

import {
  StudentGenerationCard,
  useStudentGenerationData,
} from "@/hooks/useStudentGenerationData";
import { useUpdateStudentGenerationData } from "@/hooks/useUpdateStudentGenerationData";
import {
  ExchangeStoryCard,
  useExchangeSemesterData,
} from "@/hooks/useExchangeSemesterData";
import { useUpdateExchangeSemesterData } from "@/hooks/useUpdateExchangeSemesterData";

type StudentSortKey = "name-asc" | "name-desc" | "generation";

type ExchangeSortKey = "name-asc" | "name-desc" | "destination";

type StudentFormState = {
  generation: string;
  name: string;
  quote: string;
  image: string;
};

type ExchangeFormState = {
  name: string;
  type: string;
  destination: string;
  focus: string;
  story: string;
  backgroundImg: string;
  portrait: string;
  activityImages: string;
  span: string;
};

const parseBulkLines = (lines: string) =>
  lines
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export default function StudentManagementPage() {
  const { data: studentData } = useStudentGenerationData();
  const { data: exchangeData } = useExchangeSemesterData();
  const { mutateAsync: addStudent, isPending: isAddingStudent } =
    useUpdateStudentGenerationData();
  const { mutateAsync: addExchange, isPending: isAddingExchange } =
    useUpdateExchangeSemesterData();

  const generationOptions = Object.keys(studentData?.generations ?? {});

  const [studentSearch, setStudentSearch] = useState("");
  const [studentGenerationFilter, setStudentGenerationFilter] =
    useState("All");
  const [studentSort, setStudentSort] = useState<StudentSortKey>("name-asc");
  const [studentForm, setStudentForm] = useState<StudentFormState>({
    generation: generationOptions[0] ?? "Gen 8",
    name: "",
    quote: "",
    image: "",
  });
  const [studentBulkInput, setStudentBulkInput] = useState("");

  const [exchangeSearch, setExchangeSearch] = useState("");
  const [exchangeTypeFilter, setExchangeTypeFilter] = useState("All");
  const [exchangeSort, setExchangeSort] = useState<ExchangeSortKey>("name-asc");
  const [exchangeForm, setExchangeForm] = useState<ExchangeFormState>({
    name: "",
    type: "Global Exchange",
    destination: "",
    focus: "International Experience",
    story: "",
    backgroundImg:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
    portrait: "https://i.pravatar.cc/150?u=exchange",
    activityImages: "",
    span: "md:col-span-1 md:row-span-1",
  });
  const [exchangeBulkInput, setExchangeBulkInput] = useState("");

  const studentRows = useMemo(() => {
    const rows = Object.entries(studentData?.generations ?? {}).flatMap(
      ([generation, students]) =>
        students.map((student) => ({ generation, ...student })),
    );

    const filtered = rows.filter((row) => {
      const matchesGeneration =
        studentGenerationFilter === "All" ||
        row.generation === studentGenerationFilter;
      const query = studentSearch.trim().toLowerCase();
      const matchesSearch =
        !query ||
        row.name.toLowerCase().includes(query) ||
        row.quote.toLowerCase().includes(query);
      return matchesGeneration && matchesSearch;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (studentSort === "generation") {
        return a.generation.localeCompare(b.generation);
      }
      const direction = studentSort === "name-asc" ? 1 : -1;
      return direction * a.name.localeCompare(b.name);
    });

    return sorted;
  }, [
    studentData?.generations,
    studentGenerationFilter,
    studentSearch,
    studentSort,
  ]);

  const exchangeRows = useMemo(() => {
    const rows = exchangeData ?? [];

    const filtered = rows.filter((row) => {
      const matchesType =
        exchangeTypeFilter === "All" || row.type === exchangeTypeFilter;
      const query = exchangeSearch.trim().toLowerCase();
      const matchesSearch =
        !query ||
        row.name.toLowerCase().includes(query) ||
        row.destination.toLowerCase().includes(query) ||
        row.story.toLowerCase().includes(query);
      return matchesType && matchesSearch;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (exchangeSort === "destination") {
        return a.destination.localeCompare(b.destination);
      }
      const direction = exchangeSort === "name-asc" ? 1 : -1;
      return direction * a.name.localeCompare(b.name);
    });

    return sorted;
  }, [exchangeData, exchangeSearch, exchangeSort, exchangeTypeFilter]);

  const exchangeTypes = [
    "All",
    ...Array.from(new Set((exchangeData ?? []).map((item) => item.type))),
  ];

  const handleStudentFormChange =
    (field: keyof StudentFormState) => (value: string) => {
      setStudentForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleExchangeFormChange =
    (field: keyof ExchangeFormState) => (value: string) => {
      setExchangeForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleAddStudent = async () => {
    if (
      !studentForm.generation ||
      !studentForm.name ||
      !studentForm.quote ||
      !studentForm.image
    ) {
      addToast({
        title: "Missing information",
        description: "Generation, name, quote, and image are required.",
        severity: "warning",
      });
      return;
    }

    await addStudent({
      generation: studentForm.generation,
      student: {
        name: studentForm.name,
        quote: studentForm.quote,
        image: studentForm.image,
      },
    });

    setStudentForm((prev) => ({
      ...prev,
      name: "",
      quote: "",
      image: "",
    }));
  };

  const handleBulkStudentCreate = async () => {
    const lines = parseBulkLines(studentBulkInput);
    if (lines.length === 0) {
      addToast({
        title: "No entries found",
        description: "Add at least one student line to bulk upload.",
        severity: "warning",
      });
      return;
    }

    const entries: Array<{ generation: string; student: StudentGenerationCard }> =
      [];
    const invalidLines: string[] = [];

    lines.forEach((line) => {
      const [generation, name, quote, image] = line
        .split("|")
        .map((value) => value.trim());

      if (!generation || !name || !quote || !image) {
        invalidLines.push(line);
        return;
      }

      entries.push({
        generation,
        student: { name, quote, image },
      });
    });

    if (invalidLines.length > 0) {
      addToast({
        title: "Some entries were skipped",
        description: "Check the bulk format: Generation | Name | Quote | Image URL.",
        severity: "warning",
      });
    }

    if (entries.length === 0) {
      return;
    }

    for (const entry of entries) {
      await addStudent(entry);
    }

    setStudentBulkInput("");
  };

  const handleAddExchange = async () => {
    if (!exchangeForm.name || !exchangeForm.destination || !exchangeForm.story) {
      addToast({
        title: "Missing information",
        description: "Name, destination, and story are required.",
        severity: "warning",
      });
      return;
    }

    const activityImages = exchangeForm.activityImages
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    await addExchange({
      experience: {
        name: exchangeForm.name,
        type: exchangeForm.type,
        destination: exchangeForm.destination,
        focus: exchangeForm.focus,
        story: exchangeForm.story,
        backgroundImg: exchangeForm.backgroundImg,
        portrait: exchangeForm.portrait,
        activityImages: activityImages.length > 0 ? activityImages : undefined,
        span: exchangeForm.span,
      },
    });

    setExchangeForm((prev) => ({
      ...prev,
      name: "",
      destination: "",
      story: "",
      activityImages: "",
    }));
  };

  const handleBulkExchangeCreate = async () => {
    const lines = parseBulkLines(exchangeBulkInput);
    if (lines.length === 0) {
      addToast({
        title: "No entries found",
        description: "Add at least one exchange entry to bulk upload.",
        severity: "warning",
      });
      return;
    }

    const entries: ExchangeStoryCard[] = [];
    const invalidLines: string[] = [];

    lines.forEach((line) => {
      const [
        name,
        type,
        destination,
        focus,
        story,
        backgroundImg,
        portrait,
        activityImages,
        span,
      ] = line.split("|").map((value) => value.trim());

      if (!name || !destination || !story) {
        invalidLines.push(line);
        return;
      }

      entries.push({
        id: 0,
        name,
        type: type || "Global Exchange",
        destination,
        focus: focus || "International Experience",
        story,
        backgroundImg:
          backgroundImg ||
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
        portrait: portrait || "https://i.pravatar.cc/150?u=exchange",
        activityImages: activityImages
          ? activityImages
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : undefined,
        span: span || "md:col-span-1 md:row-span-1",
      });
    });

    if (invalidLines.length > 0) {
      addToast({
        title: "Some entries were skipped",
        description:
          "Check the bulk format: Name | Type | Destination | Focus | Story | Background | Portrait | Activities | Span.",
        severity: "warning",
      });
    }

    if (entries.length === 0) {
      return;
    }

    for (const entry of entries) {
      await addExchange({
        experience: {
          ...entry,
          id: undefined,
        },
      });
    }

    setExchangeBulkInput("");
  };

  return (
    <div className="space-y-16">
      <section className="space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Student Management Portal
          </p>
          <h1 className="text-3xl font-semibold text-foreground">
            Student Generations
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
            Manage student highlights, upload new generation entries, and keep the
            landing page live with React Query updates.
          </p>
        </div>

        <div className="grid gap-6 rounded-3xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center gap-4">
            <Input
              label="Search students"
              value={studentSearch}
              onValueChange={setStudentSearch}
              placeholder="Search by name or quote"
              className="max-w-sm"
            />
            <Select
              label="Generation"
              selectedKeys={[studentGenerationFilter]}
              onSelectionChange={(keys) =>
                setStudentGenerationFilter(Array.from(keys)[0] as string)
              }
              className="max-w-xs"
            >
              {["All", ...generationOptions].map((gen) => (
                <SelectItem key={gen} textValue={gen}>
                  {gen}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Sort by"
              selectedKeys={[studentSort]}
              onSelectionChange={(keys) =>
                setStudentSort(Array.from(keys)[0] as StudentSortKey)
              }
              className="max-w-xs"
            >
              <SelectItem key="name-asc" textValue="Name (A-Z)">
                Name (A-Z)
              </SelectItem>
              <SelectItem key="name-desc" textValue="Name (Z-A)">
                Name (Z-A)
              </SelectItem>
              <SelectItem key="generation" textValue="Generation">
                Generation
              </SelectItem>
            </Select>
          </div>

          <Table
            aria-label="Student generation table"
            classNames={{
              wrapper: "bg-background border border-border rounded-2xl shadow-sm",
              th: "bg-muted text-muted-foreground text-[10px] font-semibold uppercase tracking-[0.3em]",
              td: "py-4 border-b border-border/60",
            }}
          >
            <TableHeader>
              <TableColumn>Generation</TableColumn>
              <TableColumn>Name</TableColumn>
              <TableColumn>Quote</TableColumn>
              <TableColumn>Image</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent="No students match the current filters."
              items={studentRows}
            >
              {(item) => (
                <TableRow key={`${item.generation}-${item.name}`}>
                  <TableCell className="font-semibold text-foreground">
                    {item.generation}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.quote}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {item.image}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground">
              Add a student highlight
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use this form to add a single student to a generation.
            </p>
            <div className="mt-6 grid gap-4">
              <Select
                label="Generation"
                selectedKeys={[studentForm.generation]}
                onSelectionChange={(keys) =>
                  handleStudentFormChange("generation")(
                    Array.from(keys)[0] as string,
                  )
                }
              >
                {generationOptions.map((gen) => (
                  <SelectItem key={gen} textValue={gen}>
                    {gen}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Student name"
                value={studentForm.name}
                onValueChange={handleStudentFormChange("name")}
                placeholder="Full name"
              />
              <Textarea
                label="Quote"
                value={studentForm.quote}
                onValueChange={handleStudentFormChange("quote")}
                placeholder="Inspirational quote"
                minRows={3}
              />
              <Input
                label="Image URL"
                value={studentForm.image}
                onValueChange={handleStudentFormChange("image")}
                placeholder="https://..."
              />
              <Button
                className="bg-foreground text-background font-semibold"
                onPress={handleAddStudent}
                isLoading={isAddingStudent}
              >
                Add student
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground">
              Bulk upload generation
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Paste one student per line using:
              <span className="font-semibold">
                {" "}Generation | Name | Quote | Image URL
              </span>
              .
            </p>
            <Textarea
              className="mt-4"
              minRows={7}
              value={studentBulkInput}
              onValueChange={setStudentBulkInput}
              placeholder="Gen 10 | Dara Sok | Dreaming in circuits | https://..."
            />
            <Button
              className="mt-4 bg-foreground text-background font-semibold"
              onPress={handleBulkStudentCreate}
              isLoading={isAddingStudent}
            >
              Bulk create students
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Exchange Semester Management
          </p>
          <h2 className="text-3xl font-semibold text-foreground">
            Exchange Experiences
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
            Create, filter, and bulk upload exchange stories that appear on the
            Exchange Semester landing page.
          </p>
        </div>

        <div className="grid gap-6 rounded-3xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center gap-4">
            <Input
              label="Search experiences"
              value={exchangeSearch}
              onValueChange={setExchangeSearch}
              placeholder="Search by name, destination, or story"
              className="max-w-sm"
            />
            <Select
              label="Type"
              selectedKeys={[exchangeTypeFilter]}
              onSelectionChange={(keys) =>
                setExchangeTypeFilter(Array.from(keys)[0] as string)
              }
              className="max-w-xs"
            >
              {exchangeTypes.map((type) => (
                <SelectItem key={type} textValue={type}>
                  {type}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Sort by"
              selectedKeys={[exchangeSort]}
              onSelectionChange={(keys) =>
                setExchangeSort(Array.from(keys)[0] as ExchangeSortKey)
              }
              className="max-w-xs"
            >
              <SelectItem key="name-asc" textValue="Name (A-Z)">
                Name (A-Z)
              </SelectItem>
              <SelectItem key="name-desc" textValue="Name (Z-A)">
                Name (Z-A)
              </SelectItem>
              <SelectItem key="destination" textValue="Destination">
                Destination
              </SelectItem>
            </Select>
          </div>

          <Table
            aria-label="Exchange semester table"
            classNames={{
              wrapper: "bg-background border border-border rounded-2xl shadow-sm",
              th: "bg-muted text-muted-foreground text-[10px] font-semibold uppercase tracking-[0.3em]",
              td: "py-4 border-b border-border/60",
            }}
          >
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Type</TableColumn>
              <TableColumn>Destination</TableColumn>
              <TableColumn>Focus</TableColumn>
            </TableHeader>
            <TableBody
              emptyContent="No exchange experiences match the current filters."
              items={exchangeRows}
            >
              {(item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-semibold text-foreground">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.destination}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.focus}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground">
              Add exchange experience
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add a single exchange story to keep the landing content fresh.
            </p>
            <div className="mt-6 grid gap-4">
              <Input
                label="Student name"
                value={exchangeForm.name}
                onValueChange={handleExchangeFormChange("name")}
                placeholder="Student name"
              />
              <Input
                label="Program type"
                value={exchangeForm.type}
                onValueChange={handleExchangeFormChange("type")}
                placeholder="Khmer to France"
              />
              <Input
                label="Destination"
                value={exchangeForm.destination}
                onValueChange={handleExchangeFormChange("destination")}
                placeholder="Host university / country"
              />
              <Input
                label="Focus"
                value={exchangeForm.focus}
                onValueChange={handleExchangeFormChange("focus")}
                placeholder="AI & Innovation"
              />
              <Textarea
                label="Story"
                value={exchangeForm.story}
                onValueChange={handleExchangeFormChange("story")}
                placeholder="Share their experience"
                minRows={3}
              />
              <Input
                label="Background image URL"
                value={exchangeForm.backgroundImg}
                onValueChange={handleExchangeFormChange("backgroundImg")}
              />
              <Input
                label="Portrait URL"
                value={exchangeForm.portrait}
                onValueChange={handleExchangeFormChange("portrait")}
              />
              <Input
                label="Activity images (comma separated)"
                value={exchangeForm.activityImages}
                onValueChange={handleExchangeFormChange("activityImages")}
              />
              <Input
                label="Card span"
                value={exchangeForm.span}
                onValueChange={handleExchangeFormChange("span")}
                placeholder="md:col-span-1 md:row-span-1"
              />
              <Button
                className="bg-foreground text-background font-semibold"
                onPress={handleAddExchange}
                isLoading={isAddingExchange}
              >
                Add exchange story
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground">
              Bulk upload exchange stories
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Paste one entry per line using:
              <span className="font-semibold">
                {" "}Name | Type | Destination | Focus | Story | Background | Portrait | Activities | Span
              </span>
              .
            </p>
            <Textarea
              className="mt-4"
              minRows={7}
              value={exchangeBulkInput}
              onValueChange={setExchangeBulkInput}
              placeholder="Sok Rathana | Khmer to France | INSA Rennes | Cybersecurity | Learned advanced frameworks | https://... | https://... | https://..., https://... | md:col-span-2 md:row-span-2"
            />
            <Button
              className="mt-4 bg-foreground text-background font-semibold"
              onPress={handleBulkExchangeCreate}
              isLoading={isAddingExchange}
            >
              Bulk create exchanges
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
