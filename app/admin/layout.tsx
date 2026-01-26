import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { ThemeSwitch } from "@/components/theme-switch";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <SidebarProvider>
        <AppSidebar />
        <div className="min-h-screen flex-1">
          <header className="border-b border-border bg-card px-6 py-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Admin workspace
                </p>
                <h2 className="text-2xl font-semibold text-foreground">
                  Content Management
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-muted-foreground">
                <ThemeSwitch />
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Live changes enabled
              </div>

            </div>
          </header>
          <main className="px-6 py-8">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
