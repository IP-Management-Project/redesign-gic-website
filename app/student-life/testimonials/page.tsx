import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

export default function TestimonialsPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Testimonials</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Stories from students, alumni, and exchange participants.
        </p>
      </div>
      <Link
        as={NextLink}
        className="text-sm text-default-600 hover:text-primary"
        href="/student-life/testimonials/featured-student"
      >
        Read a featured testimonial
      </Link>
    </section>
  );
}
