import type { User as GlobalUser } from "@/types";

export interface User extends GlobalUser {
  // profile页面专用扩展字段
  level: number;
  following: number;
  followers: number;
  joinedDate: string;
}

// 扩展的可编辑用户资料接口
export interface EditableUserProfile {
  // 基础标识
  id: string;
  username: string;
  email: string;

  // 基础信息
  fullName?: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;

  // 个人详情
  age?: number;
  profession?: string;
  location?: string;
  birthDate?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";

  // 社交链接
  socialLinks: {
    website?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    weibo?: string;
  };

  // 兴趣标签
  interests: Array<{
    id: string;
    name: string;
    category: string;
    isPrimary: boolean;
  }>;

  // 隐私设置
  privacy: {
    profileVisibility: "public" | "friends" | "private";
    showEmail: boolean;
    showAge: boolean;
    showLocation: boolean;
    allowMessages: boolean;
    allowActivityInvites: boolean;
  };

  // 身份认证
  verifications: {
    // 实名认证
    realName: {
      isVerified: boolean;
      verifiedAt?: string;
      verifiedName?: string;
      status: "unverified" | "pending" | "verified" | "rejected";
      rejectionReason?: string;
    };
    // 学生认证
    student: {
      isVerified: boolean;
      verifiedAt?: string;
      school?: string;
      studentId?: string;
      graduationYear?: number;
      schoolEmail?: string;
      isSchoolEmailVerified?: boolean;
      status: "unverified" | "pending" | "verified" | "rejected";
      rejectionReason?: string;
    };
    // 工作认证
    employment: {
      isVerified: boolean;
      verifiedAt?: string;
      company?: string;
      position?: string;
      employeeId?: string;
      companyEmail?: string;
      isCompanyEmailVerified?: boolean;
      status: "unverified" | "pending" | "verified" | "rejected";
      rejectionReason?: string;
    };
    // 手机认证
    phone: {
      isVerified: boolean;
      verifiedAt?: string;
      phoneNumber?: string;
      countryCode?: string;
      status: "unverified" | "pending" | "verified" | "rejected";
    };
    // 邮箱认证
    email: {
      isVerified: boolean;
      verifiedAt?: string;
      verifiedEmail?: string;
      status: "unverified" | "pending" | "verified" | "rejected";
    };
  };

  // 系统字段
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: "registered" | "organized" | "ended" | "completed";
  daysLeft?: number;
  image?: string;
  currentParticipants?: number; // 添加参与者数量字段
  maxParticipants?: number; // 添加最大参与者数量字段
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  color: string;
  isUnlocked: boolean;
  description?: string;
}

export interface LevelProgress {
  currentLevel: number;
  currentExp: number;
  nextLevelExp: number;
  expToNext: number;
}

export interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  onClick?: () => void;
}

export type ProfileTab =
  | "activities"
  | "posts"
  | "trades"
  | "favorites"
  | "drafts";

export interface ProfileData {
  user: User;
  activities: Activity[];
  achievements: Achievement[];
  levelProgress: LevelProgress;
  quickAccessItems: QuickAccessItem[];
}
