// 分类映射配置
export const CATEGORY_MAPPING = {
  // 中文 -> 英文映射
  运动: "sports",
  艺术: "music", // 将艺术映射到音乐，因为当前数据中有音乐分类
  美食: "food",
  学习: "learning",
  心理: "reading", // 将心理映射到阅读，因为当前数据中有阅读分类
  户外: "sports", // 将户外也映射到运动

  // 英文 -> 中文映射
  music: "艺术",
  food: "美食",
  learning: "学习",
  reading: "心理",
  sports: "运动",
} as const;

// 获取所有可用的分类
export const AVAILABLE_CATEGORIES = [
  { id: "music", nameZh: "艺术", nameEn: "music", icon: "🎭", color: "coral" },
  { id: "food", nameZh: "美食", nameEn: "food", icon: "🍳", color: "mint" },
  {
    id: "learning",
    nameZh: "学习",
    nameEn: "learning",
    icon: "📚",
    color: "sunflower",
  },
  {
    id: "reading",
    nameZh: "心理",
    nameEn: "reading",
    icon: "🧠",
    color: "lavender",
  },
  {
    id: "sports",
    nameZh: "运动",
    nameEn: "sports",
    icon: "🏃",
    color: "primary",
  },
] as const;

// 将中文分类名转换为英文
export const getCategoryEnglishName = (chineseName: string): string => {
  return (
    CATEGORY_MAPPING[chineseName as keyof typeof CATEGORY_MAPPING] ||
    chineseName
  );
};

// 将英文分类名转换为中文
export const getCategoryChineseName = (englishName: string): string => {
  return (
    CATEGORY_MAPPING[englishName as keyof typeof CATEGORY_MAPPING] ||
    englishName
  );
};
