import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

export default function StudentLifePage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Student Life</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Exchange opportunities, student projects, testimonials, and campus
          experiences.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Exchange", href: "/student-life/exchange" },
          { label: "Testimonials", href: "/student-life/testimonials" },
          { label: "Student Projects", href: "/student-life/student-projects" },
          { label: "Clubs & Communities", href: "/student-life/clubs-communities" },
          { label: "Gallery", href: "/student-life/gallery" },
        ].map((item) => (
          <Link
            key={item.href}
            as={NextLink}
            className="rounded-xl border border-default-200/70 p-4 text-sm text-default-600 hover:border-primary"
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
