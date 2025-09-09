import React from "react";
import type { ProfileTab } from "../../types";

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  visibleTabs?: ProfileTab[]; // 可配置显示的标签
}

const allTabs = [
  { key: "activities" as const, label: "我的活动", publicLabel: "活动" },
  { key: "posts" as const, label: "我的帖子", publicLabel: "帖子" },
  { key: "trades" as const, label: "我的交易", publicLabel: "商品" },
  { key: "favorites" as const, label: "我的收藏", publicLabel: "收藏" },
  { key: "drafts" as const, label: "草稿箱", publicLabel: "草稿" },
];

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
  visibleTabs,
}) => {
  // 如果指定了visibleTabs，则只显示指定的标签，否则显示所有标签
  const tabsToShow = visibleTabs
    ? allTabs.filter((tab) => visibleTabs.includes(tab.key))
    : allTabs;

  // 判断是否为公开页面（其他用户页面）
  const isPublicView = visibleTabs !== undefined;

  return (
    <div className="bg-white rounded-2xl shadow-sm">
      <div className="flex items-center border-b border-gray-100">
        {tabsToShow.map((tab) => (
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
            {isPublicView ? tab.publicLabel : tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
