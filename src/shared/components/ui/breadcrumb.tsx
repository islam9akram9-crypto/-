import * as React from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: "chevron" | "slash";
}

export function Breadcrumb({ items, separator = "chevron", className, ...props }: BreadcrumbProps) {
  const SeparatorIcon = separator === "chevron" ? ChevronLeft : () => <span>/</span>;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center gap-1.5 text-sm", className)} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={`${item.label}-${index}`}>
            {index > 0 && (
              <SeparatorIcon className="h-4 w-4 text-slate-400" />
            )}
            {isLast ? (
              <span className="font-medium text-slate-900" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="text-slate-500 transition-colors hover:text-slate-900"
              >
                {item.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}