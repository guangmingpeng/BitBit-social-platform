import { type FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { ExchangeCard } from "@/features/exchange";
import { cn } from "@/shared/utils/cn";
import {
  getExchangeItemById,
  getRecommendedItems,
} from "@/shared/data/exchangeItems";

const ExchangeDetail: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [viewHistory, setViewHistory] = useState<string[]>([]);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

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

  const exchangeItem = getExchangeItemById(id || "1");

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

  const breadcrumbItems = [
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
  };

  const handleContact = () => {
    setShowPurchaseModal(true);
  };

  const handleExchange = () => {
    setShowExchangeModal(true);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Container size="lg" className="py-6 space-y-6">
      {/* 面包屑导航 */}
      <div className="flex items-center justify-between">
        <Breadcrumb items={breadcrumbItems} />
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/exchange")}
          className="flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          返回列表
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
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
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

      <div className="grid lg:grid-cols-3 gap-8">
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
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleExchange}
                >
                  立即交换
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={handleContact}
                >
                  联系卖家
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 相关推荐 */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">
                相关推荐
              </h3>

              {/* 提示信息移到标题下方 */}
              <div className="text-xs text-text-tertiary bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                💡 提示: Ctrl+点击可在新窗口打开，或使用右上角的 ↗ 按钮
              </div>

              <div className="space-y-4">
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
    </Container>
  );
};

export default ExchangeDetail;
