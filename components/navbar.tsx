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
import Image from "next/image";
import { ThemeSwitch } from "./theme-switch";

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
          <Image src={"/logos/gic.png"} alt="" width={50} height={50} />
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
        <ThemeSwitch />
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