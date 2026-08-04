import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  ...props
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageItems(currentPage, totalPages);

  return (
    <nav
      className={cn("flex items-center justify-between gap-4", className)}
      aria-label="Pagination"
      {...props}
    >
      <p className="text-sm text-slate-500">
        صفحة {currentPage} من {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronRight className="h-4 w-4" />
          السابق
        </Button>

        {pages.map((page, index) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="flex h-8 w-8 items-center justify-center">
              <MoreHorizontal className="h-4 w-4 text-slate-400" />
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="icon-sm"
              className="h-8 w-8"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          التالي
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
}

function getPageItems(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  const items: (number | "ellipsis")[] = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) items.push(i);
    return items;
  }

  items.push(1);
  if (currentPage > 3) items.push("ellipsis");

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) items.push(i);

  if (currentPage < totalPages - 2) items.push("ellipsis");
  items.push(totalPages);

  return items;
}

