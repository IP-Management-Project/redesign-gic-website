export type Locale = "en" | "km";

export const locales: Locale[] = ["en", "km"];
export const defaultLocale: Locale = "en";
export const localeLabels: Record<Locale, string> = {
  en: "EN",
  km: "KH",
};

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

const isExternalHref = (href: string) =>
  href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

export const localizeHref = (locale: Locale, href: string) => {
  if (!href || isExternalHref(href) || href.startsWith("#")) {
    return href;
  }

  const normalizedHref = href.startsWith("/") ? href : `/${href}`;
  const hasLocalePrefix = locales.some(
    (entry) =>
      normalizedHref === `/${entry}` || normalizedHref.startsWith(`/${entry}/`),
  );

  if (hasLocalePrefix) {
    return normalizedHref;
  }

  return `/${locale}${normalizedHref === "/" ? "" : normalizedHref}`;
};

export const stripLocaleFromPathname = (pathname: string) => {
  const matchedLocale = locales.find(
    (entry) => pathname === `/${entry}` || pathname.startsWith(`/${entry}/`),
  );

  if (!matchedLocale) {
    return { locale: null, pathname };
  }

  const strippedPath = pathname.replace(`/${matchedLocale}`, "") || "/";

  return { locale: matchedLocale, pathname: strippedPath };
};
