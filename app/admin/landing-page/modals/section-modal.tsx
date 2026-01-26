"use client";

import React from "react";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDraggable,
} from "@heroui/modal";

type SectionModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  isSaving?: boolean;
  onSave: () => void;
  children: React.ReactNode;
};

export default function SectionModal({
  title,
  isOpen,
  onClose,
  isSaving = false,
  onSave,
  children,
}: SectionModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const { moveProps } = useDraggable({ targetRef: modalRef });

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent ref={modalRef}>
        {(modalOnClose) => (
          <>
            <ModalHeader {...moveProps} className="cursor-move">
              {title}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter className="justify-between">
              <Button variant="flat" onPress={modalOnClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onSave} isLoading={isSaving}>
                Save changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
