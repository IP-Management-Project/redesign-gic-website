import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

type TestimonialPageProps = {
  params: { testimonialSlug: string };
};

export default function TestimonialPage({ params }: TestimonialPageProps) {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Testimonial: {params.testimonialSlug}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Student experiences connected to programs, labs, and projects.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link as={NextLink} href="/program">
          Related program
        </Link>
        <Link as={NextLink} href="/research/labs">
          Related lab
        </Link>
        <Link as={NextLink} href="/student-life/student-projects">
          Student projects
        </Link>
      </div>
    </section>
  );
}
