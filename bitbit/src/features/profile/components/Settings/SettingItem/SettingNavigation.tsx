import React from "react";
import { SettingItem } from "./SettingItem";

interface SettingNavigationProps {
  icon?: string;
  iconColor?: string;
  title: string;
  description?: string;
  badge?: string | number;
  disabled?: boolean;
  onClick: () => void;
}

export const SettingNavigation: React.FC<SettingNavigationProps> = ({
  icon,
  iconColor,
  title,
  description,
  badge,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <SettingItem
        icon={icon}
        iconColor={iconColor}
        title={title}
        description={description}
        className="hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {badge && (
            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-medium">
              {badge}
            </span>
          )}
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </SettingItem>
    </button>
  );
};
