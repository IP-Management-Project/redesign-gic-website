"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

export function LeaveWarningModal({
  open,
  onCancel,
  onProceed,
}: {
  open: boolean;
  onCancel: () => void;
  onProceed: () => void;
}) {
  return (
    <Modal isOpen={open} onClose={onCancel}>
      <ModalContent>
        <ModalHeader>Unsaved changes</ModalHeader>
        <ModalBody>
          You have unsaved changes. If you leave now, your changes will be lost.
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onCancel}>
            Stay
          </Button>
          <Button color="danger" onPress={onProceed}>
            Leave
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
