import { title, subtitle } from "@/components/primitives";

export default function IncomingExchangePage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Incoming Exchange</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Information for international students joining GIC for a semester or
          year.
        </p>
      </div>
    </section>
  );
}
