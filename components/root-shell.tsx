"use client";

import { usePathname } from "next/navigation";
import GicFooter from "@/components/footer";
import GicNavbar from "@/components/navbar";
import type { getSiteContent } from "@/content/site-content";
import { usePages } from "@/hooks/usePageManager";

type RootShellProps = {
  children: React.ReactNode;
  content: ReturnType<typeof getSiteContent>;
};
export default function RootShell({ children, content }: RootShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const { data: dynamicPages } = usePages();

  const latestProjects = dynamicPages
    ?.slice(0, 5)
    .map((page) => ({
      label: page.title,
      href: `/project/${page.slug}`,
      desc: `View details for ${page.title}.`
    })) || [];

  const updatedContent = {
    ...content,
    navigation: {
      ...content.navigation,
      primary: content.navigation.primary.map((nav) => {
        if (nav.label === "Project") {
          return {
            ...nav,
            children: [
              ...(nav.children || []), 
              ...latestProjects,     
              { 
                label: "See All Projects →", 
                href: "/project", 
                desc: "Browse our complete directory of innovation projects." 
              }
            ]
          };
        }
        return nav;
      })
    }
  };

  if (isAdmin) return <div className="min-h-screen">{children}</div>;

  return (
    <div className="relative flex h-screen flex-col">
      <GicNavbar content={updatedContent} />
      <main className="">
        {children}
      </main>
      <GicFooter content={updatedContent} />
    </div>
  );
}