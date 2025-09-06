import { useState, useCallback, useMemo } from "react";
import type { ProfileFilterConfigs } from "../ContentFilter/types";
import {
  getProfileFilterConfig,
  createCustomFilterFn,
  createPostsConfig,
} from "../ContentFilter/configs";

interface UseContentFilterProps<T> {
  data: T[];
  page: keyof ProfileFilterConfigs;
  initialSort?: string;
  initialFilters?: Record<string, string | string[]>;
  initialSearch?: string;
  useDynamicConfig?: boolean; // 是否使用动态配置
}

export const useContentFilter = <T = Record<string, unknown>>({
  data,
  page,
  initialSort,
  initialFilters = {},
  initialSearch = "",
  useDynamicConfig = false,
}: UseContentFilterProps<T>) => {
  // 获取配置：动态配置 or 静态配置
  const config = useMemo(() => {
    if (useDynamicConfig && page === "posts") {
      return createPostsConfig(data as Record<string, unknown>[]);
    }
    return getProfileFilterConfig(page);
  }, [page, data, useDynamicConfig]);

  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [activeSort, setActiveSort] = useState(
    initialSort || config.sort.defaultSort || ""
  );
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // 处理筛选变化
  const handleFilterChange = useCallback(
    (filterKey: string, value: string | string[]) => {
      setActiveFilters((prev) => ({
        ...prev,
        [filterKey]: value,
      }));
    },
    []
  );

  // 处理排序变化
  const handleSortChange = useCallback((sortKey: string) => {
    setActiveSort(sortKey);
  }, []);

  // 处理搜索变化
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // 清除所有筛选
  const clearAllFilters = useCallback(() => {
    setActiveFilters({});
    setSearchQuery("");
    setActiveSort(config.sort.defaultSort || "");
  }, [config.sort.defaultSort]);

  // 过滤和排序数据
  const filteredData = useMemo(() => {
    let result = [...data];
    const pageFilterFn = createCustomFilterFn<Record<string, unknown>>(page);

    // 应用搜索
    if (searchQuery && config.search) {
      const searchFields = config.search.searchFields || ["title"];
      result = result.filter((item) => {
        return searchFields.some((field) => {
          const value = getNestedValue(item as Record<string, unknown>, field);
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchQuery.toLowerCase());
          }
          return false;
        });
      });
    }

    // 应用筛选器
    result = result.filter((item) =>
      pageFilterFn(item as Record<string, unknown>, activeFilters)
    );

    // 应用排序
    if (activeSort && config.sort) {
      const sortOption = config.sort.options.find(
        (opt) => opt.key === activeSort
      );
      if (sortOption) {
        result.sort((a, b) => {
          // 处理特殊排序键（如 price_desc）
          const sortKey = activeSort.replace("_desc", "");
          const isDesc =
            activeSort.includes("_desc") || sortOption.direction === "desc";

          const finalAValue = getNestedValue(
            a as Record<string, unknown>,
            sortKey
          );
          const finalBValue = getNestedValue(
            b as Record<string, unknown>,
            sortKey
          );

          if (
            typeof finalAValue === "string" &&
            typeof finalBValue === "string"
          ) {
            const comparison = finalAValue.localeCompare(finalBValue);
            return isDesc ? -comparison : comparison;
          }

          if (
            typeof finalAValue === "number" &&
            typeof finalBValue === "number"
          ) {
            return isDesc
              ? finalBValue - finalAValue
              : finalAValue - finalBValue;
          }

          // 日期排序
          const aDate = parseDateValue(finalAValue);
          const bDate = parseDateValue(finalBValue);
          if (aDate && bDate) {
            const comparison = aDate.getTime() - bDate.getTime();
            return isDesc ? -comparison : comparison;
          }

          return 0;
        });
      }
    }

    return result;
  }, [data, activeFilters, activeSort, searchQuery, config, page]);

  // 检查是否有活动的筛选器
  const hasActiveFilters = useMemo(() => {
    return (
      Object.values(activeFilters).some(
        (value) => value && (Array.isArray(value) ? value.length > 0 : true)
      ) ||
      searchQuery ||
      (activeSort && activeSort !== (config.sort.defaultSort || ""))
    );
  }, [activeFilters, searchQuery, activeSort, config.sort.defaultSort]);

  return {
    // 配置
    config,

    // 状态
    activeFilters,
    activeSort,
    searchQuery,
    filteredData,
    hasActiveFilters,

    // 处理函数
    handleFilterChange,
    handleSortChange,
    handleSearchChange,
    clearAllFilters,

    // 统计信息
    totalCount: data.length,
    filteredCount: filteredData.length,
  };
};

// 工具函数：获取嵌套对象的值
const getNestedValue = (
  obj: Record<string, unknown>,
  path: string
): unknown => {
  return path.split(".").reduce((current: unknown, key: string) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
};

// 工具函数：解析日期值
const parseDateValue = (value: unknown): Date | null => {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "string") {
    // 尝试解析相对时间（如 "3天前"）
    if (value.includes("天前")) {
      const days = parseInt(value.replace("天前", ""));
      if (!isNaN(days)) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date;
      }
    }

    if (value.includes("周前")) {
      const weeks = parseInt(value.replace("周前", ""));
      if (!isNaN(weeks)) {
        const date = new Date();
        date.setDate(date.getDate() - weeks * 7);
        return date;
      }
    }

    // 尝试解析标准日期格式
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  return null;
};
