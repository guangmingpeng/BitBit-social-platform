import React from "react";
import { useNavigate } from "react-router-dom";
import { Tag } from "@/components/ui";
import type { User } from "@/types";

interface UserProfileProps {
  user: User;
  onEditProfile?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onEditProfile,
}) => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate("/profile/settings");
  };
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden relative">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-100">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">个人中心</h1>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 移除重复的通知按钮，保持设计简洁 */}
          <button
            onClick={handleSettingsClick}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-base sm:text-lg">⚙️</span>
          </button>
        </div>
      </div>

      {/* 用户信息区域 */}
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          {/* 头像 */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-lg sm:text-xl lg:text-2xl font-medium">
                  {user.name?.slice(0, 2) || "U"}
                </span>
              )}
            </div>
            {/* 在线状态指示器 */}
            {user.isOnline && (
              <div className="absolute -bottom-1 -right-1">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 sm:border-3 border-white"></div>
              </div>
            )}
          </div>

          {/* 用户信息 */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 mb-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                {user.name}
              </h2>
              <div className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs sm:text-sm font-medium">
                Lv.{user.level}
              </div>
            </div>

            {/* 扩展的用户信息 - 与 UserCard 保持一致 */}
            <div className="space-y-2 mb-4">
              {/* 职业、年龄、位置 */}
              {(user.profession || user.age || user.location) && (
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2 text-gray-600 text-sm">
                  {user.profession && <span>{user.profession}</span>}
                  {user.profession && user.age && (
                    <span className="hidden sm:inline">·</span>
                  )}
                  {user.age && <span>{user.age}岁</span>}
                  {(user.profession || user.age) && user.location && (
                    <span className="hidden sm:inline">·</span>
                  )}
                  {user.location && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
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
              <div className="flex items-center justify-center sm:justify-start gap-1 text-gray-500 text-xs sm:text-sm">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>加入于 {user.joinedDate}</span>
              </div>
            </div>

            {/* 个人简介 */}
            <p className="text-gray-600 mb-4 text-sm sm:text-base text-center sm:text-left">
              {user.bio || "热爱音乐和摄影的技术爱好者"}
            </p>

            {/* 兴趣标签 - 与 UserCard 保持一致 */}
            {user.interests && user.interests.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {user.interests.slice(0, 3).map((interest, index) => (
                    <Tag key={index} variant="secondary" size="sm">
                      {interest}
                    </Tag>
                  ))}
                  {user.interests.length > 3 && (
                    <Tag variant="default" size="sm">
                      +{user.interests.length - 3}
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
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
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

            <button
              onClick={onEditProfile}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors font-medium text-sm sm:text-base"
            >
              编辑资料
            </button>
          </div>
        </div>

        {/* 关注数据 - 移动端下移，桌面端右侧显示 */}
        <div className="flex justify-center sm:justify-start mt-4 sm:mt-0 sm:ml-auto sm:self-start">
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => navigate(`/profile/following`)}
              className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/50 rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <div className="relative z-10 p-3 sm:p-4 lg:p-5 text-center min-w-[80px] sm:min-w-[100px] lg:min-w-[120px]">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                  {user.following || 0}
                </div>
                <div className="text-xs sm:text-sm font-medium text-blue-700 group-hover:text-blue-800 transition-colors">
                  关注
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {/* 装饰性图标 */}
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500"
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
              onClick={() => navigate(`/profile/followers`)}
              className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200/50 rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <div className="relative z-10 p-3 sm:p-4 lg:p-5 text-center min-w-[80px] sm:min-w-[100px] lg:min-w-[120px]">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  {user.followers || 0}
                </div>
                <div className="text-xs sm:text-sm font-medium text-purple-700 group-hover:text-purple-800 transition-colors">
                  粉丝
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {/* 装饰性图标 */}
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500"
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
