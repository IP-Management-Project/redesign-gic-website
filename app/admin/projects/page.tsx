"use client";

import { usePageActions, useProjects } from "@/hooks/useProject";
import { Card, CardBody, Button, Spinner } from "@heroui/react";
import { Edit3, ExternalLink, Plus, Layout } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PageListing() {
  const { data: projects, isLoading } = useProjects();

  const router = useRouter();
  const { createProject } = usePageActions();

  const handleCreate = async () => {
    const slug = `page-${Date.now()}`;

    const page = await createProject({
      slug,
      title: "New Page",
      html: "<body><h1>New Page</h1></body>",
      css: "",
    });

    router.push(`/admin/projects/edit/${page.slug}`);
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-12 border-b border-divider pb-8">
        <div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">
            Page <span className="text-primary">Studio</span>
          </h1>
          <p className="text-default-500 font-medium">
            Manage and edit your visual web content.
          </p>
        </div>
        <Button
          onClick={handleCreate}
          color="primary"
          size="lg"
          className="font-bold"
          startContent={<Plus />}
        >
          Create Page
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.map((project) => (
          <Card
            key={project.id}
            className="rounded-[2.5rem] border border-divider shadow-none hover:shadow-2xl transition-all overflow-hidden group"
          >
            <div className="h-48 bg-white border-b border-divider relative overflow-hidden">
              <iframe
                srcDoc={`<style>${project.css}</style>${project.html}`}
                className="w-[1200px] h-[800px] origin-top-left scale-[0.25] pointer-events-none"
              />
            </div>
            <CardBody className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Layout size={18} />
                </div>
                <span className="text-[10px] font-black uppercase text-default-400">
                  ID: {project.id}
                </span>
              </div>
              <h3 className="text-xl font-black mb-1">{project.title}</h3>
              <p className="text-default-400 text-xs font-mono mb-6 italic">
                slug: /{project.slug}
              </p>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  as={Link}
                  href={`/admin/projects/edit/${project.slug}`}
                  variant="flat"
                  className="font-black rounded-xl"
                  startContent={<Edit3 size={16} />}
                >
                  Edit
                </Button>
                <Button
                  variant="light"
                  className="font-bold"
                  startContent={<ExternalLink size={16} />}
                >
                  Live
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
