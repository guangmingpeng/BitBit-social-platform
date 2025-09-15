import type { NavigateFunction } from "react-router-dom";

// 聊天导航相关的工具函数

/**
 * 导航到聊天页面的参数
 */
export interface ChatNavigationParams {
  // 私聊相关
  userId?: string;
  userName?: string;
  userAvatar?: string;

  // 会话相关
  conversationId?: string;
  conversationType?: "private" | "group" | "activity";

  // 上下文信息
  sourceContext?: {
    from: "userCard" | "exchange" | "notification" | "activity" | "profile";
    itemId?: string; // 商品ID、活动ID等
    itemTitle?: string; // 商品标题、活动标题等
  };

  // 预设消息
  presetMessage?: string;
}

/**
 * 导航到聊天页面
 */
export const navigateToChat = (
  navigate: NavigateFunction,
  params: ChatNavigationParams
) => {
  // 构建查询参数
  const searchParams = new URLSearchParams();

  if (params.userId) {
    searchParams.set("userId", params.userId);
  }

  if (params.userName) {
    searchParams.set("userName", params.userName);
  }

  if (params.userAvatar) {
    searchParams.set("userAvatar", params.userAvatar);
  }

  if (params.conversationId) {
    searchParams.set("conversationId", params.conversationId);
  }

  if (params.conversationType) {
    searchParams.set("type", params.conversationType);
  }

  if (params.sourceContext) {
    searchParams.set("from", params.sourceContext.from);
    if (params.sourceContext.itemId) {
      searchParams.set("itemId", params.sourceContext.itemId);
    }
    if (params.sourceContext.itemTitle) {
      searchParams.set("itemTitle", params.sourceContext.itemTitle);
    }
  }

  if (params.presetMessage) {
    searchParams.set("message", params.presetMessage);
  }

  // 构建完整的URL
  const chatUrl = `/chat${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  navigate(chatUrl, {
    state: {
      ...params,
      timestamp: Date.now(),
    },
  });
};

/**
 * 从用户卡片私信按钮导航到聊天
 */
export const navigateToChatFromUserCard = (
  navigate: NavigateFunction,
  userId: string,
  userInfo?: {
    name?: string;
    avatar?: string;
  }
) => {
  navigateToChat(navigate, {
    userId,
    userName: userInfo?.name,
    userAvatar: userInfo?.avatar,
    conversationType: "private",
    sourceContext: {
      from: "userCard",
    },
  });
};

/**
 * 从二手商品联系卖家导航到聊天
 */
export const navigateToChatFromExchange = (
  navigate: NavigateFunction,
  sellerId: string,
  sellerInfo: {
    name: string;
    avatar?: string;
  },
  itemInfo: {
    id: string;
    title: string;
  }
) => {
  const presetMessage = `你好，我对你发布的"${itemInfo.title}"感兴趣，想了解更多详情。`;

  navigateToChat(navigate, {
    userId: sellerId,
    userName: sellerInfo.name,
    userAvatar: sellerInfo.avatar,
    conversationType: "private",
    sourceContext: {
      from: "exchange",
      itemId: itemInfo.id,
      itemTitle: itemInfo.title,
    },
    presetMessage,
  });
};

/**
 * 从通知消息导航到聊天
 */
export const navigateToChatFromNotification = (
  navigate: NavigateFunction,
  notificationData: {
    conversationId?: string;
    userId?: string;
    userName?: string;
    userAvatar?: string;
    type?: "private" | "group" | "activity";
  }
) => {
  navigateToChat(navigate, {
    conversationId: notificationData.conversationId,
    userId: notificationData.userId,
    userName: notificationData.userName,
    userAvatar: notificationData.userAvatar,
    conversationType: notificationData.type || "private",
    sourceContext: {
      from: "notification",
    },
  });
};

/**
 * 从活动页面导航到活动群聊
 */
export const navigateToChatFromActivity = (
  navigate: NavigateFunction,
  activityId: string,
  activityTitle: string,
  conversationId?: string
) => {
  navigateToChat(navigate, {
    conversationId,
    conversationType: "activity",
    sourceContext: {
      from: "activity",
      itemId: activityId,
      itemTitle: activityTitle,
    },
  });
};

/**
 * 解析聊天URL参数
 */
export const parseChatUrlParams = (searchParams: URLSearchParams) => {
  return {
    userId: searchParams.get("userId"),
    userName: searchParams.get("userName"),
    userAvatar: searchParams.get("userAvatar"),
    conversationId: searchParams.get("conversationId"),
    conversationType: searchParams.get("type") as
      | "private"
      | "group"
      | "activity"
      | null,
    sourceFrom: searchParams.get("from"),
    sourceItemId: searchParams.get("itemId"),
    sourceItemTitle: searchParams.get("itemTitle"),
    presetMessage: searchParams.get("message"),
  };
};
