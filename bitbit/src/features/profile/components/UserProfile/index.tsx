import React from "react";
import type { User } from "../../types";

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
            <p className="text-gray-600 mb-4">
              {user.bio || "热爱音乐和摄影的技术爱好者"}
            </p>

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
