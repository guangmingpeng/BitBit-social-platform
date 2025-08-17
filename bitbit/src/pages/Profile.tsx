import { type FC } from "react";

const Profile: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 个人资料卡片 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="h-32 bg-blue-600"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white -mt-12"></div>
              <h1 className="text-2xl font-bold mt-4">用户名</h1>
              <p className="text-gray-600 mt-1">这个人很懒，什么都没写...</p>
            </div>
            <button className="absolute top-4 right-4 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              编辑资料
            </button>
          </div>
        </div>

        {/* 选项卡 */}
        <div className="mb-6">
          <div className="border-b">
            <nav className="-mb-px flex">
              <button className="px-6 py-2 border-b-2 border-blue-600 text-blue-600">
                我的活动
              </button>
              <button className="px-6 py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                我的帖子
              </button>
              <button className="px-6 py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                二手交易
              </button>
            </nav>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="bg-white rounded-lg shadow">
          {/* 我的活动列表 */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">已报名的活动</h2>
              <select className="rounded-md border-gray-300 shadow-sm">
                <option value="all">全部活动</option>
                <option value="upcoming">即将开始</option>
                <option value="past">已结束</option>
              </select>
            </div>
            <div className="space-y-4">{/* 活动列表将在这里渲染 */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
