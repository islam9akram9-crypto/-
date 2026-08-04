import * as React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterProps {
  label?: string;
  options: FilterOption[];
  value?: string;
  onChange: (value: string | undefined) => void;
  className?: string;
}

export function Filter({ label = "تصفية", options, value, onChange, className }: FilterProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <SlidersHorizontal className="h-4 w-4" />
        {label}
        {value && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
            1
          </span>
        )}
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-xs font-semibold text-slate-500">{label}</span>
              {value && (
                <button
                  onClick={() => {
                    onChange(undefined);
                    setOpen(false);
                  }}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3 w-3" />
                  مسح
                </button>
              )}
            </div>
            <div className="mt-1 space-y-0.5">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value === value ? undefined : option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-slate-100",
                    value === option.value && "bg-indigo-50 font-medium text-indigo-700"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}