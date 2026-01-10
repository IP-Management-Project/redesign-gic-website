import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

export default function FacultyStaffPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Faculty & Staff</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Meet our faculty, professional staff, and visiting professors.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Faculty Directory", href: "/faculty-staff/staff" },
          { label: "Mobility", href: "/faculty-staff/mobility" },
          { label: "Invited Professors", href: "/faculty-staff/invited-professors" },
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
