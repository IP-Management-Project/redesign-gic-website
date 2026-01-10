import { title, subtitle } from "@/components/primitives";

export default function CalendarPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Academic Calendar</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Key dates for admissions, orientation, seminars, and department events.
        </p>
      </div>
    </section>
  );
}
