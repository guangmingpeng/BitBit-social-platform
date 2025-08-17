import { type FC } from "react";

const Community: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">社区</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧边栏 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">社区分类</h2>
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-blue-600">全部话题</li>
              <li className="cursor-pointer hover:text-blue-600">活动讨论</li>
              <li className="cursor-pointer hover:text-blue-600">经验分享</li>
              <li className="cursor-pointer hover:text-blue-600">求助问答</li>
              <li className="cursor-pointer hover:text-blue-600">闲聊灌水</li>
            </ul>
          </div>
        </div>

        {/* 主内容区 */}
        <div className="lg:col-span-2">
          {/* 发帖按钮 */}
          <div className="mb-6">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              发布新帖子
            </button>
          </div>

          {/* 帖子列表 */}
          <div className="space-y-6">{/* 帖子卡片将在这里渲染 */}</div>

          {/* 分页器 */}
          <div className="mt-8 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                上一页
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                下一页
              </button>
            </nav>
          </div>
        </div>

        {/* 右侧边栏 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">热门话题</h2>
            <ul className="space-y-2">{/* 热门话题列表将在这里渲染 */}</ul>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">活跃用户</h2>
            <ul className="space-y-4">{/* 活跃用户列表将在这里渲染 */}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
