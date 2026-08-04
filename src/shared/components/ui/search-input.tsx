import * as React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export function SearchInput({ className, onClear, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input className="pr-10" {...props} />
      {props.value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-400 hover:text-slate-600"
          aria-label="مسح البحث"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}