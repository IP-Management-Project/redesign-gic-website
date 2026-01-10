import { title, subtitle } from "@/components/primitives";

export default function ServicesPage() {
  return (
    <div>
      <h1 className={title()}>Services</h1>
      <p className={subtitle({ class: "mt-4" })}>
        GIC supports advising, partnerships, and innovation services that help
        students, faculty, and industry collaborators thrive.
      </p>
    </div>
  );
}
