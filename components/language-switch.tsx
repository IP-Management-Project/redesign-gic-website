"use client";

import { Link } from "@heroui/link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { Locale, localeLabels, locales, localizeHref, stripLocaleFromPathname } from "@/lib/i18n";

type LanguageSwitchProps = {
  currentLocale: Locale;
  className?: string;
};

export const LanguageSwitch = ({ currentLocale, className }: LanguageSwitchProps) => {
  const pathname = usePathname() ?? "/";
  const { pathname: basePath } = stripLocaleFromPathname(pathname);

  return (
    <div className={clsx("flex items-center gap-2", className)}>
      {locales.map((language) => (
        <Link
          key={language}
          as={NextLink}
          className={clsx(
            "text-default-600 hover:text-primary",
            language === currentLocale && "text-primary font-semibold",
          )}
          href={localizeHref(language, basePath)}
          size="sm"
        >
          {localeLabels[language]}
        </Link>
      ))}
    </div>
  );
};
