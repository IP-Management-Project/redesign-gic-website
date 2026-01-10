import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

export default function StudentProjectsPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Student Projects</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Capstone work, research prototypes, and real-world solutions built by
          students.
        </p>
      </div>
      <Link
        as={NextLink}
        className="text-sm text-default-600 hover:text-primary"
        href="/student-life/student-projects/smart-irrigation"
      >
        View a featured project
      </Link>
    </section>
  );
}
