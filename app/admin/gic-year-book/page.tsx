"use client";

import React from "react";
import { addToast } from "@heroui/toast";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

import {
  type GicYearBookEntry,
  useGicYearBookData,
  useUpdateGicYearBookData,
} from "@/hooks/useGicYearBookData";

type DraftEntry = {
  year: string;
  title: string;
  fileUrl: string;
  coverImageUrl: string;
  description: string;
};

const emptyDraft: DraftEntry = {
  year: "",
  title: "",
  fileUrl: "",
  coverImageUrl: "",
  description: "",
};

const toDraft = (entry: GicYearBookEntry): DraftEntry => ({
  year: entry.year,
  title: entry.title,
  fileUrl: entry.fileUrl,
  coverImageUrl: entry.coverImageUrl,
  description: entry.description ?? "",
});

const toEntry = (id: string, draft: DraftEntry): GicYearBookEntry => ({
  id,
  year: draft.year.trim(),
  title: draft.title.trim(),
  fileUrl: draft.fileUrl.trim(),
  coverImageUrl: draft.coverImageUrl.trim(),
  description: draft.description.trim(),
});

const generateId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `gic-year-book-${Date.now()}-${Math.round(Math.random() * 1e6)}`;

const parseCsvLine = (line: string) =>
  line
    .split(",")
    .map((value) => value.trim())
    .map((value) => value.replace(/^\"|\"$/g, ""));

const parseCsvEntries = (csvText: string) => {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { entries: [] as GicYearBookEntry[], invalidLines: [] as string[] };
  }

  const headerTokens = parseCsvLine(lines[0]).map((token) =>
    token.toLowerCase(),
  );
  const hasHeader =
    headerTokens.includes("year") && headerTokens.includes("title");
  const dataLines = hasHeader ? lines.slice(1) : lines;

  const entries: GicYearBookEntry[] = [];
  const invalidLines: string[] = [];

  dataLines.forEach((line) => {
    const [year, title, fileUrl, coverImageUrl, description = ""] =
      parseCsvLine(line);

    if (!year || !title || !fileUrl || !coverImageUrl) {
      invalidLines.push(line);

      return;
    }

    entries.push(
      toEntry(generateId(), {
        year,
        title,
        fileUrl,
        coverImageUrl,
        description,
      }),
    );
  });

  return { entries, invalidLines };
};

export default function GicYearBookAdminPage() {
  const { data } = useGicYearBookData();
  const updateYearBook = useUpdateGicYearBookData();

  const entries = data?.entries ?? [];

  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState<DraftEntry | null>(null);
  const [createDraft, setCreateDraft] = React.useState<DraftEntry>(emptyDraft);
  const [csvFileName, setCsvFileName] = React.useState("");

  const disableActions = updateYearBook.isPending || editingId !== null;

  const handleDraftChange = (field: keyof DraftEntry, value: string) => {
    setDraft((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleCreateDraftChange = (field: keyof DraftEntry, value: string) => {
    setCreateDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = (entry: GicYearBookEntry) => {
    setEditingId(entry.id);
    setDraft(toDraft(entry));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const handleSaveEdit = (entry: GicYearBookEntry) => {
    if (!draft) return;

    const nextEntry = toEntry(entry.id, draft);

    updateYearBook.mutate(
      {
        updates: [
          {
            type: "update",
            id: entry.id,
            changes: nextEntry,
          },
        ],
      },
      {
        onSuccess: () => handleCancelEdit(),
      },
    );
  };

  const handleDelete = (entry: GicYearBookEntry) => {
    updateYearBook.mutate({ updates: [{ type: "delete", id: entry.id }] });
  };

  const validateDraft = (entryDraft: DraftEntry) =>
    entryDraft.year.trim() &&
    entryDraft.title.trim() &&
    entryDraft.fileUrl.trim() &&
    entryDraft.coverImageUrl.trim();

  const handleSingleCreate = () => {
    if (!validateDraft(createDraft)) {
      addToast({
        title: "Missing information",
        description: "Year, title, file URL, and cover image URL are required.",
        severity: "warning",
      });

      return;
    }

    const entry = toEntry(generateId(), createDraft);

    updateYearBook.mutate(
      {
        updates: [{ type: "add", entry }],
      },
      {
        onSuccess: () => {
          setCreateDraft(emptyDraft);
          addToast({
            title: "Year book added",
            description: "The new year book entry has been created.",
            severity: "success",
          });
        },
      },
    );
  };

  const handleCsvUpload = async (file?: File | null) => {
    if (!file) return;

    setCsvFileName(file.name);

    const text = await file.text();
    const { entries: parsedEntries, invalidLines } = parseCsvEntries(text);

    if (parsedEntries.length === 0) {
      addToast({
        title: "No valid rows",
        description:
          "Ensure the CSV includes year, title, fileUrl, and coverImageUrl.",
        severity: "warning",
      });

      return;
    }

    updateYearBook.mutate(
      {
        updates: [{ type: "bulkAdd", entries: parsedEntries }],
      },
      {
        onSuccess: () => {
          addToast({
            title: "Bulk upload complete",
            description: `Added ${parsedEntries.length} year book entries.${
              invalidLines.length
                ? ` Skipped ${invalidLines.length} invalid rows.`
                : ""
            }`,
            severity: invalidLines.length ? "warning" : "success",
          });
        },
      },
    );
  };

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Student showcase
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          GIC Year book
        </h1>
        <p className="max-w-3xl text-sm text-default-500">
          Manage year book entries with a simple table. Upload a single entry or
          bulk import from CSV.
        </p>
      </section>

      <section className="grid gap-4 rounded-2xl border border-divider/80 bg-content1 p-6 lg:grid-cols-5">
        <Input
          isDisabled={disableActions}
          label="Year"
          placeholder="2025"
          value={createDraft.year}
          onValueChange={(value) => handleCreateDraftChange("year", value)}
        />
        <Input
          isDisabled={disableActions}
          label="Title"
          placeholder="GIC Year Book 2025"
          value={createDraft.title}
          onValueChange={(value) => handleCreateDraftChange("title", value)}
        />
        <Input
          isDisabled={disableActions}
          label="File URL"
          placeholder="https://example.com/yearbook-2025.pdf"
          value={createDraft.fileUrl}
          onValueChange={(value) => handleCreateDraftChange("fileUrl", value)}
        />
        <Input
          isDisabled={disableActions}
          label="Cover image URL"
          placeholder="https://example.com/cover-2025.jpg"
          value={createDraft.coverImageUrl}
          onValueChange={(value) =>
            handleCreateDraftChange("coverImageUrl", value)
          }
        />
        <div className="flex flex-col gap-2">
          <Input
            isDisabled={disableActions}
            label="Description"
            placeholder="Short summary"
            value={createDraft.description}
            onValueChange={(value) =>
              handleCreateDraftChange("description", value)
            }
          />
          <Button
            color="primary"
            isDisabled={disableActions}
            isLoading={updateYearBook.isPending}
            onPress={handleSingleCreate}
          >
            Create entry
          </Button>
        </div>
      </section>

      <section className="space-y-3 rounded-2xl border border-divider/80 bg-content1 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Bulk CSV upload
            </h2>
            <p className="text-xs text-default-500">
              CSV columns: year,title,fileUrl,coverImageUrl,description
              (optional).
            </p>
          </div>
          <div className="text-xs font-semibold text-default-500">
            {csvFileName ? `Selected: ${csvFileName}` : "No file selected"}
          </div>
        </div>
        <input
          accept=".csv,text/csv"
          aria-label="Upload year book CSV"
          className="block w-full cursor-pointer rounded-xl border border-dashed border-divider bg-background px-4 py-6 text-sm text-default-600"
          disabled={disableActions}
          type="file"
          onChange={(event) => handleCsvUpload(event.target.files?.[0])}
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Year book entries
          </h2>
          {updateYearBook.isPending ? (
            <span className="text-xs font-semibold text-default-500">
              Saving changes…
            </span>
          ) : null}
        </div>
        <Table
          aria-label="GIC year book entries"
          classNames={{
            wrapper:
              "rounded-2xl border border-divider/80 bg-content1 shadow-none",
            th: "bg-default-100 text-[10px] font-black uppercase tracking-widest text-default-600",
            td: "border-b border-divider/60 py-4 text-sm font-medium last:border-none",
          }}
        >
          <TableHeader>
            <TableColumn>YEAR</TableColumn>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>FILE URL</TableColumn>
            <TableColumn>COVER URL</TableColumn>
            <TableColumn>DESCRIPTION</TableColumn>
            <TableColumn align="end">ACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No year book entries yet.">
            {entries.map((entry) => {
              const isEditing = editingId === entry.id;
              const rowDraft = isEditing
                ? (draft ?? toDraft(entry))
                : toDraft(entry);

              return (
                <TableRow key={entry.id}>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        aria-label="Year"
                        size="sm"
                        value={rowDraft.year}
                        onValueChange={(value) =>
                          handleDraftChange("year", value)
                        }
                      />
                    ) : (
                      entry.year
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        aria-label="Title"
                        size="sm"
                        value={rowDraft.title}
                        onValueChange={(value) =>
                          handleDraftChange("title", value)
                        }
                      />
                    ) : (
                      entry.title
                    )}
                  </TableCell>
                  <TableCell className="max-w-[280px] truncate">
                    {isEditing ? (
                      <Input
                        aria-label="File URL"
                        size="sm"
                        value={rowDraft.fileUrl}
                        onValueChange={(value) =>
                          handleDraftChange("fileUrl", value)
                        }
                      />
                    ) : (
                      entry.fileUrl
                    )}
                  </TableCell>
                  <TableCell className="max-w-[280px] truncate">
                    {isEditing ? (
                      <Input
                        aria-label="Cover image URL"
                        size="sm"
                        value={rowDraft.coverImageUrl}
                        onValueChange={(value) =>
                          handleDraftChange("coverImageUrl", value)
                        }
                      />
                    ) : (
                      entry.coverImageUrl
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        aria-label="Description"
                        size="sm"
                        value={rowDraft.description}
                        onValueChange={(value) =>
                          handleDraftChange("description", value)
                        }
                      />
                    ) : (
                      entry.description
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap justify-end gap-2">
                      {isEditing ? (
                        <>
                          <Button
                            size="sm"
                            variant="flat"
                            onPress={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                          <Button
                            color="primary"
                            isLoading={updateYearBook.isPending}
                            size="sm"
                            onPress={() => handleSaveEdit(entry)}
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
                            onPress={() => handleEdit(entry)}
                          >
                            Edit
                          </Button>
                          <Button
                            color="danger"
                            isDisabled={disableActions}
                            size="sm"
                            variant="light"
                            onPress={() => handleDelete(entry)}
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
      </section>
    </div>
  );
}
