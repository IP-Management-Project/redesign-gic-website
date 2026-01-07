import { erasmusMontusData } from '@/data/erasmus-montus';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return erasmusMontusData.consortiumMeeting.meetings.map((meeting) => ({
    slug: meeting.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function MeetingDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const meeting = erasmusMontusData.consortiumMeeting.meetings.find(
    (m) => m.slug === slug
  );

  if (!meeting) {
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
              {meeting.title}
            </h1>
            {meeting.date && (
              <p className="text-xl text-blue-100">
                {meeting.date}
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
              {meeting.description}
            </p>
          </div>

          {/* Placeholder for additional content */}
          <div className="border border-gray-200 rounded-lg p-8 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Meeting Details
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Additional meeting information, agenda, and outcomes will be added here.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Meeting agenda and schedule</li>
                <li>Key discussion points</li>
                <li>Decisions and action items</li>
                <li>Presentations and materials</li>
                <li>Photos and documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
