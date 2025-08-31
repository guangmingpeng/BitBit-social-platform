import React from "react";

interface Category {
  id: string;
  label: string;
  value: string;
}

interface CategorySidebarProps {
  selectedCategory: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sortBy: string) => void;
  className?: string;
}

const categories: Category[] = [
  { id: "all", label: "全部话题", value: "" },
  { id: "learning", label: "学习分享", value: "learning" },
  { id: "food", label: "美食交流", value: "food" },
  { id: "music", label: "音乐讨论", value: "music" },
  { id: "reading", label: "读书心得", value: "reading" },
];

const sortOptions = [
  { value: "latest", label: "最新发布" },
  { value: "popular", label: "最多点赞" },
  { value: "comments", label: "最多评论" },
];

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedCategory,
  sortBy,
  onCategoryChange,
  onSortChange,
  className,
}) => {
  return (
    <div className={className}>
      {/* 分类导航 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">社区分类</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className={`cursor-pointer hover:text-primary-600 p-2 rounded ${
                selectedCategory === category.value
                  ? "bg-primary-50 text-primary-600"
                  : ""
              }`}
              onClick={() => onCategoryChange(category.value)}
            >
              {category.label}
            </li>
          ))}
        </ul>
      </div>

      {/* 排序方式 */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-semibold mb-3">排序方式</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategorySidebar;
