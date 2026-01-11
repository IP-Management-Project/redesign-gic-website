import { button as buttonStyles } from "@heroui/theme";
import { Link } from "@heroui/link";
import NextLink from "next/link";

import { getSiteContent } from "@/content/site-content";
import { title, subtitle } from "@/components/primitives";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";

export default async function Home() {
  const locale = await getLocale();
  const content = getSiteContent(locale);

  return (
    <div className="flex flex-col gap-16 py-8 md:py-12">
      <section className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="inline-block max-w-3xl">
          <span className={title({ color: "blue" })}>{content.home.heroTitle}</span>
          <div className={subtitle({ class: "mt-4" })}>{content.home.heroSubtitle}</div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            as={NextLink}
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={localizeHref(locale, content.home.ctas.primary.href)}
          >
            {content.home.ctas.primary.label}
          </Link>
          <Link
            as={NextLink}
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={localizeHref(locale, content.home.ctas.secondary.href)}
          >
            {content.home.ctas.secondary.label}
          </Link>
        </div>

        <div className="grid w-full max-w-4xl gap-6 pt-8 md:grid-cols-3">
          {content.home.highlights.map((card) => (
            <Link
              key={card.title}
              as={NextLink}
              className="rounded-2xl border border-default-200/70 bg-background px-6 py-5 text-left shadow-sm transition hover:border-primary"
              href={localizeHref(locale, card.href)}
            >
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm text-default-600">{card.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-default-200/70 bg-default-50/60 px-6 py-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <h2 className="text-center text-2xl font-semibold">
            {content.home.numbersTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            {content.home.numbers.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-sm text-default-500">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-primary">{item.value}</p>
                <p className="mt-2 text-sm text-default-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <h2 className="text-2xl font-semibold">{content.home.pillarsTitle}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {content.home.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-default-200/70 bg-background px-6 py-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{pillar.title}</h3>
              <p className="mt-2 text-sm text-default-600">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold">{content.home.research.title}</h2>
          <p className="mt-2 text-default-600">{content.home.research.description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {content.home.research.labs.map((lab) => (
            <div
              key={lab.title}
              className="rounded-2xl border border-default-200/70 bg-background px-6 py-5"
            >
              <h3 className="text-lg font-semibold">{lab.title}</h3>
              <p className="mt-2 text-sm text-default-600">{lab.description}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-default-200/70 bg-default-50/60 px-6 py-5">
            <p className="text-sm font-semibold text-primary">
              {content.home.research.spotlight.title}
            </p>
            <p className="mt-2 text-sm text-default-600">
              {content.home.research.spotlight.description}
            </p>
            <Link
              as={NextLink}
              className="mt-4 inline-flex text-sm font-semibold text-primary"
              href={localizeHref(locale, content.home.research.spotlight.href)}
            >
              {content.home.research.spotlight.linkLabel}
            </Link>
          </div>
        </div>
        <div>
          <Link
            as={NextLink}
            className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
            href={localizeHref(locale, content.home.research.cta.href)}
          >
            {content.home.research.cta.label}
          </Link>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold">{content.home.journey.title}</h2>
          <p className="mt-2 text-default-600">{content.home.journey.description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-default-200/70 bg-background px-6 py-5">
            <h3 className="text-lg font-semibold">
              {content.home.journey.mobilityTitle}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {content.home.journey.mobility.map((location) => (
                <span
                  key={location}
                  className="rounded-full border border-default-200 px-3 py-1 text-xs text-default-600"
                >
                  {location}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-default-200/70 bg-background px-6 py-5">
            <h3 className="text-lg font-semibold">
              {content.home.journey.internshipsTitle}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-default-600">
              {content.home.journey.internships.map((company) => (
                <li key={company}>{company}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-default-200/70 bg-background px-6 py-5">
            <h3 className="text-lg font-semibold">
              {content.home.journey.studentLifeTitle}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {content.home.journey.studentLife.map((item) => (
                <li key={item.label}>
                  <Link
                    as={NextLink}
                    className="text-primary"
                    href={localizeHref(locale, item.href)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold">{content.home.partnerships.title}</h2>
          <p className="mt-2 text-default-600">{content.home.partnerships.description}</p>
        </div>
        <div className="rounded-2xl border border-default-200/70 bg-background px-6 py-5">
          <div className="flex flex-wrap gap-3 text-sm text-default-500">
            {content.home.partnerships.logos.map((logo) => (
              <span
                key={logo}
                className="rounded-full border border-default-200 bg-default-100/60 px-4 py-2 uppercase tracking-wide"
              >
                {logo}
              </span>
            ))}
          </div>
          <div className="mt-6 grid gap-3 text-sm text-default-600 md:grid-cols-2">
            <p className="md:col-span-2 text-sm font-semibold text-default-500">
              {content.home.partnerships.careersTitle}
            </p>
            {content.home.partnerships.careers.map((career) => (
              <div
                key={career}
                className="rounded-xl border border-default-200/70 bg-default-50/60 px-4 py-3"
              >
                {career}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold">{content.home.events.title}</h2>
          <p className="mt-2 text-default-600">{content.home.events.description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {content.home.events.items.map((item) => (
            <Link
              key={item.title}
              as={NextLink}
              className="rounded-2xl border border-default-200/70 bg-background px-6 py-5 transition hover:border-primary"
              href={localizeHref(locale, item.href)}
            >
              <p className="text-xs uppercase tracking-wide text-default-500">
                {item.date}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-default-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="relative overflow-hidden rounded-3xl border border-default-200/70 bg-cover bg-center px-8 py-14 text-white"
        style={{ backgroundImage: "url('/images/itc-campus.svg')" }}
      >
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-4">
          <span className="w-fit rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide">
            {content.home.prestigeHero.badge}
          </span>
          <h2 className="text-3xl font-semibold">{content.home.prestigeHero.title}</h2>
          <p className="max-w-2xl text-sm text-white/80">
            {content.home.prestigeHero.subtitle}
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold">{content.home.faculty.title}</h2>
          <p className="mt-2 text-default-600">{content.home.faculty.description}</p>
        </div>
        <div className="rounded-2xl border border-default-200/70 bg-default-50/60 px-6 py-5 text-sm text-default-600">
          {content.home.faculty.stat}
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {content.home.faculty.spotlight.map((member) => (
            <div
              key={member.name}
              className="min-w-[240px] rounded-2xl border border-default-200/70 bg-background px-5 py-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {member.name
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
              </div>
              <h3 className="mt-4 text-base font-semibold">{member.name}</h3>
              <p className="text-xs text-default-500">{member.degree}</p>
              <p className="mt-2 text-sm text-default-600">{member.focus}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold">{content.home.mobilityHub.title}</h2>
          <p className="mt-2 text-default-600">{content.home.mobilityHub.description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-default-200/70 bg-background px-6 py-5">
            <h3 className="text-lg font-semibold">
              {content.home.mobilityHub.inboundTitle}
            </h3>
            <p className="mt-2 text-sm text-default-600">{content.home.mobilityHub.inbound}</p>
          </div>
          <div className="rounded-2xl border border-default-200/70 bg-background px-6 py-5">
            <h3 className="text-lg font-semibold">
              {content.home.mobilityHub.outboundTitle}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-default-600">
              {content.home.mobilityHub.outbound.map((school) => (
                <span
                  key={school}
                  className="rounded-full border border-default-200 px-3 py-1"
                >
                  {school}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm text-default-600">
              {content.home.mobilityHub.dualDegree}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold">{content.home.partnerWall.title}</h2>
          <p className="mt-2 text-default-600">{content.home.partnerWall.caption}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-default-200/70 bg-background px-6 py-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-default-500">
              {content.home.partnerWall.academicTitle}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-default-600">
              {content.home.partnerWall.academic.map((partner) => (
                <span
                  key={partner}
                  className="rounded-full border border-default-200 px-3 py-1"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-default-200/70 bg-background px-6 py-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-default-500">
              {content.home.partnerWall.industryTitle}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-default-600">
              {content.home.partnerWall.industry.map((partner) => (
                <span
                  key={partner}
                  className="rounded-full border border-default-200 px-3 py-1"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-default-200/70 bg-default-50/60 px-6 py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm space-y-3">
            <h2 className="text-2xl font-semibold">{content.home.homeFooter.title}</h2>
            <p className="text-sm text-default-600">{content.home.homeFooter.address}</p>
            <div className="space-y-1 text-sm text-default-600">
              {content.home.homeFooter.emails.map((email) => (
                <p key={email}>{email}</p>
              ))}
              <p>{content.home.homeFooter.phone}</p>
            </div>
            <div className="flex gap-4 text-sm font-semibold text-primary">
              {content.home.homeFooter.socials.map((social) => (
                <Link
                  key={social.label}
                  as={NextLink}
                  href={social.href}
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid flex-1 gap-6 md:grid-cols-3">
            {content.home.homeFooter.quickLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-default-500">
                  {group.title}
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {group.links.map((item) => (
                    <li key={item.label}>
                      <Link
                        as={NextLink}
                        className="text-default-600 hover:text-primary"
                        href={localizeHref(locale, item.href)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
