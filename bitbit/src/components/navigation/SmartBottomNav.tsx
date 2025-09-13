import React, { useState, useEffect } from "react";
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

interface SmartBottomNavProps {
  /** 是否启用智能隐藏（向下滚动时隐藏，向上滚动时显示） */
  smartHide?: boolean;
  /** 隐藏阈值（滚动多少像素后开始隐藏） */
  hideThreshold?: number;
}

const SmartBottomNav: React.FC<SmartBottomNavProps> = ({
  smartHide = false,
  hideThreshold = 50,
}) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!smartHide) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 如果滚动距离小于阈值，始终显示
      if (currentScrollY < hideThreshold) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // 向下滚动时隐藏，向上滚动时显示
      if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // 节流处理
    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [smartHide, lastScrollY, hideThreshold]);

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 transition-transform duration-300 ease-in-out",
        "shadow-lg backdrop-blur-sm bg-white/95",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="max-w-lg mx-auto px-4 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = item.end
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={cn(
                  "relative flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200",
                  "min-w-[60px] text-center",
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                )}
              >
                {/* 图标 */}
                <Icon
                  name={item.iconName}
                  size="lg"
                  className={cn(
                    "mb-1 transition-transform duration-200",
                    isActive && "scale-110"
                  )}
                />

                {/* 标签 */}
                <span
                  className={cn(
                    "text-xs font-medium transition-all duration-200",
                    isActive && "font-semibold"
                  )}
                >
                  {item.label}
                </span>

                {/* 激活指示器 */}
                {isActive && (
                  <div className="absolute inset-0 rounded-lg border-2 border-blue-200 pointer-events-none animate-pulse" />
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default SmartBottomNav;
