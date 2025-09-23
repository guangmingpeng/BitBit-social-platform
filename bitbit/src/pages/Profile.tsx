import { type FC, useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  UserProfile,
  ProfileTabs,
  ActivityFilter,
  AchievementBadges,
  QuickAccess,
  LoadingState,
  Pagination,
  ActivityNotificationModal,
  useProfile,
  useProfileTabs,
  useActivityFilter,
  useProfileNavigation,
  usePagination,
} from "../features/profile";
import {
  ContentFilter,
  useContentFilter,
} from "../components/ui/ContentFilter/exports";
import { TabFilter } from "../shared/components";
import { ActivityCard, PostCard } from "../components/ui/cards";
import { ExchangeCard } from "../features/exchange/components";
import { OrderCard, FavoriteCard, DraftCard } from "../components/ui";
import { FavoritesHeader } from "../components/ui/FavoritesHeader";
import { FloatingBackButton, ConfirmActionDialog } from "@/components/common";
import { useExchangeActions } from "@/shared/hooks";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/uiSlice";
import {
  myPosts,
  myExchangeItems,
  myOrders,
  myFavorites,
  myDrafts,
} from "../shared/data/profileMockData";

const Profile: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileData, loading, error } = useProfile();
  const { activeTab, handleTabChange } = useProfileTabs();

  // 简化的收藏筛选状态 - 使用key强制组件重新渲染
  const [favoritesTypeFilter, setFavoritesTypeFilter] = useState<string>("");

  // 本地收藏数据状态管理
  const [localMyFavorites, setLocalMyFavorites] = useState(myFavorites);

  // 收藏多选模式相关状态
  const [isFavoritesSelectionMode, setIsFavoritesSelectionMode] =
    useState(false);
  const [selectedFavoriteIds, setSelectedFavoriteIds] = useState<string[]>([]);
  const [showFavoritesConfirmDialog, setShowFavoritesConfirmDialog] =
    useState(false);
  const [isBatchRemovingFavorites, setIsBatchRemovingFavorites] =
    useState(false);

  // 单个收藏取消确认弹窗相关状态
  const [singleFavoriteConfirmDialog, setSingleFavoriteConfirmDialog] =
    useState<{
      isOpen: boolean;
      favoriteId: string;
      favoriteType: string;
    }>({
      isOpen: false,
      favoriteId: "",
      favoriteType: "",
    });

  // 本地商品状态管理
  const [localMyExchangeItems, setLocalMyExchangeItems] =
    useState(myExchangeItems);
  const lastOperationRef = useRef<{
    itemId: string;
    newStatus: "available" | "hidden";
    oldStatus?: string;
  } | null>(null);

  // 商品操作逻辑
  const exchangeActions = useExchangeActions({
    onToggleStatus: async (
      itemId: string,
      newStatus: "available" | "hidden"
    ) => {
      console.log(`商品 ${itemId} 状态变更为: ${newStatus}`);
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 立即更新本地状态
      setLocalMyExchangeItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, status: newStatus } : item
        )
      );

      // 存储操作信息供成功回调使用
      lastOperationRef.current = {
        itemId,
        newStatus,
        oldStatus: localMyExchangeItems.find((item) => item.id === itemId)
          ?.status,
      };
    },
    onSuccess: () => {
      const operation = lastOperationRef.current;
      const actionText = operation?.newStatus === "hidden" ? "下架" : "上架";
      dispatch(
        showToast({
          type: "success",
          message: `商品${actionText}成功！`,
        })
      );
      // 清理临时数据
      lastOperationRef.current = null;
    },
    onError: (_action, error) => {
      dispatch(
        showToast({
          type: "error",
          message: `商品操作失败: ${error}`,
        })
      );
      // 清理临时数据
      lastOperationRef.current = null;
    },
  });

  // 当activeTab改变时，立即重置筛选状态
  useEffect(() => {
    if (activeTab !== "favorites") {
      setFavoritesTypeFilter("");
    }
  }, [activeTab]);
  const { activeFilter, setActiveFilter, filteredActivities } =
    useActivityFilter(profileData?.activities || []);
  // 导航函数
  const navigation = useProfileNavigation();

  // 修改活动详情导航，传递profile状态信息
  const navigateToActivityDetail = (activityId: string) => {
    navigate(`/activities/${activityId}`, {
      state: {
        fromProfile: true,
        fromSource: "profile", // 添加这个字段以支持smartGoBack
        profileTab: activeTab, // 传递当前的tab信息
        profileData: {
          activities: filteredActivities,
        },
      },
    });
  };

  // 如果没有提供tab参数，重定向到activities
  useEffect(() => {
    if (!params.tab) {
      navigate("/profile/activities", { replace: true });
    }
  }, [params.tab, navigate]);

  // 数据适配器函数
  const adaptActivityData = (
    profileActivity: import("../features/profile/types").Activity
  ) => {
    // 中文分类到英文分类的映射
    const getCategoryMapping = (
      chineseCategory: string
    ): "music" | "food" | "learning" | "reading" => {
      switch (chineseCategory) {
        case "音乐":
        case "音乐表演":
          return "music";
        case "美食":
        case "美食分享":
          return "food";
        case "学习":
        case "技能分享":
        case "读书":
        case "户外活动":
        case "户外":
          return "learning";
        case "阅读":
          return "reading";
        default:
          return "learning"; // 默认分类
      }
    };

    // 根据profile活动状态确定主活动类型的状态和用户参与情况
    const getActivityStatus = () => {
      switch (profileActivity.status) {
        case "organized":
          // 组织的活动：设置组织者为当前用户，状态为published，已报名
          return {
            status: "published" as const,
            isJoined: true,
            isOrganizer: true,
          };
        case "registered":
          // 已报名的活动：状态为published，已报名但非组织者
          return {
            status: "published" as const,
            isJoined: true,
            isOrganizer: false,
          };
        case "ended": {
          // ended状态：表示我组织的已结束活动
          return {
            status: "completed" as const,
            isJoined: true, // 组织者默认已加入
            isOrganizer: true,
          };
        }
        case "completed": {
          // completed状态：表示我参加过的已结束活动
          return {
            status: "completed" as const,
            isJoined: true, // 曾经参加过
            isOrganizer: false,
          };
        }
        default:
          return {
            status: "published" as const,
            isJoined: false,
            isOrganizer: false,
          };
      }
    };

    const { status, isJoined, isOrganizer } = getActivityStatus();

    // 创建当前用户作为组织者的用户对象
    const currentUser = {
      id: "current_user", // 与activityUtils中的CURRENT_USER_ID保持一致
      username: profileData?.user?.name || "当前用户",
      email: "current@user.com",
      avatar: profileData?.user?.avatar || "",
      bio: profileData?.user?.bio || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 创建默认的其他组织者对象
    const defaultOrganizer = {
      id: "other_user",
      username: "活动组织者",
      email: "organizer@example.com",
      avatar: "https://picsum.photos/40/40?random=organizer",
      bio: "活动组织者",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 生成模拟的时间数据（基于活动date和time）
    const generateDateTime = () => {
      const today = new Date();
      const activityDate = new Date(today);

      // 根据状态决定时间
      if (status === "completed") {
        // 已结束活动设为过去时间
        activityDate.setDate(today.getDate() - 7);
      } else {
        // 未结束活动设为未来时间
        activityDate.setDate(today.getDate() + 7);
      }

      const startTime = activityDate.toISOString();
      const endTime = new Date(
        activityDate.getTime() + 2 * 60 * 60 * 1000
      ).toISOString(); // 加2小时

      return { startTime, endTime };
    };

    const { startTime, endTime } = generateDateTime();

    return {
      id: profileActivity.id,
      title: profileActivity.title,
      description: profileActivity.description || "",
      category: getCategoryMapping(profileActivity.category),
      date: profileActivity.date,
      time: profileActivity.time,
      location: profileActivity.location,
      startTime,
      endTime,
      capacity: profileActivity.maxParticipants || 30,
      maxParticipants: profileActivity.maxParticipants || 30,
      currentParticipants: profileActivity.currentParticipants || 15,
      organizer: isOrganizer ? currentUser : defaultOrganizer,
      images: profileActivity.image ? [profileActivity.image] : [],
      coverImage: profileActivity.image,
      price: 0,
      isFree: true,
      isJoined,
      status,
      tags: [profileActivity.category],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  // 帖子数据适配器
  const adaptPostData = (postData: (typeof myPosts)[0]) => ({
    id: postData.id,
    author: postData.author,
    content: postData.content,
    images: postData.images,
    category: postData.category,
    tags: postData.tags || [],
    publishTime: postData.publishTime,
    likes: postData.likes,
    comments: postData.comments,
    shares: postData.shares,
    isLiked: postData.isLiked,
    isBookmarked: postData.isBookmarked,
  });

  // 适配活动数据
  const adaptedActivities = filteredActivities.map(adaptActivityData);
  // 适配帖子数据
  const adaptedPosts = myPosts.map(adaptPostData);

  // 单个取消收藏功能
  const handleRemoveFavorite = (favoriteId: string, favoriteType: string) => {
    // 设置待删除的收藏项并显示确认弹窗
    setSingleFavoriteConfirmDialog({
      isOpen: true,
      favoriteId,
      favoriteType,
    });
  };

  // 确认单个收藏取消
  const handleConfirmSingleRemoveFavorite = () => {
    if (singleFavoriteConfirmDialog.favoriteId) {
      setLocalMyFavorites((prevFavorites) =>
        prevFavorites.filter(
          (item) =>
            !(
              item.id === singleFavoriteConfirmDialog.favoriteId &&
              item.type === singleFavoriteConfirmDialog.favoriteType
            )
        )
      );
    }
    setSingleFavoriteConfirmDialog({
      isOpen: false,
      favoriteId: "",
      favoriteType: "",
    });
  };

  // 取消单个收藏确认
  const handleCancelSingleRemoveFavorite = () => {
    setSingleFavoriteConfirmDialog({
      isOpen: false,
      favoriteId: "",
      favoriteType: "",
    });
  };

  // 多选模式相关处理函数
  const handleToggleFavoritesSelectionMode = () => {
    setIsFavoritesSelectionMode(!isFavoritesSelectionMode);
    setSelectedFavoriteIds([]); // 清空选择
  };

  const handleToggleFavoriteSelection = (id: string, type: string) => {
    const uniqueId = `${type}-${id}`;
    setSelectedFavoriteIds((prev) =>
      prev.includes(uniqueId)
        ? prev.filter((selectedId) => selectedId !== uniqueId)
        : [...prev, uniqueId]
    );
  };

  const handleSelectAllFavorites = () => {
    setSelectedFavoriteIds(
      filteredFavorites.map((favorite) => `${favorite.type}-${favorite.id}`)
    );
  };

  const handleClearFavoriteSelection = () => {
    setSelectedFavoriteIds([]);
    setIsFavoritesSelectionMode(false);
  };

  const handleBatchRemoveFavorites = () => {
    setShowFavoritesConfirmDialog(true);
  };

  const handleConfirmBatchRemoveFavorites = async () => {
    setIsBatchRemovingFavorites(true);
    try {
      // 批量删除选中的收藏
      setLocalMyFavorites((prevFavorites) =>
        prevFavorites.filter(
          (item) => !selectedFavoriteIds.includes(`${item.type}-${item.id}`)
        )
      );
      setSelectedFavoriteIds([]);
      setIsFavoritesSelectionMode(false);
      setShowFavoritesConfirmDialog(false);
    } catch (error) {
      console.error("批量取消收藏失败:", error);
    } finally {
      setIsBatchRemovingFavorites(false);
    }
  };

  const handleCloseFavoritesConfirmDialog = () => {
    if (!isBatchRemovingFavorites) {
      setShowFavoritesConfirmDialog(false);
    }
  };

  // 简化的收藏筛选逻辑
  const filteredFavorites = useMemo(() => {
    console.log("=== 收藏筛选逻辑执行 ===");
    console.log("favoritesTypeFilter:", favoritesTypeFilter);
    console.log("localMyFavorites 原始数据:", localMyFavorites);
    console.log(
      "localMyFavorites 中的type值:",
      localMyFavorites.map((item) => ({
        id: item.id,
        type: item.type,
        title: item.title,
      }))
    );

    if (
      !favoritesTypeFilter ||
      favoritesTypeFilter === "all" ||
      favoritesTypeFilter === ""
    ) {
      console.log("返回所有数据，数量:", localMyFavorites.length);
      return localMyFavorites;
    }

    const filtered = localMyFavorites.filter((item) => {
      const itemType = String(item.type);
      const filterType = String(favoritesTypeFilter);
      const matches = itemType === filterType;
      console.log(
        `筛选项: id=${item.id}, title=${item.title}, itemType="${itemType}", filterType="${filterType}", matches=${matches}`
      );
      return matches;
    });

    console.log("筛选后结果:", filtered);
    console.log("筛选后数量:", filtered.length);
    return filtered;
  }, [favoritesTypeFilter, localMyFavorites]);

  const postsFilter = useContentFilter({
    data: adaptedPosts,
    page: "posts",
    useDynamicConfig: true, // 使用动态配置
  });

  const tradesFilter = useContentFilter({
    data: localMyExchangeItems,
    page: "trades",
  });

  const draftsFilter = useContentFilter({
    data: myDrafts,
    page: "drafts",
  });

  // 分页状态 - 为每个tab使用唯一的resetKey
  const activitiesPagination = usePagination({
    data: adaptedActivities,
    pageSize: 5,
    resetKey: `activities-${activeTab}`,
  });
  const postsPagination = usePagination({
    data: postsFilter.filteredData,
    pageSize: 8,
    resetKey: `posts-${activeTab}`,
  });
  const exchangePagination = usePagination({
    data: tradesFilter.filteredData,
    pageSize: 6,
    resetKey: `trades-${activeTab}`,
  });
  const ordersPagination = usePagination({
    data: myOrders,
    pageSize: 10,
    resetKey: `orders-${activeTab}`,
  });
  const favoritesPagination = usePagination({
    data: filteredFavorites,
    pageSize: 10,
    resetKey: `favorites-${activeTab}-${favoritesTypeFilter}-${filteredFavorites.length}`,
  });
  const draftsPagination = usePagination({
    data: draftsFilter.filteredData,
    pageSize: 10,
    resetKey: `drafts-${activeTab}`,
  });

  // 通知弹窗状态
  const [notificationModal, setNotificationModal] = useState<{
    isOpen: boolean;
    activityId?: string;
    activityTitle?: string;
    participantCount?: number;
  }>({
    isOpen: false,
  });

  // 通知功能
  const handleNotifyParticipants = (activityId: string) => {
    const activity = filteredActivities.find((a) => a.id === activityId);
    if (activity) {
      setNotificationModal({
        isOpen: true,
        activityId,
        activityTitle: activity.title,
        participantCount: activity.currentParticipants || 0,
      });
    }
  };

  const handleSendNotification = async (title: string, content: string) => {
    console.log("发送通知:", {
      activityId: notificationModal.activityId,
      title,
      content,
    });
    // 这里应该调用API发送通知
    alert("通知发送成功！");
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "加载失败"}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "activities":
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* 活动筛选 */}
            <ActivityFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {/* 活动列表 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {activitiesPagination.currentData.length > 0 ? (
                (
                  activitiesPagination.currentData as typeof adaptedActivities
                ).map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    layout="horizontal"
                    onClick={() => navigateToActivityDetail(activity.id)}
                    onViewDetail={() => navigateToActivityDetail(activity.id)}
                    onNotify={() => handleNotifyParticipants(activity.id)}
                    showActions={true}
                    showImages={true}
                    showDescription={true}
                    showOrganizer={false}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8 sm:py-12">
                  <p className="text-gray-500 text-sm sm:text-base">
                    {activeFilter === "all" ? "暂无活动" : "暂无符合条件的活动"}
                  </p>
                </div>
              )}
            </div>

            {/* 分页 */}
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
            {/* 筛选和排序组件 */}
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

            {/* 帖子网格 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {(postsPagination.currentData as typeof adaptedPosts).map(
                (post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    layout="compact"
                    onClick={() => navigation.navigateToPostDetail(post.id)}
                    onLike={() => console.log("点赞帖子", post.id)}
                    onComment={() => console.log("评论帖子", post.id)}
                    onShare={() => console.log("分享帖子", post.id)}
                    onBookmark={() => console.log("收藏帖子", post.id)}
                  />
                )
              )}
            </div>

            {/* 空状态 */}
            {postsPagination.currentData.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 mb-4 text-sm sm:text-base">
                  暂无帖子内容
                </p>
                <button
                  onClick={navigation.navigateToPublishPost}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base min-h-[44px]"
                >
                  发布第一篇帖子
                </button>
              </div>
            )}

            {/* 分页 */}
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
            {/* 筛选和排序组件 */}
            <ContentFilter
              filterConfigs={tradesFilter.config.filters}
              sortConfig={tradesFilter.config.sort}
              searchConfig={tradesFilter.config.search}
              activeFilters={tradesFilter.activeFilters}
              activeSort={tradesFilter.activeSort}
              searchQuery={tradesFilter.searchQuery}
              onFilterChange={tradesFilter.handleFilterChange}
              onSortChange={tradesFilter.handleSortChange}
              onSearchChange={tradesFilter.handleSearchChange}
              showFilterCount={true}
              showClearButton={true}
            />

            {/* 我的商品 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                我发布的商品
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                {(exchangePagination.currentData as typeof myExchangeItems).map(
                  (item) => (
                    <ExchangeCard
                      key={item.id}
                      {...item}
                      layout="list"
                      mode="owner" // 设置为 owner 模式，表示用户自己发布的商品
                      onClick={() =>
                        navigation.navigateToExchangeDetail(item.id)
                      }
                      onEdit={() => navigation.navigateToEditExchange(item.id)}
                      onToggleStatus={() =>
                        exchangeActions.showToggleStatusDialog(
                          item.id,
                          item.title,
                          item.status === "available" ? "available" : "hidden"
                        )
                      }
                      onLike={() => console.log("点赞商品", item.id)}
                    />
                  )
                )}
              </div>

              {/* 商品分页 */}
              {exchangePagination.totalPages > 1 && (
                <Pagination
                  currentPage={exchangePagination.currentPage}
                  totalPages={exchangePagination.totalPages}
                  onPageChange={exchangePagination.setCurrentPage}
                />
              )}
            </div>

            {/* 我的订单 */}
            <div className="space-y-4" data-section="trades">
              <h3 className="text-lg font-semibold text-gray-900">我的订单</h3>
              <div className="space-y-3">
                {(ordersPagination.currentData as typeof myOrders).map(
                  (order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onClick={() => navigation.navigateToOrderDetail(order.id)}
                    />
                  )
                )}
              </div>

              {/* 订单分页 */}
              {ordersPagination.totalPages > 1 && (
                <Pagination
                  currentPage={ordersPagination.currentPage}
                  totalPages={ordersPagination.totalPages}
                  onPageChange={ordersPagination.setCurrentPage}
                />
              )}
            </div>

            {/* 空状态 */}
            {exchangePagination.currentData.length === 0 &&
              ordersPagination.currentData.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <p className="text-gray-500 mb-4 text-sm sm:text-base">
                    暂无交易记录
                  </p>
                  <button
                    onClick={navigation.navigateToPublishItem}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base min-h-[44px]"
                  >
                    发布第一个商品
                  </button>
                </div>
              )}
          </div>
        );

      case "favorites":
        return (
          <div
            className="space-y-4"
            key={`favorites-${favoritesTypeFilter}-${filteredFavorites.length}`}
          >
            {/* 收藏头部 - 包含多选功能 */}
            <FavoritesHeader
              totalCount={filteredFavorites.length}
              isSelectionMode={isFavoritesSelectionMode}
              selectedCount={selectedFavoriteIds.length}
              onToggleSelectionMode={handleToggleFavoritesSelectionMode}
              onRemoveSelected={handleBatchRemoveFavorites}
              onSelectAll={handleSelectAllFavorites}
              onClearSelection={handleClearFavoriteSelection}
            />

            {/* 在选择模式下隐藏筛选组件 */}
            {!isFavoritesSelectionMode && (
              <TabFilter
                label="类型:"
                options={[
                  { key: "", label: "全部", count: localMyFavorites.length },
                  {
                    key: "activity",
                    label: "活动",
                    count: localMyFavorites.filter(
                      (item) => item.type === "activity"
                    ).length,
                  },
                  {
                    key: "post",
                    label: "帖子",
                    count: localMyFavorites.filter(
                      (item) => item.type === "post"
                    ).length,
                  },
                  {
                    key: "exchange",
                    label: "商品",
                    count: localMyFavorites.filter(
                      (item) => item.type === "exchange"
                    ).length,
                  },
                ]}
                value={favoritesTypeFilter}
                onChange={(value) => {
                  console.log("=== TabFilter 筛选按钮点击事件 ===");
                  console.log("点击的筛选类型:", value);
                  console.log("点击前的筛选状态:", favoritesTypeFilter);
                  setFavoritesTypeFilter(value);
                }}
              />
            )}

            {favoritesPagination.currentData.length > 0 ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                  {(
                    favoritesPagination.currentData as typeof filteredFavorites
                  ).map((favorite, index) => (
                    <FavoriteCard
                      key={`${favorite.type}-${favorite.id}-${index}`}
                      favorite={favorite}
                      onClick={() => {
                        // 在选择模式下，点击卡片切换选择状态
                        if (isFavoritesSelectionMode) {
                          handleToggleFavoriteSelection(
                            favorite.id,
                            favorite.type
                          );
                        } else {
                          // 在非选择模式下执行导航
                          switch (favorite.type) {
                            case "activity":
                              navigation.navigateToActivityDetail(favorite.id);
                              break;
                            case "post":
                              navigation.navigateToPostDetail(favorite.id);
                              break;
                            case "exchange":
                              navigation.navigateToExchangeDetail(favorite.id);
                              break;
                          }
                        }
                      }}
                      onRemove={() =>
                        handleRemoveFavorite(favorite.id, favorite.type)
                      }
                      isSelectionMode={isFavoritesSelectionMode}
                      isSelected={selectedFavoriteIds.includes(
                        `${favorite.type}-${favorite.id}`
                      )}
                      onToggleSelection={handleToggleFavoriteSelection}
                    />
                  ))}
                </div>

                {/* 分页 */}
                {favoritesPagination.totalPages > 1 && (
                  <Pagination
                    currentPage={favoritesPagination.currentPage}
                    totalPages={favoritesPagination.totalPages}
                    onPageChange={favoritesPagination.setCurrentPage}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 text-sm sm:text-base">
                  暂无收藏内容
                </p>
              </div>
            )}
          </div>
        );

      case "drafts":
        return (
          <div className="space-y-4">
            {/* 筛选和排序组件 */}
            <ContentFilter
              filterConfigs={draftsFilter.config.filters}
              sortConfig={draftsFilter.config.sort}
              searchConfig={draftsFilter.config.search}
              activeFilters={draftsFilter.activeFilters}
              activeSort={draftsFilter.activeSort}
              searchQuery={draftsFilter.searchQuery}
              onFilterChange={draftsFilter.handleFilterChange}
              onSortChange={draftsFilter.handleSortChange}
              onSearchChange={draftsFilter.handleSearchChange}
              showFilterCount={true}
              showClearButton={true}
            />

            {draftsPagination.currentData.length > 0 ? (
              <>
                <div className="space-y-3">
                  {(draftsPagination.currentData as typeof myDrafts).map(
                    (draft) => (
                      <DraftCard
                        key={draft.id}
                        draft={draft}
                        onClick={() => {
                          // 点击卡片进入预览模式
                          switch (draft.type) {
                            case "activity":
                              navigation.navigateToActivityDetail(draft.id);
                              break;
                            case "post":
                              navigation.navigateToPostDetail(draft.id);
                              break;
                            case "exchange":
                              navigation.navigateToExchangeDetail(draft.id);
                              break;
                          }
                        }}
                        onEdit={() => {
                          // 继续编辑
                          switch (draft.type) {
                            case "activity":
                              navigation.navigateToEditActivity(draft.id);
                              break;
                            case "post":
                              navigation.navigateToEditPost(draft.id);
                              break;
                            case "exchange":
                              navigation.navigateToEditExchange(draft.id);
                              break;
                          }
                        }}
                        onPublish={() => console.log("发布草稿", draft.id)}
                        onDelete={() => console.log("删除草稿", draft.id)}
                      />
                    )
                  )}
                </div>

                {/* 分页 */}
                {draftsPagination.totalPages > 1 && (
                  <Pagination
                    currentPage={draftsPagination.currentPage}
                    totalPages={draftsPagination.totalPages}
                    onPageChange={draftsPagination.setCurrentPage}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 text-sm sm:text-base">暂无草稿</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {/* 用户资料 */}
          <UserProfile
            user={profileData.user}
            onEditProfile={() => navigate("/profile/edit")}
          />

          {/* 标签导航 */}
          <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {/* 内容区域 */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
            <div key={activeTab}>{renderTabContent()}</div>
          </div>

          {/* 成就徽章 */}
          <AchievementBadges
            achievements={profileData.achievements}
            levelProgress={profileData.levelProgress}
          />

          {/* 快速访问 */}
          <QuickAccess items={profileData.quickAccessItems} />
        </div>
      </div>

      {/* 返回首页浮动按钮 */}
      <FloatingBackButton
        text="返回首页"
        onClick={() => navigate("/")}
        variant="elegant"
        size="md"
      />

      {/* 活动通知弹窗 */}
      <ActivityNotificationModal
        isOpen={notificationModal.isOpen}
        onClose={() => setNotificationModal({ isOpen: false })}
        onSend={handleSendNotification}
        activityTitle={notificationModal.activityTitle || ""}
        participantCount={notificationModal.participantCount || 0}
      />

      {/* 商品操作确认弹窗 */}
      <ConfirmActionDialog
        isOpen={exchangeActions.confirmDialog.isOpen}
        onClose={exchangeActions.closeDialog}
        onConfirm={exchangeActions.confirmAction}
        actionType="toggle-status"
        isLoading={exchangeActions.isLoading}
        config={{
          title:
            exchangeActions.confirmDialog.currentStatus === "available"
              ? "确认下架商品"
              : "确认上架商品",
          content:
            exchangeActions.confirmDialog.currentStatus === "available"
              ? `确定要下架商品「${exchangeActions.confirmDialog.itemTitle}」吗？下架后商品将不会在市场中显示，您可以随时重新上架。`
              : `确定要上架商品「${exchangeActions.confirmDialog.itemTitle}」吗？上架后商品将在市场中正常显示。`,
          confirmText:
            exchangeActions.confirmDialog.currentStatus === "available"
              ? "确认下架"
              : "确认上架",
        }}
      />

      {/* 单个取消收藏确认弹窗 */}
      <ConfirmActionDialog
        isOpen={singleFavoriteConfirmDialog.isOpen}
        onClose={handleCancelSingleRemoveFavorite}
        onConfirm={handleConfirmSingleRemoveFavorite}
        actionType="warning"
        config={{
          title: "确认取消收藏",
          content: `确定要取消收藏这个${
            singleFavoriteConfirmDialog.favoriteType === "activity"
              ? "活动"
              : singleFavoriteConfirmDialog.favoriteType === "post"
              ? "帖子"
              : singleFavoriteConfirmDialog.favoriteType === "exchange"
              ? "商品"
              : "内容"
          }吗？`,
          confirmText: "确认取消收藏",
          cancelText: "取消",
          variant: "warning",
        }}
      />

      {/* 批量取消收藏确认弹窗 */}
      <ConfirmActionDialog
        isOpen={showFavoritesConfirmDialog}
        onClose={handleCloseFavoritesConfirmDialog}
        onConfirm={handleConfirmBatchRemoveFavorites}
        actionType="warning"
        isLoading={isBatchRemovingFavorites}
        config={{
          title: "确认取消收藏",
          content: `确定要取消收藏选中的 ${selectedFavoriteIds.length} 个项目吗？此操作不可撤销。`,
          confirmText: "确认取消收藏",
          cancelText: "取消",
          variant: "warning",
        }}
      />
    </div>
  );
};

export default Profile;
