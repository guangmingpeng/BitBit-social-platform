import React from "react";
import { SearchBar } from "../SearchBar";
import { SortSelector, type SortSelectorProps } from "../SortSelector";

export interface SimpleSearchFilterProps {
  /** 搜索框配置 */
  search: {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    maxWidth?: string;
  };
  /** 排序选择器配置 */
  sort?: {
    options: SortSelectorProps["options"];
    value: string;
    onChange: (value: string) => void;
    label?: string;
  };
  /** 结果统计信息 */
  resultInfo?: {
    total: number;
    filtered?: number;
    showResultCount?: boolean;
  };
  /** 容器样式类名 */
  className?: string;
  /** 是否显示在卡片容器中 */
  showInCard?: boolean;
}

/**
 * 简单搜索和筛选组件
 * 用于不需要复杂筛选功能的页面，只包含搜索和排序
 * 适用于关注/粉丝列表、简单的数据列表等场景
 */
export const SimpleSearchFilter: React.FC<SimpleSearchFilterProps> = ({
  search,
  sort,
  resultInfo,
  className = "",
  showInCard = true,
}) => {
  const content = (
    <div className="space-y-4">
      {/* 搜索和排序控制栏 */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchBar
          placeholder={search.placeholder}
          value={search.value}
          onChange={search.onChange}
          maxWidth={search.maxWidth}
        />

        {sort && (
          <SortSelector
            options={sort.options}
            value={sort.value}
            onChange={sort.onChange}
            label={sort.label}
          />
        )}
      </div>

      {/* 搜索结果提示 */}
      {resultInfo && search.value && (
        <div className="text-sm text-gray-600">
          {resultInfo.showResultCount !== false && (
            <>
              找到 {resultInfo.filtered ?? resultInfo.total} 个结果
              {(resultInfo.filtered ?? resultInfo.total) === 0 && (
                <span className="ml-2 text-gray-500">试试其他关键词</span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );

  if (showInCard) {
    return (
      <div
        className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${className}`}
      >
        {content}
      </div>
    );
  }

  return <div className={className}>{content}</div>;
};
