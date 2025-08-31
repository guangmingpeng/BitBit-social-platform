import React from "react";
import type { ProfileTab } from "../../types";

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

const tabs = [
  { key: "activities" as const, label: "我的活动" },
  { key: "posts" as const, label: "我的帖子" },
  { key: "trades" as const, label: "我的交易" },
  { key: "favorites" as const, label: "我的收藏" },
  { key: "drafts" as const, label: "草稿箱" },
];

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm">
      <div className="flex items-center border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`
              px-6 py-4 font-medium text-base relative transition-colors
              ${
                activeTab === tab.key
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }
            `}
          >
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
