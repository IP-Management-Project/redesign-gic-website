"use client";

import React from "react";
import Link from "next/link";
import { Card, Divider, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { MoreVertical, Edit3, Trash2 } from "lucide-react";
import type { FacultyMember } from "@/hooks/useFacultyCentralize";

interface FacultyCardProps {
  member: FacultyMember;
  href?: string;
  showAdminMenu?: boolean;
  onEdit?: (member: FacultyMember) => void;
  onDelete?: (member: FacultyMember) => void;
}

export function FacultyCard({ member, href, showAdminMenu, onEdit, onDelete }: FacultyCardProps) {
  // Graceful splitting for degree strings
  const degreeParts = member.degree.includes(",") 
    ? member.degree.split(",") 
    : [member.degree, ""];

  const CardContent = (
    <Card className="group relative h-[500px] w-full border-none overflow-hidden bg-zinc-900 rounded-3xl shadow-2xl">
      {/* Background Image */}
      <img
        src={member.portrait}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90" />

      {/* Admin Menu Toggle */}
      {showAdminMenu && (
        <div 
          className="absolute top-4 right-4 z-30"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <Dropdown backdrop="opaque" classNames={{ content: "bg-zinc-900 border border-white/10 text-white" }}>
            <DropdownTrigger>
              <Button 
                isIconOnly 
                radius="full" 
                variant="flat" 
                className="bg-black/20 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10"
              >
                <MoreVertical size={20} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Profile Actions"
              onAction={(key) => key === "edit" ? onEdit?.(member) : onDelete?.(member)}
            >
              <DropdownItem key="edit" startContent={<Edit3 size={16} />}>Edit Profile</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger" startContent={<Trash2 size={16} />}>
                Delete Member
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 p-2 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10">
            <img src={member.uniLogo} alt="Logo" className="h-full w-full object-contain" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary leading-tight">
            {degreeParts[1]?.trim() || "Faculty"}
          </span>
        </div>

        <h3 className="text-3xl font-black text-white leading-tight tracking-tighter">
          {member.name}
        </h3>
        <p className="text-zinc-400 font-medium text-sm mt-1 mb-4">
          {degreeParts[0]?.trim()}
        </p>

        <Divider className="bg-white/10 mb-5" />

        <div className="overflow-hidden">
          <p className="text-sm text-zinc-300 line-clamp-2 italic mb-6 opacity-80 leading-relaxed">
            "{member.focus}"
          </p>
        </div>

        {/* View Link Decoration */}
        {!showAdminMenu && (
          <div className="h-0 group-hover:h-8 transition-all duration-500 opacity-0 group-hover:opacity-100 flex items-center">
            <span className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              View Full Profile <span className="text-primary text-xl">→</span>
            </span>
          </div>
        )}
      </div>
    </Card>
  );

  if (href && !showAdminMenu) {
    return <Link href={href} className="block">{CardContent}</Link>;
  }

  return CardContent;
}