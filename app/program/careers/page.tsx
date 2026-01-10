import { title, subtitle } from "@/components/primitives";

export default function ProgramCareersPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Careers & Internships</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Connect with industry partners, internship opportunities, and career
          outcomes.
        </p>
      </div>
    </section>
  );
}
