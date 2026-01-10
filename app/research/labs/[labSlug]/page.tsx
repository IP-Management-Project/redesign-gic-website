import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

type LabPageProps = {
  params: { labSlug: string };
};

export default function LabPage({ params }: LabPageProps) {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{params.labSlug} Lab</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Overview, people, projects, publications, and tools for this lab.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link as={NextLink} href="/faculty-staff">
          Meet the team
        </Link>
        <Link as={NextLink} href="/research/projects">
          Related projects
        </Link>
        <Link as={NextLink} href="/research/publications">
          Publications
        </Link>
      </div>
    </section>
  );
}
