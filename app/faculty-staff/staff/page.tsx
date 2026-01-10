import { title, subtitle } from "@/components/primitives";

export default function FacultyStaffDirectoryPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Faculty Directory</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Browse faculty profiles, research interests, and mentorship areas.
        </p>
      </div>
    </section>
  );
}
