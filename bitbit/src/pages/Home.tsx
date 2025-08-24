import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FeaturedBanner,
  Grid,
  CategoryItem,
  SectionHeader,
  ExchangeModal,
  PurchaseModal,
} from "@/components/ui";
import { ActivityCard } from "@/features/activities";
import { ExchangeCard } from "@/features/exchange";
import PostCard from "@/features/community/components/PostCard";
import { getAllExchangeItems } from "@/shared/data/exchangeItems";
import { getPopularActivities } from "@/shared/data/activities";

const Home: FC = () => {
  const navigate = useNavigate();

  // 模态框状态
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    title: string;
    image: string;
    price: number;
    seller: { name: string; avatar: string; rating: number };
  } | null>(null);

  // 处理交换
  const handleExchange = (item: (typeof exchangeItems)[0]) => {
    setSelectedItem({
      id: item.id,
      title: item.title,
      image: item.image || "https://picsum.photos/400/400?random=default",
      price: item.price,
      seller: {
        name: item.seller.name,
        avatar:
          item.seller.avatar || "https://picsum.photos/40/40?random=seller",
        rating: item.seller.rating,
      },
    });
    setShowExchangeModal(true);
  };

  // 模拟数据
  const categories = [
    { id: "1", name: "运动", icon: "🏃", color: "primary" },
    { id: "2", name: "艺术", icon: "🎭", color: "coral" },
    { id: "3", name: "美食", icon: "🍳", color: "mint" },
    { id: "4", name: "学习", icon: "📚", color: "sunflower" },
    { id: "5", name: "心理", icon: "🧠", color: "lavender" },
    { id: "6", name: "户外", icon: "🌳", color: "primary" },
  ];

  const exchangeItems = getAllExchangeItems();
  const activities = getPopularActivities(2);

  const communityPosts = [
    {
      id: "1",
      author: {
        name: "嘉丽",
        avatar: "https://picsum.photos/40/40?random=3",
        isVerified: false,
      },
      content:
        "有没有喜欢摄影的朋友？周末一起去西湖拍照呀，顺便可以交流后期技巧~今天拍了几张不错的片子，大家看看效果如何？",
      images: [
        "https://picsum.photos/400/300?random=photography1",
        "https://picsum.photos/400/300?random=photography2",
        "https://picsum.photos/400/300?random=photography3",
      ],
      category: "learning" as const,
      publishTime: "2小时前",
      likes: 15,
      comments: 8,
      shares: 2,
      isLiked: false,
    },
    {
      id: "2",
      author: {
        name: "文轩",
        avatar: "https://picsum.photos/40/40?random=4",
        isVerified: true,
      },
      content:
        "推荐一本最近看的书《深度工作》，讲述如何在信息爆炸的时代保持专注。书中的理念对提高工作效率很有帮助，推荐给大家！这本书从心理学和神经科学的角度分析了专注力的重要性，提供了很多实用的方法来培养深度工作的能力。",
      category: "reading" as const,
      publishTime: "5小时前",
      likes: 23,
      comments: 12,
      shares: 7,
      isLiked: true,
      isBookmarked: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container size="lg" className="py-6 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">欢迎来到 BitBit</h1>
          <p className="mt-2 text-gray-600">连接同城，分享生活</p>
        </div>

        {/* 精选横幅 */}
        <FeaturedBanner
          title="周末音乐节"
          subtitle="6月25-26日 | 湖畔音乐广场"
          description="10+ 乐队现场表演，美食摊位，创意市集..."
          primaryButtonText="立即报名"
          secondaryButtonText="详情"
          onPrimaryClick={() => console.log("立即报名")}
          onSecondaryClick={() => console.log("查看详情")}
        />

        {/* 分类导航 */}
        <section className="space-y-4">
          <SectionHeader title="探索分类" />
          <Grid cols={6} gap="md">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                {...category}
                onClick={() =>
                  navigate(`/activities?category=${category.name}`)
                }
              />
            ))}
          </Grid>
        </section>

        {/* 热门活动 */}
        <section className="space-y-4">
          <SectionHeader
            title="热门活动"
            actionText="查看全部"
            onActionClick={() => navigate("/activities")}
          />
          <Grid cols={2} gap="lg">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                {...activity}
                onClick={() => navigate(`/activities/${activity.id}`)}
                onJoin={() => console.log(`参加活动: ${activity.title}`)}
              />
            ))}
          </Grid>
        </section>

        {/* 社区精选 */}
        <section className="space-y-4">
          <SectionHeader
            title="社区精选"
            actionText="查看全部"
            onActionClick={() => navigate("/community")}
          />
          <Grid cols={2} gap="lg">
            {communityPosts.map((post) => (
              <PostCard
                key={post.id}
                {...post}
                onClick={() => console.log(`查看帖子: ${post.id}`)}
                onLike={() => console.log(`点赞帖子: ${post.id}`)}
                onComment={() => console.log(`评论帖子: ${post.id}`)}
                onShare={() => console.log(`分享帖子: ${post.id}`)}
                onBookmark={() => console.log(`收藏帖子: ${post.id}`)}
              />
            ))}
          </Grid>
        </section>

        {/* 二手好物 */}
        <section className="space-y-4">
          <SectionHeader
            title="二手好物"
            actionText="查看全部"
            onActionClick={() => navigate("/exchange")}
          />
          {/* 水平滚动的4个紧凑卡片 */}
          <div className="flex gap-6 overflow-x-auto pb-4">
            {exchangeItems.slice(0, 4).map((item) => (
              <div key={item.id} className="flex-shrink-0">
                <ExchangeCard
                  {...item}
                  layout="compact"
                  onClick={() => navigate(`/exchange/${item.id}`)}
                  onExchange={() => handleExchange(item)}
                  onLike={() => console.log(`收藏商品: ${item.title}`)}
                />
              </div>
            ))}
          </div>
        </section>
      </Container>

      {/* 交换模态框 */}
      {selectedItem && (
        <ExchangeModal
          open={showExchangeModal}
          onClose={() => {
            setShowExchangeModal(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
          onConfirm={(data) => {
            console.log("交换请求数据:", data);
            // 这里可以调用API发送交换请求
          }}
        />
      )}

      {/* 购买模态框 */}
      {selectedItem && (
        <PurchaseModal
          open={showPurchaseModal}
          onClose={() => {
            setShowPurchaseModal(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
          onConfirm={(data) => {
            console.log("购买请求数据:", data);
            // 这里可以调用API发送购买请求
          }}
        />
      )}
    </div>
  );
};

export default Home;
