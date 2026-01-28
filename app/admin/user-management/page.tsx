"use client";

import React, { useState } from "react";
import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, Chip, Tooltip, User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  CheckboxGroup, Checkbox
} from "@heroui/react";
import { 
  ShieldCheck, MoreVertical, Key, Smartphone, 
  UserPlus, Search, Lock, UserCog, Mail, Trash2 
} from "lucide-react";
import { GicUser, UserRole, useUserActions, useUserData } from "@/hooks/useUserManagement";

export default function UserManagementPage() {
  const { data: users, isLoading } = useUserData();
  const { upsertUser, resetPassword, generateOTP } = useUserActions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [selectedUser, setSelectedUser] = useState<Partial<GicUser> | null>(null);
  const [search, setSearch] = useState("");

  const roleColors: Record<UserRole, "danger" | "warning" | "primary" | "default"> = {
    SuperAdmin: "danger",
    Editor: "warning",
    Viewer: "primary",
    Student: "default"
  };

  const handleEdit = (user: GicUser) => {
    setSelectedUser(user);
    onOpen();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex justify-between items-end pb-8 border-b border-divider">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">
            Identity <span className="text-blue-600">Hub</span>
          </h1>
          <p className="text-default-500 font-medium">RBAC Security & Credential Management</p>
        </div>
        <Button 
          color="primary" size="lg" className="font-black px-8" 
          startContent={<UserPlus size={20}/>}
          onPress={() => { setSelectedUser({ id: crypto.randomUUID(), permissions: [] }); onOpen(); }}
        >
          Add Officer
        </Button>
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-4 p-4 bg-content1 rounded-[2rem] border border-divider shadow-sm">
        <Input 
          className="max-w-md" placeholder="Search by name, email or role..." 
          startContent={<Search size={18} className="text-default-400" />}
          value={search} onValueChange={setSearch}
        />
      </div>

      {/* ACCESS TABLE */}
      <Table 
        aria-label="User Management"
        classNames={{ wrapper: "rounded-[1rem] border border-divider shadow-none p-0 overflow-hidden" }}
      >
        <TableHeader>
          <TableColumn className="bg-default-50 py-4 font-black text-[10px] tracking-widest uppercase">Identity</TableColumn>
          <TableColumn className="bg-default-50 py-4 font-black text-[10px] tracking-widest uppercase">Access Role</TableColumn>
          <TableColumn className="bg-default-50 py-4 font-black text-[10px] tracking-widest uppercase">Status</TableColumn>
          <TableColumn className="bg-default-50 py-4 font-black text-[10px] tracking-widest uppercase">Last Sync</TableColumn>
          <TableColumn align="end" className="bg-default-50 py-4 font-black text-[10px] tracking-widest uppercase">Security Controls</TableColumn>
        </TableHeader>
        <TableBody emptyContent="Initializing Identity Manifest...">
          {(users || []).map((user) => (
            <TableRow key={user.id} className="border-b border-divider last:border-none hover:bg-default-50/50">
              <TableCell>
                <User
                  name={user.name}
                  description={user.email}
                  avatarProps={{ radius: "lg", src: `https://i.pravatar.cc/150?u=${user.id}` }}
                />
              </TableCell>
              <TableCell>
                <Chip size="sm" color={roleColors[user.role]} variant="flat" className="font-black text-[9px] uppercase tracking-tighter">
                  {user.role}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-success' : 'bg-danger'}`} />
                   <span className="text-xs font-bold">{user.status}</span>
                </div>
              </TableCell>
              <TableCell className="text-[11px] font-mono text-default-500">
                {new Date(user.lastLogin).toLocaleString()}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Tooltip content="Reset Password">
                    <Button isIconOnly size="sm" variant="flat" onPress={() => resetPassword(user.id)}><Key size={16} /></Button>
                  </Tooltip>
                  <Tooltip content="Generate OTP">
                    <Button isIconOnly size="sm" variant="flat" onPress={() => generateOTP(user.id)}><Smartphone size={16} /></Button>
                  </Tooltip>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly size="sm" variant="light"><MoreVertical size={16}/></Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem startContent={<UserCog size={16} />} onPress={() => handleEdit(user)} key={"1"}>Edit Permissions</DropdownItem>
                      <DropdownItem startContent={<Lock size={16} />} color="warning" key={"2"}>Suspend Access</DropdownItem>
                      <DropdownItem startContent={<Trash2 size={16} />} className="text-danger" color="danger" key={"3"}>Delete Profile</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* --- RBAC & PERMISSIONS MODAL --- */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl" backdrop="blur">
        <ModalContent>
          <form onSubmit={(e) => { e.preventDefault(); onClose(); }}>
            <ModalHeader className="flex gap-3 py-6 border-b border-divider">
              <ShieldCheck size={24} className="text-blue-600" />
              <h2 className="text-2xl font-black uppercase tracking-tighter">Profile Configuration</h2>
            </ModalHeader>
            <ModalBody className="py-8 grid grid-cols-2 gap-8">
              <Input label="FULL NAME" defaultValue={selectedUser?.name} isRequired labelPlacement="outside" variant="bordered" />
              <Input label="EMAIL ADDRESS" defaultValue={selectedUser?.email} startContent={<Mail size={16}/>} isRequired labelPlacement="outside" variant="bordered" />
              
              <div className="col-span-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-default-400 mb-4">Functional Permissions</p>
                <CheckboxGroup 
                  defaultValue={selectedUser?.permissions}
                  orientation="horizontal"
                  className="gap-6"
                >
                  <Checkbox value="edit_projects">Edit Projects</Checkbox>
                  <Checkbox value="manage_faq">Manage FAQ</Checkbox>
                  <Checkbox value="view_calendar">View Calendar</Checkbox>
                  <Checkbox value="publish_news">Publish News</Checkbox>
                  <Checkbox value="admin_access">Full Admin</Checkbox>
                </CheckboxGroup>
              </div>
            </ModalBody>
            <ModalFooter className="border-t border-divider py-6">
              <Button variant="light" className="font-bold" onPress={onClose}>Discard</Button>
              <Button color="primary" type="submit" className="font-black px-12 shadow-lg shadow-blue-600/20 uppercase tracking-widest">
                Sync Identity
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}