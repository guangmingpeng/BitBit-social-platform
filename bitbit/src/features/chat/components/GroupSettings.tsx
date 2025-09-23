import React, { useState } from "react";
import type { Conversation } from "@/features/chat/types";
import { Switch } from "@/components/ui/Switch";
import GroupMembersList from "./GroupMembersList";
import { ConfirmClearDialog } from "@/components/common";
import { cn } from "@/shared/utils/cn";

interface GroupSettingsProps {
  conversation: Conversation;
  currentUserId: string;
  onUpdateGroupName?: (newName: string) => void;
  onUpdateGroupAvatar?: (avatarFile: File) => void;
  onUpdateGroupDescription?: (description: string) => void;
  onToggleInvitePermission?: (checked: boolean) => void;
  onToggleFileSharing?: (checked: boolean) => void;
  onToggleNotifications?: (checked: boolean) => void;
  onMemberRoleChange?: (
    userId: string,
    newRole: "admin" | "member" | "owner"
  ) => void;
  onRemoveMember?: (userId: string) => void;
  onLeaveGroup?: () => void;
  onDismissGroup?: () => void;
  onClearChatHistory?: () => void;
  onViewActivityDetails?: (
    activityId: string,
    userRole: "owner" | "admin" | "member"
  ) => void;
  onInviteToActivity?: (activityId: string, event?: React.MouseEvent) => void;
  className?: string;
}

const GroupSettings: React.FC<GroupSettingsProps> = ({
  conversation,
  currentUserId,
  onUpdateGroupName,
  onUpdateGroupAvatar,
  onUpdateGroupDescription,
  onToggleInvitePermission,
  onToggleFileSharing,
  onToggleNotifications,
  onMemberRoleChange,
  onRemoveMember,
  onLeaveGroup,
  onDismissGroup,
  onClearChatHistory,
  onViewActivityDetails,
  onInviteToActivity,
  className,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newName, setNewName] = useState(conversation.title || "");
  const [newDescription, setNewDescription] = useState(
    conversation.description || ""
  );
  const [showDismissDialog, setShowDismissDialog] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const [showClearHistoryDialog, setShowClearHistoryDialog] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const currentUser = conversation.participants.find(
    (p) => p.userId === currentUserId
  );
  const isOwner = currentUser?.role === "owner";
  const isAdmin =
    currentUser?.role === "admin" || currentUser?.role === "owner";

  // 检查群聊是否已解散
  const isGroupDismissed = conversation.isDismissed;

  const handleNameSave = () => {
    if (newName.trim() && onUpdateGroupName) {
      onUpdateGroupName(newName.trim());
    }
    setIsEditingName(false);
  };

  const handleDescriptionSave = () => {
    if (onUpdateGroupDescription) {
      onUpdateGroupDescription(newDescription.trim());
    }
    setIsEditingDescription(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUpdateGroupAvatar) {
      onUpdateGroupAvatar(file);
    }
  };

  const handleDismissGroup = () => {
    setShowDismissDialog(true);
  };

  const handleConfirmDismiss = async () => {
    setIsDismissing(true);
    try {
      if (onDismissGroup) {
        await onDismissGroup();
      }
      setShowDismissDialog(false);
    } catch (error) {
      console.error("解散群聊失败:", error);
    } finally {
      setIsDismissing(false);
    }
  };

  const handleCloseDismissDialog = () => {
    if (!isDismissing) {
      setShowDismissDialog(false);
    }
  };

  const handleClearHistory = () => {
    setShowClearHistoryDialog(true);
  };

  const handleConfirmClearHistory = async () => {
    setIsClearing(true);
    try {
      if (onClearChatHistory) {
        await onClearChatHistory();
      }
      setShowClearHistoryDialog(false);
    } catch (error) {
      console.error("清空聊天记录失败:", error);
    } finally {
      setIsClearing(false);
    }
  };

  const handleCloseClearHistoryDialog = () => {
    if (!isClearing) {
      setShowClearHistoryDialog(false);
    }
  };

  const handleViewActivityDetails = () => {
    if (conversation.activityId && onViewActivityDetails) {
      const userRole = currentUser?.role || "member";
      onViewActivityDetails(conversation.activityId, userRole);
    }
  };

  const handleInviteToActivity = (event: React.MouseEvent) => {
    console.log("handleInviteToActivity called", {
      activityId: conversation.activityId,
      onInviteToActivity,
    });
    if (conversation.activityId && onInviteToActivity) {
      onInviteToActivity(conversation.activityId, event);
    }
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-sm", className)}>
      {/* 群头像和基本信息 */}
      <div className="p-6 border-b border-gray-200">
        {/* 活动群聊标识 */}
        {conversation.type === "activity" && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium text-sm">活动群聊</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              此群聊与活动绑定，活动结束后可选择保留或解散群聊
            </p>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              {conversation.avatar ? (
                <img
                  src={conversation.avatar}
                  alt={conversation.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 text-2xl font-medium">
                  {conversation.title?.charAt(0).toUpperCase() || "G"}
                </div>
              )}
            </div>
            {isAdmin && !isGroupDismissed && (
              <label className="absolute bottom-0 right-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600 transition-colors">
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="flex-1">
            {/* 群名称 */}
            <div className="mb-2">
              {isEditingName ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleNameSave();
                      if (e.key === "Escape") setIsEditingName(false);
                    }}
                    autoFocus
                  />
                  <button
                    onClick={handleNameSave}
                    className="px-3 py-1 bg-primary-500 text-white text-sm rounded hover:bg-primary-600"
                  >
                    保存
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {conversation.title || "未命名群聊"}
                  </h2>
                  {isAdmin && !isGroupDismissed && (
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-1 text-gray-400 hover:text-gray-600"
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
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500">
              {conversation.participants.length} 人
            </p>
          </div>
        </div>

        {/* 群描述 */}
        <div className="mt-4">
          {isEditingDescription ? (
            <div className="space-y-2">
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="输入群聊描述..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleDescriptionSave}
                  className="px-3 py-1 bg-primary-500 text-white text-sm rounded hover:bg-primary-600"
                >
                  保存
                </button>
                <button
                  onClick={() => setIsEditingDescription(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <div className="flex-1">
                {conversation.description ? (
                  <p className="text-sm text-gray-600">
                    {conversation.description}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 italic">暂无群聊描述</p>
                )}
              </div>
              {isAdmin && !isGroupDismissed && (
                <button
                  onClick={() => setIsEditingDescription(true)}
                  className="p-1 text-gray-400 hover:text-gray-600"
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 群设置选项 */}
      {isAdmin && !isGroupDismissed && (
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">群聊设置</h3>

          <div className="space-y-3">
            {/* 邀请权限 */}
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  所有成员可邀请
                </h4>
                <p className="text-xs text-gray-500">
                  允许普通成员邀请新用户加入群聊
                </p>
              </div>
              <Switch
                checked={conversation.settings.allowInvites}
                onChange={onToggleInvitePermission || (() => {})}
              />
            </div>

            {/* 文件分享 */}
            <div className="flex items-center justify-between py-2">
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  允许文件分享
                </h4>
                <p className="text-xs text-gray-500">成员可以发送文件和图片</p>
              </div>
              <Switch
                checked={conversation.settings.allowFileSharing}
                onChange={onToggleFileSharing || (() => {})}
              />
            </div>
          </div>
        </div>
      )}

      {/* 个人设置 */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">我的设置</h3>

        <div className="space-y-3">
          {/* 消息通知 */}
          <div className="flex items-center justify-between py-2">
            <div>
              <h4 className="text-sm font-medium text-gray-900">消息通知</h4>
              <p className="text-xs text-gray-500">接收此群聊的消息推送通知</p>
            </div>
            <Switch
              checked={!conversation.settings.muteNotifications}
              onChange={onToggleNotifications || (() => {})}
            />
          </div>
        </div>
      </div>

      {/* 群成员列表 */}
      <div className="border-b border-gray-200">
        <GroupMembersList
          participants={conversation.participants}
          currentUserId={currentUserId}
          onRoleChange={onMemberRoleChange}
          onRemoveMember={onRemoveMember}
          isGroupDismissed={isGroupDismissed}
        />
      </div>

      {/* 群聊操作 */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">群聊操作</h3>

        <div className="space-y-2">
          {/* 查看活动详情 - 仅活动群聊显示 */}
          {conversation.type === "activity" && (
            <button
              onClick={handleViewActivityDetails}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
            >
              <div className="flex items-center gap-3">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <div className="font-medium">查看活动详情</div>
                  <div className="text-xs text-gray-500">
                    查看完整的活动信息和安排
                  </div>
                </div>
              </div>
            </button>
          )}

          {/* 分享群聊 */}
          <button
            onClick={
              conversation.type === "activity"
                ? handleInviteToActivity
                : () => console.log("Share group")
            }
            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
          >
            <div className="flex items-center gap-3">
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
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
              <div>
                <div className="font-medium">
                  {conversation.type === "activity"
                    ? "邀请参加活动"
                    : "分享群聊"}
                </div>
                <div className="text-xs text-gray-500">
                  {conversation.type === "activity"
                    ? "邀请更多朋友参与活动"
                    : "分享群聊给朋友"}
                </div>
              </div>
            </div>
          </button>

          {/* 群聊公告 */}
          {isAdmin && (
            <button
              onClick={() => console.log("Manage announcements")}
              className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
            >
              <div className="flex items-center gap-3">
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
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
                <div>
                  <div className="font-medium">群公告</div>
                  <div className="text-xs text-gray-500">发布活动相关公告</div>
                </div>
              </div>
            </button>
          )}

          {/* 清空聊天记录 */}
          <button
            onClick={handleClearHistory}
            className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
          >
            <div className="flex items-center gap-3">
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <div>
                <div className="font-medium">清空聊天记录</div>
                <div className="text-xs text-gray-500">删除本地聊天记录</div>
              </div>
            </div>
          </button>

          {/* 危险操作分隔线 */}
          <div className="border-t border-gray-200 my-3"></div>

          {!isOwner && onLeaveGroup && (
            <button
              onClick={onLeaveGroup}
              className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <div>
                  <div className="font-medium">退出群聊</div>
                  <div className="text-xs text-red-400">离开此活动群聊</div>
                </div>
              </div>
            </button>
          )}

          {isOwner && onDismissGroup && !isGroupDismissed && (
            <button
              onClick={handleDismissGroup}
              className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <div>
                  <div className="font-medium">解散群聊</div>
                  <div className="text-xs text-red-400">永久删除此群聊</div>
                </div>
              </div>
            </button>
          )}

          {/* 已解散群聊状态显示 */}
          {isGroupDismissed && (
            <div className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-gray-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">群聊已解散</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {conversation.dismissedAt && (
                      <>
                        解散时间：
                        {new Date(conversation.dismissedAt).toLocaleString(
                          "zh-CN"
                        )}
                        {conversation.dismissedBy && (
                          <span className="ml-2">
                            解散人：
                            {conversation.participants.find(
                              (p) => p.userId === conversation.dismissedBy
                            )?.user.username || "未知用户"}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    聊天记录已保留，但无法再进行群聊管理操作
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 解散群聊确认弹窗 */}
      <ConfirmClearDialog
        isOpen={showDismissDialog}
        onClose={handleCloseDismissDialog}
        onConfirm={handleConfirmDismiss}
        title="确认解散群聊"
        content={`您确定要解散群聊"${
          conversation.title || "未命名群聊"
        }"吗？解散后，所有成员将无法再发送消息，但聊天记录会被保留。此操作不可恢复。`}
        confirmText="确认解散"
        cancelText="取消"
        isLoading={isDismissing}
      />

      {/* 清空聊天记录确认弹窗 */}
      <ConfirmClearDialog
        isOpen={showClearHistoryDialog}
        onClose={handleCloseClearHistoryDialog}
        onConfirm={handleConfirmClearHistory}
        title="确认清空聊天记录"
        content={`您确定要清空"${
          conversation.title || "未命名群聊"
        }"的聊天记录吗？此操作将删除您本地的所有聊天记录，但不会影响其他成员。此操作不可恢复。`}
        confirmText="确认清空"
        cancelText="取消"
        isLoading={isClearing}
      />
    </div>
  );
};

export default GroupSettings;
