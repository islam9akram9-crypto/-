import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  label?: string;
  className?: string;
  fullPage?: boolean;
}

export function LoadingState({ label = "جارٍ التحميل...", className, fullPage }: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-slate-500",
        fullPage && "min-h-[60vh]",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      <p className="text-sm">{label}</p>
    </div>
  );
}