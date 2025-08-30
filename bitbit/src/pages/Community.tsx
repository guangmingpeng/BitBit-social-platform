import { type FC, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Breadcrumb, Button } from "@/components/ui";
import PostCard from "@/features/community/components/PostCard";
import { useNavigationFilters } from "@/shared/hooks/useNavigationStore";
import { useSmartNavigation } from "@/shared/hooks/useSmartNavigation";

const Community: FC = () => {
  const navigate = useNavigate();
  const { navigateWithSource } = useSmartNavigation();
  const [searchParams] = useSearchParams();
  const { communityFilters, setCommunityFilters } = useNavigationFilters();

  const [searchTerm, setSearchTerm] = useState(
    communityFilters.searchTerm || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    communityFilters.category || ""
  );
  const [sortBy, setSortBy] = useState(communityFilters.sortBy || "latest");

  // 获取URL中的分类参数
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
      setCommunityFilters({ category: categoryFromUrl });
    }
  }, [searchParams, selectedCategory, setCommunityFilters]);

  // 处理筛选条件变化
  useEffect(() => {
    setCommunityFilters({
      searchTerm,
      category: selectedCategory,
      sortBy,
    });
  }, [searchTerm, selectedCategory, sortBy, setCommunityFilters]);

  // 模拟社区数据
  const communityPosts = [
    {
      id: "1",
      author: {
        name: "摄影爱好者小李",
        avatar: "https://picsum.photos/40/40?random=7",
        isVerified: true,
      },
      content:
        "今天参加了一个很棒的摄影活动，学到了很多技巧！大家有没有推荐的摄影课程？想继续提升自己的技能。",
      images: [
        "https://picsum.photos/400/300?random=photo1",
        "https://picsum.photos/400/300?random=photo2",
      ],
      category: "learning" as const,
      publishTime: "1小时前",
      likes: 24,
      comments: 12,
      shares: 3,
      isLiked: false,
    },
    {
      id: "2",
      author: {
        name: "美食达人",
        avatar: "https://picsum.photos/40/40?random=8",
        isVerified: false,
      },
      content:
        "分享一下昨天做的意大利面，味道超棒！有兴趣的朋友可以一起来学习制作～",
      images: ["https://picsum.photos/400/300?random=pasta"],
      category: "food" as const,
      publishTime: "3小时前",
      likes: 18,
      comments: 8,
      shares: 5,
      isLiked: true,
    },
  ];

  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "社区", current: true },
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

      <h1 className="text-3xl font-bold text-text-primary">社区</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 左侧边栏 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">社区分类</h2>
            <ul className="space-y-2">
              <li
                className={`cursor-pointer hover:text-primary-600 p-2 rounded ${
                  selectedCategory === ""
                    ? "bg-primary-50 text-primary-600"
                    : ""
                }`}
                onClick={() => setSelectedCategory("")}
              >
                全部话题
              </li>
              <li
                className={`cursor-pointer hover:text-primary-600 p-2 rounded ${
                  selectedCategory === "learning"
                    ? "bg-primary-50 text-primary-600"
                    : ""
                }`}
                onClick={() => setSelectedCategory("learning")}
              >
                学习分享
              </li>
              <li
                className={`cursor-pointer hover:text-primary-600 p-2 rounded ${
                  selectedCategory === "food"
                    ? "bg-primary-50 text-primary-600"
                    : ""
                }`}
                onClick={() => setSelectedCategory("food")}
              >
                美食交流
              </li>
              <li
                className={`cursor-pointer hover:text-primary-600 p-2 rounded ${
                  selectedCategory === "music"
                    ? "bg-primary-50 text-primary-600"
                    : ""
                }`}
                onClick={() => setSelectedCategory("music")}
              >
                音乐讨论
              </li>
              <li
                className={`cursor-pointer hover:text-primary-600 p-2 rounded ${
                  selectedCategory === "reading"
                    ? "bg-primary-50 text-primary-600"
                    : ""
                }`}
                onClick={() => setSelectedCategory("reading")}
              >
                读书心得
              </li>
            </ul>
          </div>

          {/* 筛选和排序 */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold mb-3">排序方式</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 border focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            >
              <option value="latest">最新发布</option>
              <option value="popular">最多点赞</option>
              <option value="comments">最多评论</option>
            </select>
          </div>
        </div>

        {/* 主内容区 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 搜索和发帖 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                placeholder="搜索社区话题..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm px-3 py-2 border focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
              <Button variant="primary">发布新帖子</Button>
            </div>

            {/* 筛选标签 */}
            {(searchTerm || selectedCategory) && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">当前筛选:</span>
                {selectedCategory && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-700">
                    {selectedCategory === "learning"
                      ? "学习分享"
                      : selectedCategory === "food"
                      ? "美食交流"
                      : selectedCategory === "music"
                      ? "音乐讨论"
                      : selectedCategory === "reading"
                      ? "读书心得"
                      : selectedCategory}
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
                  }}
                  className="text-text-secondary hover:text-text-primary"
                >
                  清除筛选
                </Button>
              </div>
            )}
          </div>

          {/* 帖子列表 */}
          <div className="space-y-4">
            {communityPosts.length > 0 ? (
              communityPosts.map((post) => (
                <PostCard
                  key={post.id}
                  {...post}
                  onClick={() => {
                    const navigateToPost = navigateWithSource("community");
                    navigateToPost(`/community/${post.id}`);
                  }}
                  onLike={() => console.log(`点赞帖子: ${post.id}`)}
                  onComment={() => console.log(`评论帖子: ${post.id}`)}
                  onShare={() => console.log(`分享帖子: ${post.id}`)}
                  onBookmark={() => console.log(`收藏帖子: ${post.id}`)}
                />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-xl font-medium text-text-primary mb-2">
                  没有找到相关话题
                </h3>
                <p className="text-text-secondary">
                  试试调整筛选条件或{" "}
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("");
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
          {communityPosts.length > 0 && (
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
        </div>

        {/* 右侧边栏 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h3 className="text-lg font-semibold mb-4">热门话题</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                <span className="text-sm">#摄影技巧</span>
                <span className="text-xs text-text-tertiary">128</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                <span className="text-sm">#美食制作</span>
                <span className="text-xs text-text-tertiary">96</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                <span className="text-sm">#读书分享</span>
                <span className="text-xs text-text-tertiary">73</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4">活跃用户</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://picsum.photos/32/32?random=9"
                  alt="用户头像"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium">摄影师小王</div>
                  <div className="text-xs text-text-tertiary">
                    发布了 5 篇帖子
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="https://picsum.photos/32/32?random=10"
                  alt="用户头像"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium">读书达人</div>
                  <div className="text-xs text-text-tertiary">
                    发布了 3 篇帖子
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Community;
