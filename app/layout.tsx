import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { getSiteContent } from "@/content/site-content";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const content = getSiteContent(locale);
  const copyrightNotice = content.footer.copyright.replace(
    "{year}",
    new Date().getFullYear().toString(),
  );

  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full border-t border-default-200/70 py-6">
              <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 text-sm text-default-600 md:flex-row">
                <p>{copyrightNotice}</p>
                <div className="flex flex-wrap items-center gap-4">
                  {content.footer.links.map((link) => (
                    <Link
                      key={link.href}
                      as={NextLink}
                      href={localizeHref(locale, link.href)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
