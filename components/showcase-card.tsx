"use client";

import React from "react";
import { Card, Chip, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider, Avatar } from "@heroui/react";
import { MoreVertical, Edit3, Trash2, MapPin, Quote, GraduationCap } from "lucide-react";
import type { ShowcaseItem } from "@/hooks/useExchangeStoriesCentralize";

interface ShowcaseCardProps {
  item: ShowcaseItem;
  onEdit: (item: ShowcaseItem) => void;
  onDelete: (item: ShowcaseItem) => void;
}

export function ShowcaseCard({ item, onEdit, onDelete }: ShowcaseCardProps) {
  return (
    <Card className="group relative border border-divider bg-content1 hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden flex flex-col h-full">
      {/* Background Banner with Student Portrait */}
      <div className="relative h-40 w-full overflow-hidden">
        <img 
          src={item.backgroundImg} 
          alt={item.destination} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40 dark:opacity-20" 
        />
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4 z-20">
          <Chip 
            size="sm" 
            variant="flat" 
            color="primary"
            className="backdrop-blur-md bg-primary/10 font-bold uppercase text-[10px] tracking-widest border border-primary/20"
          >
            {item.type}
          </Chip>
        </div>

        {/* Floating Admin Menu */}
        <div className="absolute top-4 right-4 z-20" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="flat" className="bg-background/40 backdrop-blur-md border border-white/10 min-w-9 w-9 h-9">
                <MoreVertical size={18} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Actions" onAction={(key) => key === "edit" ? onEdit(item) : onDelete(item)}>
              <DropdownItem key="edit" startContent={<Edit3 size={16} />}>Edit Story</DropdownItem>
              <DropdownItem key="delete" color="danger" className="text-danger" startContent={<Trash2 size={16} />}>Remove Entry</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Portrait Overlay */}
        <div className="absolute -bottom-6 left-6 z-20">
          <Avatar 
            src={item.portrait} 
            className="w-20 h-20 border-4 border-content1 shadow-xl" 
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 pt-10 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-black leading-tight mb-1">{item.name}</h3>
          <div className="flex items-center gap-1.5 text-default-500 font-bold text-xs uppercase tracking-tight">
            <MapPin size={14} className="text-primary" />
            {item.destination}
          </div>
        </div>

        <Divider className="opacity-50 mb-4" />

        <div className="relative flex-grow">
          <Quote className="absolute -top-1 -left-1 opacity-10 text-primary" size={24} fill="currentColor" />
          <p className="text-sm text-default-600 italic leading-relaxed pl-5 line-clamp-3">
            {item.story}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-default-400">
            <GraduationCap size={16} className="text-primary" />
            {item.focus}
          </div>
          
          {/* Subtle Grid Span indicator (for Admin eyes) */}
          <div className="text-[9px] font-mono text-default-300">
            {item.span}
          </div>
        </div>
      </div>
    </Card>
  );
}