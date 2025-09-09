import React from "react";

export type OtherUserActivityFilterType =
  | "all"
  | "organized"
  | "participated"
  | "recent";

interface OtherUserActivityFilterProps {
  activeFilter: OtherUserActivityFilterType;
  onFilterChange: (filter: OtherUserActivityFilterType) => void;
  userName?: string;
}

const getFilters = (userName?: string) => [
  { key: "all" as const, label: "全部活动" },
  {
    key: "organized" as const,
    label: `${userName ? `${userName}组织的` : "TA组织的"}`,
  },
  {
    key: "participated" as const,
    label: `${userName ? `${userName}参与的` : "TA参与的"}`,
  },
  { key: "recent" as const, label: "最近活动" },
];

export const OtherUserActivityFilter: React.FC<
  OtherUserActivityFilterProps
> = ({ activeFilter, onFilterChange, userName }) => {
  const filters = getFilters(userName);

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${
              activeFilter === filter.key
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
            }
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
