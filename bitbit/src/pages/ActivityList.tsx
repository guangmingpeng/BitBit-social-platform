import { type FC, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Breadcrumb, Button, ActivityCard } from "@/components/ui";
import { useNavigationFilters } from "@/shared/hooks/useNavigationStore";

const ActivityList: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { activityFilters, setActivityFilters } = useNavigationFilters();

  const [searchTerm, setSearchTerm] = useState(
    activityFilters.searchTerm || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    activityFilters.category || ""
  );
  const [sortBy, setSortBy] = useState(activityFilters.sortBy || "");

  // 获取URL中的分类参数
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
      setActivityFilters({ category: categoryFromUrl });
    }
  }, [searchParams, selectedCategory, setActivityFilters]);

  // 处理筛选条件变化
  useEffect(() => {
    setActivityFilters({
      searchTerm,
      category: selectedCategory,
      sortBy,
    });
  }, [searchTerm, selectedCategory, sortBy, setActivityFilters]);

  // 模拟活动数据
  const activities = [
    {
      id: "1",
      title: "周末徒步活动",
      description: "享受自然风光，结识新朋友",
      category: "learning" as const,
      date: "8月25日",
      time: "09:00-17:00",
      location: "香山公园",
      currentParticipants: 12,
      maxParticipants: 20,
      organizer: {
        name: "户外俱乐部",
        avatar: "https://picsum.photos/40/40?random=5",
      },
      images: ["https://picsum.photos/300/200?random=hiking"],
      price: 0,
      isFree: true,
    },
    {
      id: "2",
      title: "音乐分享会",
      description: "来分享你喜欢的音乐",
      category: "music" as const,
      date: "8月26日",
      time: "19:00-21:00",
      location: "咖啡厅",
      currentParticipants: 8,
      maxParticipants: 15,
      organizer: {
        name: "音乐爱好者",
        avatar: "https://picsum.photos/40/40?random=6",
      },
      images: ["https://picsum.photos/300/200?random=music"],
      price: 25,
    },
    // 可以添加更多活动数据
  ];

  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "活动", current: true },
  ];

  return (
    <Container size="lg" className="py-6 space-y-6">
      {/* 面包屑导航 */}
      <div className="flex items-center justify-between">
        <Breadcrumb items={breadcrumbItems} />
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          返回首页
        </Button>
      </div>

      <h1 className="text-3xl font-bold text-text-primary">活动列表</h1>

      {/* 筛选器 */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="搜索活动..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm px-3 py-2 border focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm px-3 py-2 border focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          >
            <option value="">全部类型</option>
            <option value="运动">运动</option>
            <option value="艺术">艺术</option>
            <option value="美食">美食</option>
            <option value="学习">学习</option>
            <option value="心理">心理</option>
            <option value="户外">户外</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm px-3 py-2 border focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          >
            <option value="">默认排序</option>
            <option value="date">按时间排序</option>
            <option value="popularity">按热度排序</option>
            <option value="price">按价格排序</option>
          </select>
        </div>
        {(searchTerm || selectedCategory || sortBy) && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-text-secondary">筛选条件:</span>
            {selectedCategory && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-700">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("")}
                  className="ml-1 hover:text-primary-900"
                >
                  ×
                </button>
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setSortBy("");
              }}
              className="text-text-secondary hover:text-text-primary"
            >
              清除全部
            </Button>
          </div>
        )}
      </div>

      {/* 活动列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              {...activity}
              onClick={() => navigate(`/activities/${activity.id}`)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-text-primary mb-2">
              没有找到符合条件的活动
            </h3>
            <p className="text-text-secondary">
              试试调整筛选条件或{" "}
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setSortBy("");
                }}
                className="text-primary-500 hover:text-primary-600"
              >
                清除筛选
              </button>
            </p>
          </div>
        )}
      </div>

      {/* 分页器 */}
      {activities.length > 0 && (
        <div className="flex justify-center">
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
      )}
    </Container>
  );
};

export default ActivityList;
