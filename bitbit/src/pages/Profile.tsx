import { type FC, useState, useEffect } from "react";
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
import { ActivityCard, PostCard } from "../components/ui/cards";
import { ExchangeCard } from "../features/exchange/components";
import { OrderCard, FavoriteCard, DraftCard } from "../components/ui";
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
  const { profileData, loading, error } = useProfile();
  const { activeTab, handleTabChange } = useProfileTabs();
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

  // 分页状态
  const activitiesPagination = usePagination({
    data: adaptedActivities,
    pageSize: 5,
  });
  const postsPagination = usePagination({ data: adaptedPosts, pageSize: 8 });
  const exchangePagination = usePagination({
    data: myExchangeItems,
    pageSize: 6,
  });
  const ordersPagination = usePagination({ data: myOrders, pageSize: 10 });
  const favoritesPagination = usePagination({
    data: myFavorites,
    pageSize: 10,
  });
  const draftsPagination = usePagination({ data: myDrafts, pageSize: 10 });

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
          <div className="space-y-6">
            {/* 活动筛选 */}
            <ActivityFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {/* 活动列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activitiesPagination.currentData.length > 0 ? (
                activitiesPagination.currentData.map((activity) => (
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
                <div className="text-center py-12">
                  <p className="text-gray-500">
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
            {/* 帖子网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {postsPagination.currentData.map((post) => (
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
              ))}
            </div>

            {/* 空状态 */}
            {postsPagination.currentData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">暂无帖子内容</p>
                <button
                  onClick={navigation.navigateToPublishPost}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
            {/* 我的商品 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                我发布的商品
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exchangePagination.currentData.map((item) => (
                  <ExchangeCard
                    key={item.id}
                    {...item}
                    layout="list"
                    mode="owner" // 设置为 owner 模式，表示用户自己发布的商品
                    onClick={() => navigation.navigateToExchangeDetail(item.id)}
                    onEdit={() => navigation.navigateToEditExchange(item.id)}
                    onToggleStatus={() => console.log("下架商品", item.id)}
                    onDelete={() => console.log("删除商品", item.id)}
                    onLike={() => console.log("点赞商品", item.id)}
                  />
                ))}
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
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">我的订单</h3>
              <div className="space-y-3">
                {ordersPagination.currentData.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onClick={() => navigation.navigateToOrderDetail(order.id)}
                  />
                ))}
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
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">暂无交易记录</p>
                  <button
                    onClick={navigation.navigateToPublishItem}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    发布第一个商品
                  </button>
                </div>
              )}
          </div>
        );

      case "favorites":
        return (
          <div className="space-y-4">
            {favoritesPagination.currentData.length > 0 ? (
              <>
                <div className="space-y-3">
                  {favoritesPagination.currentData.map((favorite) => (
                    <FavoriteCard
                      key={favorite.id}
                      favorite={favorite}
                      onClick={() => {
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
                      }}
                      onRemove={() => console.log("取消收藏", favorite.id)}
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
              <div className="text-center py-12">
                <p className="text-gray-500">暂无收藏内容</p>
              </div>
            )}
          </div>
        );

      case "drafts":
        return (
          <div className="space-y-4">
            {draftsPagination.currentData.length > 0 ? (
              <>
                <div className="space-y-3">
                  {draftsPagination.currentData.map((draft) => (
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
                  ))}
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
              <div className="text-center py-12">
                <p className="text-gray-500">暂无草稿</p>
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
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* 用户资料 */}
          <UserProfile
            user={profileData.user}
            onEditProfile={() => console.log("编辑资料")}
          />

          {/* 标签导航 */}
          <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />

          {/* 内容区域 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {renderTabContent()}
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

      {/* 活动通知弹窗 */}
      <ActivityNotificationModal
        isOpen={notificationModal.isOpen}
        onClose={() => setNotificationModal({ isOpen: false })}
        onSend={handleSendNotification}
        activityTitle={notificationModal.activityTitle || ""}
        participantCount={notificationModal.participantCount || 0}
      />
    </div>
  );
};

export default Profile;
