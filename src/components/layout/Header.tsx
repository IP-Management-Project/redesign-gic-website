import { GICLogo } from '@/components/icons/GICLogo';
import { Navigation } from './Navigation';
import { LanguageSelector } from './LanguageSelector';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <GICLogo />
          <div className="flex items-center gap-6">
            <Navigation />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}

