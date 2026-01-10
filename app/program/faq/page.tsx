import { title, subtitle } from "@/components/primitives";

export default function ProgramFaqPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Program FAQ</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Common questions about admissions, academics, and student support.
        </p>
      </div>
    </section>
  );
}
