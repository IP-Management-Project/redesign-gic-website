import { routing } from '@/lib/i18n/routing';
import { ProgramLayout } from '@/components/layout/ProgramLayout';
import { doctorProgram } from '@/data/programs/doctor';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function DoctorCurriculumPage() {
  return (
    <ProgramLayout programSlug="doctor">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Curriculum
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {doctorProgram.curriculum.description}
          </p>

          {/* Curriculum image or content will be added here */}
        </div>
      </div>
    </ProgramLayout>
  );
}
