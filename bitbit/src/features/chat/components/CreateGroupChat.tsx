import React, { useState } from "react";
import type { User } from "@/types";
import { cn } from "@/shared/utils/cn";

interface CreateGroupChatProps {
  availableUsers: User[];
  currentUserId: string;
  onCreateGroup: (groupData: {
    name: string;
    description?: string;
    selectedUserIds: string[];
    avatar?: File;
  }) => void;
  onCancel: () => void;
  className?: string;
}

const CreateGroupChat: React.FC<CreateGroupChatProps> = ({
  availableUsers,
  currentUserId,
  onCreateGroup,
  onCancel,
  className,
}) => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getDisplayName = (user: User) => {
    return user.name || user.username || user.email.split("@")[0];
  };

  // 过滤可选用户（排除当前用户，并支持搜索）
  const filteredUsers = availableUsers
    .filter((user) => user.id !== currentUserId)
    .filter((user) => {
      if (!searchQuery) return true;
      const displayName = getDisplayName(user).toLowerCase();
      return displayName.includes(searchQuery.toLowerCase());
    });

  const handleUserToggle = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const handleSubmit = () => {
    if (groupName.trim() && selectedUserIds.length > 0) {
      onCreateGroup({
        name: groupName.trim(),
        description: groupDescription.trim() || undefined,
        selectedUserIds,
        avatar: avatarFile || undefined,
      });
    }
  };

  const isValid = groupName.trim().length > 0 && selectedUserIds.length > 0;

  return (
    <div
      className={cn("bg-white rounded-lg shadow-lg max-w-md w-full", className)}
    >
      {/* 头部 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">创建群聊</h2>
          <button
            onClick={onCancel}
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
      </div>

      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {/* 活动群聊说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0">
              <svg
                className="w-4 h-4 text-blue-600 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-medium text-blue-800 mb-1">
                活动群聊说明
              </h4>
              <p className="text-xs text-blue-700">
                活动群聊用于活动参与者交流，您将自动成为群管理员，可以管理群设置和成员。
              </p>
            </div>
          </div>
        </div>
        {/* 群头像上传 */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {avatarFile ? (
                <img
                  src={URL.createObjectURL(avatarFile)}
                  alt="群头像预览"
                  className="w-full h-full object-cover"
                />
              ) : (
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              )}
            </div>
            <label className="absolute bottom-0 right-0 w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600 transition-colors">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">设置群头像</p>
            <p className="text-xs text-gray-400">可选，支持JPG、PNG格式</p>
          </div>
        </div>

        {/* 群名称 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            群名称 *
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="输入群聊名称"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            maxLength={50}
          />
          <p className="text-xs text-gray-400 mt-1">{groupName.length}/50</p>
        </div>

        {/* 群描述 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            群描述
          </label>
          <textarea
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            placeholder="输入群聊描述（可选）"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            maxLength={200}
          />
          <p className="text-xs text-gray-400 mt-1">
            {groupDescription.length}/200
          </p>
        </div>

        {/* 选择成员 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            选择成员 * (已选 {selectedUserIds.length} 人)
          </label>

          {/* 搜索框 */}
          <div className="relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索用户..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* 用户列表 */}
          <div className="border border-gray-200 rounded-lg max-h-40 overflow-y-auto">
            {filteredUsers.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                {searchQuery ? "没有找到匹配的用户" : "暂无可选用户"}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <label
                    key={user.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedUserIds.includes(user.id)}
                      onChange={() => handleUserToggle(user.id)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />

                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={getDisplayName(user)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 text-xs font-medium">
                          {getDisplayName(user).charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {getDisplayName(user)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.isOnline ? "在线" : "离线"}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="p-4 border-t border-gray-200 flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          取消
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={cn(
            "flex-1 px-4 py-2 rounded-lg transition-colors",
            isValid
              ? "bg-primary-500 text-white hover:bg-primary-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
        >
          创建群聊
        </button>
      </div>
    </div>
  );
};

export default CreateGroupChat;
