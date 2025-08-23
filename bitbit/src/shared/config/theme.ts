/**
 * BitBit 设计系统主题配置
 * 提供JavaScript中访问设计token的能力，支持亮色/暗色主题切换
 */

// ============ 色彩系统 ============
export const COLORS = {
  // 主品牌色
  primary: {
    50: "#F0F4FF",
    100: "#CCE1FF",
    200: "#7D95FF",
    500: "#4E6FFF", // 主色
    600: "#3050E0",
  },

  // 辅助色 - 活动类型色彩
  activity: {
    music: {
      bg: "#FFCCD6",
      text: "#FF6B8B",
    },
    food: {
      bg: "#CCF5E8",
      text: "#65D1AA",
    },
    learning: {
      bg: "#FFECCB",
      text: "#FFB951",
    },
    reading: {
      bg: "#E6DDFF",
      text: "#8F7CFF",
    },
  },

  // 状态色
  status: {
    error: "#FF5252",
    success: "#12B76A",
    warning: "#FFC107",
    info: "#0096FF",
  },

  // 中性色 - 亮色主题
  light: {
    text: {
      primary: "#222222",
      secondary: "#666666",
      tertiary: "#999999",
    },
    bg: {
      primary: "#FFFFFF",
      secondary: "#F9F9FB",
      tertiary: "#F3F3F7",
    },
    border: "#E0E0E6",
  },

  // 中性色 - 暗色主题
  dark: {
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3",
      tertiary: "#666666",
    },
    bg: {
      primary: "#1A1A1A",
      secondary: "#2D2D2D",
      tertiary: "#404040",
    },
    border: "#4A4A4A",
  },
} as const;

// ============ 字体系统 ============
export const TYPOGRAPHY = {
  "title-1": {
    fontSize: "32px",
    lineHeight: "42px",
    fontWeight: "700",
  },
  "title-2": {
    fontSize: "28px",
    lineHeight: "36px",
    fontWeight: "700",
  },
  "title-3": {
    fontSize: "24px",
    lineHeight: "31px",
    fontWeight: "600",
  },
  "title-4": {
    fontSize: "20px",
    lineHeight: "26px",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: "18px",
    lineHeight: "24px",
    fontWeight: "500",
  },
  "body-lg": {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "400",
  },
  body: {
    fontSize: "14px",
    lineHeight: "21px",
    fontWeight: "400",
  },
  caption: {
    fontSize: "12px",
    lineHeight: "18px",
    fontWeight: "400",
  },
} as const;

// ============ 间距系统 ============
export const SPACING = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
} as const;

// ============ 圆角系统 ============
export const RADIUS = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  full: "9999px",
} as const;

// ============ 阴影系统 ============
export const SHADOWS = {
  light: "0px 1px 2px rgba(0,0,0,0.05)",
  card: "0px 4px 8px rgba(0,0,0,0.08)",
  modal: "0px 8px 24px rgba(0,0,0,0.12)",
  focus: "0px 12px 32px rgba(0,0,0,0.16)",
} as const;

// ============ 动画时长 ============
export const DURATIONS = {
  fast: "150ms",
  normal: "250ms",
  slow: "350ms",
} as const;

// ============ 断点系统 ============
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// ============ 工具函数 ============

/**
 * 获取主品牌色
 */
export const getPrimaryColor = (shade: keyof typeof COLORS.primary = 500) => {
  return COLORS.primary[shade];
};

/**
 * 获取活动类型对应的颜色
 */
export const getActivityColor = (
  type: keyof typeof COLORS.activity,
  variant: "bg" | "text" = "text"
) => {
  return COLORS.activity[type][variant];
};

/**
 * 获取活动标签样式对象
 */
export const getActivityTagStyle = (type: keyof typeof COLORS.activity) => {
  return {
    backgroundColor: COLORS.activity[type].bg,
    color: COLORS.activity[type].text,
  };
};

/**
 * 获取当前主题的文本颜色
 */
export const getTextColor = (
  level: keyof typeof COLORS.light.text,
  theme: "light" | "dark" = "light"
) => {
  return COLORS[theme].text[level];
};

/**
 * 获取当前主题的背景颜色
 */
export const getBgColor = (
  level: keyof typeof COLORS.light.bg,
  theme: "light" | "dark" = "light"
) => {
  return COLORS[theme].bg[level];
};

/**
 * 获取当前主题的边框颜色
 */
export const getBorderColor = (theme: "light" | "dark" = "light") => {
  return COLORS[theme].border;
};

/**
 * 获取状态颜色
 */
export const getStatusColor = (status: keyof typeof COLORS.status) => {
  return COLORS.status[status];
};

/**
 * 创建响应式样式对象
 */
export const createResponsiveStyle = (
  styles: Partial<
    Record<keyof typeof BREAKPOINTS | "base", React.CSSProperties>
  >
) => {
  const baseStyle = styles.base || {};

  const mediaQueries = Object.entries(styles)
    .filter(([key]) => key !== "base")
    .map(([breakpoint, style]) => ({
      [`@media (min-width: ${
        BREAKPOINTS[breakpoint as keyof typeof BREAKPOINTS]
      })`]: style,
    }));

  return {
    ...baseStyle,
    ...Object.assign({}, ...mediaQueries),
  };
};

/**
 * 生成Tailwind类名对应的CSS变量
 */
export const getCSSVariables = (theme: "light" | "dark" = "light") => {
  return {
    "--color-primary": COLORS.primary[500],
    "--color-primary-light": COLORS.primary[200],
    "--color-primary-dark": COLORS.primary[600],
    "--color-text-primary": COLORS[theme].text.primary,
    "--color-text-secondary": COLORS[theme].text.secondary,
    "--color-text-tertiary": COLORS[theme].text.tertiary,
    "--color-bg-primary": COLORS[theme].bg.primary,
    "--color-bg-secondary": COLORS[theme].bg.secondary,
    "--color-bg-tertiary": COLORS[theme].bg.tertiary,
    "--color-border": COLORS[theme].border,
    "--color-error": COLORS.status.error,
    "--color-success": COLORS.status.success,
    "--color-warning": COLORS.status.warning,
    "--color-info": COLORS.status.info,
  };
};

// ============ 主题预设 ============
export const THEME_PRESETS = {
  light: {
    colors: COLORS.light,
    name: "亮色主题",
    description: "适合白天使用的明亮主题",
  },
  dark: {
    colors: COLORS.dark,
    name: "暗色主题",
    description: "适合夜晚使用的深色主题",
  },
} as const;

// ============ 导出类型 ============
export type Theme = "light" | "dark";
export type ActivityType = keyof typeof COLORS.activity;
export type TypographySize = keyof typeof TYPOGRAPHY;
export type SpacingSize = keyof typeof SPACING;
export type RadiusSize = keyof typeof RADIUS;
export type ShadowSize = keyof typeof SHADOWS;
export type StatusColor = keyof typeof COLORS.status;
export type BreakpointSize = keyof typeof BREAKPOINTS;

// 默认导出主题配置对象
export default {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  radius: RADIUS,
  shadows: SHADOWS,
  durations: DURATIONS,
  breakpoints: BREAKPOINTS,
  presets: THEME_PRESETS,
  utils: {
    getPrimaryColor,
    getActivityColor,
    getActivityTagStyle,
    getTextColor,
    getBgColor,
    getBorderColor,
    getStatusColor,
    createResponsiveStyle,
    getCSSVariables,
  },
} as const;
