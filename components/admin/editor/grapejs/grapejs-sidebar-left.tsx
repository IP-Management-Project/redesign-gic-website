"use client";

import React from "react";
import { ArrowLeft, RefreshCw, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { Divider } from "@heroui/divider";

type SaveButtonProps = {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
  loadingLabel?: string;
  icon?: React.ReactNode; // optional override
};

type GrapesSidebarLeftProps = {
  title?: string; // optional heading at top of form area
  onBack?: () => void; // optional override (default: router.back)
  save?: SaveButtonProps; // optional (hide save button if not provided)
  children?: React.ReactNode; // dynamic form fields from parent
  showBlocks?: boolean; // default true
  showLayers?: boolean; // default true
  blocksLabel?: string; // default "Blocks"
  layersLabel?: string; // default "Layers"
  className?: string;
};

export function GrapesSidebarLeft({
  title,
  onBack,
  save,
  children,
  showBlocks = true,
  showLayers = true,
  blocksLabel = "Blocks",
  layersLabel = "Layers",
  className = "",
}: GrapesSidebarLeftProps) {
  const router = useRouter();

  const isSaving = !!save?.isLoading;
  const saveDisabled = !!save?.disabled || isSaving;

  return (
    <aside
      className={[
        "w-[360px] border-r border-default-100 flex flex-col bg-[#0f0f10] text-white overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* Toolbar */}
      <div className="p-3 border-b border-default-100 flex gap-2">
        <button
          onClick={() => (onBack ? onBack() : router.back())}
          className="p-2 hover:bg-white/10 rounded-md transition text-default-400"
          type="button"
        >
          <ArrowLeft size={18} />
        </button>

        {save ? (
          <button
            onClick={save.onClick}
            disabled={saveDisabled}
            type="button"
            className={`flex-1 flex items-center justify-center gap-2 rounded-md text-sm font-bold transition
              ${saveDisabled ? "bg-blue-600/50 cursor-wait" : "bg-blue-600 hover:bg-blue-500"}
            `}
          >
            {isSaving ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : save.icon ? (
              save.icon
            ) : (
              <Save size={16} />
            )}
            {isSaving ? save.loadingLabel ?? "Saving..." : save.label ?? "Save Changes"}
          </button>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {title ? (
          <div>
            <h3 className="text-xs font-bold text-default-500 uppercase tracking-wider mb-3">
              {title}
            </h3>
          </div>
        ) : null}

        {/* Dynamic form fields */}
        {children ? <div className="space-y-6">{children}</div> : null}

        {/* GrapesJS Targets - always present (when enabled) */}
        {(showBlocks || showLayers) && <Divider />}

        {showBlocks && (
          <div>
            <h3 className="text-xs font-bold text-default-500 uppercase tracking-wider mb-2">
              {blocksLabel}
            </h3>
            {/* IMPORTANT: keep id="blocks" for GrapesJS */}
            <div id="blocks" />
          </div>
        )}

        {showLayers && (
          <>
            <Divider />
            <div>
              <h3 className="text-xs font-bold text-default-500 uppercase tracking-wider mb-2">
                {layersLabel}
              </h3>
              {/* IMPORTANT: keep id="layers" for GrapesJS */}
              <div id="layers" className="max-h-40 overflow-auto" />
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
