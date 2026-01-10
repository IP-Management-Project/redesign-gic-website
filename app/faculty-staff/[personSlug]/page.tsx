import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

type PersonPageProps = {
  params: { personSlug: string };
};

export default function PersonPage({ params }: PersonPageProps) {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{params.personSlug}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Faculty profile, research interests, and mentorship highlights.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link as={NextLink} href="/research/projects">
          Research projects
        </Link>
        <Link as={NextLink} href="/research/publications">
          Publications
        </Link>
        <Link as={NextLink} href="/student-life/student-projects">
          Mentored student projects
        </Link>
      </div>
    </section>
  );
}
