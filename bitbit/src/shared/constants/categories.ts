// 分类映射配置
export const CATEGORY_MAPPING = {
  // 中文 -> 英文映射
  运动: "sports",
  艺术: "music",
  美食: "food",
  学习: "learning",
  心理: "reading",
  户外: "outdoor",
  科技: "tech",
  旅行: "travel",
  音乐: "music",
  电影: "movie",
  摄影: "photography",
  健身: "fitness",
  游戏: "gaming",
  宠物: "pets",
  时尚: "fashion",
  家居: "home",
  理财: "finance",
  职场: "career",
  社交: "social",
  公益: "charity",

  // 英文 -> 中文映射
  music: "艺术",
  food: "美食",
  learning: "学习",
  reading: "心理",
  sports: "运动",
  outdoor: "户外",
  tech: "科技",
  travel: "旅行",
  movie: "电影",
  photography: "摄影",
  fitness: "健身",
  gaming: "游戏",
  pets: "宠物",
  fashion: "时尚",
  home: "家居",
  finance: "理财",
  career: "职场",
  social: "社交",
  charity: "公益",
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
  {
    id: "outdoor",
    nameZh: "户外",
    nameEn: "outdoor",
    icon: "🏔️",
    color: "success",
  },
  { id: "tech", nameZh: "科技", nameEn: "tech", icon: "💻", color: "info" },
  {
    id: "travel",
    nameZh: "旅行",
    nameEn: "travel",
    icon: "✈️",
    color: "warning",
  },
  { id: "movie", nameZh: "电影", nameEn: "movie", icon: "🎬", color: "danger" },
  {
    id: "photography",
    nameZh: "摄影",
    nameEn: "photography",
    icon: "📸",
    color: "coral",
  },
  {
    id: "fitness",
    nameZh: "健身",
    nameEn: "fitness",
    icon: "💪",
    color: "primary",
  },
  { id: "gaming", nameZh: "游戏", nameEn: "gaming", icon: "🎮", color: "info" },
  { id: "pets", nameZh: "宠物", nameEn: "pets", icon: "🐾", color: "mint" },
  {
    id: "fashion",
    nameZh: "时尚",
    nameEn: "fashion",
    icon: "👗",
    color: "lavender",
  },
  {
    id: "home",
    nameZh: "家居",
    nameEn: "home",
    icon: "🏠",
    color: "sunflower",
  },
  {
    id: "finance",
    nameZh: "理财",
    nameEn: "finance",
    icon: "💰",
    color: "success",
  },
  {
    id: "career",
    nameZh: "职场",
    nameEn: "career",
    icon: "💼",
    color: "warning",
  },
  { id: "social", nameZh: "社交", nameEn: "social", icon: "👥", color: "info" },
  {
    id: "charity",
    nameZh: "公益",
    nameEn: "charity",
    icon: "❤️",
    color: "danger",
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

// 自定义分类接口
export interface CustomCategory {
  id: string;
  nameZh: string;
  nameEn: string;
  icon: string;
  color: string;
  isCustom: true;
  createdAt: string;
  userId: string;
}

// 分类接口
export interface Category {
  id: string;
  nameZh: string;
  nameEn: string;
  icon: string;
  color: string;
  isCustom?: boolean;
}

// 获取用户自定义分类（模拟数据，实际应从API获取）
export const getUserCustomCategories = (): CustomCategory[] => {
  const storedCategories = localStorage.getItem("userCustomCategories");
  if (storedCategories) {
    try {
      return JSON.parse(storedCategories);
    } catch {
      return [];
    }
  }
  return [];
};

// 保存用户自定义分类
export const saveUserCustomCategory = (
  category: Omit<CustomCategory, "id" | "createdAt" | "userId" | "isCustom">
): CustomCategory => {
  const newCategory: CustomCategory = {
    ...category,
    id: `custom_${Date.now()}`,
    createdAt: new Date().toISOString(),
    userId: "current_user", // 实际应使用真实用户ID
    isCustom: true,
  };

  const existingCategories = getUserCustomCategories();
  const updatedCategories = [...existingCategories, newCategory];
  localStorage.setItem(
    "userCustomCategories",
    JSON.stringify(updatedCategories)
  );

  return newCategory;
};

// 获取所有分类（内置 + 自定义）
export const getAllCategories = (): Category[] => {
  const builtInCategories = AVAILABLE_CATEGORIES.map((cat) => ({
    ...cat,
    isCustom: false,
  }));
  const customCategories = getUserCustomCategories();
  return [...builtInCategories, ...customCategories];
};

// 删除自定义分类
export const deleteCustomCategory = (categoryId: string): void => {
  const existingCategories = getUserCustomCategories();
  const updatedCategories = existingCategories.filter(
    (cat) => cat.id !== categoryId
  );
  localStorage.setItem(
    "userCustomCategories",
    JSON.stringify(updatedCategories)
  );
};
