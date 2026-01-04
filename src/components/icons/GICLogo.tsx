import Image from "next/image";
import { cn } from "@/utils/cn";

interface GICLogoProps {
  className?: string;
  showText?: boolean;
}

export function GICLogo({ className, showText = true }: GICLogoProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="flex items-center gap-3">
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
      {showText && (
        <p className="mt-1 text-center max-w-lg hidden sm:block">
          Département de Génie Informatique et Communication<br />
          Department of Information and Communication Engineering
        </p>
      )}
    </div>
  );
}