import type { Activity } from "../types";

/**
 * 格式化日期显示
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "已结束";
  } else if (diffDays === 0) {
    return "今天";
  } else if (diffDays === 1) {
    return "明天";
  } else {
    return `${diffDays}天后`;
  }
};

/**
 * 获取活动状态的显示文本
 */
export const getActivityStatusText = (status: Activity["status"]): string => {
  switch (status) {
    case "registered":
      return "已报名";
    case "organized":
      return "已组织";
    case "ended":
      return "已结束";
    default:
      return "未知";
  }
};

/**
 * 计算经验值百分比
 */
export const calculateExpPercentage = (
  current: number,
  total: number
): number => {
  return Math.max(0, Math.min(100, (current / total) * 100));
};
