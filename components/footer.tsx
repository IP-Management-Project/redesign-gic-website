"use client";

import React from "react";
import { 
  Facebook, 
  Linkedin, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUpRight 
} from "lucide-react";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import Link from "next/link";
import { Input } from "@heroui/input";

export default function GicFooter({ content }: { content: any }) {
  const currentYear = new Date().getFullYear();

  // Navigation from your content object
  const sitemap = content.navigation.primary;
  const utilityLinks = content.navigation.utility;

  return (
    <footer className="bg-background text-foreground pt-20 pb-10 border-t border-divider transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Brand and Sitemap */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand Bio (3/12) */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">
                GIC
              </div>
              <span className="font-black text-xl tracking-tighter">
                {content.brand.name}
              </span>
            </div>
            <p className="text-default-500 text-sm leading-relaxed">
              {content.description}
            </p>
            <div className="flex gap-3">
              {[Facebook, Linkedin, Youtube].map((Icon, i) => (
                <Button key={i} isIconOnly variant="flat" radius="full" size="sm" className="text-default-400 hover:text-primary transition-all">
                  <Icon size={18} />
                </Button>
              ))}
            </div>
          </div>

          {/* Column 2: The Sitemap (6/12) - Dynamic Grid */}
          <div className="md:col-span-6 grid grid-cols-2 lg:grid-cols-3 gap-8">
            {sitemap.map((category: any) => (
              <div key={category.label} className="flex flex-col gap-4">
                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-foreground">
                  {category.label}
                </h4>
                <ul className="flex flex-col gap-2">
                  {category.children?.map((child: any) => (
                    <li key={child.href}>
                      <Link 
                        href={child.href}
                        className="text-default-500 hover:text-primary text-sm transition-colors duration-300"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Column 3: Utility & Newsletter (3/12) */}
          <div className="md:col-span-3 flex flex-col gap-8">
            {/* Quick Utility Links */}
            <div className="flex flex-col gap-4">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-foreground">Quick Links</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {utilityLinks.map((link: any) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="text-default-500 hover:text-primary text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    {link.label}
                    <ArrowUpRight size={12} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Mini-Box */}
            <div className="p-5 rounded-2xl bg-default-50 dark:bg-default-100/10 border border-divider flex flex-col gap-4">
              <p className="text-xs font-bold text-foreground">Join Our Newsletter</p>
              <div className="flex flex-col gap-2">
                <Input
                  size="sm"
                  placeholder="Email" 
                  variant="bordered"
                  radius="lg"
                  classNames={{ inputWrapper: "bg-background border-divider" }}
                />
                <Button size="sm" color="primary" className="font-bold w-full" radius="lg">
                  Join
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Divider className="opacity-50" />

        {/* Bottom Bar: Contacts & Legal */}
        <div className="mt-10 flex flex-col lg:flex-row justify-between items-center gap-8 text-center lg:text-left">
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4">
            <div className="flex items-center gap-2 text-[11px] font-medium text-default-400">
              <MapPin size={14} className="text-primary" />
              Russian Blvd, Phnom Penh, Cambodia
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-default-400">
              <Phone size={14} className="text-primary" />
              +855 (0) 23 880 370
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-default-400">
              <Mail size={14} className="text-primary" />
              info@gic-itc.edu.kh
            </div>
          </div>
          
          <div className="text-[11px] font-bold text-default-400 uppercase tracking-widest">
            © {currentYear} {content.brand.name}
          </div>
        </div>
      </div>
    </footer>
  );
}