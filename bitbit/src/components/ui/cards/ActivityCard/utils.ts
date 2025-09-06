import type { Activity } from "@/shared/types";
import {
  getActivityParticipationInfo,
  CURRENT_USER_ID,
} from "@/shared/utils/activityUtils";

// 活动数据类型（支持不完整的活动数据）
export type ActivityLike = Partial<Activity> & {
  id: string;
  title: string;
  category: string;
  organizer: Record<string, unknown>; // 可能有不同的结构
};

// 分类配置
export const getCategoryConfig = (category: string) => {
  switch (category) {
    case "music":
      return {
        icon: "🎵",
        label: "音乐",
        color: "bg-purple-50 text-purple-600",
        border: "border-purple-200",
      };
    case "food":
      return {
        icon: "🍴",
        label: "美食",
        color: "bg-orange-50 text-orange-600",
        border: "border-orange-200",
      };
    case "learning":
      return {
        icon: "📚",
        label: "学习",
        color: "bg-blue-50 text-blue-600",
        border: "border-blue-200",
      };
    case "reading":
      return {
        icon: "📖",
        label: "阅读",
        color: "bg-green-50 text-green-600",
        border: "border-green-200",
      };
    default:
      return {
        icon: "📅",
        label: "活动",
        color: "bg-gray-50 text-gray-600",
        border: "border-gray-200",
      };
  }
};

// 状态显示配置
export const getStatusDisplayConfig = (
  activity: ActivityLike,
  status: string
) => {
  // 使用统一的活动状态判断逻辑
  const hasCompleteActivityData =
    "startTime" in activity && "endTime" in activity && "organizer" in activity;

  if (hasCompleteActivityData) {
    const fullActivity = activity as Activity;
    const participationInfo = getActivityParticipationInfo(
      fullActivity,
      CURRENT_USER_ID
    );
    const { ended, isOrganizer, isJoined } = participationInfo;

    // 已结束状态的优先级最高
    if (ended) {
      if (isOrganizer) {
        return {
          text: "已结束",
          bgColor: "bg-gray-50",
          textColor: "text-gray-500",
          secondaryText: "已组织",
          secondaryBgColor: "bg-green-50",
          secondaryTextColor: "text-green-600",
          showAsLabel: true,
        };
      } else {
        return {
          text: "已结束",
          bgColor: "bg-gray-50",
          textColor: "text-gray-500",
          showAsLabel: true,
        };
      }
    }

    if (isOrganizer) {
      return {
        text: "已组织",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        showAsLabel: true,
      };
    }

    if (isJoined) {
      return {
        text: "已报名",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
        showAsLabel: true,
      };
    }

    return {
      text: "可报名",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      showAsLabel: false,
    };
  }

  // 后备方案：基于简单的status字段
  switch (status) {
    case "registered":
      return {
        text: "已报名",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
        showAsLabel: true,
      };
    case "organized":
      return {
        text: "已组织",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        showAsLabel: true,
      };
    case "ongoing":
      return {
        text: "进行中",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-600",
        showAsLabel: true,
      };
    case "ended":
    case "completed":
      return {
        text: "已结束",
        bgColor: "bg-gray-50",
        textColor: "text-gray-500",
        showAsLabel: true,
      };
    case "cancelled":
      return {
        text: "已取消",
        bgColor: "bg-red-50",
        textColor: "text-red-600",
        showAsLabel: true,
      };
    case "draft":
      return {
        text: "草稿",
        bgColor: "bg-gray-50",
        textColor: "text-gray-500",
        showAsLabel: true,
      };
    default:
      return {
        text: "可报名",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        showAsLabel: false,
      };
  }
};

// 数据适配器
export const adaptActivityData = (activity: ActivityLike) => {
  return {
    ...activity,
    maxParticipants:
      "maxParticipants" in activity
        ? activity.maxParticipants
        : "capacity" in activity
        ? (activity as unknown as { capacity: number }).capacity
        : 0,
    organizer:
      "username" in activity.organizer
        ? activity.organizer
        : {
            username:
              (activity.organizer as unknown as { name?: string })?.name ||
              "未知用户",
            avatar: (activity.organizer as unknown as { avatar?: string })
              ?.avatar,
          },
    isJoined: "isJoined" in activity ? activity.isJoined : false,
  };
};

// 活动状态计算
export const calculateActivityState = (
  activity: ActivityLike,
  status: string,
  isJoined: boolean,
  currentParticipants: number,
  maxParticipants: number
) => {
  const hasCompleteActivityData =
    "startTime" in activity && "endTime" in activity && "organizer" in activity;

  if (hasCompleteActivityData) {
    const fullActivity = activity as Activity;
    const participationInfo = getActivityParticipationInfo(
      fullActivity,
      CURRENT_USER_ID
    );
    return {
      canJoin: participationInfo.canJoin,
      isOrganizer: participationInfo.isOrganizer,
      ended: participationInfo.ended,
    };
  } else {
    // 后备逻辑：基于简单的status字段
    return {
      canJoin:
        status === "published" &&
        !isJoined &&
        currentParticipants < maxParticipants,
      isOrganizer: status === "organized",
      ended: status === "ended" || status === "completed",
    };
  }
};
