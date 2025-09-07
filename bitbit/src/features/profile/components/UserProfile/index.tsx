import React from "react";
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
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">个人中心</h1>
        <div className="flex items-center gap-3">
          <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-lg">🔔</span>
          </button>
          <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-lg">⚙️</span>
          </button>
        </div>
      </div>

      {/* 用户信息区域 */}
      <div className="p-6">
        <div className="flex items-start gap-6">
          {/* 头像 */}
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-2xl font-medium">
                  {user.name?.slice(0, 2) || "U"}
                </span>
              )}
            </div>
            {/* 在线状态指示器 */}
            {user.isOnline && (
              <div className="absolute -bottom-1 -right-1">
                <div className="w-6 h-6 bg-green-500 rounded-full border-3 border-white"></div>
              </div>
            )}
          </div>

          {/* 用户信息 */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                {user.name}
              </h2>
              <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                Lv.{user.level}
              </div>
            </div>

            {/* 扩展的用户信息 - 与 UserCard 保持一致 */}
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
                <span>加入于 {user.joinedDate}</span>
              </div>
            </div>

            {/* 个人简介 */}
            <p className="text-gray-600 mb-4">
              {user.bio || "热爱音乐和摄影的技术爱好者"}
            </p>

            {/* 兴趣标签 - 与 UserCard 保持一致 */}
            {user.interests && user.interests.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
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

            <button
              onClick={onEditProfile}
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors font-medium"
            >
              编辑资料
            </button>
          </div>

          {/* 关注数据 */}
          <div className="flex gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-xl min-w-[100px]">
              <div className="text-2xl font-semibold text-gray-900">
                {user.following}
              </div>
              <div className="text-sm text-gray-600">关注</div>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded-xl min-w-[100px]">
              <div className="text-2xl font-semibold text-gray-900">
                {user.followers}
              </div>
              <div className="text-sm text-gray-600">粉丝</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
