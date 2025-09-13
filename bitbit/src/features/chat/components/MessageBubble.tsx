import React from "react";
import { formatDistanceToNow } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Message, MessageStatus } from "@/features/chat/types";
import type { User } from "@/types";
import { cn } from "@/shared/utils/cn";

interface MessageBubbleProps {
  message: Message;
  sender: User;
  isOwn: boolean;
  showAvatar?: boolean;
  showTimestamp?: boolean;
  className?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  sender,
  isOwn,
  showAvatar = true,
  showTimestamp = true,
  className,
}) => {
  const getDisplayName = (user: User) => {
    return user.name || user.username || user.email.split("@")[0];
  };

  const formatTimestamp = (date: Date) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: zhCN,
    });
  };

  const getStatusIcon = (status: MessageStatus) => {
    switch (status) {
      case "sending":
        return (
          <div className="w-3 h-3 rounded-full border-2 border-gray-300 border-t-primary-500 animate-spin" />
        );
      case "sent":
        return (
          <svg
            className="w-3 h-3 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "delivered":
        return (
          <div className="flex">
            <svg
              className="w-3 h-3 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              className="w-3 h-3 text-gray-400 -ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "read":
        return (
          <div className="flex">
            <svg
              className="w-3 h-3 text-primary-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              className="w-3 h-3 text-primary-500 -ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "failed":
        return (
          <svg
            className="w-3 h-3 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-2",
        isOwn ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {/* 头像 */}
      {showAvatar && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            {sender.avatar ? (
              <img
                src={sender.avatar}
                alt={getDisplayName(sender)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 text-sm font-medium">
                {getDisplayName(sender).charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 消息内容 */}
      <div
        className={cn(
          "flex flex-col max-w-xs lg:max-w-md",
          isOwn ? "items-end" : "items-start"
        )}
      >
        {/* 发送者名称（仅在群聊中显示） */}
        {!isOwn && (
          <div className="text-xs text-gray-500 mb-1 px-3">
            {getDisplayName(sender)}
          </div>
        )}

        {/* 消息气泡 */}
        <div
          className={cn(
            "relative px-3 py-2 rounded-2xl shadow-sm",
            isOwn
              ? "bg-primary-500 text-white rounded-br-md"
              : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
          )}
        >
          {/* 消息内容 */}
          <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.content}
          </div>

          {/* 回复引用 */}
          {message.replyTo && (
            <div
              className={cn(
                "mt-2 pt-2 border-t",
                isOwn ? "border-primary-400" : "border-gray-200"
              )}
            >
              <div
                className={cn(
                  "text-xs opacity-75",
                  isOwn ? "text-primary-100" : "text-gray-500"
                )}
              >
                回复消息
              </div>
            </div>
          )}

          {/* 消息附件 */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2">
              {message.attachments.map((attachment) => (
                <div key={attachment.id} className="mb-2">
                  {attachment.type === "image" ? (
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="max-w-full rounded-lg"
                    />
                  ) : (
                    <div
                      className={cn(
                        "flex items-center gap-2 p-2 rounded border",
                        isOwn
                          ? "border-primary-400 bg-primary-400/20"
                          : "border-gray-300 bg-gray-50"
                      )}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs">{attachment.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 时间戳和状态 */}
        {showTimestamp && (
          <div
            className={cn(
              "flex items-center gap-1 mt-1 px-3",
              isOwn ? "flex-row-reverse" : "flex-row"
            )}
          >
            <span className="text-xs text-gray-500">
              {formatTimestamp(message.timestamp)}
            </span>
            {isOwn && (
              <div className="flex items-center">
                {getStatusIcon(message.status)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
