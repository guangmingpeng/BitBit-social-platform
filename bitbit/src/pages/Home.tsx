import { type FC } from 'react';

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">欢迎来到 BitBit</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 活动推荐 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">热门活动</h2>
            <div className="space-y-4">
              {/* 活动卡片将在这里渲染 */}
            </div>
          </div>

          {/* 二手交易 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">最新商品</h2>
            <div className="space-y-4">
              {/* 商品卡片将在这里渲染 */}
            </div>
          </div>

          {/* 社区动态 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">社区动态</h2>
            <div className="space-y-4">
              {/* 社区帖子将在这里渲染 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
