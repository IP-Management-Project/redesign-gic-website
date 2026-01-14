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
import {Input} from "@heroui/input";

export default function GicFooter({ content }: { content: any }) {
  const currentYear = new Date().getFullYear();

  // Categorize links for the footer columns
  const mainLinks = content.navigation.primary;
  const resourceLinks = content.navigation.utility;
  
  return (
    <footer className="bg-background text-foreground pt-20 pb-10 border-t border-divider transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">
                GIC
              </div>
              <span className="font-black text-xl tracking-tighter">
                {content.brand.name}
              </span>
            </div>
            <p className="text-default-500 text-sm leading-relaxed max-w-sm">
              {content.description} Empowering the next generation of engineers through 
              world-class education and innovative research.
            </p>
            <div className="flex gap-4 mt-2">
              {[Facebook, Linkedin, Youtube].map((Icon, i) => (
                <Button key={i} isIconOnly variant="flat" radius="full" size="sm" className="text-default-400 hover:text-primary">
                  <Icon size={18} />
                </Button>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] text-default-400">Navigation</h4>
            <div className="flex flex-col gap-3">
              {mainLinks.map((link: any) => (
                <Link 
                  key={link.href} 
                //   as={NextLink} 
                  href={link.href} 
                  className="text-default-500 hover:text-primary text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Resources */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-[0.2em] text-default-400">Resources</h4>
            <div className="flex flex-col gap-3">
              {resourceLinks.map((link: any) => (
                <Link 
                  key={link.href} 
                //   as={NextLink} 
                  href={link.href} 
                  className="text-default-500 hover:text-primary text-sm font-medium transition-colors flex items-center gap-1 group"
                >
                  {link.label}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
              <Link  href="/contact" className="text-default-500 hover:text-primary text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="md:col-span-4 flex flex-col gap-6 p-6 rounded-3xl bg-default-50 dark:bg-default-100/10 border border-divider">
            <div className="flex flex-col gap-2">
              <h4 className="font-black text-lg">Join our newsletter</h4>
              <p className="text-xs text-default-500">Get the latest news, events, and research updates.</p>
            </div>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Email address" 
                variant="bordered"
                radius="lg"
                classNames={{ inputWrapper: "border-divider focus-within:!border-primary" }}
              />
              <Button color="primary" className="font-bold shadow-lg shadow-primary/20" radius="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Divider className="opacity-50" />

        {/* Bottom Bar: Contacts & Legal */}
        <div className="mt-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2 text-xs text-default-400">
              <MapPin size={14} className="text-primary" />
              Russian Blvd, Phnom Penh, Cambodia
            </div>
            <div className="flex items-center gap-2 text-xs text-default-400">
              <Phone size={14} className="text-primary" />
              +855 (0) 23 880 370
            </div>
            <div className="flex items-center gap-2 text-xs text-default-400">
              <Mail size={14} className="text-primary" />
              info@gic-itc.edu.kh
            </div>
          </div>
          
          <div className="text-xs text-default-400 font-medium">
            © {currentYear} {content.brand.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}