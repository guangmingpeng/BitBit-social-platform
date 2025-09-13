/**
 * 分支特定配置
 * 用于控制不同分支（dev/main）的功能差异
 */

// 获取当前分支信息（如果可用）
const getCurrentBranch = () => {
  // 在生产环境中，这可以通过构建时注入的环境变量来获取
  return import.meta.env.VITE_CURRENT_BRANCH || "dev";
};

// 检查是否为dev分支
const isDevBranch = () => {
  const branch = getCurrentBranch();
  return branch === "dev" || branch === "development";
};

// 检查是否为生产环境
const isProduction = () => {
  return import.meta.env.PROD;
};

export const branchConfig = {
  // 当前分支
  currentBranch: getCurrentBranch(),

  // 是否为dev分支
  isDevBranch: isDevBranch(),

  // 是否为生产环境
  isProduction: isProduction(),

  // 是否显示调试组件
  // dev分支或开发环境显示，生产环境的主分支隐藏
  showDebugComponents: isDevBranch() || !isProduction(),
} as const;

export default branchConfig;
