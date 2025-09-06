import { useState, useMemo, useEffect, useRef } from "react";

interface UsePaginationProps<T> {
  data: T[];
  pageSize?: number;
  resetKey?: string; // 添加resetKey参数，当这个key变化时重置分页
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  currentData: T[];
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
}

export function usePagination<T>({
  data,
  pageSize = 10,
  resetKey,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);
  const prevDataLengthRef = useRef(data.length);
  const prevResetKeyRef = useRef(resetKey);

  const totalPages = Math.ceil(data.length / pageSize);

  // 当数据变化时，如果当前页超出了总页数，则重置到第一页
  // 或者当数据长度发生变化时（说明筛选条件变了），也重置到第一页
  // 或者当resetKey变化时，也重置到第一页
  useEffect(() => {
    const dataLengthChanged = prevDataLengthRef.current !== data.length;
    const currentPageExceedsTotal = totalPages > 0 && currentPage > totalPages;
    const resetKeyChanged = prevResetKeyRef.current !== resetKey;

    if (dataLengthChanged || currentPageExceedsTotal || resetKeyChanged) {
      setCurrentPage(1);
      prevDataLengthRef.current = data.length;
      prevResetKeyRef.current = resetKey;
    }
  }, [data.length, totalPages, currentPage, resetKey]);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, pageSize]);

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    currentPage,
    totalPages,
    currentData,
    setCurrentPage: goToPage,
    nextPage,
    prevPage,
    goToPage,
  };
}
