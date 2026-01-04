'use client';
import { GICLogo } from '@/components/icons/GICLogo';
import { Navigation } from './Navigation';
import { LanguageSelector } from './LanguageSelector';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openNavDropdown, setOpenNavDropdown] = useState<string | null>(null);
    const [isLangOpen, setIsLangOpen] = useState(false);

    // Close navigation dropdowns when language selector opens
    const handleLangOpen = (isOpen: boolean) => {
      setIsLangOpen(isOpen);
      if (isOpen) {
        setOpenNavDropdown(null);
      }
    };

    // Close language selector when navigation dropdowns open
    const handleNavDropdownOpen = (dropdown: string | null) => {
      setOpenNavDropdown(dropdown);
      if (dropdown) {
        setIsLangOpen(false);
      }
    };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between py-4">
          <GICLogo />
          <div className="hidden md:flex items-center gap-8">
            <Navigation openDropdown={openNavDropdown} setOpenDropdown={handleNavDropdownOpen} />
            <LanguageSelector isOpen={isLangOpen} setIsOpen={handleLangOpen} />
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded-md border border-gray-200 bg-gray-50"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-6 space-y-1 max-h-[calc(100vh-120px)] overflow-y-auto">
              <Navigation mobile openDropdown={openNavDropdown} setOpenDropdown={handleNavDropdownOpen} />
              <LanguageSelector mobile isOpen={isLangOpen} setIsOpen={handleLangOpen} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

