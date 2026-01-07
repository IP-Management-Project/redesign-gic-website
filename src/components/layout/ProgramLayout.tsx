'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';

type ProgramLayoutProps = {
  children: React.ReactNode;
  programSlug: 'engineer' | 'master' | 'doctor' | 'associate';
};

const tabs = [
  { key: 'about', label: 'About the program' },
  { key: 'curriculum', label: 'Curriculum' },
  { key: 'entrance-selection', label: 'Entrance Selection' },
];

export function ProgramLayout({ children, programSlug }: ProgramLayoutProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const basePath = `/${locale}/program/${programSlug}`;

  return (
    <div className="bg-white min-h-screen">
      {/* Tabs Navigation */}
      <div className="bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto" aria-label="Program tabs">
            {tabs.map((tab) => {
              const tabPath = `${basePath}/${tab.key}`;
              const isActive = pathname === tabPath || (pathname === basePath && tab.key === 'about');

              return (
                <Link
                  key={tab.key}
                  href={tabPath}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${
                      isActive
                        ? 'border-blue-600 text-blue-600 '
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
