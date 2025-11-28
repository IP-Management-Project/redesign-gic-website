'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/routing';
import { navigationItems } from '@/data/navigation';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useState } from 'react';

export function Navigation() {
  const t = useTranslations();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="flex items-center gap-6">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        const hasChildren = item.children && item.children.length > 0;

        return (
          <div key={item.href} className="relative">
            {hasChildren ? (
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={cn(
                    'flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors',
                    isActive && 'text-blue-600'
                  )}
                >
                  <span>{t(item.label)}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {openDropdown === item.href && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                      >
                        {t(child.label)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  'text-gray-700 hover:text-blue-600 transition-colors',
                  isActive && 'text-blue-600 font-medium'
                )}
              >
                {t(item.label)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

