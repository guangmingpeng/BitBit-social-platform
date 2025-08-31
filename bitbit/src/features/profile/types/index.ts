export interface User {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  level: number;
  following: number;
  followers: number;
  joinedDate: string;
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
  status: "registered" | "organized" | "ended";
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
