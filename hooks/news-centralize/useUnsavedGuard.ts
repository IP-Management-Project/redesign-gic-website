"use client";

import { useEffect, useRef, useState } from "react";

export function useUnsavedChangesGuard(isDirty: boolean) {
  const [open, setOpen] = useState(false);
  const pendingActionRef = useRef<null | (() => void)>(null);

  // Browser refresh / close tab
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  // Call this instead of router.push/back directly
  const confirmNavigate = (action: () => void) => {
    if (!isDirty) {
      action();
      return;
    }
    pendingActionRef.current = action;
    setOpen(true);
  };

  const cancel = () => {
    pendingActionRef.current = null;
    setOpen(false);
  };

  const proceed = () => {
    setOpen(false);
    const action = pendingActionRef.current;
    pendingActionRef.current = null;
    action?.();
  };

  return { open, confirmNavigate, cancel, proceed };
}
