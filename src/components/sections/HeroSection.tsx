'use client';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { PaginationDots } from '@/components/ui/PaginationDots';

export function HeroSection() {
  const t = useTranslations('home.hero');
  const slides = useMemo(
    () => [
      {
        image: '/images/hero/huawei-competition.jpg',
        title: 'Together, Building a Better Future for Cambodia',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type',
      },
      {
        image: '/images/hero/gic.jpg',
        title: 'Innovation in Education',
        description: 'Discover our cutting-edge programs designed to empower the next generation of technology leaders and innovators in Cambodia.',
      },
      {
        image: '/images/hero/huawei-competition.jpg',
        title: 'Research & Excellence',
        description: 'Engage with our world-class faculty and state-of-the-art facilities dedicated to advancing knowledge and technology.',
      },
      {
        image: '/images/hero/gic.jpg',
        title: 'Global Partnerships',
        description: 'Collaborate with international institutions and partners to create opportunities for growth and cultural exchange.',
      },
      {
        image: '/images/hero/huawei-competition.jpg',
        title: 'Student Success Stories',
        description: 'Meet our alumni who are making a difference in technology, business, and society across the region and beyond.',
      },
    ],
    []
  );
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(
      () => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
      },
      3000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSelect = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 1
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeIn' }
    })
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:gap-16 items-center lg:grid-cols-2 md:grid-cols-1">
          <ContentBlock
            tLabel={t('label', { defaultMessage: 'GIC Highlights' })}
            title={slides[current].title}
            description={slides[current].description}
            direction={direction}
          />

          <div className="relative w-full aspect-[3/4] md:aspect-square lg:aspect-auto lg:h-[520px]" style={{ perspective: '1400px' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="h-full w-full"
              >
                <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl lg:shadow-xl">
                  <Image
                    src={slides[current].image}
                    alt="Hero banner"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/65 via-black/35 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.25),transparent_45%)]" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        <div className="mt-10 flex items-center gap-6">
          <PaginationDots
            total={slides.length}
            current={current}
            onSelect={handleSelect}
            className="justify-start"
          />
          <span className="text-slate-500 text-sm">
            {current + 1} / {slides.length}
          </span>
        </div>
        </div>
      </div>
    </section>
  );
}

type ContentBlockProps = {
  tLabel: string;
  title: string;
  description: string;
  direction: number;
};

function ContentBlock({ tLabel, title, description, direction }: Omit<ContentBlockProps, 'align'>) {
  const textAlign = 'text-left items-start';
  const delayBase = 0.15;

  return (
    <div className={`flex flex-col gap-4 ${textAlign}`}>
      <motion.span
        className="inline-flex items-center px-4 py-2 rounded-full border border-slate-300 bg-slate-100 backdrop-blur text-sm text-slate-700"
        initial={{ opacity: 0, y: 10, x: direction > 0 ? -6 : 6 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: delayBase, duration: 0.4 }}
      >
        {tLabel}
      </motion.span>
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
        initial={{ opacity: 0, y: 20, x: direction > 0 ? -10 : 10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: delayBase + 0.08, duration: 0.6 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-slate-700 max-w-2xl"
        initial={{ opacity: 0, y: 18, x: direction > 0 ? -8 : 8 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: delayBase + 0.16, duration: 0.6 }}
      >
        {description}
      </motion.p>
    </div>
  );
}

