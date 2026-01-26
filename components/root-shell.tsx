"use client";

import { usePathname } from "next/navigation";

import GicFooter from "@/components/footer";
import GicNavbar from "@/components/navbar";
import type { getSiteContent } from "@/content/site-content";

type RootShellProps = {
  children: React.ReactNode;
  content: ReturnType<typeof getSiteContent>;
};

export default function RootShell({ children, content }: RootShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="relative flex h-screen flex-col">
      <GicNavbar content={content} />
      <main className="containe r mx -auto max -w-7xl pt -16 px- 6 flex-grow">
        {children}
      </main>
      <GicFooter content={content} />
    </div>
  );
}
