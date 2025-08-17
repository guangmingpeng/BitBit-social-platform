// API endpoints
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Authentication
export const TOKEN_KEY = "bitbit_token";
export const USER_KEY = "bitbit_user";

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const INFINITE_SCROLL_THRESHOLD = 0.8;

// File upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

// Date format
export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

// Validation
export const PASSWORD_MIN_LENGTH = 8;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 20;

// UI Constants
export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;
export const DESKTOP_BREAKPOINT = 1280;

// Cache
export const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
export const STALE_TIME = 60 * 1000; // 1 minute

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "网络连接失败，请检查网络后重试",
  UNAUTHORIZED: "请先登录后再进行操作",
  FORBIDDEN: "您没有权限执行此操作",
  NOT_FOUND: "请求的资源不存在",
  SERVER_ERROR: "服务器出现错误，请稍后重试",
  VALIDATION_ERROR: "输入的信息有误，请检查后重试",
} as const;
