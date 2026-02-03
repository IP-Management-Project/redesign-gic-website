// --- Sub-Components (Ideally in separate files, kept here for ease of use) ---

import { Button } from "@heroui/button";
import { Menu, Plus, RefreshCcw } from "lucide-react";

interface PageHeaderProps {
  onCreateNews: () => void;
  onClickTemplateMangement: () => void;
}

export function PageHeader({ onCreateNews, onClickTemplateMangement }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Newsroom <span className="text-primary">Studio</span>
        </h1>
        <p className="text-default-500 mt-1 text-medium">
          Manage your content strategy and public announcements.
        </p>
      </div>
      <div className="flex gap-3">
        <Button color="primary" className="shadow-lg shadow-primary/20 font-semibold" startContent={<Plus size={20} />} onPress={onCreateNews}>
          New Article
        </Button>
        <Button color="default" className="shadow-lg shadow-primary/20 font-semibold" startContent={<Menu size={20} />} onPress={onClickTemplateMangement}>
          Templates
        </Button>
      </div>
    </div>
  );
}