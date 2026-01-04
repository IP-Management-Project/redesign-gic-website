import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { GICLogo } from '@/components/icons/GICLogo';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo & Info */}
          <div className="lg:col-span-1">
            <GICLogo showText={false} />
            <p className="text-gray-400 text-sm mt-4">
              Building excellence in information and communication engineering.
            </p>
          </div>

          {/* GIC's Reports */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {t('links.column1.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/alumni-messages"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {t('links.column1.studentsAlumni')}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {t('links.column1.notableWorks')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Alumni & Scholarships */}
          <div>
            <h3 className="font-semibold text-white mb-4">
              {t('links.column2.title')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/alumni-messages"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {t('links.column2.awardees')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {t('links.column2.scholarships')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & Programs */}
          <div>
            <h3 className="font-semibold text-white mb-4">Academic</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/programs"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/calendar"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h3 className="font-semibold text-white mb-4">Discover</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/events"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/internships"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Internships
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <p className="text-gray-400 text-sm">
                  Office 307F, Building F, PO Box 86, Russian Conf. Blvd, Phnom Penh, Cambodia
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-blue-400" />
                <a
                  href="tel:+855235555942"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  +855 (23) 5555 942
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-blue-400" />
                <a
                  href="mailto:itc.gicinfo@gmail.com"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  itc.gicinfo@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              Copyright © 2019 by GIC Department. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* <a
                href="#"
                className="text-blue-600 hover:text-blue-700 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                </svg>
              </a> */}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            {/* Website Link */}
            <a
              href="https://gic.itc.edu.kh"
              className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
            >
              gic.itc.edu.kh
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

