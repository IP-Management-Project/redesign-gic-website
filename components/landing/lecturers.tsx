import React from 'react';
import { Card, CardBody } from "@heroui/card";
import { Avatar } from '@heroui/avatar';
import { Divider } from '@heroui/divider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, FreeMode } from 'swiper/modules';
import { SectionHeader } from '@/app/page';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

export default function FacultySlideshowFull({ t, section, container }) {
  const faculty = [
    {
      name: "Mr. Heng Rathpisey",
      degree: "Master of Engineering - MEng, Information Technology, Universitas Gadjah Mada (UGM)",
      focus: "Cloud Computing",
      portrait: "/lecturers/lec-pisey.png",
      uniLogo: "https://www.eduopinions.com/universities/universities-in-indonesia/gadjah-mada-university/",
    },
    {
      name: "Dr. Lina Chea",
      degree: "PhD, INSA Lyon",
      focus: "Cybersecurity & Privacy Engineering",
      portrait: "/lecturers/lec-pisey.png",
      uniLogo: "/images/logos/insa-lyon-white.png",
    },
    {
      name: "Dr. Vannak Chen",
      degree: "PhD, UTC Compiègne",
      focus: "Smart Systems & IoT Infrastructure",
      portrait: "/lecturers/lec-pisey.png",
      uniLogo: "/images/logos/utc-white.png",
    },
    {
      name: "Dr. Sokha Dara",
      degree: "PhD, INP Toulouse",
      focus: "AI for Khmer Language & NLP",
      portrait: "/lecturers/lec-pisey.png",
      uniLogo: "/images/logos/inp-toulouse-white.png",
    },
    {
      name: "Dr. Lina Chea",
      degree: "PhD, INSA Lyon",
      focus: "Cybersecurity & Privacy Engineering",
      portrait: "/images/faculty/lina-portrait.jpg",
      uniLogo: "/images/logos/insa-lyon-white.png",
    },
    {
      name: "Dr. Vannak Chen",
      degree: "PhD, UTC Compiègne",
      focus: "Smart Systems & IoT Infrastructure",
      portrait: "/images/faculty/vannak-portrait.jpg",
      uniLogo: "/images/logos/utc-white.png",
    }
  ];

  return (
    <section className={`${section} bg-zi nc-950`}>
      <div className={container}>
        <SectionHeader
          kicker={t.facultyKicker}
          titleText={t.facultyTitle}
          desc="PhD-qualified faculty with international experience."
        />

        <div className="mt-16">
          <Swiper
            modules={[Pagination, Autoplay, FreeMode]}
            spaceBetween={20}
            slidesPerView={1}
            freeMode={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="faculty-full-swiper !pb-14"
          >
            {faculty.map((prof, i) => (
              <SwiperSlide key={i} className="h-auto">
                <Card
                  className="group relative h-[600px] w-full border-none overflow-hidden bg-zinc-900 rounded-3xl"
                >
                  <img
                    src={prof.portrait}
                    alt={prof.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent via-10% opacity-90" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">

                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 p-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10">
                        <img
                          src={prof.uniLogo}
                          alt="University Logo"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary leading-tight">
                        {prof.degree.split(',')[1]}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-white leading-tight">
                      {prof.name}
                    </h3>

                    <p className="text-zinc-400 text-sm mt-1 mb-4">
                      {prof.degree.split(',')[0]}
                    </p>

                    <Divider className="bg-white/10 mb-4" />

                    <div className="overflow-hidden">
                      <p className="text-xs text-zinc-300 line-clamp-2 italic mb-2 opacity-80">
                        {prof.focus}
                      </p>
                    </div>

                    <div className="h-0 group-hover:h-10 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center">
                      <button className="text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        View Full Profile <span className="text-primary text-lg">→</span>
                      </button>
                    </div>

                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .faculty-full-swiper .swiper-pagination-bullet-active {
          background: var(--heroui-primary) !important;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}