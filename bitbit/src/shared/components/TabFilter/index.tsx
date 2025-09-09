import React from "react";

export interface TabOption {
  key: string;
  label: string;
  count?: number;
}

export interface TabFilterProps {
  /** 选项列表 */
  options: TabOption[];
  /** 当前选中的值 */
  value: string;
  /** 值变化回调 */
  onChange: (value: string) => void;
  /** 标签文本 */
  label?: string;
  /** 是否显示计数 */
  showCount?: boolean;
  /** 自定义样式类名 */
  className?: string;
}

/**
 * Tab风格的筛选组件
 * 用于分类筛选，如：全部、活动、帖子、商品等
 */
export const TabFilter: React.FC<TabFilterProps> = ({
  options,
  value,
  onChange,
  label,
  showCount = true,
  className = "",
}) => {
  return (
    <div className={`flex gap-2 flex-wrap items-center ${className}`}>
      {label && (
        <span className="text-sm font-medium text-gray-700 self-center">
          {label}
        </span>
      )}
      {options.map((option) => (
        <button
          key={option.key}
          onClick={() => onChange(option.key)}
          className={`
            px-4 py-2 rounded-full text-body font-medium transition-all duration-200
            ${
              value === option.key
                ? "bg-primary-100 text-primary-600 border border-primary-200"
                : "border border-gray-200 text-text-tertiary hover:bg-gray-50 hover:text-text-secondary"
            }
          `}
        >
          {option.label}
          {showCount && option.count !== undefined && (
            <span className="ml-1 text-caption opacity-75">
              ({option.count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
