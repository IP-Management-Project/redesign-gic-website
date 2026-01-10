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

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, Logo } from "@/components/icons";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
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
      placeholder="Search..."
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
              <span className="text-default-500">Language</span>
              <div className="flex items-center gap-2">
                {siteConfig.languages.map((language) => (
                  <Link
                    key={language.label}
                    as={NextLink}
                    className="text-default-600 hover:text-primary"
                    href={language.href}
                    size="sm"
                  >
                    {language.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-4">
                {siteConfig.utilityLinks.map((link) => (
                  <Link
                    key={link.href}
                    as={NextLink}
                    className="text-default-600 hover:text-primary"
                    href={link.href}
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
            <NextLink className="flex justify-start items-center gap-2" href="/">
              <Logo />
              <div>
                <p className="font-bold text-inherit">GIC Engineering</p>
                <p className="text-xs text-default-500">Global Innovation Center</p>
              </div>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="hidden md:flex">
            <Link as={NextLink} className="text-sm font-medium" href="/contact">
              Contact
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
            {siteConfig.navMenuItems.map((item) => (
              <NavbarMenuItem key={item.href}>
                <Link as={NextLink} color="foreground" href={item.href} size="lg">
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
          <div className="mx-4 mt-6 flex flex-col gap-2 text-sm text-default-500">
            <p className="font-medium text-default-600">Quick links</p>
            {siteConfig.utilityLinks.map((link) => (
              <Link key={link.href} as={NextLink} href={link.href} size="sm">
                {link.label}
              </Link>
            ))}
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </div>
  );
};
