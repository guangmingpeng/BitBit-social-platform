// UserCardPopover 使用示例

import { UserCardPopover, type UserInfo } from "@/shared/components";

// 示例用户数据
const exampleUser: UserInfo = {
  id: "user-123",
  name: "张三",
  fullName: "张三丰",
  avatar: "https://picsum.photos/64/64?random=1",
  color: "#3B82F6",
  age: 28,
  profession: "前端工程师",
  location: "北京",
  bio: "热爱编程，喜欢学习新技术。目前专注于React和TypeScript开发。",
  activitiesCount: 15,
  organizedCount: 3,
  postsCount: 42,
  followersCount: 128,
  followingCount: 95,
  tags: ["React", "TypeScript", "前端开发", "开源"],
  isFollowed: false,
  isOnline: true,
  joinDate: "2023年1月",
};

// 基础使用示例
export const BasicExample = () => {
  const handleFollow = (userId: string) => {
    console.log("关注用户:", userId);
  };

  const handleMessage = (userId: string) => {
    console.log("发送私信:", userId);
  };

  const handleViewProfile = (userId: string) => {
    console.log("查看资料:", userId);
  };

  return (
    <div className="p-4">
      <h3 className="mb-4">悬浮在头像上查看详细信息：</h3>

      <UserCardPopover
        user={exampleUser}
        placement="right"
        onFollow={handleFollow}
        onMessage={handleMessage}
        onViewProfile={handleViewProfile}
      >
        <div className="inline-flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
          <img
            src={exampleUser.avatar}
            alt={exampleUser.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-medium">{exampleUser.name}</div>
            <div className="text-sm text-gray-500">
              {exampleUser.profession}
            </div>
          </div>
        </div>
      </UserCardPopover>
    </div>
  );
};

// 列表中使用示例
export const ListExample = () => {
  const users = [exampleUser /* 更多用户... */];

  return (
    <div className="p-4">
      <h3 className="mb-4">用户列表：</h3>
      <div className="space-y-2">
        {users.map((user) => (
          <UserCardPopover key={user.id} user={user} placement="right">
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-500">
                  {user.profession} · {user.location}
                </div>
              </div>
              {user.isOnline && (
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              )}
            </div>
          </UserCardPopover>
        ))}
      </div>
    </div>
  );
};

// 不同位置示例
export const PlacementExample = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="text-center">
          <h4 className="mb-4">向右弹出</h4>
          <UserCardPopover user={exampleUser} placement="right">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Hover me (Right)
            </button>
          </UserCardPopover>
        </div>

        <div className="text-center">
          <h4 className="mb-4">向左弹出</h4>
          <UserCardPopover user={exampleUser} placement="left">
            <button className="px-4 py-2 bg-green-500 text-white rounded">
              Hover me (Left)
            </button>
          </UserCardPopover>
        </div>

        <div className="text-center">
          <h4 className="mb-4">向上弹出</h4>
          <UserCardPopover user={exampleUser} placement="top">
            <button className="px-4 py-2 bg-red-500 text-white rounded">
              Hover me (Top)
            </button>
          </UserCardPopover>
        </div>

        <div className="text-center">
          <h4 className="mb-4">向下弹出</h4>
          <UserCardPopover user={exampleUser} placement="bottom">
            <button className="px-4 py-2 bg-purple-500 text-white rounded">
              Hover me (Bottom)
            </button>
          </UserCardPopover>
        </div>
      </div>
    </div>
  );
};

// 自定义样式示例
export const CustomExample = () => {
  return (
    <div className="p-4">
      <h3 className="mb-4">自定义触发元素：</h3>

      <UserCardPopover
        user={exampleUser}
        placement="bottom"
        showActions={false} // 不显示操作按钮
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full cursor-pointer hover:shadow-lg transition-shadow">
          <span className="text-sm font-medium">@{exampleUser.name}</span>
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xs">👤</span>
          </div>
        </div>
      </UserCardPopover>
    </div>
  );
};
