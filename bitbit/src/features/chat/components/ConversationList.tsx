import React, { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Conversation, Message } from "@/features/chat/types";
import type { User } from "@/types";
import { cn } from "@/shared/utils/cn";
import ConversationListHeader from "./ConversationListHeader";

interface ConversationListItemProps {
  conversation: Conversation;
  users: Record<string, User>;
  currentUserId: string;
  isActive?: boolean;
  onClick: () => void;
  onDelete?: (conversationId: string) => void;
  onTogglePin?: (conversationId: string) => void;
  onToggleReadStatus?: (conversationId: string) => void;
  className?: string;
}

const ConversationListItem: React.FC<ConversationListItemProps> = ({
  conversation,
  users,
  currentUserId,
  isActive = false,
  onClick,
  onDelete,
  onTogglePin,
  onToggleReadStatus,
  className,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const getDisplayName = (user: User) => {
    return user.name || user.username || user.email.split("@")[0];
  };

  const getConversationTitle = () => {
    if (conversation.title) {
      return conversation.title;
    }

    if (conversation.type === "private") {
      const otherParticipant = conversation.participants.find(
        (p) => p.userId !== currentUserId
      );
      if (otherParticipant && users[otherParticipant.userId]) {
        return getDisplayName(users[otherParticipant.userId]);
      }
    }

    // 群聊时显示参与者列表
    const participantNames = conversation.participants
      .filter((p) => p.userId !== currentUserId)
      .slice(0, 3)
      .map((p) =>
        users[p.userId] ? getDisplayName(users[p.userId]) : "未知用户"
      )
      .join(", ");

    return participantNames || "群聊";
  };

  const getConversationAvatar = () => {
    if (conversation.avatar) {
      return conversation.avatar;
    }

    if (conversation.type === "private") {
      const otherParticipant = conversation.participants.find(
        (p) => p.userId !== currentUserId
      );
      if (otherParticipant && users[otherParticipant.userId]) {
        return users[otherParticipant.userId].avatar;
      }
    }

    return null;
  };

  const formatLastMessageTime = (date: Date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: zhCN,
    });
  };

  const getLastMessagePreview = (message: Message) => {
    // 优先检查attachments
    if (message.attachments && message.attachments.length > 0) {
      const attachment = message.attachments[0];
      if (attachment.type === "image") {
        return "[图片]";
      } else if (attachment.type === "file") {
        return "[文件]";
      }
    }

    switch (message.type) {
      case "text":
        return message.content;
      case "image":
        return "[图片]";
      case "file":
        return "[文件]";
      case "system":
        return message.content;
      default:
        return "新消息";
    }
  };

  const avatar = getConversationAvatar();
  const title = getConversationTitle();

  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 relative",
        // 基础悬停样式
        "hover:bg-gray-50",
        // 活跃状态
        isActive && "bg-blue-50 border-r-2 border-blue-500",
        // 置顶背景色
        conversation.isPinned && !isActive && "bg-amber-50/50",
        conversation.isPinned &&
          isActive &&
          "bg-gradient-to-r from-amber-50/30 to-blue-50",
        className
      )}
    >
      {/* 头像 */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          {avatar ? (
            <img
              src={avatar}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 text-lg font-medium">
              {title.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* 在线状态指示器（仅私聊显示） */}
        {conversation.type === "private" && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}

        {/* 未读消息计数 */}
        {conversation.unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center px-1">
            {conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
          </div>
        )}
      </div>

      {/* 会话信息 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1 min-w-0 flex-1">
            <h3
              className={cn(
                "text-sm font-medium truncate",
                conversation.unreadCount > 0 ? "text-gray-900" : "text-gray-700"
              )}
            >
              {title}
            </h3>

            {/* 对话类型图标 */}
            {conversation.type === "group" && (
              <div className="flex-shrink-0 flex items-center" title="群聊">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            )}

            {conversation.type === "activity" && (
              <div className="flex-shrink-0 flex items-center" title="活动群聊">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>

          {conversation.lastMessage && (
            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
              {formatLastMessageTime(conversation.lastMessage.timestamp)}
            </span>
          )}
        </div>

        {/* 最后一条消息预览 */}
        {conversation.lastMessage && (
          <div className="flex items-center gap-1">
            <p
              className={cn(
                "text-sm truncate",
                conversation.unreadCount > 0
                  ? "text-gray-900 font-medium"
                  : "text-gray-500"
              )}
            >
              {conversation.lastMessage.senderId === currentUserId && "我: "}
              {getLastMessagePreview(conversation.lastMessage)}
            </p>
          </div>
        )}

        {/* 会话状态指示器 */}
        <div className="flex items-center gap-2 mt-1">
          {/* 群聊成员数量显示 */}
          {(conversation.type === "group" ||
            conversation.type === "activity") && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {conversation.participants.length}人
            </span>
          )}

          {conversation.isMuted && (
            <svg
              className="w-3 h-3 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.764L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.797-3.764a1 1 0 011.617.764zM12 8a1 1 0 012 0v4a1 1 0 11-2 0V8z"
                clipRule="evenodd"
              />
              <path d="M16.707 9.293a1 1 0 010 1.414C15.583 11.831 15 13.369 15 15s.583 3.169 1.707 4.293a1 1 0 01-1.414 1.414C14.146 19.56 13 17.426 13 15s1.146-4.56 2.293-5.707a1 1 0 011.414 0z" />
            </svg>
          )}

          {conversation.isArchived && (
            <svg
              className="w-3 h-3 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path
                fillRule="evenodd"
                d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>

      {/* 管理菜单按钮 */}
      <div className="relative flex-shrink-0 z-10" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-all"
          aria-label="会话管理"
        >
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>

        {/* 下拉菜单 */}
        {showMenu && (
          <div className="absolute right-0 top-8 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-[1000] overflow-visible min-h-[80px]">
            <div className="py-1">
              {/* 置顶功能 - 总是显示 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePin?.(conversation.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                {conversation.isPinned ? "取消置顶" : "置顶对话"}
              </button>

              {/* 已读/未读状态 - 总是显示 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleReadStatus?.(conversation.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {conversation.unreadCount > 0 ? "标为已读" : "标为未读"}
              </button>

              {/* 删除功能 - 总是显示 */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(conversation.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-red-600 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0016.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                删除对话
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ConversationListProps {
  conversations: Conversation[];
  users: Record<string, User>;
  currentUserId: string;
  activeConversationId?: string | null;
  onConversationClick: (conversationId: string) => void;
  onDelete?: (conversationId: string) => void;
  onTogglePin?: (conversationId: string) => void;
  onToggleReadStatus?: (conversationId: string) => void;
  className?: string;
  // 头部相关props
  showHeader?: boolean;
  headerTitle?: string;
  unreadCount?: number;
  onMarkAllAsRead?: () => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  users,
  currentUserId,
  activeConversationId,
  onConversationClick,
  onDelete,
  onTogglePin,
  onToggleReadStatus,
  className,
  showHeader = false,
  headerTitle,
  unreadCount = 0,
  onMarkAllAsRead,
}) => {
  if (conversations.length === 0) {
    return (
      <div className={cn("h-full flex flex-col", className)}>
        {showHeader && (
          <ConversationListHeader
            title={headerTitle}
            unreadCount={unreadCount}
            onMarkAllAsRead={onMarkAllAsRead}
          />
        )}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无对话</h3>
          <p className="text-gray-500">开始新的对话吧</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("h-full flex flex-col", className)}>
      {showHeader && (
        <ConversationListHeader
          title={headerTitle}
          unreadCount={unreadCount}
          onMarkAllAsRead={onMarkAllAsRead}
        />
      )}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {conversations.map((conversation) => (
          <ConversationListItem
            key={conversation.id}
            conversation={conversation}
            users={users}
            currentUserId={currentUserId}
            isActive={conversation.id === activeConversationId}
            onClick={() => onConversationClick(conversation.id)}
            onDelete={onDelete}
            onTogglePin={onTogglePin}
            onToggleReadStatus={onToggleReadStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
