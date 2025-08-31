import React from "react";
import UserCardPopover from "@/shared/components/UserCardPopover";
import type { UserInfo } from "@/shared/components/UserCardPopover";

const UserCardPopoverDemo: React.FC = () => {
  // 示例用户数据
  const sampleUser: UserInfo = {
    id: "1",
    name: "张小明",
    fullName: "张小明",
    avatar: undefined,
    color: "#4E6FFF",
    age: 25,
    profession: "产品设计师",
    location: "上海",
    bio: "热爱设计与创新，专注于用户体验设计，喜欢探索新的设计理念和技术。在业余时间喜欢摄影、阅读和旅行。",
    activitiesCount: 12,
    organizedCount: 3,
    postsCount: 28,
    followersCount: 156,
    followingCount: 89,
    tags: ["UI设计", "摄影", "旅行", "阅读", "咖啡"],
    isFollowed: false,
    isOrganizer: true,
    isOnline: true,
    joinDate: "2023年6月",
  };

  const handleFollow = (userId: string) => {
    console.log("关注用户:", userId);
  };

  const handleMessage = (userId: string) => {
    console.log("发送私信给用户:", userId);
  };

  const handleViewProfile = (userId: string) => {
    console.log("查看用户资料:", userId);
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-title-2 text-text-primary mb-6">
        UserCardPopover 组件演示
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {/* 右侧弹出 */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-subtitle text-text-primary">右侧弹出</h3>
          <UserCardPopover
            user={sampleUser}
            placement="right"
            onFollow={handleFollow}
            onMessage={handleMessage}
            onViewProfile={handleViewProfile}
          >
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-primary-600 transition-colors">
              张
            </div>
          </UserCardPopover>
        </div>

        {/* 左侧弹出 */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-subtitle text-text-primary">左侧弹出</h3>
          <UserCardPopover
            user={sampleUser}
            placement="left"
            onFollow={handleFollow}
            onMessage={handleMessage}
            onViewProfile={handleViewProfile}
          >
            <div className="w-12 h-12 bg-coral-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-coral-600 transition-colors">
              张
            </div>
          </UserCardPopover>
        </div>

        {/* 顶部弹出 */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-subtitle text-text-primary">顶部弹出</h3>
          <UserCardPopover
            user={sampleUser}
            placement="top"
            onFollow={handleFollow}
            onMessage={handleMessage}
            onViewProfile={handleViewProfile}
          >
            <div className="w-12 h-12 bg-mint-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-mint-600 transition-colors">
              张
            </div>
          </UserCardPopover>
        </div>

        {/* 底部弹出 */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-subtitle text-text-primary">底部弹出</h3>
          <UserCardPopover
            user={sampleUser}
            placement="bottom"
            onFollow={handleFollow}
            onMessage={handleMessage}
            onViewProfile={handleViewProfile}
          >
            <div className="w-12 h-12 bg-sunflower-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-sunflower-600 transition-colors">
              张
            </div>
          </UserCardPopover>
        </div>

        {/* 有头像的用户 */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-subtitle text-text-primary">有头像</h3>
          <UserCardPopover
            user={{
              ...sampleUser,
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
              name: "李小美",
              isFollowed: true,
              isOnline: false,
            }}
            placement="right"
            onFollow={handleFollow}
            onMessage={handleMessage}
            onViewProfile={handleViewProfile}
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              alt="李小美"
              className="w-12 h-12 rounded-full cursor-pointer hover:scale-105 transition-transform"
            />
          </UserCardPopover>
        </div>

        {/* 无操作按钮 */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-subtitle text-text-primary">无操作按钮</h3>
          <UserCardPopover
            user={sampleUser}
            placement="right"
            showActions={false}
          >
            <div className="w-12 h-12 bg-lavender-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-lavender-600 transition-colors">
              张
            </div>
          </UserCardPopover>
        </div>
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-title-3 text-text-primary mb-4">使用说明</h3>
        <ul className="text-body text-text-secondary space-y-2">
          <li>• 鼠标悬停在头像上即可显示用户卡片</li>
          <li>• 支持四个方向的弹出位置：top、bottom、left、right</li>
          <li>• 自动避免超出屏幕边界</li>
          <li>• 支持显示/隐藏操作按钮</li>
          <li>• 优雅的进入和退出动画</li>
          <li>• 响应式设计，适配不同屏幕尺寸</li>
        </ul>
      </div>
    </div>
  );
};

export default UserCardPopoverDemo;
