import React, { useState } from "react";
import type { Conversation, ParticipantRole } from "@/features/chat/types";
import type { User } from "@/types";
import GroupMembersList from "./GroupMembersList";
import GroupSettings from "./GroupSettings";
import { cn } from "@/shared/utils/cn";

interface GroupChatHeaderProps {
  conversation: Conversation;
  users: Record<string, User>;
  currentUserId: string;
  onBack?: () => void;
  onUpdateGroupName?: (newName: string) => void;
  onUpdateGroupAvatar?: (avatarFile: File) => void;
  onUpdateGroupDescription?: (description: string) => void;
  onToggleInvitePermission?: (checked: boolean) => void;
  onToggleFileSharing?: (checked: boolean) => void;
  onRoleChange?: (userId: string, newRole: ParticipantRole) => void;
  onRemoveMember?: (userId: string) => void;
  onInviteMembers?: () => void;
  onLeaveGroup?: () => void;
  onDismissGroup?: () => void;
  className?: string;
}

const GroupChatHeader: React.FC<GroupChatHeaderProps> = ({
  conversation,
  users,
  currentUserId,
  onBack,
  onUpdateGroupName,
  onUpdateGroupAvatar,
  onUpdateGroupDescription,
  onToggleInvitePermission,
  onToggleFileSharing,
  onRoleChange,
  onRemoveMember,
  onInviteMembers,
  onLeaveGroup,
  onDismissGroup,
  className,
}) => {
  const [showMembersList, setShowMembersList] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const getOnlineCount = () => {
    return conversation.participants.filter((p) => users[p.userId]?.isOnline)
      .length;
  };

  const currentUser = conversation.participants.find(
    (p) => p.userId === currentUserId
  );
  const isAdmin =
    currentUser?.role === "admin" || currentUser?.role === "owner";

  return (
    <>
      <div className={cn("p-4 border-b border-gray-200 bg-white", className)}>
        <div className="flex items-center gap-3">
          {/* 返回按钮 */}
          {onBack && (
            <button
              onClick={onBack}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* 群头像 */}
          <button
            onClick={() => setShowMembersList(true)}
            className="relative flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              {conversation.avatar ? (
                <img
                  src={conversation.avatar}
                  alt={conversation.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 font-medium">
                  {conversation.title?.charAt(0).toUpperCase() || "G"}
                </div>
              )}
            </div>

            {/* 在线人数指示器 */}
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
              {getOnlineCount()}
            </div>
          </button>

          {/* 群信息 */}
          <div className="flex-1 min-w-0">
            <button
              onClick={() => setShowMembersList(true)}
              className="text-left hover:opacity-80 transition-opacity w-full"
            >
              <h3 className="font-medium text-gray-900 truncate">
                {conversation.title || "未命名群聊"}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>{conversation.participants.length} 人</span>
                </div>
                {getOnlineCount() > 0 && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{getOnlineCount()} 人在线</span>
                  </div>
                )}
              </div>
            </button>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center gap-1">
            {/* 成员列表按钮 */}
            <button
              onClick={() => setShowMembersList(true)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="查看成员"
            >
              <svg
                className="w-5 h-5"
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
            </button>

            {/* 设置按钮（仅管理员可见） */}
            {isAdmin && (
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="群设置"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* 群聊描述（如果有的话） */}
        {conversation.description && (
          <div className="mt-2 px-2">
            <p className="text-sm text-gray-600 line-clamp-2">
              {conversation.description}
            </p>
          </div>
        )}
      </div>

      {/* 成员列表弹窗 */}
      {showMembersList && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">群成员</h3>
              <button
                onClick={() => setShowMembersList(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <GroupMembersList
              participants={conversation.participants}
              currentUserId={currentUserId}
              onRoleChange={onRoleChange}
              onRemoveMember={onRemoveMember}
              onInviteMembers={onInviteMembers}
            />
          </div>
        </div>
      )}

      {/* 群设置弹窗 */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">群设置</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <GroupSettings
              conversation={conversation}
              currentUserId={currentUserId}
              onUpdateGroupName={onUpdateGroupName}
              onUpdateGroupAvatar={onUpdateGroupAvatar}
              onUpdateGroupDescription={onUpdateGroupDescription}
              onToggleInvitePermission={onToggleInvitePermission}
              onToggleFileSharing={onToggleFileSharing}
              onLeaveGroup={onLeaveGroup}
              onDismissGroup={onDismissGroup}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GroupChatHeader;
