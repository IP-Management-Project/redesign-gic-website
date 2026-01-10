import { title, subtitle } from "@/components/primitives";

type DegreeAdmissionsPageProps = {
  params: { degreeSlug: string };
};

export default function DegreeAdmissionsPage({
  params,
}: DegreeAdmissionsPageProps) {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Admissions: {params.degreeSlug}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Requirements, deadlines, and application guidance for this degree.
        </p>
      </div>
    </section>
  );
}
