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
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useUpdateStudentGenerationData } from "@/hooks/useUpdateStudentGenerationData";

export default function StudentGenerationPage() {
  const [selectedGen, setSelectedGen] = useState("Gen 8");
  const { data } = useStudentGenerationData();
  const { mutateAsync, isPending } = useUpdateStudentGenerationData();
  const generations = data?.generations ?? {};
  const cardPositions = data?.positions ?? [];
  const generationOptions = useMemo(() => Object.keys(generations), [generations]);
  const [formValues, setFormValues] = useState({
    generation: "",
    name: "",
    quote: "",
    image: "",
  });

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
        name: formValues.name,
        quote: formValues.quote,
        image: formValues.image,
      },
    });

    setFormValues((prev) => ({
      ...prev,
      name: "",
      quote: "",
      image: "",
    }));
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 overflow-hidden">
      
      {/* SELECTION OVERLAY (Professional Dropdown) */}
      <div className="absolute top-24 left-[85%] -translate-x-1/2 z-[10] w-full max-w-xs px-6">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-[#76879d]/20 shadow-2xl flex flex-col items-center">
          <GraduationCap className="text-[#26304d] mb-2" size={24} />
          <h1 className="text-xl font-black text-[#26304d] uppercase tracking-tighter mb-4">
             GIC Generation
          </h1>
          <Select 
            aria-label="Select GIC Generation"
            variant="bordered"
            selectedKeys={[selectedGen]}
            onSelectionChange={(keys) => setSelectedGen(Array.from(keys)[0] as string)}
            className="w-full"
            classNames={{
              trigger: "rounded-2xl border-[#c8c8c8] hover:border-[#26304d]",
              value: "font-bold text-[#26304d]"
            }}
          >
            {generationOptions.map((gen) => (
              <SelectItem key={gen} textValue={gen}>{gen}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <DraggableCardContainer className="relative flex h-screen w-full items-center justify-center">
        
        {/* REVEALED BACKGROUND TEXT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none opacity-10">
          <h2 className="max-w-2xl text-[8vw] font-black text-[#26304d] uppercase tracking-tighter leading-none">
            GIC Excellence
          </h2>
          <p className="mt-6 text-sm font-black uppercase tracking-[0.5em] text-[#76879d]">
            Revealing Students Potential
          </p>
        </div>

        {/* DRAGGABLE CARDS WITH ANIMATED SWITCHING */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGen}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative bg-amber- "
          >
            {(generations[selectedGen] ?? []).map((student, index) => (
              <DraggableCardBody 
                key={`${selectedGen}-${index}`} 
                className={`${cardPositions[index % cardPositions.length]} z-[${index + 10}]`}
              >
                <div className="relative p-2 bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-[#c8c8c8]/30 hover:border-[#26304d] transition-all group">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="pointer-events-none rounded-[2rem] h-64 w-64 md:h-80 md:w-80 object-cover group-hover:grayscale-0 transition-all duration-700"
                  />
                  
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-black text-[#26304d] dark:text-white uppercase tracking-tighter">
                      {student.name}
                    </h3>
                    <div className="h-1 w-12 bg-[#76879d] mx-auto my-3 group-hover:w-20 transition-all" />
                    <p className="text-[10px] md:text-xs font-medium italic text-slate-500 dark:text-zinc-400 leading-relaxed max-w-[240px] mx-auto">
                      "{student.quote}"
                    </p>
                  </div>
                </div>
              </DraggableCardBody>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* INTERACTION GUIDANCE */}
        <div className="absolute bottom-10 left-10 hidden md:block">
           <p className="text-[9px] font-black text-[#76879d] uppercase tracking-[0.4em] opacity-40">
             GIC Archive / {selectedGen} / Engineering foundations
           </p>
        </div>
      </DraggableCardContainer>
    </div>
  );
}
