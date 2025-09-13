import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/shared/utils/cn";
import { Icon } from "@/components/ui";

interface NavItem {
  path: string;
  label: string;
  iconName: "home" | "activity" | "community" | "exchange" | "profile";
  end?: boolean;
}

const navItems: NavItem[] = [
  { path: "/", label: "首页", iconName: "home", end: true },
  { path: "/activities", label: "活动", iconName: "activity" },
  { path: "/community", label: "社区", iconName: "community" },
  { path: "/exchange", label: "二手", iconName: "exchange" },
  { path: "/profile", label: "我的", iconName: "profile" },
];

const FloatingNav: React.FC = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getCurrentNavItem = () => {
    return (
      navItems.find((item) => {
        if (item.end) {
          return location.pathname === item.path;
        }
        return location.pathname.startsWith(item.path);
      }) || navItems[0]
    );
  };

  const currentItem = getCurrentNavItem();

  return (
    <>
      {/* 背景遮罩 */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-200"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* 悬浮导航 */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* 展开的导航选项 */}
        <div
          className={cn(
            "flex flex-col gap-3 mb-3 transition-all duration-300 origin-bottom",
            isExpanded
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          {navItems
            .filter((item) => item.path !== currentItem.path)
            .map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setIsExpanded(false)}
                className={cn(
                  "flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-3",
                  "border border-gray-200 hover:shadow-xl transition-all duration-200",
                  "transform hover:scale-105"
                )}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <Icon name={item.iconName} size="md" />
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  {item.label}
                </span>
              </NavLink>
            ))}
        </div>

        {/* 主导航按钮 */}
        <button
          onClick={toggleExpanded}
          className={cn(
            "relative w-14 h-14 bg-blue-600 rounded-full shadow-lg",
            "flex items-center justify-center text-white",
            "hover:bg-blue-700 transition-all duration-200",
            "transform hover:scale-110 active:scale-95",
            isExpanded && "rotate-45"
          )}
        >
          {isExpanded ? (
            <span className="text-xl">✕</span>
          ) : (
            <Icon
              name={currentItem.iconName}
              size="lg"
              className="text-white"
            />
          )}

          {/* 当前页面指示器 */}
          {!isExpanded && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          )}
        </button>

        {/* 当前页面标签 */}
        {!isExpanded && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200">
            {currentItem.label}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingNav;
