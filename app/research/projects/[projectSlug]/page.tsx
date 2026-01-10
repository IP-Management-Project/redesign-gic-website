import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

type ResearchProjectPageProps = {
  params: { projectSlug: string };
};

export default function ResearchProjectPage({
  params,
}: ResearchProjectPageProps) {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{params.projectSlug} Project</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Timeline, partners, and outcomes for this research initiative.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link as={NextLink} href="/research/labs">
          Related lab
        </Link>
        <Link as={NextLink} href="/faculty-staff">
          Team members
        </Link>
        <Link as={NextLink} href="/student-life/student-projects">
          Student projects
        </Link>
      </div>
    </section>
  );
}
