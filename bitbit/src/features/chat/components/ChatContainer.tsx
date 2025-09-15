import {
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import ConversationList from "./ConversationList";
import ChatHeader from "./ChatHeader";
import ChatMain from "./ChatMain";
import GroupSettings from "./GroupSettings";
import UnreadMessagesBadge from "./UnreadMessagesBadge";
import { useChatState } from "@/features/chat/hooks";
import { mockUsers } from "@/features/chat/mock/users";
import { cn } from "@/shared/utils/cn";

interface ChatContainerProps {
  className?: string;
}

export interface ChatContainerRef {
  simulateNewMessage: () => void;
  simulateMultipleMessages: (count?: number) => void;
  // 新增：创建或查找与指定用户的对话
  createOrFindConversationWithUser: (
    userId: string,
    userInfo?: { name: string; avatar?: string }
  ) => Promise<string>;
  // 新增：设置预设消息
  setPresetMessage: (message: string) => void;
  // 新增：切换到指定对话
  switchToConversation: (conversationId: string) => void;
}

const ChatContainer = forwardRef<ChatContainerRef, ChatContainerProps>(
  ({ className }, ref) => {
    const currentUserId = "4"; // 当前用户是Diana

    // 本地状态
    const [isUserAtBottom, setIsUserAtBottom] = useState(true);
    const [hasNewMessages, setHasNewMessages] = useState(false);
    const [shouldScrollToUnread, setShouldScrollToUnread] = useState(false);
    const [previousMessageCount, setPreviousMessageCount] = useState(0); // 跟踪消息数量变化
    const [newMessagesCount, setNewMessagesCount] = useState(0); // 新消息数量
    const [firstNewMessageId, setFirstNewMessageId] = useState<string | null>(
      null
    ); // 实时新消息的第一条消息ID

    const {
      // 状态
      activeConversationId,
      showSettings,
      presetMessage,

      // 计算属性
      activeConversation,
      unreadMessages,
      hasUnreadMessages,
      lastReadMessageId,
      updatedConversations,

      // 操作方法
      setShowSettings,
      handleConversationClick,
      markAllAsRead,
      handleSendMessage,
      simulateNewMessage,
      simulateMultipleMessages,
      createOrFindConversationWithUser,
      switchToConversation,
      setPresetMessage,

      // 群组设置方法
      handleToggleInvitePermission,
      handleToggleFileSharing,
      handleToggleNotifications,
      handleMemberRoleChange,
      handleRemoveMember,

      // 获取消息的方法
      getCurrentMessages,
      getTotalUnreadCount,
    } = useChatState({ currentUserId });

    // 使用useImperativeHandle来暴露方法给父组件
    useImperativeHandle(ref, () => ({
      simulateNewMessage: () => simulateNewMessage(),
      simulateMultipleMessages,
      createOrFindConversationWithUser,
      setPresetMessage,
      switchToConversation,
    }));

    // 当用户滚动到底部时，清除新消息提示
    useEffect(() => {
      console.log("🔄 滚动状态变化处理:", {
        isUserAtBottom,
        hasNewMessages,
        newMessagesCount,
      });
      if (isUserAtBottom) {
        console.log("⬇️ 用户滚动到底部，清除新消息提示");
        setHasNewMessages(false);
        setNewMessagesCount(0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserAtBottom]); // 只关注滚动状态变化

    // 处理跳转到未读消息按钮点击
    const handleJumpToUnreadMessages = () => {
      console.log(
        "🎯 点击跳转到实时新消息，第一条新消息ID:",
        firstNewMessageId
      );
      // 先触发滚动到第一条实时新消息
      setShouldScrollToUnread(true);
      // 清除新消息提示状态（但保留firstNewMessageId直到滚动完成）
      setHasNewMessages(false);
      setNewMessagesCount(0);
    };

    // 测试函数：强制显示新消息按钮
    const handleForceShowNewMessageButton = () => {
      console.log("🧪 强制显示新消息按钮进行测试");
      setIsUserAtBottom(false);
      setHasNewMessages(true);
      // 如果当前已经有新消息数量，就保持不变，否则设置为3用于测试
      setNewMessagesCount((prev) => (prev > 0 ? prev : 3));
    };

    // 处理滚动状态变化
    const handleScrollStateChange = useCallback(
      (isAtBottom: boolean) => {
        console.log("📍 滚动状态变化:", {
          isAtBottom,
          previous: isUserAtBottom,
        });
        setIsUserAtBottom(isAtBottom);
      },
      [isUserAtBottom]
    );

    // 获取当前会话的消息
    const currentMessages = getCurrentMessages();

    // 当会话切换时重置状态
    useEffect(() => {
      console.log("🔄 会话切换重置状态:", {
        activeConversationId,
        messageCount: currentMessages.length,
      });
      setHasNewMessages(false); // 重置新消息标记
      setNewMessagesCount(0); // 重置新消息数量
      setFirstNewMessageId(null); // 重置实时新消息ID
      // 注意：不立即设置 isUserAtBottom 为 true，让滚动检测自然更新这个状态
      setPreviousMessageCount(currentMessages.length); // 记录当前消息数量
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeConversationId]); // 只依赖会话ID，不依赖消息数量

    // 延迟检测初始滚动状态（用于会话切换后）
    useEffect(() => {
      if (activeConversationId) {
        // 延迟一点时间让滚动完成，然后检测状态
        const timer = setTimeout(() => {
          // 这里可以触发一次滚动状态检测
          console.log("⏰ 延迟检测滚动状态");
        }, 1000);

        return () => clearTimeout(timer);
      }
    }, [activeConversationId]);

    // 计算当前会话未读消息数量（排除自己发送的）
    const currentConversationUnreadCount = unreadMessages.filter(
      (m) => m.senderId !== currentUserId
    ).length;

    // 计算所有会话的总未读消息数量（Header显示用）
    const totalUnreadCount = getTotalUnreadCount();

    // 检测实时新消息到达（只检测消息数量增加，不考虑历史未读）
    useEffect(() => {
      if (!activeConversationId) return;

      const currentMessageCount = currentMessages.length;

      console.log("🔍 新消息检测 [详细]:", {
        activeConversationId,
        currentMessageCount,
        previousMessageCount,
        isUserAtBottom,
        hasNewMessages,
        newMessagesCount,
        diff: currentMessageCount - previousMessageCount,
      });

      // 如果消息数量增加了，说明有新消息到达
      if (
        currentMessageCount > previousMessageCount &&
        previousMessageCount > 0
      ) {
        const newMessages = currentMessages.slice(previousMessageCount);
        // 检查新消息中是否有其他人发送的消息
        const newMessagesFromOthers = newMessages.filter(
          (msg) => msg.senderId !== currentUserId
        );

        console.log("📨 检测到新消息 [详细]:", {
          newMessagesTotal: newMessages.length,
          newMessagesFromOthers: newMessagesFromOthers.length,
          isUserAtBottom,
          currentUserId,
          messageDetails: newMessages.map((m) => ({
            id: m.id,
            content: m.content.slice(0, 20),
            senderId: m.senderId,
          })),
        });

        if (newMessagesFromOthers.length > 0) {
          console.log(
            "✅ 有来自其他用户的新消息:",
            newMessagesFromOthers.length
          );

          if (!isUserAtBottom) {
            console.log("🎯 用户不在底部，设置新消息提示");
            setHasNewMessages(true);

            // 如果这是第一批新消息，记录第一条消息的ID
            setFirstNewMessageId((prevId) => {
              if (prevId === null) {
                const firstNewMsg = newMessagesFromOthers[0];
                console.log("🆔 设置第一条实时新消息ID:", firstNewMsg.id);
                return firstNewMsg.id;
              }
              return prevId; // 保持原有的第一条新消息ID
            });

            // 累计新消息数量，而不是重新设置
            setNewMessagesCount((prevCount) => {
              const newTotal = prevCount + newMessagesFromOthers.length;
              console.log("📈 累计新消息数量 [详细]:", {
                previous: prevCount,
                incoming: newMessagesFromOthers.length,
                newTotal,
                willShow: newTotal > 0,
                isUserAtBottom: isUserAtBottom,
                hasNewMessages: hasNewMessages,
              });
              return newTotal;
            });
          } else {
            console.log("⬇️ 用户在底部，不显示新消息提示");
          }
        } else {
          console.log("👤 只有当前用户的消息，不触发新消息提示");
        }
      } else {
        console.log("📊 消息数量未增加，无需处理");
      }

      // 更新消息数量记录
      setPreviousMessageCount(currentMessageCount);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      currentMessages.length,
      previousMessageCount,
      currentUserId,
      isUserAtBottom,
      activeConversationId,
      currentMessages,
    ]); // 故意不包含hasNewMessages和newMessagesCount，避免循环依赖

    return (
      <div className={cn("flex h-full bg-gray-50", className)}>
        {/* 整体容器，响应式边距设计，左侧为悬浮返回按钮留出充足空间 */}
        <div className="flex w-full h-full pl-8 sm:pl-16 md:pl-24 lg:pl-32 pr-4 sm:pr-6 md:pr-8 lg:pr-10 py-2 sm:py-4 gap-3 sm:gap-4 md:gap-6">
          {/* 左侧会话列表 */}
          <div className="w-72 sm:w-80 lg:w-96 flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
            <ConversationList
              conversations={updatedConversations}
              users={mockUsers}
              currentUserId={currentUserId}
              activeConversationId={activeConversationId}
              onConversationClick={handleConversationClick}
              showHeader={true}
              headerTitle="消息"
              unreadCount={totalUnreadCount}
              onMarkAllAsRead={markAllAsRead}
            />
          </div>

          {/* 右侧聊天区域 */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col min-h-0 overflow-hidden">
            {activeConversation ? (
              <>
                {/* 聊天头部 */}
                <ChatHeader
                  activeConversation={activeConversation}
                  currentUserId={currentUserId}
                  hasUnreadMessages={hasUnreadMessages}
                  unreadMessagesCount={currentConversationUnreadCount}
                  showSettings={showSettings}
                  onToggleSettings={() => setShowSettings(!showSettings)}
                  onSimulateMessages={simulateMultipleMessages}
                  onTestNewMessageButton={handleForceShowNewMessageButton}
                />

                {/* 聊天内容区域 - 可伸缩，包含消息列表和设置面板 */}
                <div className="flex-1 flex min-h-0 h-full">
                  {/* 消息列表区域 - 独立滚动 */}
                  <div className="flex-1 flex flex-col min-h-0 h-full relative">
                    <ChatMain
                      messages={getCurrentMessages()}
                      users={mockUsers}
                      currentUserId={currentUserId}
                      lastReadMessageId={lastReadMessageId || undefined}
                      firstNewMessageId={firstNewMessageId || undefined}
                      presetMessage={presetMessage}
                      onSendMessage={handleSendMessage}
                      onScrollStateChange={handleScrollStateChange}
                      shouldScrollToUnread={shouldScrollToUnread}
                      onScrollToUnreadComplete={() => {
                        setShouldScrollToUnread(false);
                        // 滚动完成后清除第一条实时新消息ID
                        setFirstNewMessageId(null);
                      }}
                    />

                    {/* 新消息浮动提示按钮 */}
                    <UnreadMessagesBadge
                      activeConversation={activeConversation}
                      onScrollToBottom={handleJumpToUnreadMessages}
                      isUserAtBottom={isUserAtBottom}
                      hasNewMessages={hasNewMessages}
                      unreadMessagesCount={newMessagesCount}
                    />
                  </div>

                  {/* 群设置面板 - 可选显示 */}
                  {showSettings &&
                    activeConversation &&
                    (activeConversation.type === "group" ||
                      activeConversation.type === "activity") && (
                      <div className="w-80 border-l border-gray-200 bg-gray-50 overflow-y-auto">
                        <GroupSettings
                          conversation={activeConversation}
                          currentUserId={currentUserId}
                          onToggleInvitePermission={() =>
                            handleToggleInvitePermission(activeConversation.id)
                          }
                          onToggleFileSharing={() =>
                            handleToggleFileSharing(activeConversation.id)
                          }
                          onToggleNotifications={() =>
                            handleToggleNotifications(activeConversation.id)
                          }
                          onMemberRoleChange={(
                            userId: string,
                            newRole: string
                          ) =>
                            handleMemberRoleChange(
                              activeConversation.id,
                              userId,
                              newRole
                            )
                          }
                          onRemoveMember={(userId: string) =>
                            handleRemoveMember(activeConversation.id, userId)
                          }
                          onLeaveGroup={() => console.log("Leave group")}
                          onDismissGroup={() => console.log("Dismiss group")}
                        />
                      </div>
                    )}
                </div>
              </>
            ) : (
              /* 空状态 - 无选中聊天时显示 */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    选择一个会话
                  </h3>
                  <p className="text-gray-500">从左侧选择一个会话开始聊天</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ChatContainer.displayName = "ChatContainer";

export default ChatContainer;
