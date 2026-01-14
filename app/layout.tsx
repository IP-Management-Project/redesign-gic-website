import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import GicNavbar from "@/components/navbar";
import { getSiteContent } from "@/content/site-content";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";
import GicFooter from "@/components/footer";

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
            {/* <Navbar /> */}
            <GicNavbar content={content}/>
            <main className="containe r mx -auto max -w-7xl pt -16 px- 6 flex-grow">
              {children}
            </main>
            <GicFooter content={content} />
                  {/* <footer className="border-t border-default-100 bg-default-100/30">
                    <div className={`${container} py-16 grid grid-cols-1 md:grid-cols-4 gap-10`}>
                      <div className="md:col-span-2 space-y-5">
                        <div className="text-2xl font-black text-primary">GIC • ITC</div>
                        <p className="text-default-500 max-w-md text-sm leading-relaxed">
                          {t.footerNote}
                        </p>
                        <div className="flex gap-6 text-sm font-bold text-default-400 uppercase tracking-widest">
                          <Link href="#" className="text-default-400 hover:text-primary">
                            Facebook
                          </Link>
                          <Link href="#" className="text-default-400 hover:text-primary">
                            LinkedIn
                          </Link>
                          <Link href="#" className="text-default-400 hover:text-primary">
                            GitHub
                          </Link>
                        </div>
                      </div>
            
                      <div className="grid grid-cols-2 md:col-span-2 gap-8">
                        <div className="space-y-3">
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-default-400">
                            Programs
                          </div>
                          <ul className="space-y-2 text-sm font-medium text-default-600">
                            <li>
                              <Link as={NextLink} href="/program">
                                Undergraduate
                              </Link>
                            </li>
                            <li>
                              <Link as={NextLink} href="/program/master">
                                Master & PhD
                              </Link>
                            </li>
                            <li>
                              <Link as={NextLink} href="/apply">
                                Admission
                              </Link>
                            </li>
                          </ul>
                        </div>
            
                        <div className="space-y-3">
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-default-400">
                            Resources
                          </div>
                          <ul className="space-y-2 text-sm font-medium text-default-600">
                            <li>
                              <Link as={NextLink} href="/research">
                                Research Labs
                              </Link>
                            </li>
                            <li>
                              <Link as={NextLink} href="/news-events/calendar">
                                Academic Calendar
                              </Link>
                            </li>
                            <li>
                              <Link as={NextLink} href="/faculty-staff">
                                Faculty Directory
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
            
                    <div className={`${container} pb-10`}>
                      <Divider />
                      <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-default-400 font-medium">
                        <div>© 2026 GIC - Institute of Technology of Cambodia. All rights reserved.</div>
                        <div className="flex gap-8">
                          <div>info@gic.itc.edu.kh</div>
                          <div>+855 23 880 370</div>
                        </div>
                      </div>
                    </div>
                  </footer>
             */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
