import type { NavigateFunction } from "react-router-dom";

/**
 * 用户导航工具类
 * 统一处理用户页面的跳转逻辑
 */
export class UserNavigation {
  private navigate: NavigateFunction;

  constructor(navigate: NavigateFunction) {
    this.navigate = navigate;
  }

  /**
   * 跳转到用户个人页面
   * @param userId 用户ID
   * @param tab 可选的标签页（仅限公开页面使用的标签）
   */
  navigateToUserProfile(
    userId: string,
    tab?: "activities" | "posts" | "trades"
  ) {
    if (tab) {
      this.navigate(`/user/${userId}/${tab}`);
    } else {
      this.navigate(`/user/${userId}`);
    }
  }

  /**
   * 跳转到用户的关注列表
   * @param userId 用户ID
   */
  navigateToUserFollowing(userId: string) {
    this.navigate(`/user/${userId}/following`);
  }

  /**
   * 跳转到用户的粉丝列表
   * @param userId 用户ID
   */
  navigateToUserFollowers(userId: string) {
    this.navigate(`/user/${userId}/followers`);
  }

  /**
   * 跳转到自己的个人中心
   * @param tab 可选的标签页
   */
  navigateToMyProfile(
    tab?: "activities" | "posts" | "trades" | "favorites" | "drafts"
  ) {
    if (tab) {
      this.navigate(`/profile/${tab}`);
    } else {
      this.navigate(`/profile`);
    }
  }

  /**
   * 判断是否是当前用户自己的ID
   * @param userId 用户ID
   * @param currentUserId 当前用户ID（实际应用中应该从认证状态获取）
   */
  isCurrentUser(
    userId: string,
    currentUserId: string = "current_user"
  ): boolean {
    return userId === currentUserId;
  }

  /**
   * 智能导航到用户页面（根据是否是当前用户选择不同的页面）
   * @param userId 用户ID
   * @param tab 可选的标签页
   * @param currentUserId 当前用户ID
   */
  smartNavigateToUser(
    userId: string,
    tab?: "activities" | "posts" | "trades",
    currentUserId: string = "current_user"
  ) {
    if (this.isCurrentUser(userId, currentUserId)) {
      // 如果是当前用户，跳转到个人中心
      this.navigateToMyProfile(tab);
    } else {
      // 如果是其他用户，跳转到用户个人页面
      this.navigateToUserProfile(userId, tab);
    }
  }
}

/**
 * React Hook 用于用户导航
 */
import { useNavigate } from "react-router-dom";

export const useUserNavigation = () => {
  const navigate = useNavigate();
  return new UserNavigation(navigate);
};

/**
 * 工具函数：创建用户点击处理器
 * @param userNavigation 用户导航实例
 * @param userId 用户ID
 * @param currentUserId 当前用户ID
 */
export const createUserClickHandler = (
  userNavigation: UserNavigation,
  userId: string,
  currentUserId?: string
) => {
  return () => {
    userNavigation.smartNavigateToUser(userId, undefined, currentUserId);
  };
};

/**
 * 工具函数：创建用户资料查看处理器（专门用于UserCardPopover等组件）
 * @param userNavigation 用户导航实例
 * @param currentUserId 当前用户ID
 */
export const createUserProfileHandler = (
  userNavigation: UserNavigation,
  currentUserId?: string
) => {
  return (userId: string) => {
    userNavigation.smartNavigateToUser(userId, undefined, currentUserId);
  };
};
