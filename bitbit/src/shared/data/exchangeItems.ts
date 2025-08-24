// 二手交换商品统一数据源
// 这个文件提供了所有页面共享的商品数据，确保数据一致性

export interface ExchangeItemData {
  id: string;
  title: string;
  description?: string;
  condition: string;
  category: string;
  price: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  status: "available" | "reserved" | "sold" | "hot" | "urgent" | "new";
  seller: {
    name: string;
    avatar?: string;
    initials: string;
    rating: number;
    soldCount: number;
    joinDate?: string;
    responseRate?: string;
    responseTime?: string;
  };
  stats: {
    views: number;
    likes: number;
    comments: number;
  };
  timeAgo: string;
  location?: string;
  specifications?: Array<{ label: string; value: string }>;
  exchangePreferences?: string[];
}

// 统一的商品数据
export const exchangeItemsData: Record<string, ExchangeItemData> = {
  "1": {
    id: "1",
    title: "iPhone 14 Pro 深空黑 128GB",
    description:
      "自用iPhone 14 Pro，使用半年多，平时都有贴膜和戴壳保护，9成新，功能完好无损。包装盒、充电线、说明书齐全，无维修记录。因为要换新手机所以出售，诚心交换。",
    condition: "90%新",
    category: "数码产品",
    price: 6800,
    originalPrice: 8999,
    image: "https://picsum.photos/300/200?random=phone1",
    images: [
      "https://picsum.photos/400/400?random=phone1",
      "https://picsum.photos/400/400?random=phone2",
      "https://picsum.photos/400/400?random=phone3",
      "https://picsum.photos/400/400?random=phone4",
    ],
    status: "available",
    seller: {
      name: "张亮",
      avatar: "https://picsum.photos/60/60?random=seller1",
      initials: "ZL",
      rating: 4.8,
      soldCount: 12,
      joinDate: "2023年3月",
      responseRate: "98%",
      responseTime: "30分钟内",
    },
    stats: {
      views: 126,
      likes: 23,
      comments: 8,
    },
    timeAgo: "2小时前",
    location: "杭州市 西湖区",
    specifications: [
      { label: "品牌", value: "Apple" },
      { label: "型号", value: "iPhone 14 Pro" },
      { label: "颜色", value: "深空黑" },
      { label: "存储容量", value: "128GB" },
      { label: "购买时间", value: "2023年10月" },
      { label: "保修情况", value: "在保" },
    ],
    exchangePreferences: [
      "iPhone 15 系列",
      "MacBook Air M2",
      "iPad Pro",
      "现金交易",
    ],
  },
  "2": {
    id: "2",
    title: "iPhone 13 Pro Max 银色 256GB",
    description:
      "iPhone 13 Pro Max，银色256GB，95%新。购买时间一年，一直使用手机壳和钢化膜保护，外观几乎无磨损。电池健康度95%，所有功能正常。配件齐全，包括原装充电器、数据线和包装盒。",
    condition: "95%新",
    category: "数码产品",
    price: 5800,
    originalPrice: 7999,
    image: "https://picsum.photos/300/200?random=iphone13",
    images: [
      "https://picsum.photos/400/400?random=iphone13",
      "https://picsum.photos/400/400?random=iphone13-2",
      "https://picsum.photos/400/400?random=iphone13-3",
    ],
    status: "available",
    seller: {
      name: "李明",
      avatar: "https://picsum.photos/60/60?random=seller2",
      initials: "LM",
      rating: 4.9,
      soldCount: 8,
      joinDate: "2023年1月",
      responseRate: "99%",
      responseTime: "15分钟内",
    },
    stats: {
      views: 89,
      likes: 15,
      comments: 4,
    },
    timeAgo: "1天前",
    location: "上海市 浦东新区",
    specifications: [
      { label: "品牌", value: "Apple" },
      { label: "型号", value: "iPhone 13 Pro Max" },
      { label: "颜色", value: "银色" },
      { label: "存储容量", value: "256GB" },
      { label: "购买时间", value: "2023年9月" },
      { label: "保修情况", value: "在保" },
    ],
    exchangePreferences: ["iPhone 14 系列", "MacBook Pro", "现金交易"],
  },
  "3": {
    id: "3",
    title: "MacBook Air M1 银色 8GB+256GB",
    description:
      "MacBook Air M1芯片，银色，8GB内存+256GB存储。90%新，平时主要用于办公和学习，性能依然很棒。外观有轻微使用痕迹，但不影响使用。原装充电器和包装盒都在。",
    condition: "90%新",
    category: "数码产品",
    price: 6200,
    originalPrice: 7999,
    image: "https://picsum.photos/300/200?random=macbook",
    images: [
      "https://picsum.photos/400/400?random=macbook",
      "https://picsum.photos/400/400?random=macbook-2",
    ],
    status: "available",
    seller: {
      name: "王小红",
      avatar: "https://picsum.photos/60/60?random=seller3",
      initials: "WX",
      rating: 4.7,
      soldCount: 5,
      joinDate: "2023年5月",
      responseRate: "95%",
      responseTime: "1小时内",
    },
    stats: {
      views: 67,
      likes: 12,
      comments: 3,
    },
    timeAgo: "3小时前",
    location: "北京市 朝阳区",
    specifications: [
      { label: "品牌", value: "Apple" },
      { label: "型号", value: "MacBook Air" },
      { label: "处理器", value: "Apple M1" },
      { label: "内存", value: "8GB" },
      { label: "存储", value: "256GB SSD" },
      { label: "购买时间", value: "2022年8月" },
    ],
    exchangePreferences: ["iPad Pro", "iPhone 14 系列", "现金交易"],
  },
  "4": {
    id: "4",
    title: "iPad Pro 11寸 M1 深空灰 128GB",
    description:
      "iPad Pro 11寸 M1芯片版本，深空灰，128GB WiFi版。85%新，主要用于绘画和笔记，配有Apple Pencil 2代。屏幕无划痕，边框有轻微磨损。包装和配件齐全。",
    condition: "85%新",
    category: "数码产品",
    price: 4200,
    originalPrice: 6799,
    image: "https://picsum.photos/300/200?random=ipad",
    images: [
      "https://picsum.photos/400/400?random=ipad",
      "https://picsum.photos/400/400?random=ipad-2",
    ],
    status: "hot",
    seller: {
      name: "陈浩",
      avatar: "https://picsum.photos/60/60?random=seller4",
      initials: "CH",
      rating: 4.6,
      soldCount: 15,
      joinDate: "2022年12月",
      responseRate: "97%",
      responseTime: "45分钟内",
    },
    stats: {
      views: 45,
      likes: 8,
      comments: 2,
    },
    timeAgo: "5小时前",
    location: "深圳市 南山区",
    specifications: [
      { label: "品牌", value: "Apple" },
      { label: "型号", value: "iPad Pro 11寸" },
      { label: "处理器", value: "Apple M1" },
      { label: "存储容量", value: "128GB" },
      { label: "网络", value: "WiFi" },
      { label: "购买时间", value: "2022年6月" },
    ],
    exchangePreferences: ["MacBook Air", "iPhone 13 系列", "现金交易"],
  },
  "5": {
    id: "5",
    title: "Nike Air Jordan 1",
    description:
      "Nike Air Jordan 1经典款，尺码42，95%新。只穿过几次，平时都放在鞋盒里保存。没有明显磨损痕迹，鞋底纹路清晰。原装鞋盒和配件齐全。",
    condition: "95%新",
    category: "服装",
    price: 1200,
    originalPrice: 1699,
    image: "https://picsum.photos/300/200?random=shoes1",
    images: [
      "https://picsum.photos/400/400?random=shoes1",
      "https://picsum.photos/400/400?random=shoes2",
    ],
    status: "available",
    seller: {
      name: "刘强",
      avatar: "https://picsum.photos/60/60?random=seller5",
      initials: "LQ",
      rating: 4.5,
      soldCount: 3,
      joinDate: "2023年7月",
      responseRate: "92%",
      responseTime: "2小时内",
    },
    stats: {
      views: 34,
      likes: 6,
      comments: 1,
    },
    timeAgo: "1天前",
    location: "广州市 天河区",
    specifications: [
      { label: "品牌", value: "Nike" },
      { label: "型号", value: "Air Jordan 1" },
      { label: "尺码", value: "42" },
      { label: "颜色", value: "黑红配色" },
      { label: "购买时间", value: "2023年5月" },
    ],
    exchangePreferences: ["其他运动鞋", "数码产品", "现金交易"],
  },
  "6": {
    id: "6",
    title: "PS5 游戏机",
    description:
      "PlayStation 5游戏机，光驱版，98%新。购买后很少使用，主要用来玩独占游戏。外观完美无瑕疵，性能正常。包装盒、手柄、线材等配件齐全。",
    condition: "98%新",
    category: "数码产品",
    price: 3800,
    originalPrice: 4299,
    image: "https://picsum.photos/300/200?random=ps5",
    images: [
      "https://picsum.photos/400/400?random=ps5",
      "https://picsum.photos/400/400?random=ps5-2",
    ],
    status: "reserved",
    seller: {
      name: "周杰",
      avatar: "https://picsum.photos/60/60?random=seller6",
      initials: "ZJ",
      rating: 4.9,
      soldCount: 7,
      joinDate: "2022年11月",
      responseRate: "100%",
      responseTime: "10分钟内",
    },
    stats: {
      views: 156,
      likes: 28,
      comments: 12,
    },
    timeAgo: "6小时前",
    location: "成都市 锦江区",
    specifications: [
      { label: "品牌", value: "Sony" },
      { label: "型号", value: "PlayStation 5" },
      { label: "版本", value: "光驱版" },
      { label: "存储", value: "825GB SSD" },
      { label: "购买时间", value: "2022年12月" },
    ],
    exchangePreferences: ["Xbox Series X", "高端显卡", "现金交易"],
  },
  "7": {
    id: "7",
    title: "iPad Pro 11寸 2021",
    description:
      "iPad Pro 11寸 2021款，深空灰，256GB WiFi版。85%新，主要用于设计和笔记。配有Magic Keyboard和Apple Pencil。屏幕无划痕，功能完好。",
    condition: "85%新",
    category: "数码产品",
    price: 4200,
    originalPrice: 6799,
    image: "https://picsum.photos/300/200?random=ipad1",
    images: [
      "https://picsum.photos/400/400?random=ipad1",
      "https://picsum.photos/400/400?random=ipad1-2",
    ],
    status: "available",
    seller: {
      name: "林小雨",
      avatar: "https://picsum.photos/60/60?random=seller7",
      initials: "LX",
      rating: 4.4,
      soldCount: 9,
      joinDate: "2023年2月",
      responseRate: "94%",
      responseTime: "1.5小时内",
    },
    stats: {
      views: 78,
      likes: 14,
      comments: 5,
    },
    timeAgo: "8小时前",
    location: "南京市 鼓楼区",
    specifications: [
      { label: "品牌", value: "Apple" },
      { label: "型号", value: "iPad Pro 11寸" },
      { label: "年款", value: "2021" },
      { label: "存储容量", value: "256GB" },
      { label: "网络", value: "WiFi" },
      { label: "购买时间", value: "2021年8月" },
    ],
    exchangePreferences: ["MacBook Air", "iPhone 14 系列", "现金交易"],
  },
  "8": {
    id: "8",
    title: "戴森吹风机",
    description:
      "戴森Supersonic吹风机，92%新。购买一年多，平时使用频率不高，功能正常，风力强劲。包装盒和所有配件头都在，还有保修卡。",
    condition: "92%新",
    category: "家电",
    price: 1800,
    originalPrice: 2990,
    image: "https://picsum.photos/300/200?random=dyson",
    images: [
      "https://picsum.photos/400/400?random=dyson",
      "https://picsum.photos/400/400?random=dyson-2",
    ],
    status: "sold",
    seller: {
      name: "赵美丽",
      avatar: "https://picsum.photos/60/60?random=seller8",
      initials: "ZM",
      rating: 4.8,
      soldCount: 6,
      joinDate: "2023年4月",
      responseRate: "96%",
      responseTime: "45分钟内",
    },
    stats: {
      views: 45,
      likes: 9,
      comments: 3,
    },
    timeAgo: "12小时前",
    location: "武汉市 武昌区",
    specifications: [
      { label: "品牌", value: "Dyson" },
      { label: "型号", value: "Supersonic" },
      { label: "功率", value: "1600W" },
      { label: "颜色", value: "玫瑰金" },
      { label: "购买时间", value: "2023年1月" },
    ],
    exchangePreferences: ["美容仪器", "护肤产品", "现金交易"],
  },
};

// 获取单个商品数据的辅助函数
export const getExchangeItemById = (id: string): ExchangeItemData | null => {
  return exchangeItemsData[id] || null;
};

// 获取所有商品数据的辅助函数
export const getAllExchangeItems = (): ExchangeItemData[] => {
  return Object.values(exchangeItemsData);
};

// 获取推荐商品的辅助函数
export const getRecommendedItems = (
  currentId: string,
  limit: number = 3
): ExchangeItemData[] => {
  return getAllExchangeItems()
    .filter((item) => item.id !== currentId)
    .slice(0, limit);
};

// 根据分类筛选商品的辅助函数
export const getItemsByCategory = (category: string): ExchangeItemData[] => {
  if (!category) return getAllExchangeItems();
  return getAllExchangeItems().filter((item) => item.category === category);
};

// 搜索商品的辅助函数
export const searchItems = (searchTerm: string): ExchangeItemData[] => {
  if (!searchTerm) return getAllExchangeItems();
  const term = searchTerm.toLowerCase();
  return getAllExchangeItems().filter(
    (item) =>
      item.title.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.condition.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term)
  );
};
