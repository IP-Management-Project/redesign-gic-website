"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DraggableCardBody, 
  DraggableCardContainer 
} from "@/components/ui/draggable-card";
import { Select, SelectItem } from "@heroui/select";
import { GraduationCap } from "lucide-react";
import { useStudentGenerationData } from "@/hooks/useStudentGenerationData";
import { addToast } from "@heroui/toast";
import { useUpdateStudentGenerationData } from "@/hooks/useUpdateStudentGenerationData";

// Seeded random — stable across re-renders
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export default function StudentGenerationPage() {
  const [selectedGen, setSelectedGen] = useState("Gen 8");
  const { data } = useStudentGenerationData();
  const { mutateAsync, isPending } = useUpdateStudentGenerationData();
  const generations = data?.generations ?? {};
  const generationOptions = useMemo(() => Object.keys(generations), [generations]);
  const [formValues, setFormValues] = useState({
    id: "",
    generation: "",
    name: "",
    quote: "",
    image: "",
  });

  // Per-card random offsets & rotation (stable per generation)
  const cardRandoms = useMemo(() => {
    const map: Record<string, { offsetX: number; offsetY: number; rotate: number }[]> = {};
    for (const gen of Object.keys(generations)) {
      const students = generations[gen] ?? [];
      map[gen] = students.map((_, i) => {
        const seed = gen.charCodeAt(gen.length - 1) * 100 + i;
        return {
          offsetX: (seededRandom(seed) - 0.5) * 16,
          offsetY: (seededRandom(seed + 1) - 0.5) * 14,
          rotate: (seededRandom(seed + 2) - 0.5) * 8,
        };
      });
    }
    return map;
  }, [generations]);

  useEffect(() => {
    if (!formValues.generation && selectedGen) {
      setFormValues((prev) => ({ ...prev, generation: selectedGen }));
    }
  }, [formValues.generation, selectedGen]);

  const handleFieldChange = (field: keyof typeof formValues) => (value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddStudent = async () => {
    if (!formValues.generation || !formValues.name || !formValues.quote || !formValues.image) {
      addToast({
        title: "Missing information",
        description: "Please provide generation, name, quote, and an image URL.",
        severity: "warning",
      });
      return;
    }

    await mutateAsync({
      generation: formValues.generation,
      student: {
        id: formValues.id,
        name: formValues.name,
        quote: formValues.quote,
        image: formValues.image,
        generation: formValues.generation,
      },
    });

    setFormValues((prev) => ({
      ...prev,
      name: "",
      quote: "",
      image: "",
    }));
  };

  const currentStudents = generations[selectedGen] ?? [];
  const studentCount = currentStudents.length;

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 overflow-hidden">
      
      {/* HEADER BAR */}
      <div className="relative z-20 pt-6 md:pt-10 pb-3 md:pb-4 px-4 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-[#26304d] dark:text-white uppercase tracking-tighter">
            GIC <span className="text-[#76879d]">Yearbook</span>
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 mt-1 italic">
            Capturing the legacy of GIC excellence, one generation at a time.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl px-3 md:px-5 py-2.5 md:py-3 rounded-2xl border border-[#76879d]/20 shadow-lg flex items-center gap-2 md:gap-3 w-full md:w-auto">
            <GraduationCap className="text-[#26304d] dark:text-white shrink-0" size={18} />
            <Select 
              aria-label="Select GIC Generation"
              variant="bordered"
              selectedKeys={[selectedGen]}
              onSelectionChange={(keys) => setSelectedGen(Array.from(keys)[0] as string)}
              className="w-full md:w-40"
              classNames={{
                trigger: "rounded-xl border-[#c8c8c8] hover:border-[#26304d] h-9 min-h-9",
                value: "font-bold text-[#26304d] text-sm"
              }}
            >
              {generationOptions.map((gen) => (
                <SelectItem key={gen} textValue={gen}>{gen}</SelectItem>
              ))}
            </Select>
            <span className="text-[10px] md:text-xs font-bold text-[#26304d] bg-[#26304d]/10 px-2 md:px-3 py-1 rounded-full whitespace-nowrap dark:text-[white] dark:bg-[#76879d]/10">
              {studentCount} Student{studentCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* CARD GRID */}
      <DraggableCardContainer className="relative w-full min-h-[calc(100vh-140px)] px-3 sm:px-6 md:px-12 pb-8 md:pb-12">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selectedGen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 justify-items-center py-2 md:py-4"
          >
            {currentStudents.map((student, index) => {
              const rnd = cardRandoms[selectedGen]?.[index] ?? { offsetX: 0, offsetY: 0, rotate: 0 };

              return (
                <motion.div
                  key={`${selectedGen}-${student.id || index}`}
                  initial={{ opacity: 0, y: 30, rotate: rnd.rotate }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: rnd.rotate,
                    x: rnd.offsetX,
                    translateY: rnd.offsetY,
                  }}
                  transition={{
                    delay: Math.min(index * 0.03, 0.6),
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    rotate: 0,
                    x: 0,
                    translateY: -8,
                    scale: 1.06,
                    zIndex: 50,
                    transition: { duration: 0.2 },
                  }}
                >
                  <DraggableCardBody className="!min-h-0 !w-auto !rounded-xl md:!rounded-2xl">
                    <div className="p-1.5 sm:p-2 bg-white dark:bg-zinc-900 rounded-xl md:rounded-2xl shadow-md border border-zinc-200/60 dark:border-zinc-800 group cursor-grab active:cursor-grabbing">
                      {/* Image */}
                      <div className="relative overflow-hidden rounded-lg md:rounded-xl">
                        <img
                          src={student.image}
                          alt={student.name}
                          className="pointer-events-none object-cover w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 transition-transform duration-500 group-hover:scale-105"
                          draggable={false}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Info */}
                      <div className="py-1.5 sm:py-2.5 px-1 text-center">
                        <h3 className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-100 tracking-tight leading-tight truncate max-w-[140px] sm:max-w-[170px]">
                          {student.name}
                        </h3>
                        <div className="h-[2px] w-5 sm:w-6 bg-[#26304d]/30 dark:bg-zinc-600 mx-auto my-1 sm:my-1.5 group-hover:w-10 group-hover:bg-[#26304d] transition-all duration-300" />
                        <p className="text-[8px] sm:text-[9px] font-normal italic text-zinc-400 dark:text-zinc-500 leading-relaxed max-w-[130px] sm:max-w-[160px] mx-auto line-clamp-2">
                          &ldquo;{student.quote}&rdquo;
                        </p>
                      </div>
                    </div>
                  </DraggableCardBody>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* FOOTER */}
        <div className="mt-8 text-center">
          <p className="text-[9px] font-black text-[#76879d] dark:text-zinc-400 uppercase tracking-[0.4em] opacity-40">
            GIC Archive / {selectedGen} / Engineering foundations
          </p>
        </div>
      </DraggableCardContainer>
    </div>
  );
}
