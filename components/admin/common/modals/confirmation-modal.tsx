"use client";

{/* <ConfirmModal
  isOpen={isDeleteOpen}
  onClose={() => setIsDeleteOpen(false)}
  onConfirm={handleDelete}
  isLoading={loading}
  title="Delete Article?"
  message="Are you sure you want to delete this article? It will be removed permanently."
  confirmLabel="Yes, Delete"
/> */}

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;

  title?: string;
  message?: React.ReactNode;

  /** * If provided, the user must type this string to enable the confirm button.
   * Leave undefined for simple confirmation.
   */
  matchKeyword?: string;

  isLoading?: boolean;
  confirmLabel?: string;
  confirmColor?: "danger" | "primary" | "warning";
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  matchKeyword,
  isLoading = false,
  confirmLabel = "Confirm",
  confirmColor = "danger",
}: ConfirmModalProps) {
  const [inputValue, setInputValue] = useState("");

  // Reset input when modal opens/closes
  useEffect(() => {
    if (isOpen) setInputValue("");
  }, [isOpen]);

  // Logic: If matchKeyword exists, input must match. Otherwise, always true.
  const isConfirmEnabled = matchKeyword
    ? inputValue === matchKeyword
    : true;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
      backdrop="blur"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex gap-2 items-center">
              <AlertTriangle className={`text-${confirmColor}-500`} size={24} />
              {title}
            </ModalHeader>

            <ModalBody>
              <div className="text-default-500">
                {message}
              </div>

              {/* Strict Mode: Input Field */}
              {matchKeyword && (
                <div className="mt-4 p-3 bg-default-100 rounded-medium space-y-2">
                  <p className="text-tiny font-bold uppercase text-default-500">
                    Type <span className="text-default-900 font-mono select-all">"{matchKeyword}"</span> to confirm:
                  </p>
                  <Input
                    placeholder={matchKeyword}
                    value={inputValue}
                    onValueChange={setInputValue}
                    color={confirmColor}
                    variant="bordered"
                    classNames={{ input: "font-mono" }}
                    // Allow pressing Enter to submit if enabled
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && isConfirmEnabled && !isLoading) {
                        onConfirm();
                      }
                    }}
                  />
                </div>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                variant="light"
                onPress={onClose}
                isDisabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                color={confirmColor}
                onPress={onConfirm}
                isLoading={isLoading}
                isDisabled={!isConfirmEnabled}
                variant="shadow"
              >
                {confirmLabel}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}