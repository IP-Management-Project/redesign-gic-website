import { routing } from '@/lib/i18n/routing';
import { ProgramLayout } from '@/components/layout/ProgramLayout';
import { engineerProgram } from '@/data/programs/engineer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function EngineerEntranceSelectionPage() {
  return (
    <ProgramLayout programSlug="engineer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Entrance Selection
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {engineerProgram.entranceSelection.description}
          </p>

          <div className="space-y-4">
            {engineerProgram.entranceSelection.details.map((detail, index) => (
              <p key={index} className="text-base text-gray-700 leading-relaxed">
                {detail}
              </p>
            ))}
          </div>
        </div>
      </div>
    </ProgramLayout>
  );
}
