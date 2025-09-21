import { type FC, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Container,
  Breadcrumb,
  Button,
  Card,
  CardContent,
  Badge,
  Avatar,
  ExchangeModal,
  PurchaseModal,
} from "@/components/ui";
import { FloatingBackButton, ConfirmActionDialog } from "@/components/common";
import { ExchangeCard } from "@/features/exchange";
import { navigateToChatFromExchange } from "@/features/chat/utils";
import { cn } from "@/shared/utils/cn";
import {
  getExchangeItemById,
  getRecommendedItems,
} from "@/shared/data/exchangeItems";
import { useSmartNavigation } from "@/shared/hooks/useSmartNavigation";
import { useExchangeActions } from "@/shared/hooks";
import { useDispatch } from "react-redux";
import { showToast } from "@/store/slices/uiSlice";

const ExchangeDetail: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { smartGoBack } = useSmartNavigation();
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [viewHistory, setViewHistory] = useState<string[]>([]);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [localExchangeItem, setLocalExchangeItem] =
    useState<typeof exchangeItem>(null);

  // 商品操作相关
  const exchangeActions = useExchangeActions({
    onToggleStatus: async (
      itemId: string,
      newStatus: "available" | "hidden"
    ) => {
      // 这里应该调用实际的API来更新商品状态
      console.log(`Toggling status for item ${itemId} to ${newStatus}`);

      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 更新成功后，立即更新本地状态以同步UI
      if (exchangeItem && exchangeItem.id === itemId) {
        setLocalExchangeItem((prevItem) => {
          if (!prevItem) return null;
          return {
            ...prevItem,
            status: newStatus,
          };
        });
      }
    },
    onSuccess: () => {
      dispatch(
        showToast({
          message: "状态更新成功",
          type: "success",
        })
      );
    },
    onError: (_action: "toggle-status", error: string) => {
      dispatch(
        showToast({
          message: `操作失败: ${error}`,
          type: "error",
        })
      );
    },
  });

  // 获取导航状态信息
  const fromProfile = location.state?.fromSource === "profile";
  // const profileTab = location.state?.profileTab;

  // 当前用户ID (这里使用模拟数据，实际应该从Redux store或context获取)
  // const currentUserId = "user-me"; // 这个应该从用户状态管理获取

  // 获取商品信息
  const exchangeItem = getExchangeItemById(id || "1");

  // 初始化本地商品状态
  useEffect(() => {
    if (exchangeItem) {
      setLocalExchangeItem(exchangeItem);
    }
  }, [exchangeItem]);

  // 检查是否是商品发布者
  const isOwner =
    exchangeItem &&
    (exchangeItem.seller.name === "子龙" || // 临时判断逻辑，实际应该比较用户ID
      fromProfile); // 如果从profile页面跳转过来，假设是发布者

  // 当ID变化时重置状态并更新浏览历史
  useEffect(() => {
    setCurrentImageIndex(0);
    setIsLiked(false);

    // 更新浏览历史
    const currentId = id || "1";
    setViewHistory((prev) => {
      const newHistory = prev.filter((historyId) => historyId !== currentId);
      return [currentId, ...newHistory].slice(0, 5); // 最多保存5个历史记录
    });
  }, [id]);

  // 如果商品不存在，显示错误或重定向到列表页
  if (!exchangeItem) {
    return (
      <Container size="lg" className="py-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            商品不存在
          </h1>
          <p className="text-text-secondary mb-6">
            该商品可能已被删除或ID不正确
          </p>
          <Button onClick={() => navigate("/exchange")}>返回商品列表</Button>
        </div>
      </Container>
    );
  }

  // 推荐商品 - 排除当前商品
  const recommendedItems = getRecommendedItems(id || "1", 3);

  // 根据来源设置面包屑导航
  const breadcrumbItems = fromProfile
    ? [
        { label: "首页", href: "/" },
        { label: "个人中心", href: "/profile" },
        { label: "我的交易", href: "/profile/trades" },
        { label: exchangeItem.title, current: true },
      ]
    : [
        { label: "首页", href: "/" },
        { label: "二手交换", href: "/exchange" },
        { label: exchangeItem.title, current: true },
      ];

  const statusConfig = {
    available: { label: "在售", color: "bg-primary-100 text-primary-500" },
    reserved: { label: "已预定", color: "bg-coral-100 text-coral-500" },
    sold: { label: "已售出", color: "bg-gray-200 text-text-tertiary" },
    hot: { label: "火热", color: "bg-sunflower-100 text-sunflower-500" },
    urgent: { label: "急售", color: "bg-lavender-100 text-lavender-500" },
    new: { label: "新品", color: "bg-mint-100 text-mint-500" },
    hidden: {
      label: "已下架",
      color: "bg-red-100 text-red-600 border border-red-200",
    },
  };

  const handleContact = () => {
    if (exchangeItem) {
      // 导航到聊天页面
      // 临时生成seller ID，实际应该从数据中获取
      const sellerId = `seller-${exchangeItem.id}`;

      navigateToChatFromExchange(
        navigate,
        sellerId,
        {
          name: exchangeItem.seller.name,
          avatar: exchangeItem.seller.avatar,
        },
        {
          id: exchangeItem.id,
          title: exchangeItem.title,
        }
      );
    }
  };

  const handleExchange = () => {
    setShowExchangeModal(true);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32 relative">
      {/* 左侧浮动返回按钮 */}
      <FloatingBackButton
        text="返回上页"
        variant="elegant"
        size="md"
        onClick={smartGoBack}
      />

      <Container size="lg" className="py-6 space-y-6 pl-12 md:pl-16 lg:pl-20">
        {/* 面包屑导航 */}
        <div className="flex items-center justify-between">
          <Breadcrumb items={breadcrumbItems} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // 根据来源返回到相应页面
              if (fromProfile) {
                navigate("/profile/trades");
              } else {
                navigate("/exchange");
              }
            }}
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            {fromProfile ? "返回我的交易" : "返回列表"}
          </Button>
        </div>

        {/* 浏览历史和导航 */}
        {viewHistory.length > 1 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-4">
              {/* 返回上个商品按钮 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="flex items-center gap-2 bg-white/80 hover:bg-white border border-blue-200 text-blue-700 hover:text-blue-800 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                上个商品
              </Button>

              {/* 分隔线 */}
              <div className="w-px h-6 bg-blue-300"></div>

              {/* 浏览历史 */}
              <div className="flex items-center gap-3 flex-1">
                <span className="text-sm font-medium text-blue-700 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  浏览历史:
                </span>
                <div className="flex items-center gap-2 overflow-x-auto">
                  {viewHistory.slice(1).map((historyId, index) => {
                    const historyItem = getExchangeItemById(historyId);
                    if (!historyItem) return null;
                    return (
                      <button
                        key={historyId}
                        onClick={() => navigate(`/exchange/${historyId}`)}
                        className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-white/90 hover:bg-white border border-blue-200 rounded-lg hover:shadow-sm transition-all text-sm group"
                        title={`查看: ${historyItem.title}`}
                      >
                        <span className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-500 transition-colors"></span>
                        <span className="text-blue-700 group-hover:text-blue-800 max-w-[120px] truncate font-medium">
                          {historyItem.title}
                        </span>
                        {index === 0 && (
                          <span className="text-xs text-blue-500 bg-blue-100 px-1.5 py-0.5 rounded">
                            刚才
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={cn(
            "grid lg:grid-cols-3 gap-8 transition-opacity duration-300",
            (localExchangeItem || exchangeItem)?.status === "hidden" &&
              "opacity-75"
          )}
        >
          {/* 左侧内容区 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 商品图片 */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* 主图 */}
                  <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={
                        exchangeItem.images?.[currentImageIndex] ||
                        exchangeItem.image ||
                        "https://picsum.photos/400/400?random=default"
                      }
                      alt={exchangeItem.title}
                      className="w-full h-full object-cover"
                    />
                    {/* 状态标签 */}
                    <div
                      className={cn(
                        "absolute top-4 left-4 px-3 py-1 rounded-lg text-sm font-medium",
                        statusConfig[exchangeItem.status].color
                      )}
                    >
                      {statusConfig[exchangeItem.status].label}
                    </div>
                    {/* 收藏按钮 */}
                    <button
                      onClick={handleLike}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-card hover:shadow-modal transition-all"
                    >
                      <span
                        className={cn(
                          "text-lg",
                          isLiked ? "text-coral-500" : "text-text-tertiary"
                        )}
                      >
                        {isLiked ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>

                  {/* 缩略图 */}
                  {exchangeItem.images && exchangeItem.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {exchangeItem.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={cn(
                            "w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0",
                            currentImageIndex === index
                              ? "border-primary-500"
                              : "border-gray-200"
                          )}
                        >
                          <img
                            src={image}
                            alt={`${exchangeItem.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 商品信息 */}
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* 标题和价格 */}
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-text-primary">
                    {exchangeItem.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-secondary">
                      {exchangeItem.condition} | {exchangeItem.category}
                    </span>
                    <span className="text-sm text-text-tertiary">•</span>
                    <span className="text-sm text-text-tertiary">
                      {exchangeItem.location}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-primary-500">
                      ¥{exchangeItem.price.toLocaleString()}
                    </span>
                    {exchangeItem.originalPrice && (
                      <span className="text-lg text-text-tertiary line-through">
                        ¥{exchangeItem.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <Badge variant="secondary" className="ml-2">
                      省 ¥
                      {(
                        exchangeItem.originalPrice! - exchangeItem.price
                      ).toLocaleString()}
                    </Badge>
                  </div>
                </div>

                {/* 统计信息 */}
                <div className="flex items-center gap-6 text-sm text-text-tertiary">
                  <span className="flex items-center gap-1">
                    <span>👁</span>
                    {exchangeItem.stats.views} 浏览
                  </span>
                  <span className="flex items-center gap-1">
                    <span>❤</span>
                    {exchangeItem.stats.likes} 喜欢
                  </span>
                  <span className="flex items-center gap-1">
                    <span>💬</span>
                    {exchangeItem.stats.comments} 评论
                  </span>
                  <span className="flex items-center gap-1">
                    <span>🕒</span>
                    {exchangeItem.timeAgo}
                  </span>
                </div>

                {/* 商品描述 */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-text-primary">
                    商品描述
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {exchangeItem.description}
                  </p>
                </div>

                {/* 商品规格 */}
                {exchangeItem.specifications &&
                  exchangeItem.specifications.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-text-primary">
                        商品规格
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {exchangeItem.specifications.map((spec, index) => (
                          <div
                            key={index}
                            className="flex justify-between py-2 border-b border-gray-100"
                          >
                            <span className="text-text-secondary">
                              {spec.label}
                            </span>
                            <span className="text-text-primary font-medium">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* 交换偏好 */}
                {exchangeItem.exchangePreferences &&
                  exchangeItem.exchangePreferences.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-text-primary">
                        交换偏好
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {exchangeItem.exchangePreferences.map(
                          (preference, index) => (
                            <Badge key={index} variant="secondary">
                              {preference}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>

          {/* 右侧侧边栏 */}
          <div className="space-y-6">
            {/* 卖家信息 */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  卖家信息
                </h3>

                <div className="flex items-center gap-3">
                  <Avatar
                    src={exchangeItem.seller.avatar}
                    alt={exchangeItem.seller.name}
                    fallback={exchangeItem.seller.initials}
                    size="lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">
                      {exchangeItem.seller.name}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-text-tertiary">
                      <span className="text-sunflower-500">⭐</span>
                      <span>{exchangeItem.seller.rating}</span>
                      <span>•</span>
                      <span>已售 {exchangeItem.seller.soldCount} 件</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">加入时间</span>
                    <span className="text-text-primary">
                      {exchangeItem.seller.joinDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">回复率</span>
                    <span className="text-text-primary">
                      {exchangeItem.seller.responseRate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">回复时间</span>
                    <span className="text-text-primary">
                      {exchangeItem.seller.responseTime}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  {isOwner ? (
                    // 如果是商品发布者，显示管理按钮
                    <>
                      <div className="space-y-3">
                        <Button
                          variant="primary"
                          size="md"
                          className="w-full"
                          onClick={() => {
                            // 跳转到编辑页面
                            navigate(
                              `/exchange/publish?edit=${exchangeItem.id}`
                            );
                          }}
                        >
                          <span className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            编辑商品
                          </span>
                        </Button>
                        <Button
                          variant="secondary"
                          size="md"
                          className="w-full"
                          onClick={() => {
                            const currentItem =
                              localExchangeItem || exchangeItem;
                            if (currentItem) {
                              exchangeActions.showToggleStatusDialog(
                                currentItem.id,
                                currentItem.title,
                                currentItem.status === "available"
                                  ? "available"
                                  : "hidden"
                              );
                            }
                          }}
                        >
                          <span className="flex items-center gap-2">
                            {(localExchangeItem || exchangeItem)?.status ===
                            "available" ? (
                              // 下架图标 - 眼睛斜线（隐藏）
                              <svg
                                className="w-4 h-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                  clipRule="evenodd"
                                />
                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                              </svg>
                            ) : (
                              // 上架图标 - 眼睛（可见）
                              <svg
                                className="w-4 h-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path
                                  fillRule="evenodd"
                                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            {(localExchangeItem || exchangeItem)?.status ===
                            "available"
                              ? "下架"
                              : "重新上架"}
                          </span>
                        </Button>
                      </div>
                    </>
                  ) : (
                    // 如果不是发布者，显示交换和联系按钮
                    <>
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                        onClick={handleExchange}
                      >
                        <span className="flex items-center gap-2 justify-center">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                          </svg>
                          立即交换
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] border-2 hover:border-blue-300"
                        onClick={handleContact}
                      >
                        <span className="flex items-center gap-2 justify-center">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          联系卖家
                        </span>
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 相关推荐 */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-text-primary">
                  相关推荐
                </h3>

                {/* 提示信息移到标题下方 */}
                <div className="text-xs text-text-tertiary bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                  💡 提示: Ctrl+点击可在新窗口打开，或使用右上角的 ↗ 按钮
                </div>

                <div className="space-y-3">
                  {recommendedItems.map((item) => (
                    <div key={item.id} className="relative group">
                      {/* 为了处理键盘修饰符，我们用一个包装div */}
                      <div
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault();
                          console.log(
                            `点击推荐商品: ${item.title}, ID: ${item.id}`
                          );

                          // 检查是否按住 Ctrl/Cmd 键
                          if (e.ctrlKey || e.metaKey) {
                            window.open(`/exchange/${item.id}`, "_blank");
                          } else {
                            navigate(`/exchange/${item.id}`);
                          }
                        }}
                        className="cursor-pointer"
                      >
                        <ExchangeCard
                          {...item}
                          layout="sidebar"
                          onExchange={() =>
                            console.log(`交换商品: ${item.title}`)
                          }
                          onLike={() => console.log(`收藏商品: ${item.title}`)}
                        />
                      </div>

                      {/* 新窗口打开按钮 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`/exchange/${item.id}`, "_blank");
                        }}
                        className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full shadow-sm border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-gray-50"
                        title="在新窗口打开"
                      >
                        <svg
                          className="w-3 h-3 text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-1a1 1 0 10-2 0v1H5V7h1a1 1 0 000-2H5z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 交换模态框 */}
        <ExchangeModal
          open={showExchangeModal}
          onClose={() => setShowExchangeModal(false)}
          item={{
            id: exchangeItem.id,
            title: exchangeItem.title,
            image:
              exchangeItem.image ||
              "https://picsum.photos/400/400?random=default",
            price: exchangeItem.price,
            seller: {
              name: exchangeItem.seller.name,
              avatar:
                exchangeItem.seller.avatar ||
                "https://picsum.photos/40/40?random=seller",
              rating: exchangeItem.seller.rating,
            },
          }}
          onConfirm={(data) => {
            console.log("交换请求数据:", data);
            // 这里可以调用API发送交换请求
          }}
        />

        {/* 购买模态框 */}
        <PurchaseModal
          open={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
          item={{
            id: exchangeItem.id,
            title: exchangeItem.title,
            image:
              exchangeItem.image ||
              "https://picsum.photos/400/400?random=default",
            price: exchangeItem.price,
            seller: {
              name: exchangeItem.seller.name,
              avatar:
                exchangeItem.seller.avatar ||
                "https://picsum.photos/40/40?random=seller",
              rating: exchangeItem.seller.rating,
            },
          }}
          onConfirm={(data) => {
            console.log("购买请求数据:", data);
            // 这里可以调用API发送购买请求
          }}
        />

        {/* 商品操作确认弹窗 */}
        <ConfirmActionDialog
          isOpen={exchangeActions.confirmDialog.isOpen}
          onClose={exchangeActions.closeDialog}
          onConfirm={exchangeActions.confirmAction}
          actionType={exchangeActions.confirmDialog.type || "warning"}
          isLoading={exchangeActions.isLoading}
          config={
            exchangeActions.confirmDialog.type === "toggle-status"
              ? exchangeActions.confirmDialog.currentStatus === "available"
                ? {
                    title: "确认下架商品",
                    content: `确定要下架商品「${exchangeActions.confirmDialog.itemTitle}」吗？下架后商品将不会在市场中显示，您可以随时重新上架。`,
                    confirmText: "确认下架",
                  }
                : {
                    title: "确认上架商品",
                    content: `确定要上架商品「${exchangeActions.confirmDialog.itemTitle}」吗？上架后商品将重新在市场中显示。`,
                    confirmText: "确认上架",
                  }
              : undefined
          }
        />
      </Container>
    </div>
  );
};

export default ExchangeDetail;
