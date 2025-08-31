import React from "react";
import { cn } from "@/shared/utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  className,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showEllipsis = totalPages > 7;

  const getVisiblePages = () => {
    if (!showEllipsis) return pages;

    if (currentPage <= 4) {
      return [...pages.slice(0, 5), "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, "...", ...pages.slice(totalPages - 5)];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const visiblePages = showPageNumbers ? getVisiblePages() : [];

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {/* 上一页 */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={cn(
          "px-3 py-2 text-sm rounded-lg border transition-colors",
          currentPage === 1
            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        )}
      >
        上一页
      </button>

      {/* 页码 */}
      {showPageNumbers && (
        <>
          {visiblePages.map((page, index) =>
            typeof page === "number" ? (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  "px-3 py-2 text-sm rounded-lg border transition-colors",
                  page === currentPage
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                )}
              >
                {page}
              </button>
            ) : (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-2 text-sm text-gray-500"
              >
                ...
              </span>
            )
          )}
        </>
      )}

      {/* 下一页 */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={cn(
          "px-3 py-2 text-sm rounded-lg border transition-colors",
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        )}
      >
        下一页
      </button>

      {/* 页码信息 */}
      <span className="text-sm text-gray-500 ml-4">
        第 {currentPage} 页，共 {totalPages} 页
      </span>
    </div>
  );
};
