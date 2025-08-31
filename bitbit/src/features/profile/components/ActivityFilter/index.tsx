import React from "react";

export type ActivityFilterType = "all" | "organized" | "registered" | "ended";

interface ActivityFilterProps {
  activeFilter: ActivityFilterType;
  onFilterChange: (filter: ActivityFilterType) => void;
}

const filters = [
  { key: "all" as const, label: "全部活动" },
  { key: "organized" as const, label: "我组织的" },
  { key: "registered" as const, label: "我参加的" },
  { key: "ended" as const, label: "已结束" },
];

export const ActivityFilter: React.FC<ActivityFilterProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex gap-3 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`
            px-6 py-2 rounded-full font-medium transition-colors
            ${
              activeFilter === filter.key
                ? "bg-blue-100 text-blue-600"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
