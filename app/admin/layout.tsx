"use client";

import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  Breadcrumbs,
  BreadcrumbItem,
  User,
  Button,
  Input,
  Badge,
  Tooltip,
} from "@heroui/react";
import { Bell, Search, Settings, Command } from "lucide-react";
import { useAdminNavSearchShortcut } from "@/hooks/useAdminNavSearchShortcut";
import { AppSidebar, data } from "./app-sidebar";
import { AdminNavSearch } from "./admin-nav-search";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const searchInputRef = React.useRef<HTMLInputElement | null>(null);

  const focusSearch = React.useCallback(() => {
    searchInputRef.current?.focus();
    searchInputRef.current?.select?.();
  }, []);

  // Hook is active ONLY while AdminLayout is mounted
  const { search , index} = useAdminNavSearchShortcut({
    navMain: data.navMain,
    focusSearch,
    // onOpen: () => setPaletteOpen(true), // if you have a modal/palette
  });
  return (
    <div className="flex min-h-screen w-full bg-[#F9FAFB] dark:bg-black text-foreground">
      <SidebarProvider>
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 w-full border-b border-divider bg-background/70 backdrop-blur-md">
            <div className="flex h-16 items-center justify-between px-6 gap-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-1" />
                <div className="hidden md:block">
                  <Breadcrumbs
                    variant="light"
                    itemClasses={{
                      item: "text-default-400 font-medium data-[current=true]:text-foreground",
                      separator: "text-default-300",
                    }}
                  >
                    <BreadcrumbItem href="/admin">Workspace</BreadcrumbItem>
                    <BreadcrumbItem href="/admin/news">Content Management</BreadcrumbItem>
                  </Breadcrumbs>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div id="admincon" className="max-w-7xl mx-auto py-8 px-6">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
