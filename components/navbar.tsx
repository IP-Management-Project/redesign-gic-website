// "use client";

// import {
//   Navbar as HeroUINavbar,
//   NavbarContent,
//   NavbarMenu,
//   NavbarMenuToggle,
//   NavbarBrand,
//   NavbarItem,
//   NavbarMenuItem,
// } from "@heroui/navbar";
// import { Kbd } from "@heroui/kbd";
// import { Link } from "@heroui/link";
// import { Input } from "@heroui/input";
// import { link as linkStyles } from "@heroui/theme";
// import NextLink from "next/link";
// import { usePathname } from "next/navigation";
// import clsx from "clsx";

// import { getSiteContent } from "@/content/site-content";
// import { defaultLocale, localeLabels, locales, localizeHref, stripLocaleFromPathname } from "@/lib/i18n";
// import { ThemeSwitch } from "@/components/theme-switch";
// import { SearchIcon, Logo } from "@/components/icons";

// export const Navbar = () => {
//   const pathname = usePathname() ?? "/";
//   const { locale: routeLocale, pathname: basePath } = stripLocaleFromPathname(pathname);
//   const locale = routeLocale ?? defaultLocale;
//   const content = getSiteContent(locale);
//   const searchInput = (
//     <Input
//       aria-label={content.topBar.searchPlaceholder}
//       classNames={{
//         inputWrapper: "bg-default-100",
//         input: "text-sm",
//       }}
//       endContent={
//         <Kbd className="hidden lg:inline-block" keys={["command"]}>
//           K
//         </Kbd>
//       }
//       labelPlacement="outside"
//       placeholder={content.topBar.searchPlaceholder}
//       startContent={
//         <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
//       }
//       type="search"
//     />
//   );

//   return (
//     <div className="sticky top-0 z-50">
//       <div className="border-b border-default-200/70 bg-background/80 backdrop-blur">
//         <div className="container mx-auto max-w-7xl px-6">
//           <div className="flex flex-wrap items-center justify-between gap-3 py-2 text-xs sm:text-sm">
//             <div className="flex items-center gap-2">
//               <span className="text-default-500">{content.topBar.languageLabel}</span>
//               <div className="flex items-center gap-2">
//                 {locales.map((language) => (
//                   <Link
//                     key={language}
//                     as={NextLink}
//                     className="text-default-600 hover:text-primary"
//                     href={localizeHref(language, basePath)}
//                     size="sm"
//                   >
//                     {localeLabels[language]}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="hidden md:flex items-center gap-4">
//                 {content.navigation.utility.map((link) => (
//                   <Link
//                     key={link.href}
//                     as={NextLink}
//                     className="text-default-600 hover:text-primary"
//                     href={localizeHref(locale, link.href)}
//                     size="sm"
//                   >
//                     {link.label}
//                   </Link>
//                 ))}
//               </div>
//               <div className="hidden lg:flex w-64">{searchInput}</div>
//               <ThemeSwitch />
//             </div>
//           </div>
//         </div>
//       </div>
//       <HeroUINavbar maxWidth="xl" position="static">
//         <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
//           <NavbarBrand as="li" className="gap-3 max-w-fit">
//             <NextLink
//               className="flex justify-start items-center gap-2"
//               href={localizeHref(locale, "/")}
//             >
//               <Logo />
//               <div>
//                 <p className="font-bold text-inherit">{content.brand.name}</p>
//                 <p className="text-xs text-default-500">{content.brand.tagline}</p>
//               </div>
//             </NextLink>
//           </NavbarBrand>
//           <ul className="hidden lg:flex gap-4 justify-start ml-2">
//             {content.navigation.primary.map((item) => (
//               <NavbarItem key={item.href}>
//                 <NextLink
//                   className={clsx(
//                     linkStyles({ color: "foreground" }),
//                     "data-[active=true]:text-primary data-[active=true]:font-medium",
//                   )}
//                   color="foreground"
//                   href={localizeHref(locale, item.href)}
//                 >
//                   {item.label}
//                 </NextLink>
//               </NavbarItem>
//             ))}
//           </ul>
//         </NavbarContent>

//         <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
//           <NavbarItem className="hidden md:flex">
//             <Link
//               as={NextLink}
//               className="text-sm font-medium"
//               href={localizeHref(locale, "/contact")}
//             >
//               {content.contact.title}
//             </Link>
//           </NavbarItem>
//         </NavbarContent>

//         <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
//           <ThemeSwitch />
//           <NavbarMenuToggle />
//         </NavbarContent>

//         <NavbarMenu>
//           <div className="px-4 pt-2">{searchInput}</div>
//           <div className="mx-4 mt-4 flex flex-col gap-2">
//             {content.navigation.menu.map((item) => (
//               <NavbarMenuItem key={item.href}>
//                 <Link
//                   as={NextLink}
//                   color="foreground"
//                   href={localizeHref(locale, item.href)}
//                   size="lg"
//                 >
//                   {item.label}
//                 </Link>
//               </NavbarMenuItem>
//             ))}
//           </div>
//           <div className="mx-4 mt-6 flex flex-col gap-2 text-sm text-default-500">
//             <p className="font-medium text-default-600">
//               {content.topBar.quickLinksLabel}
//             </p>
//             {content.navigation.utility.map((link) => (
//               <Link
//                 key={link.href}
//                 as={NextLink}
//                 href={localizeHref(locale, link.href)}
//                 size="sm"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>
//         </NavbarMenu>
//       </HeroUINavbar>
//     </div>
//   );
// };
"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { ChevronDown, Globe, FileText } from "lucide-react";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import Link from "next/link";

export default function GicNavbar({ content }: { content: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const researchItems = content.navigation.menu.filter((item: any) =>
    item.href.includes("research") || item.label === "Publications"
  );

  const studentItems = content.navigation.menu.filter((item: any) =>
    item.href.includes("student") || item.href.includes("calendar")
  );

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className="bg-background/70 backdrop-blur-xl border-b border-divider transition-colors duration-500"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as={NextLink} href="/" className="gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">
            GIC
          </div>
          <div className="hidden lg:flex flex-col">
            <p className="font-black text-foreground leading-tight tracking-tighter">
              {content.brand.name}
            </p>
            <p className="text-[10px] text-default-500 uppercase font-bold tracking-widest">
              {content.brand.tagline}
            </p>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* DESKTOP NAVIGATION (Center) */}
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {content.navigation.primary.map((item: any) => {
          const hasSubMenu = item.children && item.children.length > 0;

          if (hasSubMenu) {
            return (
              <Dropdown
                key={item.label}
                showArrow
                backdrop="transparent"
                classNames={{ content: "bg-content1 border border-divider shadow-xl" }}
              >
                <NavbarItem>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="p-0 bg-transparent data-[hover=true]:bg-transparent text-base font-bold text-foreground hover:text-primary transition-colors gap-1"
                      endContent={<ChevronDown size={14} className="text-default-400" />}
                      radius="sm"
                      variant="light"
                    >
                      {item.label}
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label={`${item.label} submenu`}
                  className="w-[280px]"
                  itemClasses={{
                    base: "gap-4 py-3",
                    title: "font-bold text-foreground",
                    description: "text-default-500 text-xs",
                  }}
                >
                  {item.children.map((child: any) => (
                    <DropdownItem
                      key={child.href}
                      description={child.desc}
                      href={child.href}
                      startContent={
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <FileText size={16} />
                        </div>
                      }
                    >
                      {child.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            );
          }

          return (
            <NavbarItem key={item.label}>
              <Link
                href={item.href}
                className="text-foreground font-bold hover:text-primary text-base transition-colors"
              >
                {item.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button variant="flat" size="sm" startContent={<Globe size={16} />} className="font-bold text-xs">
            EN
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-background/80 backdrop-blur-xl pt-10 px-8">
        <div className="flex flex-col gap-6">
          {content.navigation.menu.map((item: any, index: number) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  className="w-full text-foreground font-black text-3xl hover:text-primary transition-colors py-2"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </motion.div>
            </NavbarMenuItem>
          ))}

          <div className="mt-10 pt-10 border-t border-divider">
            <p className="text-default-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-4">Quick Contact</p>
            <Button fullWidth variant="flat" className="justify-start font-bold py-6">info@gic-itc.edu.kh</Button>
          </div>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}