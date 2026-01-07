import { erasmusAlienData } from '@/data/erasmus-alien';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export async function generateStaticParams() {
  return erasmusAlienData.training.workshops.map((workshop) => ({
    slug: workshop.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function TrainingDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const workshop = erasmusAlienData.training.workshops.find(
    (w) => w.slug === slug
  );

  if (!workshop) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0 bg-white" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-black">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {workshop.title}
            </h1>
            {workshop.date && (
              <p className="text-xl text-green-100">
                {workshop.date}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Description */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-700 leading-relaxed">
              {workshop.description}
            </p>
          </div>

          {/* Placeholder for additional content */}
          <div className="border border-gray-200 rounded-lg p-8 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Training Workshop Details
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Additional workshop information, curriculum, and materials will be added here.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Workshop objectives and learning outcomes</li>
                <li>Training schedule and sessions</li>
                <li>Participant information</li>
                <li>Training materials and resources</li>
                <li>Workshop photos and videos</li>
                <li>Certificates and achievements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
