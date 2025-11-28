import Image from "next/image";
import { cn } from "@/utils/cn";

interface GICLogoProps {
  className?: string;
}

export function GICLogo({ className }: GICLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/images/logos/itc_logo.png"
        alt="ITC Logo"
        width={100}
        height={100}
        className="max-h-16 w-auto object-contain"
      />

      <div className="w-px h-10 bg-gray-300" />

      <Image
        src="/images/logos/gic_logo.png"
        alt="GIC Logo"
        width={120}
        height={120}
        className="max-h-14 w-auto object-contain"
      />
    </div>
  );
}
