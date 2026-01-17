"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import NextLink from "next/link";
import { SectionHeader } from "@/components/landing/section-header";
import { usePressReleaseData } from "@/hooks/usePressReleaseData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type PressReleaseSlideshowProps = {
  t: {
    newsKicker: string;
    newsTitle: string;
  };
  section: string;
  container: string;
};

export default function PressReleaseSlideshow({
  t,
  section,
  container,
}: PressReleaseSlideshowProps) {
  const { data: news = [] } = usePressReleaseData();

  return (
    <section className={`${section} bg-background text-foreground border-t pt-20 border-divider transition-colors duration-500`}>
      <div className={container}>
        <SectionHeader
          kicker="Media Center"
          titleText="Latest Press Releases"
          desc="Official news and media updates from the Department of Information and Tech Engineering."
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
            {news.map((item, i) => (
              <SwiperSlide key={i} className="h-auto">
                <Card 
                  className="h-full border border-divider bg-content1 shadow-sm hover:shadow-xl dark:hover:shadow-primary/10 transition-all duration-300 group rounded-2xl overflow-hidden"
                >
                  {/* Image Section (Top) */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Chip 
                        size="sm"
                        variant="flat" 
                        className="bg-background/80 dark:bg-zinc-900/80 backdrop-blur-md text-foreground font-bold border-none shadow-sm"
                      >
                        {item.category}
                      </Chip>
                    </div>
                  </div>

                  {/* Content Section (Bottom) */}
                  <CardBody className="p-7 flex flex-col">
                    <div className="text-[11px] font-bold text-default-400 uppercase tracking-widest mb-3">
                      {item.date}
                    </div>
                    
                    <h3 className="text-xl font-black text-foreground leading-tight mb-4 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-default-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {item.excerpt}
                    </p>

                    <Divider className="mb-6 opacity-50" />

                    <Button 
                      as={NextLink} 
                      href={item.link}
                      variant="light"
                      color="primary"
                      className="w-fit p-0 font-bold text-sm bg-transparent hover:bg-tran sparent min-w-0"
                      endContent={<span>→</span>}
                    >
                      Read Full Story
                    </Button>
                  </CardBody>
                </Card>
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
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
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
        /* Fix for Swiper Navigation in Dark Mode */
        .dark .news-swiper .swiper-button-next,
        .dark .news-swiper .swiper-button-prev {
           background: #18181b; /* zinc-900 */
           box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }
      `}</style>
    </section>
  );
}
