import React from "react";
import { cn } from "@/shared/utils/cn";
import type { SettingsModule } from "../../types";
import type { SettingsNavigationItem } from "../../hooks/useSettingsNavigation";

interface SettingsNavigationProps {
  items: SettingsNavigationItem[];
  activeModule: SettingsModule;
  onModuleChange: (module: SettingsModule) => void;
}

export const SettingsNavigation: React.FC<SettingsNavigationProps> = ({
  items,
  activeModule,
  onModuleChange,
}) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onModuleChange(item.id)}
          className={cn(
            "w-full flex items-center gap-4 p-4 rounded-lg text-left transition-all",
            activeModule === item.id
              ? "bg-blue-50 border border-blue-200 text-blue-700"
              : "bg-white border border-gray-100 hover:border-gray-200 text-gray-700 hover:bg-gray-50"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-lg",
              activeModule === item.id ? "bg-blue-100" : "bg-gray-100"
            )}
          >
            <span>{item.icon}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-sm">{item.title}</h3>
              {item.badge && (
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">{item.description}</p>
          </div>

          <svg
            className={cn(
              "w-5 h-5 transition-colors",
              activeModule === item.id ? "text-blue-500" : "text-gray-400"
            )}
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
        </button>
      ))}
    </div>
  );
};
