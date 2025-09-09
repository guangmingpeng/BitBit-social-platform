/**
 * 用户个人页面测试页面
 * 用于测试用户点击跳转到个人页面的功能
 */
import React from "react";
import { useUserNavigation } from "@/shared/utils/userNavigation";
import { UserCard } from "@/components/ui/cards";
import { UserCardPopover } from "@/shared/components";
import type { User } from "@/components/ui/cards/UserCard/types";
import type { UserInfo } from "@/shared/components/UserCardPopover";

// 模拟用户数据
const mockUsers: User[] = [
  {
    id: "user-1",
    username: "张小明",
    name: "张小明",
    email: "zhang@example.com",
    avatar: "https://picsum.photos/100/100?random=1",
    bio: "前端开发工程师，热爱技术分享和开源项目",
    profession: "前端工程师",
    age: 28,
    location: "北京",
    interests: ["编程", "音乐", "旅行", "摄影", "阅读"],
    isOnline: true,
    level: 15,
    following: 120,
    followers: 85,
    joinedDate: "2024年1月",
    activitiesCount: 24,
    stats: {
      totalPosts: 45,
      totalExchanges: 8,
    },
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "user-2",
    username: "李美丽",
    name: "李美丽",
    email: "li@example.com",
    avatar: "https://picsum.photos/100/100?random=2",
    bio: "设计师，喜欢摄影和美食分享",
    profession: "UI设计师",
    age: 25,
    location: "上海",
    interests: ["设计", "摄影", "美食", "旅行"],
    isOnline: false,
    level: 12,
    following: 95,
    followers: 120,
    joinedDate: "2024年3月",
    activitiesCount: 18,
    stats: {
      totalPosts: 32,
      totalExchanges: 5,
    },
    createdAt: "2024-03-10T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "current_user",
    username: "当前用户",
    name: "当前用户",
    email: "current@example.com",
    avatar: "https://picsum.photos/100/100?random=3",
    bio: "这是当前登录的用户，点击应该跳转到个人中心",
    profession: "产品经理",
    age: 30,
    location: "深圳",
    interests: ["产品设计", "用户体验", "数据分析"],
    isOnline: true,
    level: 20,
    following: 150,
    followers: 200,
    joinedDate: "2023年8月",
    activitiesCount: 35,
    stats: {
      totalPosts: 68,
      totalExchanges: 12,
    },
    createdAt: "2023-08-15T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
  },
];

const UserNavigationTest: React.FC = () => {
  const userNavigation = useUserNavigation();

  // 转换User到UserInfo
  const convertToUserInfo = (user: User): UserInfo => ({
    id: user.id,
    name: user.name || user.username,
    fullName: user.name,
    avatar: user.avatar,
    age: user.age,
    profession: user.profession,
    location: user.location,
    bio: user.bio,
    activitiesCount: user.activitiesCount,
    postsCount: user.stats?.totalPosts,
    followersCount: user.followers,
    followingCount: user.following,
    isOnline: user.isOnline,
    joinDate: user.joinedDate,
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            用户导航功能测试
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            测试用户卡片点击跳转到用户个人页面的功能。点击用户卡片或用户头像查看效果。
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-blue-800 font-medium mb-2">功能说明：</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• 点击其他用户卡片：跳转到 /user/[userId] 页面</li>
              <li>• 点击当前用户卡片：跳转到 /profile 页面</li>
              <li>• 支持悬停弹出卡片，点击"查看资料"按钮同样跳转</li>
              <li>• 智能识别当前用户，自动选择合适的跳转路径</li>
            </ul>
          </div>
        </div>

        {/* UserCard 测试 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            UserCard 组件测试
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                layout="vertical"
                showActions={true}
                showStats={true}
                onClick={() => userNavigation.smartNavigateToUser(user.id)}
                onFollow={(isFollowing) =>
                  console.log(isFollowing ? "取消关注" : "关注", user.name)
                }
                onMessage={() => console.log("发送消息给", user.name)}
              />
            ))}
          </div>
        </div>

        {/* UserCardPopover 测试 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            UserCardPopover 组件测试
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockUsers.map((user) => (
              <div
                key={`popover-${user.id}`}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-medium mb-4">
                  {user.name}的悬停卡片
                </h3>
                <UserCardPopover
                  user={convertToUserInfo(user)}
                  placement="top"
                  onFollow={(userId) => console.log("关注用户", userId)}
                  onMessage={(userId) => console.log("发送私信", userId)}
                  onViewProfile={(userId) =>
                    userNavigation.smartNavigateToUser(userId)
                  }
                >
                  <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                    <img
                      src={
                        user.avatar ||
                        "https://picsum.photos/40/40?random=default"
                      }
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">悬停查看详情</div>
                    </div>
                  </div>
                </UserCardPopover>
              </div>
            ))}
          </div>
        </div>

        {/* 直接按钮测试 */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            直接导航按钮测试
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockUsers.map((user) => (
              <div
                key={`button-${user.id}`}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={
                      user.avatar ||
                      "https://picsum.photos/32/32?random=default"
                    }
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => userNavigation.smartNavigateToUser(user.id)}
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    智能跳转
                  </button>
                  <button
                    onClick={() =>
                      userNavigation.navigateToUserProfile(
                        user.id,
                        "activities"
                      )
                    }
                    className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                  >
                    查看活动
                  </button>
                  <button
                    onClick={() =>
                      userNavigation.navigateToUserProfile(user.id, "posts")
                    }
                    className="w-full px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
                  >
                    查看帖子
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavigationTest;
