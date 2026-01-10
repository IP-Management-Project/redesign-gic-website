import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>About GIC</h1>
      <p className={subtitle({ class: "mt-4" })}>
        Learn more about our mission, vision, and the services that support our
        community.
      </p>
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-default-600">
        {[
          { label: "Mission", href: "/about/mission" },
          { label: "Vision", href: "/about/vision" },
          { label: "Services", href: "/about/services" },
        ].map((link) => (
          <Link key={link.href} as={NextLink} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
