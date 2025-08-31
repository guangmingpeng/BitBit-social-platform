import type { Activity } from "@/shared/types";
import type { ExchangeCardProps } from "@/features/exchange/components/ExchangeCard/ExchangeCard";
import type { Post } from "@/components/ui/cards";

// Profile页面专用的模拟数据

// 我参加的活动数据
export const myParticipatedActivities: Activity[] = [
  {
    id: "activity-1",
    title: "周末音乐分享会",
    description: "分享最新音乐作品，与音乐爱好者交流心得，现场还有小型演出。",
    category: "music",
    date: "8月30日",
    time: "19:00-21:00",
    location: "文化活动中心",
    currentParticipants: 15,
    maxParticipants: 20,
    organizer: {
      id: "org-1",
      username: "musiclover",
      email: "music@example.com",
      avatar: "https://picsum.photos/40/40?random=music1",
      bio: "音乐爱好者",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    images: ["https://picsum.photos/300/200?random=music1"],
    price: 0,
    isFree: true,
    status: "published",
    tags: ["音乐", "分享", "交流"],
    startTime: "2024-08-30T19:00:00Z",
    endTime: "2024-08-30T21:00:00Z",
    capacity: 20,
    coverImage: "https://picsum.photos/400/300?random=music1",
    createdAt: "2024-08-25T10:00:00Z",
    updatedAt: "2024-08-25T10:00:00Z",
  },
  {
    id: "activity-2",
    title: "摄影技巧交流会",
    description: "专业摄影师分享拍摄技巧，实地拍摄练习，适合初学者和进阶者。",
    category: "learning",
    date: "9月5日",
    time: "14:00-17:00",
    location: "城市公园",
    currentParticipants: 8,
    maxParticipants: 15,
    organizer: {
      id: "org-2",
      username: "photopro",
      email: "photo@example.com",
      avatar: "https://picsum.photos/40/40?random=photo1",
      bio: "专业摄影师",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    images: ["https://picsum.photos/300/200?random=photo1"],
    price: 50,
    isFree: false,
    status: "published",
    tags: ["摄影", "学习", "技巧"],
    startTime: "2024-09-05T14:00:00Z",
    endTime: "2024-09-05T17:00:00Z",
    capacity: 15,
    coverImage: "https://picsum.photos/400/300?random=photo1",
    createdAt: "2024-08-28T10:00:00Z",
    updatedAt: "2024-08-28T10:00:00Z",
  },
];

// 我组织的活动数据
export const myOrganizedActivities: Activity[] = [
  {
    id: "activity-org-1",
    title: "读书会：《深度工作》",
    description: "讨论《深度工作》一书的核心理念，分享实践心得。",
    category: "learning",
    date: "9月10日",
    time: "15:00-17:00",
    location: "咖啡书屋",
    currentParticipants: 12,
    maxParticipants: 20,
    organizer: {
      id: "user-me",
      username: "子龙",
      email: "me@example.com",
      avatar: "https://picsum.photos/40/40?random=me",
      bio: "读书爱好者",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    images: ["https://picsum.photos/300/200?random=book1"],
    price: 0,
    isFree: true,
    status: "published",
    tags: ["读书", "分享", "讨论"],
    startTime: "2024-09-10T15:00:00Z",
    endTime: "2024-09-10T17:00:00Z",
    capacity: 20,
    coverImage: "https://picsum.photos/400/300?random=book1",
    createdAt: "2024-08-20T09:00:00Z",
    updatedAt: "2024-08-20T09:00:00Z",
  },
];

// 我的帖子数据
export const myPosts: Post[] = [
  {
    id: "post-1",
    author: {
      name: "子龙",
      avatar: "https://picsum.photos/40/40?random=me",
      isVerified: false,
    },
    content:
      "今天参加了一场很棒的音乐分享会，认识了很多有趣的朋友。音乐真的是最好的社交语言！🎵",
    images: ["https://picsum.photos/400/300?random=mypost1"],
    category: "music",
    tags: ["音乐", "分享", "社交"],
    publishTime: "2天前",
    likes: 15,
    comments: 3,
    shares: 1,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "post-2",
    author: {
      name: "子龙",
      avatar: "https://picsum.photos/40/40?random=me",
      isVerified: false,
    },
    content:
      "刚拍的几张城市夜景，第一次尝试长曝光拍摄，效果还不错！有什么建议欢迎指教 📷",
    images: [
      "https://picsum.photos/400/300?random=night1",
      "https://picsum.photos/400/300?random=night2",
    ],
    category: "learning",
    tags: ["摄影", "夜景", "长曝光"],
    publishTime: "5天前",
    likes: 28,
    comments: 7,
    shares: 2,
    isLiked: false,
    isBookmarked: false,
  },
];

// 我的交易/商品数据
export const myExchangeItems: ExchangeCardProps[] = [
  {
    id: "exchange-1",
    title: "九成新 Canon EOS R5 相机",
    condition: "九成新",
    category: "数码产品",
    price: 15800,
    originalPrice: 20000,
    image: "https://picsum.photos/300/300?random=camera1",
    status: "available",
    seller: {
      name: "子龙",
      avatar: "https://picsum.photos/40/40?random=me",
      rating: 4.8,
      soldCount: 12,
    },
    stats: {
      views: 156,
      likes: 23,
      comments: 8,
    },
    timeAgo: "3天前",
    location: "北京海淀区",
    isLiked: false,
  },
  {
    id: "exchange-2",
    title: "全新未拆封 iPad Pro 12.9寸",
    condition: "全新",
    category: "数码产品",
    price: 6500,
    originalPrice: 8000,
    image: "https://picsum.photos/300/300?random=ipad1",
    status: "hot",
    seller: {
      name: "子龙",
      avatar: "https://picsum.photos/40/40?random=me",
      rating: 4.8,
      soldCount: 12,
    },
    stats: {
      views: 89,
      likes: 15,
      comments: 4,
    },
    timeAgo: "1周前",
    location: "北京海淀区",
    isLiked: false,
  },
];

// 订单数据类型
export interface Order {
  id: string;
  type: "buy" | "sell" | "exchange";
  itemTitle: string;
  itemImage: string;
  price: number;
  status: "pending" | "completed" | "cancelled" | "shipped" | "delivered";
  createTime: string;
  otherParty: {
    name: string;
    avatar?: string;
  };
  orderNumber: string;
}

// 我的订单数据
export const myOrders: Order[] = [
  {
    id: "order-1",
    type: "buy",
    itemTitle: "MacBook Pro 13寸 M2芯片",
    itemImage: "https://picsum.photos/300/300?random=macbook1",
    price: 8500,
    status: "delivered",
    createTime: "2024-08-20",
    otherParty: {
      name: "数码达人",
      avatar: "https://picsum.photos/40/40?random=seller1",
    },
    orderNumber: "BB20240820001",
  },
  {
    id: "order-2",
    type: "sell",
    itemTitle: "iPhone 14 Pro 256G 深空黑",
    itemImage: "https://picsum.photos/300/300?random=iphone1",
    price: 6800,
    status: "shipped",
    createTime: "2024-08-25",
    otherParty: {
      name: "手机收藏家",
      avatar: "https://picsum.photos/40/40?random=buyer1",
    },
    orderNumber: "BB20240825002",
  },
  {
    id: "order-3",
    type: "exchange",
    itemTitle: "Sony A7M3 全画幅相机",
    itemImage: "https://picsum.photos/300/300?random=sony1",
    price: 0, // 交换无价格
    status: "pending",
    createTime: "2024-08-28",
    otherParty: {
      name: "摄影师小王",
      avatar: "https://picsum.photos/40/40?random=photographer1",
    },
    orderNumber: "BB20240828003",
  },
];

// 收藏数据类型
export interface FavoriteItem {
  id: string;
  type: "activity" | "post" | "exchange";
  title: string;
  image?: string;
  author: {
    name: string;
    avatar?: string;
  };
  favoriteTime: string;
  // 根据类型的不同属性
  category?: string;
  price?: number;
  date?: string;
  location?: string;
}

// 我的收藏数据
export const myFavorites: FavoriteItem[] = [
  {
    id: "fav-1",
    type: "activity",
    title: "周末户外烧烤聚会",
    image: "https://picsum.photos/300/200?random=bbq1",
    author: {
      name: "户外达人",
      avatar: "https://picsum.photos/40/40?random=outdoor1",
    },
    favoriteTime: "3天前",
    category: "outdoor",
    date: "9月15日",
    location: "奥林匹克公园",
  },
  {
    id: "fav-2",
    type: "post",
    title: "分享一些实用的摄影后期技巧，让你的照片更专业",
    image: "https://picsum.photos/400/300?random=photoshop1",
    author: {
      name: "后期大师",
      avatar: "https://picsum.photos/40/40?random=ps1",
    },
    favoriteTime: "1周前",
    category: "learning",
  },
  {
    id: "fav-3",
    type: "exchange",
    title: "全新 AirPods Pro 2代",
    image: "https://picsum.photos/300/300?random=airpods1",
    author: {
      name: "数码爱好者",
      avatar: "https://picsum.photos/40/40?random=digital1",
    },
    favoriteTime: "5天前",
    price: 1800,
  },
];

// 草稿数据类型
export interface Draft {
  id: string;
  type: "activity" | "post" | "exchange";
  title: string;
  content: string;
  lastEditTime: string;
  images?: string[];
  progress: number; // 完成进度百分比
}

// 我的草稿数据
export const myDrafts: Draft[] = [
  {
    id: "draft-1",
    type: "activity",
    title: "中秋节传统文化体验活动",
    content:
      "组织一场中秋节传统文化体验活动，包括月饼制作、汉服体验、诗词朗诵等...",
    lastEditTime: "2天前",
    images: ["https://picsum.photos/300/200?random=moon1"],
    progress: 75,
  },
  {
    id: "draft-2",
    type: "post",
    title: "我的旅行摄影心得分享",
    content:
      "最近去了几个地方旅行，拍了很多照片，想和大家分享一下旅行摄影的心得...",
    lastEditTime: "1周前",
    images: [
      "https://picsum.photos/400/300?random=travel1",
      "https://picsum.photos/400/300?random=travel2",
    ],
    progress: 40,
  },
  {
    id: "draft-3",
    type: "exchange",
    title: "闲置的专业录音设备",
    content: "因为工作室升级，有一些专业录音设备需要出售，都是九成新的状态...",
    lastEditTime: "3天前",
    images: ["https://picsum.photos/300/300?random=audio1"],
    progress: 60,
  },
];
