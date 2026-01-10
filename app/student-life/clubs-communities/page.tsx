import { title, subtitle } from "@/components/primitives";

export default function ClubsCommunitiesPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Clubs & Communities</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Student organizations, interest groups, and peer communities.
        </p>
      </div>
    </section>
  );
}
