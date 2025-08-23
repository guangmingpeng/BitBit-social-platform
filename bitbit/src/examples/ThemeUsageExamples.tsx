/**
 * 主题使用示例组件
 * 展示如何在不同场景下使用主题系统
 */

import React from "react";
import {
  getPrimaryColor,
  getActivityTagStyle,
  getTextColor,
  getBgColor,
  getBorderColor,
  createResponsiveStyle,
  getCSSVariables,
  TYPOGRAPHY,
  SPACING,
  type Theme,
  type ActivityType,
} from "@/shared/config/theme";
import { useThemeColors } from "@/shared/config/themeUtils";

// ============ 主题提供者组件 ============

interface ThemeProviderProps {
  theme: Theme;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme,
  children,
}) => {
  const cssVariables = getCSSVariables(theme);

  return (
    <div
      className={theme === "dark" ? "dark" : ""}
      style={cssVariables as React.CSSProperties}
    >
      {children}
    </div>
  );
};

// ============ 活动标签组件 ============

interface ActivityTagProps {
  type: ActivityType;
  children: React.ReactNode;
  className?: string;
}

export const ActivityTag: React.FC<ActivityTagProps> = ({
  type,
  children,
  className = "",
}) => {
  const tagStyle = getActivityTagStyle(type);

  return (
    <span
      className={`inline-block text-caption px-3 py-1 rounded-full font-medium ${className}`}
      style={tagStyle}
    >
      {children}
    </span>
  );
};

// ============ 响应式卡片组件 ============

interface ResponsiveCardProps {
  title: string;
  content: string;
  theme: Theme;
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  title,
  content,
  theme,
}) => {
  const cardStyle = createResponsiveStyle({
    base: {
      backgroundColor: getBgColor("primary", theme),
      color: getTextColor("primary", theme),
      padding: SPACING[4],
      borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0,0,0,0.08)",
    },
    md: {
      padding: SPACING[6],
    },
    lg: {
      padding: SPACING[8],
    },
  });

  return (
    <div style={cardStyle}>
      <h3 style={TYPOGRAPHY["title-3"]}>{title}</h3>
      <p style={TYPOGRAPHY.body}>{content}</p>
    </div>
  );
};

// ============ 内联样式示例组件 ============

export const InlineStyleExample: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <div
      style={{
        backgroundColor: getBgColor("secondary", theme),
        color: getTextColor("primary", theme),
        padding: SPACING[6],
        borderRadius: "12px",
        border: `1px solid ${getBorderColor(theme)}`,
      }}
    >
      <h2
        style={{
          ...TYPOGRAPHY["title-2"],
          color: getPrimaryColor(500),
          marginBottom: SPACING[4],
        }}
      >
        动态主题标题
      </h2>

      <div style={{ display: "flex", gap: SPACING[2], flexWrap: "wrap" }}>
        <ActivityTag type="music">音乐活动</ActivityTag>
        <ActivityTag type="food">美食分享</ActivityTag>
        <ActivityTag type="learning">学习交流</ActivityTag>
        <ActivityTag type="reading">读书心得</ActivityTag>
      </div>
    </div>
  );
};

// ============ 混合样式示例组件 ============

export const HybridStyleExample: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <div
      className={`
      p-6 rounded-lg shadow-card transition-colors duration-250
      ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
    `}
    >
      <h3 className="text-title-3 mb-4">混合样式示例</h3>

      {/* 程序化生成的按钮样式 */}
      <button
        className="px-6 py-3 rounded-full font-medium transition-colors duration-250"
        style={{
          backgroundColor: getPrimaryColor(500),
          color: "white",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = getPrimaryColor(600);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = getPrimaryColor(500);
        }}
      >
        动态主色按钮
      </button>
    </div>
  );
};

// ============ 主题感知组件 ============

export const ThemedComponent: React.FC<{ theme: Theme }> = ({ theme }) => {
  const colors = useThemeColors(theme);

  return (
    <div
      style={{
        backgroundColor: colors.bg.primary,
        color: colors.text.primary,
        border: `1px solid ${colors.border}`,
        padding: SPACING[4],
        borderRadius: "8px",
      }}
    >
      <h4 style={{ color: colors.primary }}>主题感知组件</h4>
      <p style={{ color: colors.text.secondary }}>
        这个组件会根据当前主题自动调整颜色
      </p>
    </div>
  );
};
