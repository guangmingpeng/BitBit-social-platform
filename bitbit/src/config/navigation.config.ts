// 导航配置
export const navigationConfig = {
  // 默认导航类型: 'fixed' | 'smart' | 'floating'
  defaultType: "fixed" as const,

  // 智能隐藏导航配置
  smartNavigation: {
    // 是否启用智能隐藏
    enabled: false,
    // 隐藏阈值（滚动多少像素后开始隐藏）
    hideThreshold: 100,
    // 节流间隔（毫秒）
    throttleInterval: 10,
  },

  // 悬浮导航配置
  floatingNavigation: {
    // 是否启用悬浮导航
    enabled: false,
    // 按钮位置: 'bottom-right' | 'bottom-left' | 'bottom-center'
    position: "bottom-right" as const,
    // 距离底部的偏移量
    bottomOffset: 24,
    // 距离侧边的偏移量
    sideOffset: 24,
  },

  // 导航项配置
  navigationItems: [
    {
      path: "/",
      label: "首页",
      iconName: "home" as const,
      end: true,
    },
    {
      path: "/activities",
      label: "活动",
      iconName: "activity" as const,
    },
    {
      path: "/community",
      label: "社区",
      iconName: "community" as const,
    },
    {
      path: "/exchange",
      label: "二手",
      iconName: "exchange" as const,
    },
    {
      path: "/profile",
      label: "我的",
      iconName: "profile" as const,
    },
  ],

  // 样式配置
  styles: {
    // 固定导航栏高度
    fixedNavHeight: 72,
    // 动画持续时间
    transitionDuration: 300,
    // 激活状态颜色
    activeColor: "#3b82f6",
    // 默认颜色
    defaultColor: "#6b7280",
  },
};

export type NavigationConfig = typeof navigationConfig;
