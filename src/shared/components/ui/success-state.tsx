import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessStateProps {
  title: string;
  description?: string;
  className?: string;
}

export function SuccessState({ title, description, className }: SuccessStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 px-6 py-16 text-center",
        className
      )}
      role="status"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
      </div>
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
    </div>
  );
}