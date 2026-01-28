"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type UserRole = "SuperAdmin" | "Editor" | "Viewer" | "Student";

export type GicUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "Active" | "Suspended" | "Pending";
  permissions: string[];
  lastLogin: string;
};

const mockUsers: GicUser[] = [
  {
    id: "u-1",
    name: "Admin User",
    email: "admin@gic.itc.edu",
    role: "SuperAdmin",
    status: "Active",
    permissions: ["all"],
    lastLogin: "2026-01-28T07:00:00Z"
  },
  {
    id: "u-2",
    name: "Sok Rath",
    email: "sok.rath@student.itc.edu",
    role: "Editor",
    status: "Active",
    permissions: ["edit_projects", "view_calendar"],
    lastLogin: "2026-01-27T14:30:00Z"
  }
];

export function useUserData() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => mockUsers,
    staleTime: 300000,
  });
}

export function useUserActions() {
  const queryClient = useQueryClient();

  // Basic CRUD
  const upsertUser = useMutation({
    mutationFn: async (user: GicUser) => user,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  // Security Actions
  const resetPassword = (userId: string) => {
    console.log(`Password reset email triggered for: ${userId}`);
    alert("System: Recovery link sent to user email.");
  };

  const generateOTP = (userId: string) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(`OTP for ${userId}: ${otp}`);
    alert(`Temporary Access Code: ${otp} (Valid for 5 mins)`);
  };

  return { 
    upsertUser: upsertUser.mutate, 
    resetPassword, 
    generateOTP,
    isUpdating: upsertUser.isPending 
  };
}