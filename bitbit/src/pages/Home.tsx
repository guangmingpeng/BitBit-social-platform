import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FeaturedBanner,
  Grid,
  CategoryItem,
  SectionHeader,
  ActivityCard,
  ExchangeItem,
} from "@/components/ui";
import PostCard from "@/features/community/components/PostCard";

const Home: FC = () => {
  const navigate = useNavigate();
  // 模拟数据
  const categories = [
    { id: "1", name: "运动", icon: "🏃", color: "primary" },
    { id: "2", name: "艺术", icon: "🎭", color: "coral" },
    { id: "3", name: "美食", icon: "🍳", color: "mint" },
    { id: "4", name: "学习", icon: "📚", color: "sunflower" },
    { id: "5", name: "心理", icon: "🧠", color: "lavender" },
    { id: "6", name: "户外", icon: "🌳", color: "primary" },
  ];

  const activities = [
    {
      id: "1",
      title: "爵士乐现场演出",
      description: "享受一场精彩的爵士乐演出，与音乐爱好者一起度过美好的夜晚",
      category: "music" as const,
      date: "8月25日",
      time: "20:00-22:00",
      location: "蓝调酒吧",
      currentParticipants: 42,
      maxParticipants: 50,
      organizer: {
        name: "音乐协会",
        avatar: "https://picsum.photos/40/40?random=1",
      },
      images: ["https://picsum.photos/300/200?random=jazz"],
      price: 68,
    },
    {
      id: "2",
      title: "咖啡品鉴工作坊",
      description: "学习咖啡品鉴技巧，从基础知识到专业技能",
      category: "food" as const,
      date: "8月26日",
      time: "14:00-16:00",
      location: "星空咖啡馆",
      currentParticipants: 18,
      maxParticipants: 25,
      organizer: {
        name: "咖啡达人",
        avatar: "https://picsum.photos/40/40?random=2",
      },
      images: ["https://picsum.photos/300/200?random=coffee"],
      price: 128,
    },
  ];

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
      // 没有图片，测试无图片时的布局
      category: "reading" as const,
      publishTime: "5小时前",
      likes: 23,
      comments: 12,
      shares: 7,
      isLiked: true,
      isBookmarked: true,
    },
  ];

  const exchangeItems = [
    {
      id: "1",
      title: "二手书籍合集",
      condition: "90%新",
      category: "文学类",
      price: 50,
      image: "https://picsum.photos/300/200?random=books",
      icon: "📚",
    },
    {
      id: "2",
      title: "iPhone 12",
      condition: "95%新",
      category: "128GB",
      price: 3200,
      image: "https://picsum.photos/300/200?random=phone",
      icon: "📱",
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
                onClick={() => console.log(`查看活动: ${activity.title}`)}
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
          <Grid cols={2} gap="lg">
            {exchangeItems.map((item) => (
              <ExchangeItem
                key={item.id}
                {...item}
                onClick={() => console.log(`查看商品: ${item.title}`)}
                onExchange={() => console.log(`交换商品: ${item.title}`)}
              />
            ))}
          </Grid>
        </section>
      </Container>
    </div>
  );
};

export default Home;
