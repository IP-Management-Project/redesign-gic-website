import { title, subtitle } from "@/components/primitives";

export default function StudentLifeGalleryPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Gallery</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Photos and videos from labs, events, and student projects.
        </p>
      </div>
    </section>
  );
}
