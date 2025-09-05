import type { Activity } from "@/shared/types";

// 当前用户ID常量（在实际应用中应该从用户状态获取）
export const CURRENT_USER_ID = "current_user";

/**
 * 判断活动是否已结束
 */
export const isActivityEnded = (activity: Activity): boolean => {
  const now = new Date();
  const endTime = new Date(activity.endTime);
  return (
    endTime < now ||
    activity.status === "completed" ||
    activity.status === "cancelled"
  );
};

/**
 * 判断是否为活动组织者
 */
export const isActivityOrganizer = (
  activity: Activity,
  userId: string = CURRENT_USER_ID
): boolean => {
  return activity.organizer.id === userId;
};

/**
 * 判断活动是否已开始
 */
export const isActivityStarted = (activity: Activity): boolean => {
  const now = new Date();
  const startTime = new Date(activity.startTime);
  return startTime <= now;
};

/**
 * 判断活动是否可以报名
 */
export const canJoinActivity = (
  activity: Activity,
  userId: string = CURRENT_USER_ID
): boolean => {
  // 组织者无需报名，默认已报名
  if (isActivityOrganizer(activity, userId)) return false;

  if (activity.isJoined) return false; // 已报名不能再报名
  if (isActivityEnded(activity)) return false; // 已结束不能报名
  if (activity.status !== "published") return false; // 非发布状态不能报名
  if (activity.currentParticipants >= activity.maxParticipants) return false; // 已满员不能报名

  // 检查报名截止时间
  if (activity.registrationDeadline) {
    const deadline = new Date(activity.registrationDeadline);
    const now = new Date();
    if (deadline < now) return false; // 超过报名截止时间
  }

  return true;
};

/**
 * 判断活动是否可以取消报名
 */
export const canLeaveActivity = (
  activity: Activity,
  userId: string = CURRENT_USER_ID
): boolean => {
  // 组织者不能取消报名自己的活动
  if (isActivityOrganizer(activity, userId)) return false;

  if (!activity.isJoined) return false; // 未报名不能取消
  if (isActivityEnded(activity)) return false; // 已结束不能取消
  if (activity.status === "cancelled") return false; // 已取消的活动不能操作

  return true;
};

/**
 * 获取活动状态显示文本
 */
export const getActivityStatusText = (
  activity: Activity,
  userId: string = CURRENT_USER_ID
): string => {
  const isOrganizer = isActivityOrganizer(activity, userId);
  const ended = isActivityEnded(activity);

  if (ended) {
    return "活动已结束";
  }

  // 组织者逻辑
  if (isOrganizer) {
    return "已组织";
  }

  // 参与者逻辑
  if (activity.isJoined) {
    return "已报名";
  }

  if (activity.currentParticipants >= activity.maxParticipants) {
    return "已满员";
  }

  if (activity.registrationDeadline) {
    const deadline = new Date(activity.registrationDeadline);
    const now = new Date();
    if (deadline < now) {
      return "报名已截止";
    }
  }

  return "可报名";
};

/**
 * 获取活动参与状态信息
 */
export const getActivityParticipationInfo = (
  activity: Activity,
  userId: string = CURRENT_USER_ID
) => {
  const ended = isActivityEnded(activity);
  const isOrganizer = isActivityOrganizer(activity, userId);
  const canJoin = canJoinActivity(activity, userId);
  const canLeave = canLeaveActivity(activity, userId);
  const statusText = getActivityStatusText(activity, userId);

  return {
    ended,
    isOrganizer,
    canJoin,
    canLeave,
    statusText,
    isJoined: activity.isJoined || false,
  };
};
