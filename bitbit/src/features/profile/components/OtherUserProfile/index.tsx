import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileTabs, ActivityFilter, LoadingState, Pagination } from "../";
import { OtherUserProfileHeader } from "../OtherUserProfileHeader";
import { EmptyState } from "@/components/ui";
import { ActivityCard, PostCard } from "@/components/ui/cards";
import type { ActivityCardActivity } from "@/components/ui/cards/ActivityCard/types";
import { ExchangeCard } from "@/features/exchange/components";
import {
  ContentFilter,
  useContentFilter,
} from "@/components/ui/ContentFilter/exports";
import { useActivityFilter, useProfileTabs, usePagination } from "../../hooks";
import type { User } from "@/components/ui/cards/UserCard/types";
import type { Post } from "@/components/ui/cards";

// 本地活动类型定义
interface LocalActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  image?: string;
  status: "organized" | "registered" | "published";
}

// 本地交易商品类型定义
interface LocalExchange {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  images: string[];
  category: string;
  condition: "excellent" | "good" | "fair";
  isAvailable: boolean;
  seller: {
    id: string;
    name: string; // ExchangeCard需要name字段
    username: string;
    avatar: string;
    rating: number;
  };
  location: string;
  publishTime: string;
  views: number;
  likes: number;
  isLiked: boolean;
}

// 其他用户资料组件 - 不显示编辑按钮和私人信息
const OtherUserProfile: React.FC<{
  user: User;
  onFollow: (isFollowing: boolean) => void;
  isFollowing: boolean;
  isLoading?: boolean;
}> = ({ user, onFollow, isFollowing, isLoading }) => {
  return (
    <OtherUserProfileHeader
      user={user}
      onFollow={onFollow}
      isFollowing={isFollowing}
      isLoading={isLoading}
    />
  );
};

// 模拟其他用户数据
const mockUserData: Record<
  string,
  User & {
    activities: LocalActivity[];
    posts: Post[];
    exchanges: LocalExchange[];
  }
> = {
  "user-1": {
    id: "user-1",
    name: "张小明",
    username: "zhangxiaoming",
    email: "zhang@example.com",
    avatar: "https://picsum.photos/100/100?random=1",
    bio: "前端开发工程师，热爱技术分享和开源项目",
    profession: "前端工程师",
    age: 28,
    location: "北京",
    interests: ["编程", "音乐", "旅行", "摄影", "阅读"],
    isOnline: true,
    level: 15,
    following: 120,
    followers: 85,
    joinedDate: "2024年1月",
    activitiesCount: 24,
    stats: {
      totalPosts: 45,
      totalExchanges: 8,
    },
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
    activities: [
      {
        id: "act-1",
        title: "前端技术分享会",
        description: "分享最新的React和Vue技术",
        category: "技能分享",
        date: "9月15日",
        time: "14:00-16:00",
        location: "科技园会议室",
        maxParticipants: 30,
        currentParticipants: 18,
        image: "https://picsum.photos/300/200?random=tech1",
        status: "organized" as const,
      },
      {
        id: "act-2",
        title: "周末户外摄影",
        description: "一起去公园拍照，学习摄影技巧",
        category: "户外活动",
        date: "9月20日",
        time: "09:00-17:00",
        location: "中山公园",
        maxParticipants: 15,
        currentParticipants: 8,
        image: "https://picsum.photos/300/200?random=photo2",
        status: "registered" as const,
      },
    ],
    posts: [
      {
        id: "post-1",
        author: {
          name: "张小明",
          avatar: "https://picsum.photos/40/40?random=1",
        },
        content:
          "今天学了一个新的CSS技巧，分享给大家！使用CSS Grid可以轻松实现复杂布局。",
        images: ["https://picsum.photos/400/300?random=css1"],
        category: "learning" as const,
        tags: ["CSS", "前端", "技巧"],
        publishTime: "2小时前",
        likes: 23,
        comments: 8,
        shares: 5,
        isLiked: false,
        isBookmarked: false,
      },
      {
        id: "post-2",
        author: {
          name: "张小明",
          avatar: "https://picsum.photos/40/40?random=1",
        },
        content: "周末的摄影作品，北京的秋天真美！",
        images: [
          "https://picsum.photos/400/300?random=autumn1",
          "https://picsum.photos/400/300?random=autumn2",
        ],
        category: "reading" as const,
        tags: ["摄影", "北京", "秋天"],
        publishTime: "1天前",
        likes: 45,
        comments: 12,
        shares: 8,
        isLiked: true,
        isBookmarked: false,
      },
    ],
    exchanges: [
      {
        id: "exchange-1",
        title: "MacBook Pro 2022",
        description: "9成新，配置高，适合开发",
        price: 12000,
        originalPrice: 15000,
        images: ["https://picsum.photos/300/200?random=macbook"],
        category: "电子产品",
        condition: "excellent" as const,
        isAvailable: true,
        seller: {
          id: "user-1",
          name: "张小明", // ExchangeCard需要name字段
          username: "张小明",
          avatar: "https://picsum.photos/40/40?random=1",
          rating: 4.8,
        },
        location: "北京",
        publishTime: "3天前",
        views: 128,
        likes: 15,
        isLiked: false,
      },
    ],
  },
};

// 其他用户主页组件
export const OtherUserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  // 模拟获取用户数据
  const userData = userId
    ? mockUserData[userId as keyof typeof mockUserData]
    : null;

  const { activeTab, handleTabChange } = useProfileTabs();

  // 将本地活动数据转换为Activity类型以兼容useActivityFilter
  const adaptedActivities =
    userData?.activities.map((activity) => ({
      ...activity,
      id: activity.id,
      title: activity.title,
      description: activity.description || "",
      category: "learning" as const,
      categoryColor: "#3b82f6", // 添加所需的categoryColor字段
      date: activity.date,
      time: activity.time,
      location: activity.location,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      capacity: activity.maxParticipants,
      maxParticipants: activity.maxParticipants,
      currentParticipants: activity.currentParticipants,
      organizer: {
        id: userData!.id,
        username: userData!.name, // ActivityCard需要username字段
        email: userData!.email,
        avatar: userData!.avatar || "",
        bio: userData!.bio || "",
        createdAt: userData!.createdAt,
        updatedAt: userData!.updatedAt,
      },
      images: activity.image ? [activity.image] : [],
      coverImage: activity.image,
      price: 0,
      isFree: true,
      isJoined: activity.status === "registered",
      status:
        activity.status === "registered"
          ? ("registered" as const)
          : ("organized" as const),
      tags: [activity.category],
      createdAt: userData!.createdAt,
      updatedAt: userData!.updatedAt,
    })) || [];

  const { activeFilter, setActiveFilter, filteredActivities } =
    useActivityFilter(adaptedActivities);

  useEffect(() => {
    // 模拟API调用
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // 模拟网络延迟
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!userData) {
          throw new Error("用户不存在");
        }

        // 模拟检查是否已关注
        setIsFollowing(Math.random() > 0.5);
      } catch (err) {
        setError(err instanceof Error ? err.message : "加载失败");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, userData]);

  const handleFollow = async (currentIsFollowing: boolean) => {
    setFollowLoading(true);
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsFollowing(!currentIsFollowing);
      console.log(currentIsFollowing ? "取消关注" : "关注", userId);
    } catch (err) {
      console.error("关注操作失败", err);
    } finally {
      setFollowLoading(false);
    }
  };

  // 帖子筛选 - 使用正确的类型
  const postsFilter = useContentFilter({
    data: (userData?.posts || []) as Post[],
    page: "posts",
    useDynamicConfig: true,
  });

  // 商品筛选 - 使用正确的类型
  const exchangesFilter = useContentFilter({
    data: (userData?.exchanges || []) as LocalExchange[],
    page: "trades",
  });

  // 分页
  const activitiesPagination = usePagination({
    data: filteredActivities,
    pageSize: 6,
    resetKey: `user-${userId}-activities-${activeTab}`,
  });

  const postsPagination = usePagination({
    data: postsFilter.filteredData,
    pageSize: 8,
    resetKey: `user-${userId}-posts-${activeTab}`,
  });

  const exchangesPagination = usePagination({
    data: exchangesFilter.filteredData,
    pageSize: 6,
    resetKey: `user-${userId}-exchanges-${activeTab}`,
  });

  if (loading) {
    return <LoadingState />;
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <EmptyState
          icon="😔"
          title="用户不存在"
          description={error || "找不到该用户"}
          actionText="返回"
          onAction={() => navigate(-1)}
        />
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "activities":
        return (
          <div className="space-y-6">
            <ActivityFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activitiesPagination.currentData.length > 0 ? (
                activitiesPagination.currentData.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity as unknown as ActivityCardActivity}
                    layout="horizontal"
                    onClick={() => navigate(`/activities/${activity.id}`)}
                    onViewDetail={() => navigate(`/activities/${activity.id}`)}
                    showActions={false} // 其他用户页面不显示操作按钮
                    showImages={true}
                    showDescription={true}
                    showOrganizer={false}
                  />
                ))
              ) : (
                <EmptyState title="暂无活动" className="col-span-2" />
              )}
            </div>
            {activitiesPagination.totalPages > 1 && (
              <Pagination
                currentPage={activitiesPagination.currentPage}
                totalPages={activitiesPagination.totalPages}
                onPageChange={activitiesPagination.setCurrentPage}
              />
            )}
          </div>
        );

      case "posts":
        return (
          <div className="space-y-4">
            <ContentFilter
              filterConfigs={postsFilter.config.filters}
              sortConfig={postsFilter.config.sort}
              searchConfig={postsFilter.config.search}
              activeFilters={postsFilter.activeFilters}
              activeSort={postsFilter.activeSort}
              searchQuery={postsFilter.searchQuery}
              onFilterChange={postsFilter.handleFilterChange}
              onSortChange={postsFilter.handleSortChange}
              onSearchChange={postsFilter.handleSearchChange}
              showFilterCount={true}
              showClearButton={true}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {postsPagination.currentData.length > 0 ? (
                (postsPagination.currentData as Post[]).map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    layout="compact"
                    onClick={() => navigate(`/posts/${post.id}`)}
                    onLike={() => console.log("点赞帖子", post.id)}
                    onComment={() => console.log("评论帖子", post.id)}
                    onShare={() => console.log("分享帖子", post.id)}
                    onBookmark={() => console.log("收藏帖子", post.id)}
                  />
                ))
              ) : (
                <EmptyState title="暂无帖子" className="col-span-2" />
              )}
            </div>
            {postsPagination.totalPages > 1 && (
              <Pagination
                currentPage={postsPagination.currentPage}
                totalPages={postsPagination.totalPages}
                onPageChange={postsPagination.setCurrentPage}
              />
            )}
          </div>
        );

      case "trades":
        return (
          <div className="space-y-6">
            <ContentFilter
              filterConfigs={exchangesFilter.config.filters}
              sortConfig={exchangesFilter.config.sort}
              searchConfig={exchangesFilter.config.search}
              activeFilters={exchangesFilter.activeFilters}
              activeSort={exchangesFilter.activeSort}
              searchQuery={exchangesFilter.searchQuery}
              onFilterChange={exchangesFilter.handleFilterChange}
              onSortChange={exchangesFilter.handleSortChange}
              onSearchChange={exchangesFilter.handleSearchChange}
              showFilterCount={true}
              showClearButton={true}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exchangesPagination.currentData.length > 0 ? (
                (exchangesPagination.currentData as LocalExchange[]).map(
                  (item) => (
                    <ExchangeCard
                      key={item.id}
                      {...item}
                      layout="grid"
                      onClick={() => navigate(`/exchange/${item.id}`)}
                      onLike={() => console.log("点赞商品", item.id)}
                    />
                  )
                )
              ) : (
                <EmptyState title="暂无商品" className="col-span-3" />
              )}
            </div>
            {exchangesPagination.totalPages > 1 && (
              <Pagination
                currentPage={exchangesPagination.currentPage}
                totalPages={exchangesPagination.totalPages}
                onPageChange={exchangesPagination.setCurrentPage}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 用户资料 */}
          <OtherUserProfile
            user={userData as unknown as User}
            onFollow={handleFollow}
            isFollowing={isFollowing}
            isLoading={followLoading}
          />

          {/* 标签导航 - 只显示公开内容 */}
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            visibleTabs={["activities", "posts", "trades"]} // 只显示公开内容
          />

          {/* 内容区域 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div key={activeTab}>{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfilePage;
