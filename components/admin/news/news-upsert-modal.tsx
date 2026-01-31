import { NewsFormState } from "@/hooks/useNewsCentralize";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { FileEdit } from "lucide-react";

export function NewsUpsertModal({ isOpen, onOpenChange, form, setForm, onClose, onSubmit }: any) {
  return (
    <Modal
      isOpen={isOpen} 
      onOpenChange={onOpenChange} 
      size="3xl" 
      backdrop="blur" 
      scrollBehavior="inside"
      classNames={{ base: "bg-background", header: "border-b border-divider", footer: "border-t border-divider" }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 py-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileEdit size={20} className="text-primary" />
            </div>
            <h2 className="text-xl font-bold">{form.id ? "Edit News Article" : "Compose New Article"}</h2>
          </div>
        </ModalHeader>
        <ModalBody className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Category"
              placeholder="e.g. Technology"
              labelPlacement="outside"
              value={form.category}
              onValueChange={(v) => setForm((p: NewsFormState) => ({ ...p, category: v }))}
            />
            <Select
              label="Visibility Status"
              labelPlacement="outside"
              selectedKeys={[form.status]}
              onSelectionChange={(keys) => setForm((p: NewsFormState) => ({ ...p, status: Array.from(keys)[0] }))}
            >
              <SelectItem key="PUBLISHED" startContent={<div className="w-2 h-2 rounded-full bg-green-500" />}>Published</SelectItem>
              <SelectItem key="UNPUBLISHED" startContent={<div className="w-2 h-2 rounded-full bg-amber-500" />}>Draft</SelectItem>
            </Select>
            <Input
              className="md:col-span-2"
              label="Headline"
              placeholder="Enter a catchy title..."
              labelPlacement="outside"
              value={form.title}
              onValueChange={(v) => setForm((p: NewsFormState) => ({ ...p, title: v }))}
            />
            <Input
              label="Publish Date"
              placeholder="YYYY-MM-DD"
              labelPlacement="outside"
              value={form.date}
              onValueChange={(v) => setForm((p: NewsFormState) => ({ ...p, date: v }))}
            />
            <Input
              label="Cover Image URL"
              placeholder="/images/hero.jpg"
              labelPlacement="outside"
              value={form.image}
              onValueChange={(v) => setForm((p: NewsFormState) => ({ ...p, image: v }))}
            />
            <Textarea
              className="md:col-span-2"
              label="Content Snippet"
              placeholder="Provide a brief summary..."
              labelPlacement="outside"
              value={form.excerpt}
              onValueChange={(v) => setForm((p: NewsFormState) => ({ ...p, excerpt: v }))}
              minRows={4}
            />
          </div>
        </ModalBody>
        <ModalFooter className="py-4">
          <Button variant="light" onPress={onClose} className="font-semibold text-default-500">
            Discard
          </Button>
          <Button color="primary" onPress={onSubmit} className="font-bold px-8">
            {form.id ? "Update Post" : "Publish Article"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}