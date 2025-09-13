/**
 * 开发环境配置
 * 用于控制开发时的功能开关
 */

import { branchConfig } from "./branch.config";

// 检查是否为开发环境
const isDevelopment = import.meta.env.MODE === "development";

// 检查环境变量设置
const envShowDebugComponents = import.meta.env.VITE_SHOW_DEBUG_COMPONENTS;

// 决定是否显示调试组件的逻辑：
// 1. 如果明确设置了环境变量，使用环境变量的值
// 2. 否则，dev分支或开发环境下显示，生产环境的main分支隐藏
const shouldShowDebugComponents =
  envShowDebugComponents !== undefined
    ? envShowDebugComponents === "true"
    : branchConfig.showDebugComponents;

export const devConfig = {
  // 是否显示调试组件（右下角的测试组件）
  showDebugComponents: shouldShowDebugComponents,

  // 其他开发配置
  enableConsoleLogging: isDevelopment,
  enableDevTools: isDevelopment,

  // 分支信息
  branch: branchConfig.currentBranch,
  isDevBranch: branchConfig.isDevBranch,
} as const;

export default devConfig;
