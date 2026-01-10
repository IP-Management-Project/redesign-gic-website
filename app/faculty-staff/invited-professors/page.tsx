import { title, subtitle } from "@/components/primitives";

export default function InvitedProfessorsPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Invited Professors</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Visiting experts and guest lecturers supporting GIC programs.
        </p>
      </div>
    </section>
  );
}
