import { erasmusAlienData } from '@/data/erasmus-alien';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export async function generateStaticParams() {
  return erasmusAlienData.documents.files.map((file) => ({
    slug: file.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function DocumentDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const document = erasmusAlienData.documents.files.find(
    (d) => d.slug === slug
  );

  if (!document) {
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
              {document.title}
            </h1>
            {document.date && (
              <p className="text-xl text-purple-100">
                {document.date}
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
            <p className="text-black leading-relaxed">
              {document.description}
            </p>
          </div>

          {/* Document Information */}
          <div className=" rounded-lg p-8  mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Document Information
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Additional document details, contents, and download options will be added here.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Document overview and key sections</li>
                <li>Authors and contributors</li>
                <li>Publication date and version</li>
                <li>Related documents and references</li>
              </ul>
            </div>
          </div>

          {/* Download Section */}
          <div className="border border-gray-200 rounded-lg p-8 bg-blue-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Download Document
            </h3>
            <p className="text-gray-600 mb-6">
              The full document will be available for download. Link to be added.
            </p>
            <button 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Download PDF (Coming Soon)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
