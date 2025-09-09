import React from "react";

export interface SortOption {
  key: string;
  label: string;
}

export interface SortSelectorProps {
  /** 排序选项列表 */
  options: SortOption[];
  /** 当前选中的排序值 */
  value: string;
  /** 排序值变化回调 */
  onChange: (value: string) => void;
  /** 标签文本 */
  label?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式类名 */
  className?: string;
}

/**
 * 通用排序选择器组件
 * 提供统一的排序选择样式和交互行为
 */
export const SortSelector: React.FC<SortSelectorProps> = ({
  options,
  value,
  onChange,
  label = "排序：",
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {label && (
        <span className="text-sm text-gray-600 whitespace-nowrap">{label}</span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
      >
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
