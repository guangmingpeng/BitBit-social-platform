// 全局类型定义
export interface User {
  id: string;
  username?: string;
  name?: string; // 显示名称
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinDate?: string;
  joinedDate?: string; // 兼容字段
  rating?: number;
  totalSales?: number;
  badges?: string[];

  // 个人信息
  profession?: string;
  age?: number;
  level?: number;
  following?: number;
  followers?: number;
  interests?: string[];

  // 在线状态
  isOnline?: boolean;

  // 活动统计
  activitiesCount?: number;
  postCount?: number;
  exchangeCount?: number;

  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    publicProfile: boolean;
  };
  stats?: {
    totalPosts: number;
    totalExchanges: number;
    totalViews: number;
  };
}

// 通用响应类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 分页数据类型
export interface PaginatedResponse<T = unknown> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 通用过滤器类型
export interface BaseFilters {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// 通用状态类型
export interface LoadingState {
  loading: boolean;
  error: string | null;
}

// 表单验证错误类型
export interface FormErrors {
  [key: string]: string | undefined;
}

// 上传文件类型
export interface UploadFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}
