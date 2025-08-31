import type {
  BaseCardProps,
  CardLayout,
  CardActions,
} from "../../BaseCard/types";
import type { Activity as SharedActivity } from "@/shared/types";

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: "music" | "food" | "learning" | "reading";
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  organizer: {
    username: string;
    avatar?: string;
  };
  images?: string[];
  price?: number;
  isFree?: boolean;
  isJoined?: boolean;
  status?:
    | "draft"
    | "published"
    | "ongoing"
    | "ended"
    | "cancelled"
    | "completed"
    | "registered"
    | "organized";
}

// 允许使用共享的Activity类型，但转换为UI组件期望的格式
export type ActivityCardActivity =
  | Activity
  | (SharedActivity & {
      maxParticipants: number;
      organizer: {
        username: string;
        avatar?: string;
      };
    });

export interface ActivityCardProps
  extends Omit<BaseCardProps, "children">,
    CardLayout,
    CardActions {
  activity: ActivityCardActivity;

  // 活动特定的回调
  onJoin?: () => void;
  onLeave?: () => void;
  onEdit?: () => void;
  onNotify?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onViewDetail?: () => void;

  // 显示控制
  showPrice?: boolean;
  showParticipants?: boolean;
  showOrganizer?: boolean;
  showDate?: boolean;
  showLocation?: boolean;
  showDescription?: boolean;
  showImages?: boolean;

  // 状态控制
  isBookmarked?: boolean;
}
