import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { getSiteContent } from "@/content/site-content";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";
import { LanguageSwitch } from "@/components/language-switch";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, Logo } from "@/components/icons";

export const Navbar = async () => {
  const locale = await getLocale();
  const content = getSiteContent(locale);
  const searchInput = (
    <Input
      aria-label={content.topBar.searchPlaceholder}
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder={content.topBar.searchPlaceholder}
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <div className="sticky top-0 z-50">
      <div className="border-b border-default-200/70 bg-background/80 backdrop-blur">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-3 py-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-default-500">{content.topBar.languageLabel}</span>
              <LanguageSwitch currentLocale={locale} />
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-4">
                {content.navigation.utility.map((link) => (
                  <Link
                    key={link.href}
                    as={NextLink}
                    className="text-default-600 hover:text-primary"
                    href={localizeHref(locale, link.href)}
                    size="sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="hidden lg:flex w-64">{searchInput}</div>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
      <HeroUINavbar maxWidth="xl" position="static">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-2"
              href={localizeHref(locale, "/")}
            >
              <Logo />
              <div>
                <p className="font-bold text-inherit">{content.brand.name}</p>
                <p className="text-xs text-default-500">{content.brand.tagline}</p>
              </div>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {content.navigation.primary.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={localizeHref(locale, item.href)}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="hidden md:flex">
            <Link
              as={NextLink}
              className="text-sm font-medium"
              href={localizeHref(locale, "/contact")}
            >
              {content.contact.title}
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          <div className="px-4 pt-2">{searchInput}</div>
          <div className="mx-4 mt-4 flex flex-col gap-2">
            {content.navigation.menu.map((item) => (
              <NavbarMenuItem key={item.href}>
                <Link
                  as={NextLink}
                  color="foreground"
                  href={localizeHref(locale, item.href)}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
          <div className="mx-4 mt-6 flex flex-col gap-2 text-sm text-default-500">
            <p className="font-medium text-default-600">
              {content.topBar.quickLinksLabel}
            </p>
            {content.navigation.utility.map((link) => (
              <Link
                key={link.href}
                as={NextLink}
                href={localizeHref(locale, link.href)}
                size="sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </div>
  );
};
