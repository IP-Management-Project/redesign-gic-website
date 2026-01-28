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

              <div className="hidden lg:flex flex-1 max-w-md">
                <AdminNavSearch index={index} search={search} maxResults={10} />
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full border border-success-100 bg-success-50 dark:bg-success-500/10 text-[11px] font-bold text-success-600 uppercase tracking-tight">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
                  </span>
                  Live System
                </div>

                <div className="flex items-center gap-1 border-l border-divider ml-2 pl-2">
                  <ThemeSwitch />

                  <Tooltip content="Notifications">
                    <Button isIconOnly variant="light" radius="full" size="sm">
                      <Badge color="danger" content="3" shape="circle" size="sm">
                        <Bell size={18} className="text-default-500" />
                      </Badge>
                    </Button>
                  </Tooltip>

                  <Tooltip content="Settings">
                    <Button isIconOnly variant="light" radius="full" size="sm">
                      <Settings size={18} className="text-default-500" />
                    </Button>
                  </Tooltip>
                </div>

                <Divider orientation="vertical" className="h-6 mx-1" />

                <User
                  name="Alex Rivera"
                  description="Senior Editor"
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                    size: "sm",
                    className: "cursor-pointer",
                  }}
                  classNames={{
                    name: "text-tiny font-bold",
                    description: "text-[10px]",
                  }}
                />
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

const Divider = ({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) => (
  <div
    className={`${className} bg-divider ${
      orientation === "vertical" ? "w-[1px] h-full" : "h-[1px] w-full"
    }`}
  />
);
