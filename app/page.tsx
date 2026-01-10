import { button as buttonStyles } from "@heroui/theme";
import { Link } from "@heroui/link";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-2xl text-center justify-center">
        <span className={title({ color: "blue" })}>GIC Engineering</span>
        <div className={subtitle({ class: "mt-4" })}>
          {siteConfig.description}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          as={NextLink}
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="/program"
        >
          Explore Programs
        </Link>
        <Link
          as={NextLink}
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href="/student-life"
        >
          Student Life
        </Link>
      </div>

      <div className="grid w-full max-w-4xl gap-6 pt-8 md:grid-cols-3">
        {[
          {
            title: "Research with impact",
            description:
              "Explore interdisciplinary labs, publications, and tools driving innovation.",
            href: "/research",
          },
          {
            title: "Faculty & Staff",
            description:
              "Meet mentors and professional staff supporting your academic journey.",
            href: "/faculty-staff",
          },
          {
            title: "News & Events",
            description:
              "Stay up to date with seminars, announcements, and campus life.",
            href: "/news-events",
          },
        ].map((card) => (
          <Link
            key={card.title}
            as={NextLink}
            className="rounded-2xl border border-default-200/70 bg-background px-6 py-5 text-left shadow-sm transition hover:border-primary"
            href={card.href}
          >
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="mt-2 text-sm text-default-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
