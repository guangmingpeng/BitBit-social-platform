import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";

interface CommunitySearchProps {
  searchTerm: string;
  selectedCategory: string;
  selectedTag?: string;
  onSearchChange: (value: string) => void;
  onClearFilters: () => void;
  className?: string;
}

const CommunitySearch: React.FC<CommunitySearchProps> = ({
  searchTerm,
  selectedCategory,
  selectedTag = "",
  onSearchChange,
  onClearFilters,
  className,
}) => {
  const navigate = useNavigate();

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      learning: "学习分享",
      food: "美食交流",
      music: "音乐讨论",
      reading: "读书心得",
    };
    return categoryMap[category] || category;
  };

  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="搜索社区话题..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 rounded-md border-gray-300 shadow-sm px-3 py-2 border focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
        />
        <Button
          variant="primary"
          onClick={() => navigate("/community/publish")}
        >
          发布新帖子
        </Button>
      </div>

      {/* 筛选标签 */}
      {(searchTerm || selectedCategory || selectedTag) && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">当前筛选:</span>
          {selectedCategory && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-700">
              {getCategoryLabel(selectedCategory)}
              <button
                onClick={() => onClearFilters()}
                className="ml-1 hover:text-primary-900"
              >
                ×
              </button>
            </span>
          )}
          {selectedTag && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700">
              #{selectedTag}
              <button
                onClick={() => onClearFilters()}
                className="ml-1 hover:text-orange-900"
              >
                ×
              </button>
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-text-secondary hover:text-text-primary"
          >
            清除筛选
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommunitySearch;
