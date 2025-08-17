import { type FC } from "react";
import { useParams } from "react-router-dom";

const ActivityDetail: FC = () => {
  const { id } = useParams<{ id: string }>();

  // TODO: 使用 id 获取活动详情
  console.log("Activity ID:", id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* 活动封面图 */}
        <div className="h-64 bg-gray-200">{/* 图片将在这里显示 */}</div>

        {/* 活动信息 */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">活动标题</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <span className="mr-2">时间：</span>
              <span>2025-08-20 14:00</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-2">地点：</span>
              <span>活动地点</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-2">参与人数：</span>
              <span>0/50</span>
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            <h2 className="text-xl font-semibold mb-2">活动详情</h2>
            <p>活动详细描述将在这里显示...</p>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              报名参加
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              分享活动
            </button>
          </div>
        </div>

        {/* 评论区 */}
        <div className="border-t mt-8 p-6">
          <h2 className="text-xl font-semibold mb-4">评论</h2>
          {/* 评论列表将在这里显示 */}
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
