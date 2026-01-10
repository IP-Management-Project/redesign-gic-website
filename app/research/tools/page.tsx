import { title, subtitle } from "@/components/primitives";

export default function ResearchToolsPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Tools</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Software, datasets, and lab tools available for research and learning.
        </p>
      </div>
    </section>
  );
}
