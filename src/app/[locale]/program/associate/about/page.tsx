import { routing } from '@/lib/i18n/routing';
import { ProgramLayout } from '@/components/layout/ProgramLayout';
import { associateProgram } from '@/data/programs/associate';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function AssociateAboutPage() {
  return (
    <ProgramLayout programSlug="associate">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          {associateProgram.title}
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {associateProgram.about.description}
          </p>

          <div className="space-y-4">
            {associateProgram.about.details.map((detail, index) => (
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
