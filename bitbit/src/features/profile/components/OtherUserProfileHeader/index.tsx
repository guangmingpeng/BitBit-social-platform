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
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
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
          <h1 className="text-xl font-bold text-gray-900">
            {displayName}的主页
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-lg">💬</span>
          </button>
          <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-lg">📧</span>
          </button>
        </div>
      </div>

      {/* 用户信息区域 */}
      <div className="p-6">
        <div className="flex items-start gap-6">
          {/* 头像 */}
          <div className="relative">
            <Avatar
              src={user.avatar}
              fallback={displayName}
              size="xl"
              online={user.isOnline}
            />
          </div>

          {/* 用户信息 */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                {displayName}
              </h2>
              {user.level && (
                <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                  Lv.{user.level}
                </div>
              )}
            </div>

            {/* 扩展的用户信息 */}
            <div className="space-y-2 mb-4">
              {/* 职业、年龄、位置 */}
              {(user.profession || user.age || user.location) && (
                <div className="flex items-center gap-2 text-gray-600">
                  {user.profession && <span>{user.profession}</span>}
                  {user.profession && user.age && <span>·</span>}
                  {user.age && <span>{user.age}岁</span>}
                  {(user.profession || user.age) && user.location && (
                    <span>·</span>
                  )}
                  {user.location && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
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
                </div>
              )}

              {/* 加入时间 */}
              {(user.joinedDate || user.joinDate) && (
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
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
            <p className="text-gray-600 mb-4">
              {user.bio || "这个用户很神秘，什么都没有留下"}
            </p>

            {/* 兴趣标签 */}
            {(user.interests || user.tags) &&
              (user.interests?.length || user.tags?.length) && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {(user.interests || user.tags)
                      ?.slice(0, 5)
                      .map((interest, index) => (
                        <Tag key={index} variant="secondary" size="sm">
                          {interest}
                        </Tag>
                      ))}
                    {(user.interests?.length || user.tags?.length || 0) > 5 && (
                      <Tag variant="default" size="sm">
                        +
                        {(user.interests?.length || user.tags?.length || 0) - 5}
                      </Tag>
                    )}
                  </div>
                </div>
              )}

            {/* 统计信息 */}
            {(user.activitiesCount !== undefined ||
              user.stats?.totalPosts !== undefined ||
              user.stats?.totalExchanges !== undefined) && (
              <div className="mb-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  {user.activitiesCount !== undefined && (
                    <span>参与活动 {user.activitiesCount}</span>
                  )}
                  {user.stats?.totalPosts !== undefined && (
                    <span>发布帖子 {user.stats.totalPosts}</span>
                  )}
                  {user.stats?.totalExchanges !== undefined && (
                    <span>交易次数 {user.stats.totalExchanges}</span>
                  )}
                </div>
              </div>
            )}

            {/* 关注按钮 */}
            <Button
              onClick={() => onFollow(isFollowing)}
              disabled={isLoading}
              variant={isFollowing ? "outline" : "primary"}
              className="px-6 py-2 rounded-full font-medium"
            >
              {isLoading ? "..." : isFollowing ? "已关注" : "关注"}
            </Button>
          </div>

          {/* 关注数据 */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/user/${user.id}/following`)}
              className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/50 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <div className="relative z-10 p-5 text-center min-w-[120px]">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                  {user.following || user.followingCount || 0}
                </div>
                <div className="text-sm font-medium text-blue-700 group-hover:text-blue-800 transition-colors">
                  关注
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>

            <button
              onClick={() => navigate(`/user/${user.id}/followers`)}
              className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200/50 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <div className="relative z-10 p-5 text-center min-w-[120px]">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  {user.followers || user.followersCount || 0}
                </div>
                <div className="text-sm font-medium text-purple-700 group-hover:text-purple-800 transition-colors">
                  粉丝
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                <svg
                  className="w-4 h-4 text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
