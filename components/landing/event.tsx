"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { SectionHeader } from "@/components/landing/section-header";
import { usePressReleaseData } from "@/hooks/usePressReleaseData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { NewsCard, NewsItem } from "../NewsCard";

type PressReleaseSlideshowProps = {
  t: {
    newsKicker: string;
    newsTitle: string;
    newsDesc: string;
  };
  section: string;
  container: string;
  editAction?: {
    label: string;
    onEdit: () => void;
  };
};

// Map your hook item -> NewsItem
function mapPressReleaseToNewsItem(item: any): NewsItem {
  return {
    id: item.id?.toString(),
    category: item.category,
    title: item.title,
    date: item.date,
    excerpt: item.excerpt,
    image: item.image,
    status: "PUBLISHED",
    updatedAt: Date.now(),
  };
}

export default function PressReleaseSlideshow({
  t,
  section,
  container,
  editAction,
}: PressReleaseSlideshowProps) {
  const { data: newsRaw = [] } = usePressReleaseData();
  const news = newsRaw.map(mapPressReleaseToNewsItem);

  return (
    <section
      className={`${section} relative bg-background text-foreground border-t pt-20 border-divider transition-colors duration-500`}
    >
      {editAction ? (
        <div className="absolute right-6 top-6 z-20">
          <Button size="sm" variant="flat" onPress={editAction.onEdit}>
            {editAction.label}
          </Button>
        </div>
      ) : null}

      <div className={container}>
        <SectionHeader
          kicker={t.newsKicker}
          titleText={t.newsTitle}
          desc={t.newsDesc}
          align="left"
        />

        <div className="mt-12">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="news-swiper !pb-14"
          >
            {news.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <div className="h-full">
                  <NewsCard item={item} href={`/news-events/${item.id}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Dynamic Swiper CSS for Dark/Light Mode */}
      <style jsx global>{`
        .news-swiper .swiper-button-next,
        .news-swiper .swiper-button-prev {
          color: var(--heroui-foreground);
          background: var(--heroui-content1);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--heroui-divider);
        }
        .news-swiper .swiper-pagination-bullet {
          background: var(--heroui-default-300);
        }
        .news-swiper .swiper-pagination-bullet-active {
          background: var(--heroui-foreground) !important;
          width: 24px;
          border-radius: 4px;
        }
        .dark .news-swiper .swiper-button-next,
        .dark .news-swiper .swiper-button-prev {
          background: #18181b; /* zinc-900 */
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </section>
  );
}
