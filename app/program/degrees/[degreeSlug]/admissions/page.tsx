import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { getLocale } from "@/lib/server-locale";

type DegreeAdmissionsPageProps = {
  params: Promise<{ degreeSlug: string }>;
};

export default async function DegreeAdmissionsPage({
  params,
}: DegreeAdmissionsPageProps) {
  const { degreeSlug } = await params;
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.program.degreeAdmissions;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>
          {page.titlePrefix}: {degreeSlug}
        </h1>
        <p className={subtitle({ class: "mt-4" })}>
          {page.description}
        </p>
      </div>
    </section>
  );
}
