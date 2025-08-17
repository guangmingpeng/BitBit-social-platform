import { type FC } from "react";

const Exchange: FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">二手交换</h1>

      {/* 筛选和搜索 */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="搜索商品..."
            className="rounded-md border-gray-300 shadow-sm"
          />
          <select className="rounded-md border-gray-300 shadow-sm">
            <option value="">全部分类</option>
            <option value="books">图书</option>
            <option value="electronics">电子产品</option>
            <option value="clothing">服装</option>
            <option value="others">其他</option>
          </select>
          <select className="rounded-md border-gray-300 shadow-sm">
            <option value="">价格排序</option>
            <option value="asc">价格从低到高</option>
            <option value="desc">价格从高到低</option>
          </select>
        </div>
      </div>

      {/* 发布按钮 */}
      <div className="mb-6">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          发布商品
        </button>
      </div>

      {/* 商品列表 */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* 商品卡片将在这里渲染 */}
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

export default Exchange;
