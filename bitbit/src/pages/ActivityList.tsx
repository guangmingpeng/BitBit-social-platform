import { type FC, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Breadcrumb, Button } from "@/components/ui";
import { ActivityCard } from "@/features/activities";
import {
  getAllActivities,
  searchActivities,
  getActivitiesByCategory,
} from "@/shared/data/activities";
import { useNavigationFilters } from "@/shared/hooks/useNavigationStore";
import { useSmartNavigation } from "@/shared/hooks/useSmartNavigation";
import {
  AVAILABLE_CATEGORIES,
  getCategoryChineseName,
} from "@/shared/constants/categories";

const ActivityList: FC = () => {
  const navigate = useNavigate();
  const { navigateWithSource } = useSmartNavigation();
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

  // 清除所有筛选条件的函数
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortBy("");
    setActivityFilters({
      searchTerm: "",
      category: "",
      sortBy: "",
    });
    // 清除URL参数
    navigate("/activities", { replace: true });
  };

  // 清除单个分类筛选条件的函数
  const clearCategoryFilter = () => {
    setSelectedCategory("");
    setActivityFilters({
      searchTerm,
      category: "",
      sortBy,
    });
    // 如果URL中有分类参数，也要清除
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.has("category")) {
      currentParams.delete("category");
      const newUrl = currentParams.toString()
        ? `/activities?${currentParams.toString()}`
        : "/activities";
      navigate(newUrl, { replace: true });
    }
  };

  // 获取活动数据
  const getFilteredActivities = () => {
    let activities = getAllActivities();

    // 应用分类筛选
    if (selectedCategory) {
      activities = getActivitiesByCategory(selectedCategory);
    }

    // 应用搜索
    if (searchTerm) {
      activities = searchActivities(searchTerm);
    }

    return activities;
  };

  const activities = getFilteredActivities();

  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "活动", current: true },
  ];

  return (
    <Container size="lg" className="py-6 space-y-6">
      {/* 面包屑导航 */}
      <div className="flex items-center justify-between">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate("/publish-activity")}
            className="flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            创建活动
          </Button>
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
            {AVAILABLE_CATEGORIES.map((category) => (
              <option key={category.id} value={category.nameEn}>
                {category.nameZh}
              </option>
            ))}
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
                {getCategoryChineseName(selectedCategory)}
                <button
                  onClick={clearCategoryFilter}
                  className="ml-1 hover:text-primary-900"
                >
                  ×
                </button>
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
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
              layout="horizontal"
              onClick={() =>
                navigateWithSource("activities")(`/activities/${activity.id}`)
              }
              onJoin={() =>
                navigateWithSource("activities")(
                  `/activities/${activity.id}/register`
                )
              }
              onViewDetail={() =>
                navigateWithSource("activities")(`/activities/${activity.id}`)
              }
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
                onClick={clearAllFilters}
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
