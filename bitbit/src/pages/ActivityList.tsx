import { type FC } from "react";
const ActivityList: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">活动列表</h1>

      {/* 筛选器 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="搜索活动..."
            className="rounded-md border-gray-300 shadow-sm"
          />
          <select className="rounded-md border-gray-300 shadow-sm">
            <option value="">全部类型</option>
            <option value="sports">运动</option>
            <option value="culture">文化</option>
            <option value="tech">科技</option>
          </select>
          <select className="rounded-md border-gray-300 shadow-sm">
            <option value="">全部状态</option>
            <option value="upcoming">即将开始</option>
            <option value="ongoing">进行中</option>
            <option value="ended">已结束</option>
          </select>
        </div>
      </div>

      {/* 活动列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 活动卡片将在这里渲染 */}
      </div>

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
  );
};

export default ActivityList;
