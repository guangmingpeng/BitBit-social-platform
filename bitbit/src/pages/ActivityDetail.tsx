import { type FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Button,
  Tag,
  Avatar,
  Icon,
  Breadcrumb,
} from "@/components/ui";
import { getActivityById } from "@/shared/data/activities";

const ActivityDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 获取活动详情
  const activity = id ? getActivityById(id) : null;

  if (!activity) {
    return (
      <Container size="lg" className="py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            活动不存在
          </h1>
          <p className="text-text-secondary mb-6">
            抱歉，您查找的活动不存在或已被删除。
          </p>
          <Button onClick={() => navigate("/activities")}>返回活动列表</Button>
        </div>
      </Container>
    );
  }

  const categoryConfig = {
    music: { variant: "music" as const, label: "音乐", emoji: "🎵" },
    food: { variant: "food" as const, label: "美食", emoji: "🍽️" },
    learning: { variant: "learning" as const, label: "学习", emoji: "📚" },
    reading: { variant: "reading" as const, label: "阅读", emoji: "📖" },
  };

  const participationRate =
    (activity.currentParticipants / activity.maxParticipants) * 100;
  const isAlmostFull = participationRate >= 80;
  const isFull = activity.currentParticipants >= activity.maxParticipants;

  const handleJoin = () => {
    if (!isFull) {
      // 跳转到报名页面
      navigate(`/activities/${activity.id}/register`);
    }
  };

  const handleShare = () => {
    // 分享活动逻辑
    console.log("分享活动:", activity.title);
  };

  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "活动", href: "/activities" },
    { label: activity.title, current: true },
  ];

  return (
    <Container size="lg" className="py-6 space-y-6">
      {/* 面包屑导航 */}
      <Breadcrumb items={breadcrumbItems} />

      {/* 活动主要信息 */}
      <Card className="overflow-hidden">
        {/* 活动封面图 */}
        {activity.images && activity.images.length > 0 && (
          <div className="relative h-80 overflow-hidden">
            <img
              src={activity.images[0]}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <Tag
                variant={categoryConfig[activity.category].variant}
                size="lg"
                className="mb-3"
              >
                {categoryConfig[activity.category].emoji}{" "}
                {categoryConfig[activity.category].label}
              </Tag>
              <h1 className="text-3xl font-bold text-white mb-2">
                {activity.title}
              </h1>
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-2">
                  <Icon name="calendar" size="sm" />
                  <span>
                    {activity.date} {activity.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="location" size="sm" />
                  <span>{activity.location}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <CardContent className="p-6">
          {/* 活动基本信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* 左侧：活动详情 */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  活动详情
                </h2>
                <div
                  className="prose max-w-none text-text-secondary"
                  dangerouslySetInnerHTML={{
                    __html: activity.detailContent || activity.description,
                  }}
                />
              </div>

              {/* 活动标签 */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">
                  活动标签
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activity.tags.map((tag, index) => (
                    <Tag key={index} variant="secondary" size="sm">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧：操作面板 */}
            <div className="space-y-6">
              {/* 价格信息 */}
              <Card>
                <CardContent className="p-4">
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-primary-500">
                      {activity.isFree ? "免费活动" : `¥${activity.price}`}
                    </div>
                    {!activity.isFree && (
                      <div className="text-sm text-text-secondary">
                        每人费用
                      </div>
                    )}
                  </div>

                  {/* 参与人数 */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-text-secondary">
                        参与人数
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          isAlmostFull ? "text-warning" : "text-text-primary"
                        }`}
                      >
                        {activity.currentParticipants}/
                        {activity.maxParticipants}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isAlmostFull ? "bg-warning" : "bg-primary-500"
                        }`}
                        style={{
                          width: `${Math.min(participationRate, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleJoin}
                      disabled={isFull}
                      className="w-full"
                      size="lg"
                    >
                      {isFull ? "活动已满" : "立即报名"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleShare}
                      className="w-full"
                      size="lg"
                    >
                      分享活动
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 组织者信息 */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    活动组织者
                  </h3>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={activity.organizer.avatar}
                      fallback={activity.organizer.username}
                      size="md"
                    />
                    <div>
                      <div className="font-medium text-text-primary">
                        {activity.organizer.username}
                      </div>
                      <div className="text-sm text-text-secondary">
                        {activity.organizer.bio}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 时间地点信息 */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    时间地点
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon
                        name="calendar"
                        className="mt-1 text-text-secondary"
                      />
                      <div>
                        <div className="font-medium text-text-primary">
                          {activity.date}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon
                        name="location"
                        className="mt-1 text-text-secondary"
                      />
                      <div>
                        <div className="font-medium text-text-primary">
                          {activity.location}
                        </div>
                        <div className="text-sm text-text-secondary">
                          活动地点
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 相关活动推荐 */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          相关活动推荐
        </h2>
        <div className="text-center py-8 text-text-secondary">
          暂无相关活动推荐
        </div>
      </div>
    </Container>
  );
};

export default ActivityDetail;
