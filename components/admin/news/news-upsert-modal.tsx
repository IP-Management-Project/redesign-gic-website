import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Plus, Layout } from "lucide-react";
import { NewsTemplate } from "@/api/services/news";

type TemplateSelectorProps = {
  isOpen: boolean;
  onClose: () => void;
  templates: NewsTemplate[] | undefined;
  isLoading: boolean;
  onSelect: (template?: NewsTemplate) => void;
};

export function TemplateSelector({
  isOpen,
  onClose,
  templates,
  isLoading,
  onSelect
}: TemplateSelectorProps) {

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Layout size={20} />
            Choose a Layout
          </div>
          <span className="text-sm font-normal text-default-500">
            Select a template to initialize your article structure.
          </span>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">

            {/* Blank Option */}
            <Card
              isPressable
              onPress={() => onSelect(undefined)}
              className="border-2 border-dashed border-default-300 hover:border-primary bg-transparent h-full min-h-[200px] flex items-center justify-center group"
            >
              <CardBody className="items-center justify-center text-center overflow-visible">
                <div className="w-14 h-14 rounded-full bg-default-100 flex items-center justify-center mb-3 text-default-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Plus size={28} />
                </div>
                <h4 className="font-bold text-lg">Blank Article</h4>
                <p className="text-xs text-default-400">Start from scratch</p>
              </CardBody>
            </Card>

            {/* Templates List */}
            {isLoading ? (
              <div className="col-span-2 flex items-center justify-center h-[200px] text-default-400">
                Loading templates...
              </div>
            ) : (
              templates?.map((t) => (
                <Card
                  key={t.id}
                  isPressable
                  onPress={() => onSelect(t)}
                  className="group hover:ring-2 hover:ring-primary transition-all h-full"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                    <iframe
                      srcDoc={`<style>${t.css}</style>${t.html}`}
                      className="w-[1200px] h-[800px] origin-top-left scale-[0.25] pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-semibold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
                        Use Template
                      </span>
                    </div>
                  </div>
                  <CardFooter className="flex flex-col items-start px-4 pb-4 pt-3">
                    <b className="text-small">{t.name}</b>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}