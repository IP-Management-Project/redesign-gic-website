import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { getLocale } from "@/lib/server-locale";

type DegreeCurriculumPageProps = {
  params: { degreeSlug: string };
};

export default async function DegreeCurriculumPage({
  params,
}: DegreeCurriculumPageProps) {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.program.degreeCurriculum;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>
          {page.titlePrefix}: {params.degreeSlug}
        </h1>
        <p className={subtitle({ class: "mt-4" })}>
          {page.description}
        </p>
      </div>
    </section>
  );
}
