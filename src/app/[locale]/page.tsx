import { HeroSection } from '@/components/sections/HeroSection';
import { GoalsSection } from '@/components/sections/GoalsSection';
import { AlumniMessagesSection } from '@/components/sections/AlumniMessagesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { InternshipsSection } from '@/components/sections/InternshipsSection';
import { EventsSection } from '@/components/sections/EventsSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { routing } from '@/lib/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GoalsSection />
      <AlumniMessagesSection />
      <ProjectsSection />
      <InternshipsSection />
      <EventsSection />
      <PartnersSection />
    </>
  );
}

