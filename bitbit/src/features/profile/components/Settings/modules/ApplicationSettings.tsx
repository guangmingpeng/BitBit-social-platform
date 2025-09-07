import React from "react";
import { SettingSwitch, SettingSelect } from "../SettingItem";
import { useSettings } from "../../../hooks/useSettings";
import { useTheme } from "../../../../../shared/hooks/useTheme";

export const ApplicationSettings: React.FC = () => {
  const { settings, updateSetting } = useSettings();
  const { theme, setTheme } = useTheme();
  const appSettings = settings.app;

  const themeOptions = [
    { label: "跟随系统", value: "auto" },
    { label: "浅色模式", value: "light" },
    { label: "深色模式", value: "dark" },
  ];

  const languageOptions = [
    { label: "简体中文", value: "zh-CN" },
    { label: "English", value: "en-US" },
  ];

  const fontSizeOptions = [
    { label: "小", value: "small" },
    { label: "中", value: "medium" },
    { label: "大", value: "large" },
  ];

  const imageQualityOptions = [
    { label: "高质量", value: "high" },
    { label: "中等质量", value: "medium" },
    { label: "低质量", value: "low" },
  ];

  // 主题切换处理
  const handleThemeChange = (value: string) => {
    const newTheme = value as "light" | "dark" | "auto";
    setTheme(newTheme);
    updateSetting("app", "theme", newTheme);
  };

  // 字体大小处理
  const handleFontSizeChange = (value: string) => {
    updateSetting("app", "fontSize", value);
    // 应用字体大小到root element
    const root = document.documentElement;
    switch (value) {
      case "small":
        root.style.fontSize = "14px";
        break;
      case "large":
        root.style.fontSize = "18px";
        break;
      default:
        root.style.fontSize = "16px";
    }
  };

  // 动画效果处理
  const handleAnimationsChange = (checked: boolean) => {
    updateSetting("app", "animations", checked);
    // 应用动画设置
    const root = document.documentElement;
    if (!checked) {
      root.style.setProperty("--animation-duration", "0ms");
    } else {
      root.style.removeProperty("--animation-duration");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          应用设置
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          个性化您的应用体验
        </p>
      </div>

      {/* 外观设置 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          外观设置
        </h3>

        <SettingSelect
          icon="🌙"
          iconColor="bg-purple-100"
          title="主题模式"
          description="选择应用的外观主题"
          value={theme}
          options={themeOptions}
          onChange={handleThemeChange}
        />

        <SettingSelect
          icon="🌐"
          iconColor="bg-green-100"
          title="语言设置"
          description="选择应用显示语言"
          value={appSettings.language}
          options={languageOptions}
          onChange={(value) => updateSetting("app", "language", value)}
        />

        <SettingSelect
          icon="📝"
          iconColor="bg-orange-100"
          title="字体大小"
          description="调整应用中文字的大小"
          value={appSettings.fontSize}
          options={fontSizeOptions}
          onChange={handleFontSizeChange}
        />
      </div>

      {/* 性能设置 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          性能设置
        </h3>

        <SettingSwitch
          icon="✨"
          iconColor="bg-pink-100"
          title="动画效果"
          description="启用界面动画和过渡效果"
          checked={appSettings.animations}
          onChange={handleAnimationsChange}
        />

        <SettingSelect
          icon="🖼️"
          iconColor="bg-blue-100"
          title="图片质量"
          description="选择图片加载质量，影响流量使用"
          value={appSettings.imageQuality}
          options={imageQualityOptions}
          onChange={(value) => updateSetting("app", "imageQuality", value)}
        />

        <SettingSwitch
          icon="🎬"
          iconColor="bg-red-100"
          title="自动播放视频"
          description="在浏览时自动播放视频内容"
          checked={appSettings.autoPlayVideo}
          onChange={(checked) => updateSetting("app", "autoPlayVideo", checked)}
        />
      </div>

      {/* 无障碍设置 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          无障碍设置
        </h3>

        <SettingSwitch
          icon="🚶"
          iconColor="bg-teal-100"
          title="减少动画"
          description="减少界面动画，适合对动效敏感的用户"
          checked={appSettings.reducedMotion}
          onChange={(checked) => {
            updateSetting("app", "reducedMotion", checked);
            // 应用减少动画设置
            const root = document.documentElement;
            if (checked) {
              root.style.setProperty("--animation-duration", "0.1s");
            } else {
              root.style.removeProperty("--animation-duration");
            }
          }}
        />

        <SettingSwitch
          icon="🔆"
          iconColor="bg-yellow-100"
          title="高对比度"
          description="增强文字与背景的对比度"
          checked={appSettings.highContrast}
          onChange={(checked) => {
            updateSetting("app", "highContrast", checked);
            // 应用高对比度设置
            const root = document.documentElement;
            if (checked) {
              root.classList.add("high-contrast");
            } else {
              root.classList.remove("high-contrast");
            }
          }}
        />
      </div>
    </div>
  );
};
