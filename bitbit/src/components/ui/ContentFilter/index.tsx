import { useMemo, useState, useEffect } from "react";
import type { ContentFilterProps, FilterConfig } from "./types";

const ContentFilter = <T = Record<string, unknown>,>({
  data = [],
  filterConfigs = [],
  sortConfig,
  searchConfig,
  activeFilters = {},
  activeSort,
  searchQuery = "",
  onFilterChange,
  onSortChange,
  onSearchChange,
  onDataChange,
  layout = "horizontal",
  showFilterCount = true,
  showClearButton = true,
  renderCustomFilter,
  customFilterFn,
  customSortFn,
}: ContentFilterProps<T>) => {
  const [internalFilters, setInternalFilters] = useState(activeFilters);
  const [internalSort, setInternalSort] = useState(
    activeSort || sortConfig?.defaultSort || ""
  );
  const [internalSearch, setInternalSearch] = useState(searchQuery);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // 检查是否使用外部状态管理
  const useExternalState =
    onFilterChange !== undefined ||
    onSortChange !== undefined ||
    onSearchChange !== undefined;

  // 同步外部状态到内部状态 - 只有当使用外部状态管理时才同步
  useEffect(() => {
    if (useExternalState) {
      setInternalFilters(activeFilters);
    }
  }, [activeFilters, useExternalState]);

  useEffect(() => {
    if (useExternalState) {
      setInternalSort(activeSort || sortConfig?.defaultSort || "");
    }
  }, [activeSort, sortConfig?.defaultSort, useExternalState]);

  useEffect(() => {
    if (useExternalState) {
      setInternalSearch(searchQuery);
    }
  }, [searchQuery, useExternalState]);

  // 处理筛选逻辑
  const filteredAndSortedData = useMemo(() => {
    // 如果没有提供数据，返回空数组
    if (!data || data.length === 0) {
      return [];
    }

    let result = [...data];

    // 应用搜索
    if (internalSearch && searchConfig) {
      const searchFields = searchConfig.searchFields || [
        "title",
        "content",
        "name",
      ];
      result = result.filter((item) => {
        return searchFields.some((field) => {
          const value = (item as Record<string, unknown>)[field];
          if (typeof value === "string") {
            return value.toLowerCase().includes(internalSearch.toLowerCase());
          }
          return false;
        });
      });
    }

    // 应用筛选器
    if (customFilterFn) {
      result = result.filter((item) => customFilterFn(item, internalFilters));
    } else {
      // 默认筛选逻辑
      result = result.filter((item) => {
        return Object.entries(internalFilters).every(
          ([filterKey, filterValue]) => {
            if (
              !filterValue ||
              (Array.isArray(filterValue) && filterValue.length === 0)
            ) {
              return true;
            }

            const itemValue = (item as Record<string, unknown>)[filterKey];

            if (Array.isArray(filterValue)) {
              return filterValue.includes(String(itemValue));
            }

            return String(itemValue) === String(filterValue);
          }
        );
      });
    }

    // 应用排序
    if (internalSort && sortConfig) {
      if (customSortFn) {
        result = customSortFn(result, internalSort) as T[];
      } else {
        // 默认排序逻辑
        const sortOption = sortConfig.options.find(
          (opt) => opt.key === internalSort
        );
        if (sortOption) {
          result.sort((a, b) => {
            const aValue = (a as Record<string, unknown>)[internalSort];
            const bValue = (b as Record<string, unknown>)[internalSort];

            if (typeof aValue === "string" && typeof bValue === "string") {
              const comparison = aValue.localeCompare(bValue);
              return sortOption.direction === "desc" ? -comparison : comparison;
            }

            if (typeof aValue === "number" && typeof bValue === "number") {
              return sortOption.direction === "desc"
                ? bValue - aValue
                : aValue - bValue;
            }

            // 日期排序
            if (aValue instanceof Date && bValue instanceof Date) {
              const comparison = aValue.getTime() - bValue.getTime();
              return sortOption.direction === "desc" ? -comparison : comparison;
            }

            return 0;
          });
        }
      }
    }

    return result;
  }, [
    data,
    internalFilters,
    internalSort,
    internalSearch,
    customFilterFn,
    customSortFn,
    searchConfig,
    sortConfig,
  ]);

  // 通知父组件数据变化
  useEffect(() => {
    onDataChange?.(filteredAndSortedData);
  }, [filteredAndSortedData, onDataChange]);

  // 处理筛选器变化
  const handleFilterChange = (filterKey: string, value: string | string[]) => {
    const newFilters = { ...internalFilters, [filterKey]: value };
    setInternalFilters(newFilters);
    onFilterChange?.(filterKey, value);
  };

  // 处理排序变化
  const handleSortChange = (sortKey: string) => {
    setInternalSort(sortKey);
    setShowSortDropdown(false);
    onSortChange?.(sortKey);
  };

  // 处理搜索变化
  const handleSearchChange = (query: string) => {
    setInternalSearch(query);
    onSearchChange?.(query);
  };

  // 清除所有筛选
  const handleClearAll = () => {
    setInternalFilters({});
    setInternalSearch("");
    setInternalSort(sortConfig?.defaultSort || "");

    // 通知父组件清除所有筛选条件
    // 对每个筛选配置发送清空信号
    filterConfigs.forEach((config) => {
      if (config.key) {
        onFilterChange?.(config.key, config.allowMultiple ? [] : "");
      }
    });

    onSearchChange?.("");
    onSortChange?.(sortConfig?.defaultSort || "");
  };

  // 检查是否有活动的筛选器
  const hasActiveFilters = useMemo(() => {
    const hasFilters = Object.entries(internalFilters).some(([, value]) => {
      if (!value) return false;
      if (Array.isArray(value)) {
        return (
          value.length > 0 &&
          !value.includes("all") &&
          !value.every((v) => v === "")
        );
      }
      return value !== "all" && value !== "";
    });

    const hasSortChange =
      internalSort && internalSort !== (sortConfig?.defaultSort || "");

    return hasFilters || internalSearch.trim() !== "" || hasSortChange;
  }, [internalFilters, internalSearch, internalSort, sortConfig?.defaultSort]);

  // 渲染筛选器选项
  const renderFilter = (config: FilterConfig, index: number) => {
    if (renderCustomFilter) {
      return renderCustomFilter(
        config,
        internalFilters[config.key || config.options[0]?.key] || []
      );
    }

    const filterKey = config.key || config.options[0]?.key || `filter-${index}`;
    const activeValue =
      internalFilters[filterKey] || (config.allowMultiple ? [] : "");

    switch (config.type) {
      case "tabs":
        return (
          <div key={filterKey} className="flex gap-2 flex-wrap">
            {config.title && (
              <span className="text-sm font-medium text-gray-700 self-center">
                {config.title}:
              </span>
            )}
            {config.options.map((option) => (
              <button
                key={option.key}
                onClick={() => {
                  // 如果点击"全部"，清空筛选条件
                  const newValue = option.key === "all" ? "" : option.key;
                  handleFilterChange(filterKey, newValue);
                }}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    (option.key === "all" &&
                      (!activeValue ||
                        activeValue === "" ||
                        activeValue === "all")) ||
                    (option.key !== "all" && activeValue === option.key)
                      ? "bg-blue-100 text-blue-600 border border-blue-200"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }
                `}
              >
                {option.label}
                {config.showCount && option.count !== undefined && (
                  <span className="ml-1 text-xs">({option.count})</span>
                )}
              </button>
            ))}
          </div>
        );

      case "chips":
        return (
          <div key={filterKey} className="flex gap-2 flex-wrap">
            {config.title && (
              <span className="text-sm font-medium text-gray-700 self-center">
                {config.title}:
              </span>
            )}
            {config.options.map((option) => {
              const isActive = config.allowMultiple
                ? Array.isArray(activeValue) && activeValue.includes(option.key)
                : activeValue === option.key;

              return (
                <button
                  key={option.key}
                  onClick={() => {
                    if (config.allowMultiple) {
                      const currentValues = Array.isArray(activeValue)
                        ? activeValue
                        : [];

                      // 如果点击"全部"
                      if (option.key === "all") {
                        handleFilterChange(filterKey, isActive ? [] : ["all"]);
                      } else {
                        // 如果当前选中了"全部"，先移除"全部"
                        const valuesWithoutAll = currentValues.filter(
                          (v) => v !== "all"
                        );

                        const newValues = isActive
                          ? valuesWithoutAll.filter((v) => v !== option.key)
                          : [...valuesWithoutAll, option.key];

                        handleFilterChange(filterKey, newValues);
                      }
                    } else {
                      // 对于单选，如果点击已选中的项目，清空选择
                      const newValue = isActive ? "" : option.key;
                      handleFilterChange(filterKey, newValue);
                    }
                  }}
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-600 border border-blue-200"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  {option.label}
                  {config.showCount && option.count !== undefined && (
                    <span className="ml-1 text-xs">({option.count})</span>
                  )}
                </button>
              );
            })}
          </div>
        );

      case "dropdown":
        return (
          <div key={filterKey} className="relative">
            <select
              value={
                Array.isArray(activeValue) ? activeValue[0] || "" : activeValue
              }
              onChange={(e) => handleFilterChange(filterKey, e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{config.title || "全部"}</option>
              {config.options.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                  {config.showCount &&
                    option.count !== undefined &&
                    ` (${option.count})`}
                </option>
              ))}
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`space-y-4 ${layout === "vertical" ? "flex flex-col" : ""}`}
    >
      {/* 搜索栏 */}
      {searchConfig && (
        <div className="relative flex items-center">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg pointer-events-none z-10">
            🔍
          </div>
          <input
            type="text"
            placeholder={searchConfig.placeholder || "搜索..."}
            value={internalSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            style={{ paddingLeft: "2.5rem" }}
          />
          {internalSearch && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>
      )}

      {/* 筛选和排序控制区域 */}
      <div
        className={`flex ${
          layout === "vertical"
            ? "flex-col space-y-4"
            : "flex-wrap items-center gap-4"
        }`}
      >
        {/* 筛选器 */}
        {filterConfigs.map((config, index) => renderFilter(config, index))}

        {/* 排序 */}
        {sortConfig && (
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
            >
              <span className="text-gray-500">⚙️</span>
              {sortConfig.options.find((opt) => opt.key === internalSort)
                ?.label || "排序"}
              <span
                className={`transform transition-transform ${
                  showSortDropdown ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {showSortDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                {sortConfig.options.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleSortChange(option.key)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      internalSort === option.key
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 清除按钮 */}
        {showClearButton && hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors border border-primary-200 font-medium"
          >
            <span className="text-base">×</span>
            清除筛选
          </button>
        )}

        {/* 结果计数 */}
        {showFilterCount && data && (
          <span className="text-sm text-gray-500 ml-auto">
            共 {filteredAndSortedData.length} 项结果
          </span>
        )}
      </div>
    </div>
  );
};

export default ContentFilter;
