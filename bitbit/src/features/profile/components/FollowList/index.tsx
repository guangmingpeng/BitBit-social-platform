import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UserCardPopover } from "@/shared/components";
import { ContentFilter } from "@/components/ui/ContentFilter/exports";
import { FloatingBackButton } from "@/components/common";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { usePagination } from "../../hooks";
import { Pagination } from "../Pagination";
import type { User } from "@/components/ui/cards/UserCard/types";

interface FollowListProps {
  type: "following" | "followers";
  userId?: string; // 如果传入userId，则显示指定用户的关注/粉丝列表
}

// 模拟数据
const mockFollowingUsers: User[] = [
  {
    id: "user-1",
    username: "张小明",
    email: "zhang@example.com",
    avatar: "https://picsum.photos/60/60?random=1",
    bio: "前端开发工程师，热爱技术分享",
    profession: "前端工程师",
    age: 28,
    location: "北京",
    interests: ["编程", "音乐", "旅行"],
    isOnline: true,
    activitiesCount: 12,
    stats: {
      totalPosts: 45,
      totalExchanges: 8,
    },
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-09-01T00:00:00Z",
  },
  {
    id: "user-2",
    username: "李美丽",
    email: "li@example.com",
    avatar: "https://picsum.photos/60/60?random=2",
    bio: "设计师，喜欢摄影和美食",
    profession: "UI设计师",
    age: 25,
    location: "上海",
    interests: ["设计", "摄影", "美食"],
    isOnline: false,
    activitiesCount: 8,
    stats: {
      totalPosts: 32,
      totalExchanges: 5,
    },
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-08-30T00:00:00Z",
  },
  {
    id: "user-3",
    username: "王大力",
    email: "wang@example.com",
    avatar: "https://picsum.photos/60/60?random=3",
    bio: "户外运动爱好者，登山达人",
    profession: "体育教练",
    age: 32,
    location: "成都",
    interests: ["户外", "登山", "健身"],
    isOnline: true,
    activitiesCount: 20,
    stats: {
      totalPosts: 28,
      totalExchanges: 12,
    },
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-09-05T00:00:00Z",
  },
  {
    id: "user-4",
    username: "陈小雨",
    email: "chen@example.com",
    avatar: "https://picsum.photos/60/60?random=4",
    bio: "书虫一枚，古典音乐爱好者",
    profession: "编辑",
    age: 29,
    location: "杭州",
    interests: ["阅读", "音乐", "写作"],
    isOnline: false,
    activitiesCount: 15,
    stats: {
      totalPosts: 52,
      totalExchanges: 3,
    },
    createdAt: "2024-03-05T00:00:00Z",
    updatedAt: "2024-09-02T00:00:00Z",
  },
  {
    id: "user-5",
    username: "刘星星",
    email: "liu@example.com",
    avatar: "https://picsum.photos/60/60?random=5",
    bio: "数据分析师，科技达人",
    profession: "数据分析师",
    age: 26,
    location: "深圳",
    interests: ["数据", "科技", "电影"],
    isOnline: true,
    activitiesCount: 6,
    stats: {
      totalPosts: 18,
      totalExchanges: 7,
    },
    createdAt: "2024-04-12T00:00:00Z",
    updatedAt: "2024-09-06T00:00:00Z",
  },
];

const mockFollowersUsers: User[] = [
  {
    id: "follower-1",
    username: "粉丝小明",
    email: "fan1@example.com",
    avatar: "https://picsum.photos/60/60?random=11",
    bio: "你的忠实粉丝",
    profession: "学生",
    age: 22,
    location: "广州",
    interests: ["学习", "游戏"],
    isOnline: false,
    activitiesCount: 3,
    stats: {
      totalPosts: 8,
      totalExchanges: 1,
    },
    createdAt: "2024-05-01T00:00:00Z",
    updatedAt: "2024-09-03T00:00:00Z",
  },
  {
    id: "follower-2",
    username: "关注者二号",
    email: "fan2@example.com",
    avatar: "https://picsum.photos/60/60?random=12",
    bio: "喜欢你的分享",
    profession: "程序员",
    age: 30,
    location: "武汉",
    interests: ["技术", "阅读"],
    isOnline: true,
    activitiesCount: 9,
    stats: {
      totalPosts: 23,
      totalExchanges: 4,
    },
    createdAt: "2024-06-15T00:00:00Z",
    updatedAt: "2024-09-04T00:00:00Z",
  },
];

export const FollowList: React.FC<FollowListProps> = ({ type, userId }) => {
  const navigate = useNavigate();

  // 根据类型获取对应数据
  const users = type === "following" ? mockFollowingUsers : mockFollowersUsers;

  // 直接使用ContentFilter来处理筛选后的数据
  const [filteredData, setFilteredData] = useState<User[]>(users);

  // 分页 - 基于ContentFilter处理后的数据
  const pagination = usePagination({
    data: filteredData,
    pageSize: 12,
    resetKey: `${type}-${userId || "current"}-${filteredData.length}`,
  });

  const handleUserClick = (user: User) => {
    if (user.id === "current_user") {
      // 如果是当前用户，跳转到自己的profile
      navigate("/profile/activities");
    } else {
      // 跳转到其他用户的主页
      navigate(`/user/${user.id}`);
    }
  };

  const handleFollowToggle = (userId: string, isFollowing: boolean) => {
    console.log(isFollowing ? "取消关注" : "关注", userId);
    // 这里应该调用API
  };

  const handleSendMessage = (userId: string) => {
    console.log("发送私信给", userId);
    // 这里应该打开私信对话框
  };

  // 使用 useMemo 缓存随机生成的用户统计数据，避免重复渲染时数据闪烁
  const userStatsCache = useMemo(() => {
    const cache = new Map();
    return {
      getStats: (userId: string) => {
        if (!cache.has(userId)) {
          cache.set(userId, {
            followersCount: Math.floor(Math.random() * 1000),
            followingCount: Math.floor(Math.random() * 500),
            postsCount: Math.floor(Math.random() * 100),
            activitiesCount: Math.floor(Math.random() * 50),
            organizedCount: Math.floor(Math.random() * 10),
          });
        }
        return cache.get(userId);
      },
    };
  }, []);

  // 转换用户数据为UserCardPopover需要的格式，包含丰富信息
  const convertUserForPopover = (user: User) => {
    const cachedStats = userStatsCache.getStats(user.id);
    return {
      ...user,
      name: user.username || user.name || "匿名用户",
      fullName: user.name, // 完整姓名
      followersCount: user.followers || cachedStats.followersCount,
      followingCount: user.following || cachedStats.followingCount,
      postsCount: user.stats?.totalPosts || cachedStats.postsCount,
      activitiesCount: user.activitiesCount || cachedStats.activitiesCount,
      organizedCount: cachedStats.organizedCount, // 组织的活动数
      isFollowed: type === "following",
      joinDate: user.joinedDate || "2024年1月", // 加入时间
      tags: user.interests || ["技术", "生活", "旅行"], // 兴趣标签
      isOnline: user.isOnline,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 左侧浮动返回按钮 */}
      <FloatingBackButton
        text="返回上页"
        variant="elegant"
        size="md"
        onClick={() => navigate(-1)}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 pl-12 md:pl-16 lg:pl-20">
        {/* 页面头部 */}
        <PageHeader
          title={type === "following" ? "我关注的人" : "我的粉丝"}
          subtitle={`共 ${users.length} 位用户`}
          showBackButton={true}
        />

        {/* 搜索和排序 - 复用ContentFilter组件 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
          <ContentFilter
            data={users}
            filterConfigs={[]} // 不需要筛选器，只要搜索和排序
            sortConfig={{
              title: "排序",
              defaultSort: "username",
              options: [
                { key: "username", label: "按姓名", direction: "asc" },
                { key: "createdAt", label: "按加入时间", direction: "desc" },
                {
                  key: "activitiesCount",
                  label: "按活跃度",
                  direction: "desc",
                },
              ],
            }}
            searchConfig={{
              placeholder: `搜索${
                type === "following" ? "关注的人" : "粉丝"
              }...`,
              searchFields: [
                "username",
                "name",
                "profession",
                "location",
                "bio",
              ],
            }}
            onDataChange={(data) => setFilteredData(data as User[])}
            showFilterCount={true}
            showClearButton={false} // 不显示清除按钮，因为没有复杂筛选
          />
        </div>

        {/* 用户列表 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
          {pagination.currentData.length > 0 ? (
            <>
              <div className="divide-y divide-gray-100">
                {(pagination.currentData as User[]).map((user, index) => {
                  const userInfo = convertUserForPopover(user);

                  return (
                    <UserCardPopover
                      key={user.id}
                      user={userInfo}
                      placement="right"
                      onFollow={() =>
                        handleFollowToggle(user.id, type === "following")
                      }
                      onMessage={() => handleSendMessage(user.id)}
                      onViewProfile={() => handleUserClick(user)}
                    >
                      <div
                        className={`group flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-all duration-200 ${
                          index === 0 ? "rounded-t-lg" : ""
                        } ${
                          index === pagination.currentData.length - 1
                            ? "rounded-b-lg"
                            : ""
                        }`}
                      >
                        <div className="relative flex-shrink-0">
                          <img
                            src={
                              user.avatar ||
                              "https://picsum.photos/48/48?random=default"
                            }
                            alt={user.username || user.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          {/* 在线状态指示器 */}
                          {user.isOnline && (
                            <div className="absolute -bottom-1 -right-1">
                              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900 truncate text-base">
                              {user.username || user.name}
                            </span>
                            {type === "following" && (
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full flex-shrink-0 font-medium">
                                已关注
                              </span>
                            )}
                            {user.level && (
                              <span className="text-xs px-2 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full flex-shrink-0 font-medium">
                                Lv.{user.level}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            {user.profession && (
                              <span className="truncate font-medium">
                                {user.profession}
                              </span>
                            )}
                            {user.location && (
                              <span className="flex items-center gap-1 flex-shrink-0">
                                <svg
                                  className="w-3 h-3"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {user.location}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-400 flex-shrink-0">
                          {/* 简化显示，只显示一个关键指标 */}
                          {user.followers !== undefined && (
                            <span className="text-center">
                              <span className="font-semibold text-gray-600">
                                {user.followers}
                              </span>
                              <span className="text-xs ml-1">粉丝</span>
                            </span>
                          )}
                        </div>

                        {/* 悬停显示箭头 */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </UserCardPopover>
                  );
                })}
              </div>

              {/* 分页 */}
              {pagination.totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={pagination.setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon="👥"
              title={type === "following" ? "还没有关注任何人" : "还没有粉丝"}
              description={
                type === "following"
                  ? "快去发现有趣的人吧"
                  : "分享更多内容，让更多人关注你"
              }
              actionText={type === "following" ? "去发现" : "去社区"}
              onAction={() => navigate("/community")}
            />
          )}
        </div>
      </div>
    </div>
  );
};
