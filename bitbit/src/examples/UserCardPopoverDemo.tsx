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
      <div className="text-center mb-8">
        <h1 className="text-title-1 text-text-primary mb-3">
          🎉 UserCardPopover 组件演示
        </h1>
        <p className="text-subtitle text-text-secondary">
          优化后的用户卡片弹窗 - 更好的布局、更清晰的操作层次
        </p>
        <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-caption font-medium">
          ✨ 按钮层次优化 · 关注按钮突出 · 主页按钮高亮 · 标准Button规格
        </div>
      </div>

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
          <h3 className="text-subtitle text-text-primary">有头像用户</h3>
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

        {/* 已关注状态 */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-subtitle text-text-primary">已关注状态</h3>
          <UserCardPopover
            user={{
              ...sampleUser,
              name: "王开发",
              isFollowed: true,
              profession: "前端工程师",
            }}
            placement="right"
            onFollow={handleFollow}
            onMessage={handleMessage}
            onViewProfile={handleViewProfile}
          >
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:bg-purple-600 transition-colors">
              王
            </div>
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
        <h3 className="text-title-3 text-text-primary mb-4">✨ UI 优化亮点</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-subtitle text-text-primary mb-3 font-semibold">
              📍 布局优化
            </h4>
            <ul className="text-body text-text-secondary space-y-2">
              <li>
                • <strong>关注按钮位置优化</strong>
                ：移至用户名右侧，作为主要社交操作
              </li>
              <li>
                • <strong>避免挤压</strong>：用户名和关注按钮采用
                justify-between 布局
              </li>
              <li>
                • <strong>视觉层次清晰</strong>
                ：主要操作（关注）和次要操作（查看主页、私信）分离
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-subtitle text-text-primary mb-3 font-semibold">
              🎨 按钮设计优化
            </h4>
            <ul className="text-body text-text-secondary space-y-2">
              <li>
                • <strong>关注按钮</strong>：使用 Primary 变体，最高优先级
              </li>
              <li>
                • <strong>查看主页</strong>：使用 Secondary 变体，默认高亮显示
              </li>
              <li>
                • <strong>发私信</strong>：使用 Outline 变体，作为次要操作
              </li>
              <li>
                • <strong>标准规格</strong>：复用 Button 组件的尺寸和样式规范
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-primary-500">
          <h4 className="text-subtitle text-primary-600 mb-2 font-semibold">
            🎯 按钮层次设计原则
          </h4>
          <div className="text-body text-text-secondary leading-relaxed space-y-2">
            <p>
              <strong>三级按钮层次</strong>：根据用户行为重要性分配视觉权重
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <div className="p-3 bg-white rounded border-l-4 border-primary-500">
                <div className="font-semibold text-primary-600 text-sm">
                  PRIMARY
                </div>
                <div className="text-xs text-text-secondary">
                  关注 - 最重要的社交操作
                </div>
              </div>
              <div className="p-3 bg-white rounded border-l-4 border-gray-400">
                <div className="font-semibold text-gray-600 text-sm">
                  SECONDARY
                </div>
                <div className="text-xs text-text-secondary">
                  查看主页 - 常用导航操作
                </div>
              </div>
              <div className="p-3 bg-white rounded border-l-4 border-gray-300">
                <div className="font-semibold text-gray-500 text-sm">
                  OUTLINE
                </div>
                <div className="text-xs text-text-secondary">
                  发私信 - 次要交互操作
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
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
