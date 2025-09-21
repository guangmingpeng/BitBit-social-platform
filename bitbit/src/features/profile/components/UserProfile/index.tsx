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
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* 左侧：头像和基本信息 */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 flex-1">
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

          {/* 右侧：关注数据区域 - 优化后的设计 */}
          <div className="flex flex-col items-center lg:items-end gap-3 lg:min-w-[200px]">
            {/* 关注数据统计卡片 */}
            <div className="bg-gray-50/80 rounded-2xl p-4 w-full max-w-[280px] lg:max-w-none">
              <div className="flex justify-between items-center gap-6">
                {/* 关注数 */}
                <button
                  onClick={() => navigate(`/profile/following`)}
                  className="group flex-1 text-center py-2 px-3 rounded-xl hover:bg-white/80 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-gray-200/50"
                >
                  <div className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {user.following || 0}
                  </div>
                  <div className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">
                    关注
                  </div>
                </button>

                {/* 分隔线 */}
                <div className="w-px h-12 bg-gray-200"></div>

                {/* 粉丝数 */}
                <button
                  onClick={() => navigate(`/profile/followers`)}
                  className="group flex-1 text-center py-2 px-3 rounded-xl hover:bg-white/80 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-gray-200/50"
                >
                  <div className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                    {user.followers || 0}
                  </div>
                  <div className="text-sm font-medium text-gray-600 group-hover:text-purple-600 transition-colors">
                    粉丝
                  </div>
                </button>
              </div>
            </div>

            {/* 社交影响力指标 */}
            <div className="text-center lg:text-right">
              <div className="text-xs text-gray-500 mb-1">社交影响力</div>
              <div className="flex items-center justify-center lg:justify-end gap-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 ${
                        i <
                        Math.min(
                          Math.floor(
                            ((user.followers || 0) + (user.following || 0)) / 20
                          ),
                          5
                        )
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-600 ml-1">
                  {Math.min(
                    Math.floor(
                      ((user.followers || 0) + (user.following || 0)) / 20
                    ),
                    5
                  )}
                  .0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
