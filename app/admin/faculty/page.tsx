"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Select, SelectItem } from "@heroui/select";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Textarea } from "@heroui/input";
import { Pagination } from "@heroui/pagination";
import { Chip } from "@heroui/chip";
import { useFacultyCentralize } from "@/hooks/useFacultyCentralize";
import type { FacultyMember } from "@/hooks/useFacultyCentralize";

const groupLabels: Record<FacultyMember["group"], string> = {
  management: "Management",
  lecturers: "Lecturers",
  researchers: "Researchers",
  staff: "Staff",
};

export default function FacultyAdminPage() {
  const {
    members,
    filtered,
    paginated,
    stats,
    filters,
    form,
    isOpen,
    page,
    totalPages,
    setFilters,
    setForm,
    setIsOpen,
    setPage,
    openCreate,
    openEdit,
    closeModal,
    upsert,
    remove,
    resetFilters,
  } = useFacultyCentralize();

  function confirmRemove(member: FacultyMember) {
    const ok = window.confirm(`Delete "${member.name}"? This cannot be undone.`);
    if (!ok) return;
    remove(member);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-black">Faculty & Staff Management</h1>
            <p className="text-default-500 mt-2">
              Manage leadership, lecturers, researchers, and staff profiles.
            </p>
          </div>

          <Button color="primary" onPress={openCreate}>
            + Create Profile
          </Button>
        </div>

        <Divider className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-divider bg-content1 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-default-500">Management</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stats.management}</p>
            <p className="mt-2 text-sm text-default-500">Leadership profiles.</p>
          </Card>
          <Card className="border border-divider bg-content1 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-default-500">Lecturers</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stats.lecturers}</p>
            <p className="mt-2 text-sm text-default-500">Teaching faculty.</p>
          </Card>
          <Card className="border border-divider bg-content1 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-default-500">Researchers</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stats.researchers}</p>
            <p className="mt-2 text-sm text-default-500">Research staff.</p>
          </Card>
          <Card className="border border-divider bg-content1 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-widest text-default-500">Staff</p>
            <p className="mt-2 text-3xl font-black text-foreground">{stats.staff}</p>
            <p className="mt-2 text-sm text-default-500">Operations team.</p>
          </Card>
        </div>

        <Card className="border border-divider bg-content1 rounded-2xl p-4 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5">
              <Input
                value={filters.query}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, query: value }))
                }
                label="Search"
                placeholder="Search by name, role, focus..."
              />
            </div>

            <div className="md:col-span-3">
              <Select
                label="Group"
                selectedKeys={new Set([filters.groupFilter])}
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as any;
                  setFilters((prev) => ({ ...prev, groupFilter: v ?? "ALL" }));
                }}
              >
                <SelectItem key="ALL">All</SelectItem>
                <SelectItem key="management">Management</SelectItem>
                <SelectItem key="lecturers">Lecturers</SelectItem>
                <SelectItem key="researchers">Researchers</SelectItem>
                <SelectItem key="staff">Staff</SelectItem>
              </Select>
            </div>

            <div className="md:col-span-4">
              <Select
                label="Sort"
                selectedKeys={new Set([filters.sortKey])}
                onSelectionChange={(keys) => {
                  const v = Array.from(keys)[0] as any;
                  setFilters((prev) => ({ ...prev, sortKey: v ?? "NAME_AZ" }));
                }}
              >
                <SelectItem key="NAME_AZ">Name A → Z</SelectItem>
                <SelectItem key="NAME_ZA">Name Z → A</SelectItem>
              </Select>
            </div>

            <div className="md:col-span-12 flex items-end justify-between gap-3 flex-wrap">
              <div className="text-sm text-default-500">
                Showing <span className="font-bold text-foreground">{filtered.length}</span>{" "}
                of <span className="font-bold text-foreground">{members.length}</span>
              </div>

              <Button variant="flat" onPress={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-8">
          {filtered.length === 0 ? (
            <Card className="border border-dashed border-divider bg-content1 rounded-2xl p-10 text-center">
              <h3 className="text-xl font-black">No profiles yet</h3>
              <p className="text-default-500 mt-2">
                Add a new faculty member or adjust filters to see results.
              </p>
              <Button className="mt-6" color="primary" onPress={openCreate}>
                + Create Profile
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginated.map((member) => (
                  <Card key={member.id} className="border border-divider bg-content1 rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-3">
                        <Chip size="sm" variant="flat" className="bg-background/80 font-bold">
                          {groupLabels[member.group]}
                        </Chip>
                        <h3 className="text-xl font-black">{member.name}</h3>
                        <p className="text-sm text-default-500">{member.role}</p>
                        <p className="text-sm text-default-500">{member.degree}</p>
                        <p className="text-sm text-default-500">{member.focus}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="flat" onPress={() => openEdit(member)}>
                          Edit
                        </Button>
                        <Button size="sm" color="danger" variant="flat" onPress={() => confirmRemove(member)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-default-500">
                  Page <span className="font-semibold text-foreground">{page}</span> of{" "}
                  <span className="font-semibold text-foreground">{totalPages}</span>
                </p>
                <Pagination
                  page={page}
                  total={totalPages}
                  onChange={setPage}
                  showControls
                  className="mx-auto sm:mx-0"
                />
              </div>
            </div>
          )}
        </div>

        <Modal isOpen={isOpen} onOpenChange={setIsOpen} size="3xl">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              {form.id ? "Edit Profile" : "Create Profile"}
              <span className="text-sm text-default-500 font-normal">
                {form.id ? `Editing: ${form.id}` : "Add a new faculty or staff member."}
              </span>
            </ModalHeader>

            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  className="md:col-span-2"
                  label="Name"
                  value={form.name}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
                />

                <Select
                  label="Group"
                  selectedKeys={new Set([form.group])}
                  onSelectionChange={(keys) => {
                    const v = Array.from(keys)[0] as FacultyMember["group"];
                    setForm((prev) => ({ ...prev, group: v ?? "lecturers" }));
                  }}
                >
                  <SelectItem key="management">Management</SelectItem>
                  <SelectItem key="lecturers">Lecturers</SelectItem>
                  <SelectItem key="researchers">Researchers</SelectItem>
                  <SelectItem key="staff">Staff</SelectItem>
                </Select>

                <Input
                  label="Role"
                  value={form.role}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, role: value }))}
                />

                <Input
                  className="md:col-span-2"
                  label="Degree"
                  value={form.degree}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, degree: value }))}
                />

                <Input
                  className="md:col-span-2"
                  label="Portrait URL"
                  value={form.portrait}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, portrait: value }))}
                />

                <Input
                  className="md:col-span-2"
                  label="University Logo URL"
                  value={form.uniLogo}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, uniLogo: value }))}
                />

                <Textarea
                  className="md:col-span-2"
                  label="Bio / Focus Summary"
                  value={form.focus}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, focus: value }))}
                  minRows={4}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button variant="flat" onPress={closeModal}>
                Cancel
              </Button>
              <Button color="primary" onPress={upsert}>
                {form.id ? "Save Changes" : "Create"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
