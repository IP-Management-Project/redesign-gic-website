import { title, subtitle } from "@/components/primitives";

export default function VisionPage() {
  return (
    <div>
      <h1 className={title()}>Vision</h1>
      <p className={subtitle({ class: "mt-4" })}>
        Build a globally connected engineering department that empowers students
        with real-world experience, research excellence, and industry-ready
        skills.
      </p>
    </div>
  );
}
