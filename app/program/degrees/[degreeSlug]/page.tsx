import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

type DegreePageProps = {
  params: { degreeSlug: string };
};

export default function DegreePage({ params }: DegreePageProps) {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{params.degreeSlug} Degree</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Overview, learning outcomes, and key highlights for this degree.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link
          as={NextLink}
          className="text-default-600 hover:text-primary"
          href={`/program/degrees/${params.degreeSlug}/curriculum`}
        >
          View curriculum
        </Link>
        <Link
          as={NextLink}
          className="text-default-600 hover:text-primary"
          href={`/program/degrees/${params.degreeSlug}/admissions`}
        >
          Admissions details
        </Link>
        <Link
          as={NextLink}
          className="text-default-600 hover:text-primary"
          href="/research/labs"
        >
          Related labs
        </Link>
      </div>
    </section>
  );
}
