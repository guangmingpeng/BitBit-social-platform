/**
 * 主题相关的工具函数和 Hook
 * 专门用于支持主题功能的辅助函数
 */

import React from "react";
import {
  getTextColor,
  getBgColor,
  getBorderColor,
  getPrimaryColor,
  type Theme,
} from "./theme";

// ============ 主题 Hook ============

/**
 * 获取当前主题的颜色配置
 */
export const useThemeColors = (theme: Theme) => {
  return React.useMemo(
    () => ({
      text: {
        primary: getTextColor("primary", theme),
        secondary: getTextColor("secondary", theme),
        tertiary: getTextColor("tertiary", theme),
      },
      bg: {
        primary: getBgColor("primary", theme),
        secondary: getBgColor("secondary", theme),
        tertiary: getBgColor("tertiary", theme),
      },
      border: getBorderColor(theme),
      primary: getPrimaryColor(500),
    }),
    [theme]
  );
};

/**
 * 监听系统主题偏好的 Hook
 */
export const useSystemTheme = (): Theme => {
  const [theme, setTheme] = React.useState<Theme>("light");

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    // 初始设置
    setTheme(mediaQuery.matches ? "dark" : "light");

    // 监听变化
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return theme;
};

/**
 * 主题切换 Hook，支持本地存储
 */
export const useThemeToggle = (defaultTheme: Theme = "light") => {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("bitbit-theme") as Theme;
      return stored || defaultTheme;
    }
    return defaultTheme;
  });

  const toggleTheme = React.useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("bitbit-theme", newTheme);
    }
  }, [theme]);

  const setSpecificTheme = React.useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("bitbit-theme", newTheme);
    }
  }, []);

  React.useEffect(() => {
    // 应用主题到 document
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
};

// ============ 工具函数 ============

/**
 * 生成全局样式字符串
 */
export const generateGlobalStyles = (theme: Theme): string => {
  const colors = {
    text: {
      primary: getTextColor("primary", theme),
      secondary: getTextColor("secondary", theme),
      tertiary: getTextColor("tertiary", theme),
    },
    bg: {
      primary: getBgColor("primary", theme),
      secondary: getBgColor("secondary", theme),
      tertiary: getBgColor("tertiary", theme),
    },
    border: getBorderColor(theme),
  };

  return `
    body {
      background-color: ${colors.bg.primary};
      color: ${colors.text.primary};
      transition: background-color 0.25s ease, color 0.25s ease;
    }
    
    .card {
      background-color: ${colors.bg.secondary};
      border: 1px solid ${colors.border};
    }
    
    .text-muted {
      color: ${colors.text.secondary};
    }
    
    .border-default {
      border-color: ${colors.border};
    }
  `;
};

/**
 * 创建主题感知的样式对象
 */
export const createThemedStyle = (
  lightStyle: React.CSSProperties,
  darkStyle: React.CSSProperties,
  theme: Theme
): React.CSSProperties => {
  return theme === "dark" ? darkStyle : lightStyle;
};

/**
 * 获取主题适配的类名
 */
export const getThemedClassName = (
  baseClass: string,
  lightClass: string,
  darkClass: string,
  theme: Theme
): string => {
  const themeClass = theme === "dark" ? darkClass : lightClass;
  return `${baseClass} ${themeClass}`;
};

/**
 * 检查是否支持暗色模式
 */
export const supportsDarkMode = (): boolean => {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};

/**
 * 获取推荐的初始主题
 */
export const getRecommendedTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  // 优先从本地存储读取
  const stored = localStorage.getItem("bitbit-theme") as Theme;
  if (stored) return stored;

  // 其次根据系统偏好
  return supportsDarkMode() ? "dark" : "light";
};
