import React from "react";
import { Button, Icon } from "@/components/ui";
import type { ExchangeFilters } from "../types/types";

interface ExchangeFiltersProps {
  filters: ExchangeFilters;
  onFiltersChange: (filters: ExchangeFilters) => void;
  categories: Array<{ id: string; name: string }>;
  onPublishClick?: () => void;
}

const ExchangeFiltersComponent: React.FC<ExchangeFiltersProps> = ({
  filters,
  onFiltersChange,
  categories,
  onPublishClick,
}) => {
  const handleCategoryChange = (categoryId: string) => {
    onFiltersChange({
      ...filters,
      category: categoryId === filters.category ? "" : categoryId,
    });
  };

  const handleSearchChange = (searchTerm: string) => {
    onFiltersChange({
      ...filters,
      searchTerm,
    });
  };

  const handleSortChange = (sortBy: ExchangeFilters["sortBy"]) => {
    onFiltersChange({
      ...filters,
      sortBy,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      searchTerm: "",
      category: "",
      sortBy: "newest",
    });
  };

  const hasActiveFilters = filters.searchTerm || filters.category;

  return (
    <div className="space-y-4">
      {/* 分类筛选标签 */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200
                ${
                  filters.category === category.id
                    ? "bg-primary-500 text-white shadow-md"
                    : "bg-white text-text-secondary border border-gray-200 hover:bg-gray-50"
                }
              `}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 排序控件 */}
        <div className="flex items-center gap-2">
          <select
            value={filters.sortBy || "newest"}
            onChange={(e) =>
              handleSortChange(e.target.value as ExchangeFilters["sortBy"])
            }
            className="rounded-2xl border-gray-200 shadow-sm px-3 py-2 border text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          >
            <option value="newest">最新发布</option>
            <option value="price_asc">价格从低到高</option>
            <option value="price_desc">价格从高到低</option>
            <option value="popularity">热门商品</option>
          </select>
        </div>
      </div>

      {/* 搜索栏和发布按钮 */}
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="搜索商品..."
            value={filters.searchTerm || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-2xl border-gray-200 shadow-sm px-4 py-3 border focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>
        {onPublishClick && (
          <Button
            variant="primary"
            size="lg"
            className="flex items-center gap-2 px-6"
            onClick={onPublishClick}
          >
            <Icon name="plus" size="sm" />
            发布商品
          </Button>
        )}
      </div>

      {/* 筛选标签 */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">当前筛选:</span>
          {filters.category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-100 text-primary-700">
              {categories.find((c) => c.id === filters.category)?.name}
              <button
                onClick={() => handleCategoryChange(filters.category!)}
                className="ml-2 hover:text-primary-900"
              >
                ×
              </button>
            </span>
          )}
          {filters.searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
              "{filters.searchTerm}"
              <button
                onClick={() => handleSearchChange("")}
                className="ml-2 hover:text-gray-900"
              >
                ×
              </button>
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-text-secondary hover:text-text-primary"
          >
            清除筛选
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExchangeFiltersComponent;
