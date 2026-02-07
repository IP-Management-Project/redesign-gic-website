"use client";

import { ConfirmModal } from "@/components/admin/common/modals/confirmation-modal";
import { usePageActions, useProjects } from "@/hooks/useProject";
import { Project } from "@/types/project";
import {
  Card,
  CardBody,
  Button,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
} from "@heroui/react";
import {
  Edit3,
  ExternalLink,
  Plus,
  Layout,
  Trash2,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TEMPLATE_HTML = `
<body>
  <article class="page">

    <header class="page-header">
      <h1 class="title">Page Title</h1>
      <p class="subtitle">Short introduction of this page content</p>
    </header>

    <section class="block">
      <h2>Overview</h2>
      <p>
        This area explains the main idea. Replace this text with your real content.
      </p>
    </section>

    <section class="columns">
      <div class="box">
        <h3>Point One</h3>
        <p>Describe the first key point here</p>
      </div>

      <div class="box">
        <h3>Point Two</h3>
        <p>Describe the second key point here</p>
      </div>
    </section>

    <section class="block">
      <h2>Details</h2>

      <ul class="list">
        <li>Important information item</li>
        <li>Another explanation item</li>
        <li>Additional note</li>
      </ul>
    </section>

    <section class="callout">
      <h3>Highlight</h3>
      <p>Use this block to emphasize message</p>
    </section>

  </article>
</body>
`;

const TEMPLATE_CSS = `
.page {
  max-width: 880px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  color: #111;
}

.page-header {
  padding: 32px 20px;
  border-bottom: 1px solid #eee;
}

.title {
  margin: 0;
}

.subtitle {
  color: #666;
}

.block {
  padding: 20px;
}

.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 20px;
}

.box {
  border: 1px solid #eee;
  padding: 16px;
  border-radius: 14px;
}

.list {
  padding-left: 18px;
}

.callout {
  margin: 20px;
  padding: 16px;
  background: #fafafa;
  border-left: 3px solid #111;
  border-radius: 8px;
}
`;

export default function PageListing() {
  const { data: projects, isLoading } = useProjects();

  const router = useRouter();
  const { createProject, deleteProject, saveProject, isDeleting, isSaving } =
    usePageActions();

  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const openRename = (project: Project) => {
    setSelectedSlug(project.slug);
    setRenameValue(project.title);
    setIsRenameOpen(true);
  };

  const handleCreate = async () => {
    const slug = `page-${Date.now()}`;

    const page = await createProject({
      slug,
      title: "New Page",
      html: TEMPLATE_HTML,
      css: TEMPLATE_CSS,
    });

    router.push(`/admin/projects/edit/${page.slug}`);
  };

  const handleRename = async () => {
    if (!selectedSlug) return;

    await saveProject({
      slug: selectedSlug,
      data: { title: renameValue },
    });

    setIsRenameOpen(false);
    setSelectedSlug(null);
  };

  const openDelete = (slug: string) => {
    setSelectedSlug(slug);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedSlug) return;

    await deleteProject(selectedSlug);
    setIsDeleteOpen(false);
    setSelectedSlug(null);
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Delete Page?"
        message="This page will be removed permanently."
        confirmLabel="Yes, Delete"
      />

      <Modal isOpen={isRenameOpen} onOpenChange={() => setIsRenameOpen(false)}>
        <ModalContent>
          <ModalHeader>Rename Page</ModalHeader>

          <ModalBody>
            <Input
              label="New title"
              value={renameValue}
              onValueChange={setRenameValue}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="light" onPress={() => setIsRenameOpen(false)}>
              Cancel
            </Button>

            <Button color="primary" onPress={handleRename} isLoading={isSaving}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="max-w-7xl mx-auto p-12">
        <div className="flex justify-between items-end mb-12 border-b pb-8">
          <div>
            <h1 className="text-5xl font-black">Page Studio</h1>
            <p className="text-default-500">
              Manage and edit your visual web content.
            </p>
          </div>

          <Button
            onClick={handleCreate}
            color="primary"
            startContent={<Plus />}
          >
            Create Page
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
            <Card key={project.id}>
              <div className="h-48 bg-white border-b">
                <iframe
                  srcDoc={`<style>${project.css}</style>${project.html}`}
                  className="w-[1200px] h-[800px] origin-top-left scale-[0.25] pointer-events-none"
                />
              </div>

              <CardBody className="p-6">
                <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                <p className="text-xs mb-4">/{project.slug}</p>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    as={Link}
                    href={`/admin/projects/edit/${project.slug}`}
                    variant="flat"
                    startContent={<Edit3 size={16} />}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="light"
                    startContent={<ExternalLink size={16} />}
                  >
                    Live
                  </Button>

                  <Button
                    variant="flat"
                    onClick={() => openRename(project)}
                    startContent={<Pencil size={16} />}
                  >
                    Rename
                  </Button>

                  <Button
                    color="danger"
                    variant="flat"
                    isLoading={isDeleting && selectedSlug === project.slug}
                    onClick={() => openDelete(project.slug)}
                    startContent={<Trash2 size={16} />}
                  >
                    Delete
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
