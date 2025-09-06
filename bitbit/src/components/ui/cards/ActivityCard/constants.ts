// ActivityCard 配置常量
// 将来如果需要重构，可以将这些配置提取出来

export const CATEGORY_CONFIGS = {
  music: {
    icon: "🎵",
    label: "音乐",
    color: "bg-purple-50 text-purple-600",
    border: "border-purple-200",
  },
  food: {
    icon: "🍴",
    label: "美食",
    color: "bg-orange-50 text-orange-600",
    border: "border-orange-200",
  },
  learning: {
    icon: "📚",
    label: "学习",
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-200",
  },
  reading: {
    icon: "📖",
    label: "阅读",
    color: "bg-green-50 text-green-600",
    border: "border-green-200",
  },
  default: {
    icon: "📅",
    label: "活动",
    color: "bg-gray-50 text-gray-600",
    border: "border-gray-200",
  },
} as const;

export const STATUS_CONFIGS = {
  registered: {
    text: "已报名",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    showAsLabel: true,
  },
  organized: {
    text: "已组织",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    showAsLabel: true,
  },
  ongoing: {
    text: "进行中",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    showAsLabel: true,
  },
  ended: {
    text: "已结束",
    bgColor: "bg-gray-50",
    textColor: "text-gray-500",
    showAsLabel: true,
  },
  completed: {
    text: "已结束",
    bgColor: "bg-gray-50",
    textColor: "text-gray-500",
    showAsLabel: true,
  },
  cancelled: {
    text: "已取消",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    showAsLabel: true,
  },
  draft: {
    text: "草稿",
    bgColor: "bg-gray-50",
    textColor: "text-gray-500",
    showAsLabel: true,
  },
  default: {
    text: "可报名",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    showAsLabel: false,
  },
} as const;
