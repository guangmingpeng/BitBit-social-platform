import React from "react";
import { cn } from "@/shared/utils/cn";

interface SettingItemProps {
  icon?: string;
  iconColor?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  iconColor = "bg-blue-100",
  title,
  description,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all",
        className
      )}
    >
      {icon && (
        <div className="setting-icon flex-shrink-0">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-lg",
              iconColor
            )}
          >
            <span>{icon}</span>
          </div>
        </div>
      )}

      <div className="setting-content flex-1 min-w-0">
        <div className="setting-title text-base font-medium text-gray-900 mb-1">
          {title}
        </div>
        {description && (
          <div className="setting-description text-sm text-gray-600">
            {description}
          </div>
        )}
      </div>

      <div className="setting-control flex-shrink-0">{children}</div>
    </div>
  );
};
