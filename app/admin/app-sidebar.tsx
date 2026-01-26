"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  // SidebarMenuSub,
  // SidebarMenuSubButton,
  // SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronRight } from "lucide-react";
import { Divider } from "@heroui/divider";

type NavItem = {
  title: string;
  url?: string;
  icon?: React.ComponentType<{ className?: string }>;
  items?: NavItem[]; // children
};

const data: {
  navMain: { title: string; items: NavItem[] }[];
} = {
  navMain: [
    {
      title: "CMS Overview",
      items: [{ title: "Dashboard", url: "/admin" }],
    },
    {
      title: "News & Events",
      items: [
        { title: "Centralize News", url: "/admin/news-centralize" },
        { title: "Publications", url: "/admin/events" },
      ]
    },
    {
      title: "Website Content Management",
      items: [
        { title: "Landing Page", url: "/admin/landing-page" },
        {
          title: "Programs",
          items: [
            { title: "National Program", url: "/admin/program/national" },
            { title: "International Program", url: "/admin/program/international" },
            { title: "Associate Program", url: "/admin/program/associate" },
            { title: "Master Program", url: "/admin/program/master" },
          ],
        },
        {
          title: "About GIC",
          items: [
            { title: "History of GIC", url: "/admin/history-gic" },
            { title: "Mission & Vision", url: "/admin/mission-vision" },
            { title: "Our Services", url: "/admin/our-services" },
          ],
        },
        { title: "Techno Innovation", url: "/admin/techno-innovation" },
        { title: "Laboratory", url: "/admin/laboratory" },
      ],
    },
    {
      title: "Faculty & Staff",
      items: [
        { title: "Head Dep Messages", url: "/admin/head-dep-messages" },
        { title: "Faculty & Staff", url: "/admin/faculty" }

      ],
    },
    {
      title: "Student Showcase",
      items: [
        { title: "Exchange Student Showcase", url: "/admin/exchange-student-showcase" },
        { title: "GIC Year book", url: "/admin/gic-year-book" },
      ],
    },
    {
      title: "Management",
      items: [
        {
          title: "Curriculum", url: "/admin/curriculum/national", items: [
            { title: "National Program", url: "/admin/curriculum/national" },
            { title: "International Program", url: "/admin/curriculum/international" },
            { title: "Associate Program", url: "/admin/curriculum/associate" },
            { title: "Master Program", url: "/admin/curriculum/master" }
          ]
        },
        { title: "Timetable", url: "/admin/timetable" },
        { title: "Schedule", url: "/admin/schedule" },
        { title: "Calendar", url: "/admin/calendar" },
        { title: "FAQ", url: "/admin/faq" },

      ],
    },
    {
      title: "Dynamic Project Content",
      items: [
        { title: "Projects", url: "/admin/projects" }, //Show all project and can click and navigate to GrapeJS editor page
      ],
    },
    {
      title: "Configuration",
      items: [
        { title: "Site settings", url: "/admin/settings" },
        { title: "Roles & access", url: "/admin/roles" },
      ],
    },
  ],
};

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.url && pathname === item.url) return true;
  if (item.items?.length) return item.items.some((c) => isItemActive(c, pathname));
  return false;
}

function NavTree({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item) => {
        const active = isItemActive(item, pathname);
        const hasChildren = !!item.items?.length;

        // Leaf item
        if (!hasChildren) {
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={!!item.url && pathname === item.url}>
                <Link href={item.url ?? "#"}>{item.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        }

        // Parent item with children (collapsible)
        return (
          <Collapsible key={item.title} defaultOpen={active} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton isActive={active}>
                  <span className="flex items-center gap-2">
                    {item.icon ? <item.icon className="h-4 w-4" /> : null}
                    <span>{item.title}</span>
                  </span>
                  <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items!.map((child) => (
                    <SidebarMenuSubItem key={child.title}>
                      {/* If you want 3 levels deep, you can recurse here too */}
                      <SidebarMenuSubButton asChild isActive={!!child.url && pathname === child.url}>
                        <Link href={child.url ?? "#"}>{child.title}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        );
      })}
    </>
  );
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <>
      <Sidebar {...props} >
        <SidebarHeader>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                CMS Admin
              </p>
              <h1 className="text-2xl font-semibold text-foreground">GIC Portal 2.0</h1>
            </div>
          </div>
        </SidebarHeader>
        <Divider />
        <SidebarContent>
          {data.navMain.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <NavTree items={group.items} />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>

      <SidebarRail />
    </>
  );
}
