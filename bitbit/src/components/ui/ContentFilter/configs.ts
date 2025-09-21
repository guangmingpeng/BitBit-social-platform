import type {
  FilterConfig,
  SortConfig,
  SearchConfig,
  ProfileFilterConfigs,
} from "./types";

// 工具函数：动态获取分类选项
export const getDynamicCategoryOptions = <T extends Record<string, unknown>>(
  data: T[],
  categoryField: string = "category"
): { key: string; label: string; count?: number }[] => {
  // 统计每个分类的数量
  const categoryCount = data.reduce((acc, item) => {
    const category = String(
      (item as Record<string, unknown>)[categoryField] || "other"
    );
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 分类映射（中英文对照）
  const categoryMap: Record<string, string> = {
    music: "音乐",
    food: "美食",
    learning: "学习",
    reading: "阅读",
    sports: "运动",
    travel: "旅行",
    photography: "摄影",
    technology: "科技",
    art: "艺术",
    lifestyle: "生活",
    other: "其他",
  };

  // 生成选项，先添加"全部"选项
  const options = [{ key: "all", label: "全部", count: data.length }];

  // 添加实际存在的分类选项
  Object.entries(categoryCount)
    .sort(([, a], [, b]) => b - a) // 按数量降序排列
    .forEach(([category, count]) => {
      options.push({
        key: category,
        label: categoryMap[category] || category,
        count,
      });
    });

  return options;
};

// 创建动态posts配置的函数
export const createPostsConfig = <T extends Record<string, unknown>>(
  data: T[]
) => ({
  filters: [
    {
      type: "chips" as const,
      title: "分类",
      key: "category",
      options: getDynamicCategoryOptions(data, "category"),
      allowMultiple: false,
      showCount: true,
    } as FilterConfig,
  ],
  sort: {
    title: "排序",
    defaultSort: "publishTime",
    options: [
      { key: "publishTime", label: "发布时间", direction: "desc" as const },
      { key: "likes", label: "点赞数", direction: "desc" as const },
      { key: "comments", label: "评论数", direction: "desc" as const },
      { key: "title", label: "标题", direction: "asc" as const },
    ],
  } as SortConfig,
  search: {
    placeholder: "搜索我的帖子...",
    searchFields: ["content", "tags"],
  } as SearchConfig,
});

// 收藏页面配置
const favoritesConfig = {
  filters: [
    {
      type: "tabs" as const,
      title: "类型",
      key: "type", // 添加明确的key
      options: [
        { key: "all", label: "全部" },
        { key: "activity", label: "活动" },
        { key: "post", label: "帖子" },
        { key: "exchange", label: "商品" },
      ],
      showCount: true,
    } as FilterConfig,
  ],
  sort: {
    title: "排序",
    defaultSort: "favoriteTime",
    options: [
      { key: "favoriteTime", label: "收藏时间", direction: "desc" as const },
      { key: "title", label: "标题", direction: "asc" as const },
      { key: "price", label: "价格", direction: "asc" as const },
    ],
  } as SortConfig,
  search: {
    placeholder: "搜索收藏的内容...",
    searchFields: ["title", "author.name"],
  } as SearchConfig,
};

// 帖子页面配置
const postsConfig = {
  filters: [
    {
      type: "chips" as const,
      title: "分类",
      key: "category",
      options: [
        { key: "all", label: "全部" },
        { key: "music", label: "音乐" },
        { key: "food", label: "美食" },
        { key: "learning", label: "学习" },
        { key: "reading", label: "阅读" },
      ],
      allowMultiple: false,
      showCount: true,
    } as FilterConfig,
  ],
  sort: {
    title: "排序",
    defaultSort: "publishTime",
    options: [
      { key: "publishTime", label: "发布时间", direction: "desc" as const },
      { key: "likes", label: "点赞数", direction: "desc" as const },
      { key: "comments", label: "评论数", direction: "desc" as const },
      { key: "title", label: "标题", direction: "asc" as const },
    ],
  } as SortConfig,
  search: {
    placeholder: "搜索我的帖子...",
    searchFields: ["content", "tags"],
  } as SearchConfig,
};

// 交易页面配置
const tradesConfig = {
  filters: [
    {
      type: "tabs" as const,
      title: "商品状态",
      key: "status",
      options: [
        { key: "all", label: "全部" },
        { key: "available", label: "在售" },
        { key: "sold", label: "已售" },
        { key: "hidden", label: "已下架" },
        { key: "hot", label: "热门" },
      ],
      showCount: true,
    } as FilterConfig,
    {
      type: "dropdown" as const,
      title: "分类",
      key: "category",
      options: [
        { key: "all", label: "全部分类" },
        { key: "数码产品", label: "数码产品" },
        { key: "服装鞋帽", label: "服装鞋帽" },
        { key: "家居用品", label: "家居用品" },
        { key: "图书", label: "图书" },
        { key: "其他", label: "其他" },
      ],
    } as FilterConfig,
  ],
  sort: {
    title: "排序",
    defaultSort: "timeAgo",
    options: [
      { key: "timeAgo", label: "发布时间", direction: "desc" as const },
      { key: "price", label: "价格从低到高", direction: "asc" as const },
      { key: "price_desc", label: "价格从高到低", direction: "desc" as const },
      { key: "stats.views", label: "浏览量", direction: "desc" as const },
      { key: "stats.likes", label: "点赞数", direction: "desc" as const },
    ],
  } as SortConfig,
  search: {
    placeholder: "搜索商品...",
    searchFields: ["title", "category", "condition"],
  } as SearchConfig,
};

// 活动页面配置
const activitiesConfig = {
  filters: [
    {
      type: "tabs" as const,
      title: "状态",
      key: "status",
      options: [
        { key: "all", label: "全部活动" },
        { key: "organized", label: "我组织的" },
        { key: "registered", label: "我参加的" },
        { key: "ended", label: "已结束" },
      ],
      showCount: true,
    } as FilterConfig,
    {
      type: "chips" as const,
      title: "分类",
      key: "category",
      options: [
        { key: "all", label: "全部" },
        { key: "music", label: "音乐" },
        { key: "food", label: "美食" },
        { key: "learning", label: "学习" },
        { key: "reading", label: "阅读" },
        { key: "outdoor", label: "户外" },
      ],
      allowMultiple: true,
    } as FilterConfig,
  ],
  sort: {
    title: "排序",
    defaultSort: "date",
    options: [
      { key: "date", label: "活动时间", direction: "asc" as const },
      {
        key: "currentParticipants",
        label: "参与人数",
        direction: "desc" as const,
      },
      { key: "title", label: "标题", direction: "asc" as const },
    ],
  } as SortConfig,
  search: {
    placeholder: "搜索活动...",
    searchFields: ["title", "description", "location"],
  } as SearchConfig,
};

// 草稿页面配置
const draftsConfig = {
  filters: [
    {
      type: "tabs" as const,
      title: "类型",
      key: "type",
      options: [
        { key: "all", label: "全部草稿" },
        { key: "activity", label: "活动草稿" },
        { key: "post", label: "帖子草稿" },
        { key: "exchange", label: "商品草稿" },
      ],
      showCount: true,
    } as FilterConfig,
  ],
  sort: {
    title: "排序",
    defaultSort: "updatedAt",
    options: [
      { key: "updatedAt", label: "最近修改", direction: "desc" as const },
      { key: "createdAt", label: "创建时间", direction: "desc" as const },
      { key: "title", label: "标题", direction: "asc" as const },
    ],
  } as SortConfig,
  search: {
    placeholder: "搜索草稿...",
    searchFields: ["title", "content"],
  } as SearchConfig,
};

// 导出预设配置
export const profileFilterConfigs: ProfileFilterConfigs = {
  favorites: favoritesConfig,
  posts: postsConfig,
  trades: tradesConfig,
  activities: activitiesConfig,
  drafts: draftsConfig,
};

// 导出单个配置以便按需使用
export {
  favoritesConfig,
  postsConfig,
  tradesConfig,
  activitiesConfig,
  draftsConfig,
};

// 工具函数：获取指定页面的配置
export const getProfileFilterConfig = (page: keyof ProfileFilterConfigs) => {
  return profileFilterConfigs[page];
};

// 工具函数：创建自定义筛选函数
export const createCustomFilterFn = <T extends Record<string, unknown>>(
  page: keyof ProfileFilterConfigs
) => {
  return (item: T, filters: Record<string, string | string[]>): boolean => {
    // 根据不同页面实现不同的筛选逻辑
    switch (page) {
      case "favorites":
        return filterFavorites(item, filters);
      case "trades":
        return filterTrades(item, filters);
      case "posts":
        return filterPosts(item, filters);
      case "activities":
        return filterActivities(item, filters);
      case "drafts":
        return filterDrafts(item, filters);
      default:
        return true;
    }
  };
};

// 收藏筛选逻辑
const filterFavorites = <T extends Record<string, unknown>>(
  item: T,
  filters: Record<string, string | string[]>
): boolean => {
  // 如果没有任何筛选条件，返回true显示所有项目
  if (!filters || Object.keys(filters).length === 0) {
    return true;
  }

  const typeFilter = filters.type;
  // 如果typeFilter为空字符串、"all"或者未定义，显示所有项目
  if (!typeFilter || typeFilter === "all" || typeFilter === "") {
    return true;
  }

  return String(item.type) === String(typeFilter);
};

// 交易筛选逻辑
const filterTrades = <T extends Record<string, unknown>>(
  item: T,
  filters: Record<string, string | string[]>
): boolean => {
  // 如果没有任何筛选条件，返回true显示所有项目
  if (!filters || Object.keys(filters).length === 0) {
    return true;
  }

  const statusFilter = filters.status;
  const categoryFilter = filters.category;

  if (statusFilter && statusFilter !== "all" && statusFilter !== "") {
    if (String(item.status) !== String(statusFilter)) {
      return false;
    }
  }

  if (categoryFilter && categoryFilter !== "all" && categoryFilter !== "") {
    if (String(item.category) !== String(categoryFilter)) {
      return false;
    }
  }

  return true;
};

// 帖子筛选逻辑
const filterPosts = <T extends Record<string, unknown>>(
  item: T,
  filters: Record<string, string | string[]>
): boolean => {
  // 如果没有任何筛选条件，返回true显示所有项目
  if (!filters || Object.keys(filters).length === 0) {
    return true;
  }

  const categoryFilter = filters.category;
  // 如果categoryFilter为空字符串、"all"或者未定义，显示所有项目
  if (!categoryFilter || categoryFilter === "all" || categoryFilter === "") {
    return true;
  }

  return String(item.category) === String(categoryFilter);
};

// 活动筛选逻辑
const filterActivities = <T extends Record<string, unknown>>(
  item: T,
  filters: Record<string, string | string[]>
): boolean => {
  // 如果没有任何筛选条件，返回true显示所有项目
  if (!filters || Object.keys(filters).length === 0) {
    return true;
  }

  const statusFilter = filters.status;
  const categoryFilter = filters.category;

  if (statusFilter && statusFilter !== "all" && statusFilter !== "") {
    if (String(item.status) !== String(statusFilter)) {
      return false;
    }
  }

  if (
    categoryFilter &&
    Array.isArray(categoryFilter) &&
    categoryFilter.length > 0
  ) {
    if (
      !categoryFilter.includes("all") &&
      !categoryFilter.includes(String(item.category))
    ) {
      return false;
    }
  }

  return true;
};

// 草稿筛选逻辑
const filterDrafts = <T extends Record<string, unknown>>(
  item: T,
  filters: Record<string, string | string[]>
): boolean => {
  // 如果没有任何筛选条件，返回true显示所有项目
  if (!filters || Object.keys(filters).length === 0) {
    return true;
  }

  const typeFilter = filters.type;
  // 如果typeFilter为空字符串、"all"或者未定义，显示所有项目
  if (!typeFilter || typeFilter === "all" || typeFilter === "") {
    return true;
  }

  return String(item.type) === String(typeFilter);
};
