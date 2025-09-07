import { useState, useCallback } from "react";
import type { SettingsModule } from "../types";

export interface SettingsNavigationItem {
  id: SettingsModule;
  title: string;
  icon: string;
  description: string;
  badge?: string | number;
}

const navigationItems: SettingsNavigationItem[] = [
  {
    id: "account",
    title: "账户安全",
    icon: "🔐",
    description: "密码、验证、设备管理",
  },
  {
    id: "notifications",
    title: "通知设置",
    icon: "🔔",
    description: "推送、邮件、短信通知",
  },
  {
    id: "privacy",
    title: "隐私控制",
    icon: "🔒",
    description: "资料可见性、权限管理",
  },
  {
    id: "app",
    title: "应用设置",
    icon: "🎨",
    description: "主题、语言、界面设置",
  },
  {
    id: "about",
    title: "关于帮助",
    icon: "❓",
    description: "版本、帮助、反馈",
  },
];

export const useSettingsNavigation = (
  initialModule: SettingsModule = "account"
) => {
  const [activeModule, setActiveModule] =
    useState<SettingsModule>(initialModule);

  const handleModuleChange = useCallback((module: SettingsModule) => {
    setActiveModule(module);
  }, []);

  return {
    navigationItems,
    activeModule,
    setActiveModule: handleModuleChange,
  };
};
