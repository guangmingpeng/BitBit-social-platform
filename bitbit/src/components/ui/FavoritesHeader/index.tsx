import React from "react";
import { Button } from "@/components/ui";

interface FavoritesHeaderProps {
  totalCount: number;
  // 多选模式相关属性
  isSelectionMode?: boolean;
  selectedCount?: number;
  onToggleSelectionMode?: () => void;
  onRemoveSelected?: () => void;
  onSelectAll?: () => void;
  onClearSelection?: () => void;
}

export const FavoritesHeader: React.FC<FavoritesHeaderProps> = ({
  totalCount,
  isSelectionMode = false,
  selectedCount = 0,
  onToggleSelectionMode,
  onRemoveSelected,
  onSelectAll,
  onClearSelection,
}) => {
  // 如果是选择模式，显示选择相关的操作
  if (isSelectionMode) {
    return (
      <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-primary-900">
                已选择 {selectedCount} 项
              </h2>
              <p className="text-sm text-primary-700">选择要取消收藏的内容</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSelectAll}
              className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-100 px-3 py-2"
            >
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                全选
              </span>
            </Button>
            {selectedCount > 0 && (
              <Button
                variant="primary"
                size="sm"
                onClick={onRemoveSelected}
                className="bg-coral-500 hover:bg-coral-600 text-white px-4 py-2 text-sm font-medium"
              >
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  取消收藏({selectedCount})
                </span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-white px-3 py-2"
            >
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                退出多选
              </span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 普通模式下显示收藏总数和多选按钮
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-900">我的收藏</h2>
          <div className="text-sm text-gray-500">共 {totalCount} 个收藏</div>
        </div>
        {totalCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleSelectionMode}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 border-primary-200 hover:bg-primary-50 hover:border-primary-300 transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            多选管理
          </Button>
        )}
      </div>
    </div>
  );
};
