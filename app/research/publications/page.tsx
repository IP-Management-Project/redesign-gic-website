import { title, subtitle } from "@/components/primitives";

export default function ResearchPublicationsPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Publications</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Peer-reviewed articles, conference papers, and scholarly output.
        </p>
      </div>
    </section>
  );
}
