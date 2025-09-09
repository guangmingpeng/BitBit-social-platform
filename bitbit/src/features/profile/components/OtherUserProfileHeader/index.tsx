import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Tag, Button } from "@/components/ui";
import type { User } from "@/components/ui/cards/UserCard/types";

interface OtherUserProfileHeaderProps {
  user: User;
  onFollow: (isFollowing: boolean) => void;
  isFollowing: boolean;
  isLoading?: boolean;
}

export const OtherUserProfileHeader: React.FC<OtherUserProfileHeaderProps> = ({
  user,
  onFollow,
  isFollowing,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const displayName = user.name || user.username;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="返回"
          >
            <svg
              className="w-5 h-5 text-gray-600"
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
          <h1 className="text-lg font-semibold text-gray-900">用户主页</h1>
        </div>

        {/* 右侧操作按钮 */}
        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="分享"
          >
            <svg
              className="w-5 h-5 text-gray-600"
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
          </button>
          <button
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            aria-label="更多"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左侧：用户基本信息 */}
          <div className="flex-1">
            <div className="flex items-start gap-4">
              {/* 头像 */}
              <div className="relative">
                <Avatar
                  src={user.avatar}
                  alt={displayName}
                  size="lg"
                  className="w-20 h-20 border-4 border-white shadow-lg"
                />
                {user.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-3 border-white rounded-full" />
                )}
              </div>

              {/* 用户信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 truncate">
                    {displayName}
                  </h2>
                  {user.level && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium rounded-full">
                      Lv.{user.level}
                    </span>
                  )}
                </div>

                {/* 副标题信息 */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                  {user.profession && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{user.profession}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{user.location}</span>
                    </div>
                  )}
                  {(user.joinedDate || user.joinDate) && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>加入于 {user.joinedDate || user.joinDate}</span>
                    </div>
                  )}
                </div>

                {/* 个人简介 */}
                <p className="text-gray-700 leading-relaxed mb-4">
                  {user.bio || "这个用户很神秘，什么都没有留下~"}
                </p>

                {/* 兴趣标签 */}
                {(user.interests || user.tags) &&
                  ((user.interests?.length || 0) > 0 ||
                    (user.tags?.length || 0) > 0) && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(user.interests || user.tags)
                        ?.slice(0, 6)
                        .map((interest, index) => (
                          <Tag
                            key={index}
                            variant="secondary"
                            size="sm"
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            {interest}
                          </Tag>
                        ))}
                    </div>
                  )}

                {/* 关注和粉丝统计 - 简洁显示 */}
                <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-900">
                      {user.following || user.followingCount || 0}
                    </span>
                    <span className="text-gray-500">关注</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-900">
                      {user.followers || user.followersCount || 0}
                    </span>
                    <span className="text-gray-500">粉丝</span>
                  </div>
                  {user.activitiesCount && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-900">
                        {user.activitiesCount}
                      </span>
                      <span className="text-gray-500">活动</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：操作按钮 */}
          <div className="lg:w-60">
            {/* 主要操作按钮 */}
            <div className="flex gap-3">
              <Button
                variant={isFollowing ? "outline" : "primary"}
                size="md"
                onClick={() => onFollow(isFollowing)}
                disabled={isLoading}
                className={`flex-1 ${
                  isFollowing
                    ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>处理中...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {isFollowing ? (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>已关注</span>
                      </>
                    ) : (
                      <>
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
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <span>关注</span>
                      </>
                    )}
                  </div>
                )}
              </Button>

              <Button
                variant="outline"
                size="md"
                className="px-4 border-gray-300 text-gray-700 hover:bg-gray-50"
                aria-label="发消息"
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
