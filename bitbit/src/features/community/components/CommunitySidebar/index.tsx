import React from "react";
import { UserCardPopover } from "@/shared/components";
import { useCommunityUsers } from "../../hooks";

interface HotTopic {
  name: string;
  count: number;
}

interface CommunitySidebarProps {
  className?: string;
  hotTags?: HotTopic[];
  selectedTag?: string;
  onTagChange?: (tag: string) => void;
}

const hotTopics: HotTopic[] = [
  { name: "#摄影技巧", count: 128 },
  { name: "#美食制作", count: 96 },
  { name: "#读书分享", count: 73 },
];

const CommunitySidebar: React.FC<CommunitySidebarProps> = ({
  className,
  hotTags = hotTopics,
  selectedTag = "",
  onTagChange,
}) => {
  // 使用hook管理用户数据和操作
  const { users, convertToUserInfo, toggleFollow, sendMessage, viewProfile } =
    useCommunityUsers();

  const handleTagClick = (tagName: string) => {
    // 移除标签名前的#号（如果有的话）
    const cleanTagName = tagName.replace(/^#/, "");
    onTagChange?.(cleanTagName);
  };
  return (
    <div className={className}>
      {/* 热门话题 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">🔥 热门标签</h3>
        <div className="space-y-2">
          {hotTags.map((topic, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2 rounded transition-all cursor-pointer ${
                selectedTag === topic.name.replace(/^#/, "")
                  ? "bg-primary-50 text-primary-600 border border-primary-200"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleTagClick(topic.name)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  #{topic.name.replace(/^#/, "")}
                </span>
                {index < 3 && (
                  <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full">
                    热
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-text-tertiary">
                  {topic.count}
                </span>
                {index === 0 && (
                  <span className="text-red-500 text-xs">📈</span>
                )}
                {index === 1 && (
                  <span className="text-orange-500 text-xs">🔥</span>
                )}
                {index === 2 && (
                  <span className="text-yellow-500 text-xs">⭐</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {selectedTag && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={() => onTagChange?.("")}
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1"
            >
              <span>×</span>
              <span>清除标签筛选</span>
            </button>
          </div>
        )}
      </div>

      {/* 活跃用户 */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">活跃用户</h3>
        <div className="space-y-3">
          {users.map((user) => {
            const userInfo = convertToUserInfo(user);

            return (
              <UserCardPopover
                key={user.id}
                user={userInfo}
                placement="right"
                onFollow={toggleFollow}
                onMessage={sendMessage}
                onViewProfile={viewProfile}
              >
                <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt="用户头像"
                      className="w-8 h-8 rounded-full"
                    />
                    {/* 在线状态指示器 */}
                    {user.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5">
                        <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{user.name}</span>
                      {user.isFollowed && (
                        <span className="text-xs text-blue-500">已关注</span>
                      )}
                    </div>
                    <div className="text-xs text-text-tertiary">
                      发布了 {user.postCount} 篇帖子
                    </div>
                  </div>
                </div>
              </UserCardPopover>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommunitySidebar;
