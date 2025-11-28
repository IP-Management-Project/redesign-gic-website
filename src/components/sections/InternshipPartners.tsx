'use client';

import { useState } from 'react';
import Image from 'next/image';
import { InternshipPartner } from '@/types/content';
import { PaginationDots } from '@/components/ui/PaginationDots';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

interface InternshipPartnersProps {
  partners: InternshipPartner[];
  itemsPerPage?: number;
}

export function InternshipPartners({
  partners,
  itemsPerPage = 4
}: InternshipPartnersProps) {
  const t = useTranslations('internships');
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(partners.length / itemsPerPage);

  const currentPartners = partners.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      {/* Banner Image */}
      <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
        <Image
          src="/images/internships/banner.svg"
          alt="Internship banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button variant="primary">{t('viewEvents')}</Button>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="bg-white rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentPartners.map((partner) => (
          <div
            key={partner.id}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-32 mb-4">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
            {partner.tagline && (
              <p className="text-xs text-gray-600 text-center mt-2">
                {partner.tagline}
              </p>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <PaginationDots
            total={totalPages}
            current={currentPage}
          />
        </div>
      )}
    </div>
  );
}

