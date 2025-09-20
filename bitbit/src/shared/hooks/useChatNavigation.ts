import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { navigateToChatFromUserCard } from "@/features/chat/utils";
import { useChatState } from "@/features/chat/hooks/useChatState";

/**
 * 统一的聊天导航Hook
 * 提供标准化的用户卡片发私信功能
 */
export const useChatNavigation = () => {
  const navigate = useNavigate();
  const { conversations } = useChatState({ currentUserId: "4" }); // 使用当前用户ID

  /**
   * 导航到与指定用户的私聊
   * 自动处理新会话创建和历史会话恢复
   */
  const navigateToUserChat = useCallback(
    (userId: string, userInfo?: { name?: string; avatar?: string }) => {
      // 使用标准的聊天导航函数
      navigateToChatFromUserCard(navigate, userId, userInfo);
    },
    [navigate]
  );

  /**
   * 检查是否与用户有历史聊天记录
   * 这个函数用于判断是否需要加载现有会话还是创建新会话
   */
  const hasConversationWithUser = useCallback(
    (userId: string): boolean => {
      // 检查conversations中是否已存在与该用户的私聊会话
      const existingConversation = conversations.find(
        (conv) =>
          conv.type === "private" &&
          conv.participants.length === 2 &&
          conv.participants.some((p) => p.userId === userId)
      );

      const hasHistory = !!existingConversation;
      console.log("检查用户历史会话:", {
        userId,
        hasHistory,
        conversationId: existingConversation?.id,
      });

      return hasHistory;
    },
    [conversations]
  );

  return {
    navigateToUserChat,
    hasConversationWithUser,
  };
};

export default useChatNavigation;
