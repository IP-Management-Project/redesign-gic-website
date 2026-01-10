import { title, subtitle } from "@/components/primitives";

type DegreeCurriculumPageProps = {
  params: { degreeSlug: string };
};

export default function DegreeCurriculumPage({
  params,
}: DegreeCurriculumPageProps) {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Curriculum: {params.degreeSlug}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Structured semesters, modules, and hands-on learning experiences.
        </p>
      </div>
    </section>
  );
}
