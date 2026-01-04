'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/routing';
import { navigationItems } from '@/data/navigation';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useState, useRef, useEffect } from 'react';

interface NavigationProps {
  mobile?: boolean;
  openDropdown?: string | null;
  setOpenDropdown?: (dropdown: string | null) => void;
}

export function Navigation({mobile, openDropdown: externalOpenDropdown, setOpenDropdown: externalSetOpenDropdown}: NavigationProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [internalOpenDropdown, setInternalOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use external state if provided, otherwise use internal state
  const openDropdown = externalOpenDropdown !== undefined ? externalOpenDropdown : internalOpenDropdown;
  const setOpenDropdown = externalSetOpenDropdown || setInternalOpenDropdown;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openDropdown]);

  return (
    <nav className={cn(
      mobile ? 'flex flex-col w-full' : 'flex items-center gap-8'
    )}>
      {navigationItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        const hasChildren = item.children && item.children.length > 0;
        const isDropdownOpen = openDropdown === item.href;

        return (
          <div
            key={item.href}
            className="relative"
            ref={item.href === openDropdown ? dropdownRef : null}
            onMouseEnter={() => hasChildren && setOpenDropdown(item.href)}
          >
            {hasChildren ? (
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(isDropdownOpen ? null : item.href)}
                  className={cn(
                    'flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors',
                    isActive && 'text-blue-600',
                    isDropdownOpen && 'text-blue-600',
                    mobile && 'w-full justify-between py-2'
                  )}
                >
                  <span>{t(item.label)}</span>
                  <ChevronDown className={cn('w-4 h-4 transition-transform', isDropdownOpen && 'rotate-180')} />
                </button>
                {isDropdownOpen && (
                  <div className={cn(
                    'bg-white border border-gray-200 py-2 z-50',
                    mobile ? 'ml-4 mt-1 rounded-lg' : 'absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg'
                  )}>
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'block text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors',
                          mobile ? 'px-4 py-2' : 'px-4 py-2'
                        )}
                        onClick={() => setOpenDropdown(null)}
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
                  isActive && 'text-blue-600 font-medium',
                  mobile ? 'block px-2 py-3 hover:bg-gray-50 rounded-lg font-medium' : ''
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

