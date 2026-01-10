import { title, subtitle } from "@/components/primitives";

export default function OutgoingExchangePage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Outgoing Exchange</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Guidance for GIC students planning to study abroad through exchange
          partners.
        </p>
      </div>
    </section>
  );
}
