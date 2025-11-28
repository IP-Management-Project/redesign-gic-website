import Image from 'next/image';
import { Testimonial } from '@/types/content';
import { Card } from '@/components/ui/Card';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="p-6 h-full">
      <div className="flex flex-col h-full">
        {/* Profile Section */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
            <p className="text-sm text-gray-600">{testimonial.affiliation}</p>
          </div>
        </div>

        {/* Quote Icon and Message */}
        <div className="flex gap-4 flex-1">
          <div className="shrink-0">
            <Quote className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-gray-700 leading-relaxed flex-1">
            {testimonial.message}
          </p>
        </div>
      </div>
    </Card>
  );
}

