import React from "react";
import { UserCardPopover } from "@/shared/components";
import type { UserInfo } from "@/shared/components/UserCardPopover";

const TestUser: UserInfo = {
  id: "test-user",
  name: "张小明这是一个很长的用户名测试",
  fullName: "张小明全名测试这也是一个很长的名称",
  avatar: "https://picsum.photos/64/64?random=1",
  age: 28,
  profession: "前端开发工程师这是一个很长的职业描述",
  location: "北京市朝阳区这是一个很长的地址信息",
  bio: "这是一段很长的个人简介，用来测试文本截断功能。我是一名前端开发工程师，热爱技术分享，擅长React、Vue、JavaScript等前端技术栈，同时对UI/UX设计也有浓厚的兴趣。我经常参与开源项目的开发，也会在技术博客上分享自己的学习心得和项目经验。",
  activitiesCount: 42,
  organizedCount: 8,
  postsCount: 156,
  followersCount: 1234,
  followingCount: 567,
  tags: [
    "前端开发",
    "React",
    "Vue.js",
    "JavaScript",
    "TypeScript",
    "UI设计",
    "开源",
    "技术分享",
  ],
  isFollowed: false,
  isOrganizer: true,
  isOnline: true,
  joinDate: "2024年1月",
};

export const UserCardTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">UserCardPopover 测试页面</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 测试不同位置的卡片 */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">右侧弹出</h2>
            <UserCardPopover
              user={TestUser}
              placement="right"
              onFollow={(userId) => console.log("关注", userId)}
              onMessage={(userId) => console.log("私信", userId)}
              onViewProfile={(userId) => console.log("查看资料", userId)}
            >
              <div className="p-3 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors">
                悬停查看用户卡片 (右侧)
              </div>
            </UserCardPopover>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">左侧弹出</h2>
            <UserCardPopover
              user={{ ...TestUser, name: "左侧测试用户" }}
              placement="left"
              onFollow={(userId) => console.log("关注", userId)}
              onMessage={(userId) => console.log("私信", userId)}
              onViewProfile={(userId) => console.log("查看资料", userId)}
            >
              <div className="p-3 bg-green-100 rounded-lg cursor-pointer hover:bg-green-200 transition-colors">
                悬停查看用户卡片 (左侧)
              </div>
            </UserCardPopover>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">顶部弹出</h2>
            <UserCardPopover
              user={{ ...TestUser, name: "顶部测试用户", isFollowed: true }}
              placement="top"
              onFollow={(userId) => console.log("关注", userId)}
              onMessage={(userId) => console.log("私信", userId)}
              onViewProfile={(userId) => console.log("查看资料", userId)}
            >
              <div className="p-3 bg-purple-100 rounded-lg cursor-pointer hover:bg-purple-200 transition-colors">
                悬停查看用户卡片 (顶部)
              </div>
            </UserCardPopover>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">底部弹出</h2>
            <UserCardPopover
              user={{ ...TestUser, name: "底部测试用户", bio: "简短介绍" }}
              placement="bottom"
              onFollow={(userId) => console.log("关注", userId)}
              onMessage={(userId) => console.log("私信", userId)}
              onViewProfile={(userId) => console.log("查看资料", userId)}
            >
              <div className="p-3 bg-yellow-100 rounded-lg cursor-pointer hover:bg-yellow-200 transition-colors">
                悬停查看用户卡片 (底部)
              </div>
            </UserCardPopover>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">无操作按钮</h2>
            <UserCardPopover
              user={{ ...TestUser, name: "无按钮用户" }}
              placement="right"
              showActions={false}
            >
              <div className="p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                悬停查看用户卡片 (无按钮)
              </div>
            </UserCardPopover>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">简单用户信息</h2>
            <UserCardPopover
              user={{
                id: "simple-user",
                name: "简单用户",
                avatar: "https://picsum.photos/64/64?random=2",
                bio: "简单的个人介绍",
                postsCount: 10,
                followersCount: 50,
                isOnline: false,
              }}
              placement="right"
              onFollow={(userId) => console.log("关注", userId)}
              onViewProfile={(userId) => console.log("查看资料", userId)}
            >
              <div className="p-3 bg-indigo-100 rounded-lg cursor-pointer hover:bg-indigo-200 transition-colors">
                悬停查看用户卡片 (简单信息)
              </div>
            </UserCardPopover>
          </div>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">修改说明</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              ✅ <strong>固定卡片尺寸：</strong>
              卡片现在有固定的宽度(340px)和高度(420px)
            </p>
            <p>
              ✅ <strong>文本截断处理：</strong>
              长文本会自动截断并显示省略号，鼠标悬停显示完整内容
            </p>
            <p>
              ✅ <strong>布局优化：</strong>
              使用flex布局，确保按钮固定在底部，内容区域可滚动
            </p>
            <p>
              ✅ <strong>视觉优化：</strong>
              减少内边距，优化字体大小，提高信息密度
            </p>
            <p>
              ✅ <strong>动画改进：</strong>添加了更流畅的进入和退出动画
            </p>
            <p>
              ✅ <strong>响应式适配：</strong>
              确保卡片在不同屏幕尺寸下都不会超出边界
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCardTest;
