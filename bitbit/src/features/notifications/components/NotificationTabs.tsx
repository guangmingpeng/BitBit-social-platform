import React from "react";
import { TabFilter, type TabOption } from "@/shared/components";
import type { NotificationType, NotificationStats } from "../types";

interface NotificationTabsProps {
  activeType: NotificationType;
  onTypeChange: (type: NotificationType) => void;
  stats: NotificationStats;
}

export const NotificationTabs: React.FC<NotificationTabsProps> = ({
  activeType,
  onTypeChange,
  stats,
}) => {
  const options: TabOption[] = [
    {
      key: "all",
      label: "全部",
      count: stats.byType.all,
    },
    {
      key: "activity",
      label: "活动",
      count: stats.byType.activity,
    },
    {
      key: "social",
      label: "社交",
      count: stats.byType.social,
    },
    {
      key: "system",
      label: "系统",
      count: stats.byType.system,
    },
  ];

  const handleChange = (value: string) => {
    onTypeChange(value as NotificationType);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-6">
      <div className="p-6">
        <TabFilter
          options={options}
          value={activeType}
          onChange={handleChange}
          showCount={true}
          className="flex-wrap gap-2"
        />
      </div>
    </div>
  );
};
