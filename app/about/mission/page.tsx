import { title, subtitle } from "@/components/primitives";

export default function MissionPage() {
  return (
    <div>
      <h1 className={title()}>Mission</h1>
      <p className={subtitle({ class: "mt-4" })}>
        Advance engineering education and research that serve Cambodia and the
        region through innovation, collaboration, and student success.
      </p>
    </div>
  );
}
