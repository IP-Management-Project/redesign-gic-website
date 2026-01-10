import { title, subtitle } from "@/components/primitives";

export default function FacultyMobilityPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Mobility</h1>
        <p className={subtitle({ class: "mt-4" })}>
          International exchanges, visiting scholar programs, and collaboration
          pathways.
        </p>
      </div>
    </section>
  );
}
