import { title, subtitle } from "@/components/primitives";

export default function ProgramScholarshipsPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Scholarships</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Funding opportunities for high-achieving and high-potential students.
        </p>
      </div>
    </section>
  );
}
