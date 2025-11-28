'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Partner } from '@/types/content';
import { PaginationDots } from '@/components/ui/PaginationDots';

interface PartnerCarouselProps {
  partners: Partner[];
  itemsPerPage?: number;
}

export function PartnerCarousel({
  partners,
  itemsPerPage = 4
}: PartnerCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(partners.length / itemsPerPage);

  const currentPartners = partners.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      <div className="bg-white rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentPartners.map((partner) => (
          <div
            key={partner.id}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-24 mb-4">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
            {partner.description && (
              <p className="text-sm text-gray-600 text-center">
                {partner.description}
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

