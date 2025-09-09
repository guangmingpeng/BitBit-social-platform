import React from "react";

export interface SearchBarProps {
  /** 搜索框占位符文本 */
  placeholder?: string;
  /** 当前搜索值 */
  value: string;
  /** 搜索值变化回调 */
  onChange: (value: string) => void;
  /** 搜索框最大宽度 */
  maxWidth?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式类名 */
  className?: string;
}

/**
 * 通用搜索框组件
 * 提供统一的搜索框样式和交互行为
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "搜索...",
  value,
  onChange,
  maxWidth = "max-w-md",
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`flex-1 ${maxWidth} ${className}`}>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
        {value && !disabled && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
            title="清除搜索"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
