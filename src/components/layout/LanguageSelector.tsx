'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/routing';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'kh', name: 'Khmer', flag: '🇰🇭' },
  { code: 'fr', name: 'French', flag: '🇫🇷' }
];

interface LanguageSelectorProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  mobile?: boolean;
}

export function LanguageSelector({ isOpen: externalIsOpen, setIsOpen: externalSetIsOpen, mobile = false }: LanguageSelectorProps = {}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen || setInternalIsOpen;

  const currentLanguage = languages.find((lang) => lang.code === locale);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div
      className={cn(mobile && 'w-full pt-4 border-t border-gray-200')}
      ref={dropdownRef}
      onMouseEnter={() => !mobile && setIsOpen(true)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors',
          isOpen && 'text-blue-600',
          mobile && 'w-full px-2 py-3 hover:bg-gray-50 rounded-lg font-medium justify-between'
        )}
      >
        <span className={cn('text-sm font-medium', mobile && 'text-base')}>{currentLanguage?.code.toUpperCase()}</span>
        <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className={cn(
          'bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50',
          mobile ? 'mt-2 w-full' : 'absolute right-0 mt-2 w-40'
        )}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={cn(
                'w-full px-4 py-2 text-left flex items-center gap-2 text-sm hover:bg-gray-50 hover:text-blue-600 transition-colors',
                mobile && 'py-2.5',
                locale === lang.code && 'bg-blue-50 text-blue-600'
              )}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

