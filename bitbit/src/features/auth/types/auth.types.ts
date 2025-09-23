export interface User {
  id: string;
  phone: string;
  nickname: string;
  avatar?: string;
  interests?: string[];
  createdAt: string;
}

export interface LoginData {
  phone: string;
  verificationCode: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  phone: string;
  verificationCode: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  interests?: string[];
  agreeToTerms: boolean;
  acceptMarketing?: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface VerificationCodeResponse {
  success: boolean;
  message: string;
  countdown?: number;
}

// 表单验证错误类型
export interface FormErrors {
  phone?: string;
  verificationCode?: string;
  nickname?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

// 兴趣标签选项
export interface InterestOption {
  id: string;
  label: string;
  color: string;
  bgColor: string;
}

export const INTEREST_OPTIONS: InterestOption[] = [
  { id: "sports", label: "运动", color: "#FFFFFF", bgColor: "#4E6FFF" },
  {
    id: "music",
    label: "音乐",
    color: "#FF6B8B",
    bgColor: "rgba(255, 107, 139, 0.2)",
  },
  { id: "food", label: "美食", color: "#666666", bgColor: "#FFFFFF" },
  {
    id: "study",
    label: "学习",
    color: "#FFB951",
    bgColor: "rgba(255, 185, 81, 0.2)",
  },
  { id: "reading", label: "阅读", color: "#666666", bgColor: "#FFFFFF" },
  { id: "travel", label: "旅行", color: "#666666", bgColor: "#FFFFFF" },
];
