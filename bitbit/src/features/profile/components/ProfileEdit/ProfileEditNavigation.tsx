import React from "react";
import { cn } from "@/shared/utils/cn";

export type ProfileEditModule =
  | "basic"
  | "interests"
  | "privacy"
  | "social"
  | "verification";

interface MenuItem {
  id: ProfileEditModule;
  label: string;
  icon: string;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    id: "basic",
    label: "基础信息",
    icon: "📝",
    description: "头像、姓名、简介等",
  },
  {
    id: "interests",
    label: "兴趣标签",
    icon: "🏷️",
    description: "个人兴趣和爱好",
  },
  {
    id: "verification",
    label: "身份认证",
    icon: "🔐",
    description: "实名认证、学生认证等",
  },
  {
    id: "privacy",
    label: "隐私设置",
    icon: "🔒",
    description: "资料可见性控制",
  },
  {
    id: "social",
    label: "社交链接",
    icon: "🔗",
    description: "个人网站和社交媒体",
  },
];

interface ProfileEditNavigationProps {
  activeModule: ProfileEditModule;
  onModuleChange: (module: ProfileEditModule) => void;
  completeness: number;
}

export const ProfileEditNavigation: React.FC<ProfileEditNavigationProps> = ({
  activeModule,
  onModuleChange,
  completeness,
}) => {
  return (
    <nav className="w-64 bg-white rounded-lg border border-gray-200 p-6 h-fit">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              "w-full flex items-start gap-3 px-4 py-3 rounded-lg text-left transition-colors",
              activeModule === item.id
                ? "bg-blue-50 text-blue-600 border border-blue-200"
                : "text-gray-600 hover:bg-gray-50"
            )}
            onClick={() => onModuleChange(item.id)}
          >
            <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium">{item.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {item.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 完成度指示器 */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">资料完成度</span>
          <span className="text-sm font-medium text-gray-900">
            {completeness}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completeness}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          完善资料可以获得更多推荐机会
        </p>
      </div>
    </nav>
  );
};
