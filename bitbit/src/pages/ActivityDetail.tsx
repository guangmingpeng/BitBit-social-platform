import { type FC, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, CardContent, Button } from "@/components/ui";
import { FloatingBackButton } from "@/components/common";
import { getActivityById } from "@/shared/data/activities";
import { useSmartNavigation } from "@/shared/hooks/useSmartNavigation";
import {
  ActivityHeader,
  ActivityBasicInfo,
  OrganizerInfo,
  ActivityContent,
  ActivityLocation,
  ParticipantStats,
  ParticipantAvatars,
  ActivityActions,
} from "@/features/activities/components";

const ActivityDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { smartGoBack, navigateWithSource } = useSmartNavigation();
  const [isLiked, setIsLiked] = useState(false);

  // 获取活动详情
  const activity = id ? getActivityById(id) : null;

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container size="lg" className="py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              活动不存在
            </h1>
            <p className="text-text-secondary mb-6">
              抱歉，您查找的活动不存在或已被删除。
            </p>
            <Button onClick={() => navigate("/activities")}>
              返回活动列表
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const handleJoin = () => {
    const isFull = activity.currentParticipants >= activity.maxParticipants;
    if (!isFull) {
      // 跳转到报名页面，使用智能导航记录来源
      navigateWithSource("activity-detail")(
        `/activities/${activity.id}/register`
      );
    }
  };

  const handleShare = () => {
    // 分享活动逻辑
    console.log("分享活动:", activity.title);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleViewAllParticipants = () => {
    console.log("查看全部参与者");
  };

  const handleFollow = () => {
    console.log("关注组织者");
  };

  const handleComment = () => {
    console.log("评论活动");
  };

  const handleCreateSimilar = () => {
    // 跳转到创建活动页面
    navigateWithSource("activity-detail")("/publish-activity");
  };
  const handleViewLocationDetails = () => {
    console.log("查看详细地址");
  };

  const handleNavigate = () => {
    console.log("导航到活动地点");
  };

  const handleFollowParticipant = (participantId: string) => {
    console.log("关注参与者:", participantId);
  };

  const handleMessageParticipant = (participantId: string) => {
    console.log("发送私信给参与者:", participantId);
  };

  const handleViewProfile = (participantId: string) => {
    // 跳转到用户个人主页
    navigateWithSource("activity-detail")(`/profile/${participantId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 左侧浮动返回按钮 */}
      <FloatingBackButton
        text="返回上页"
        variant="elegant"
        size="md"
        onClick={smartGoBack}
      />

      <Container size="lg" className="py-0 pl-12 md:pl-16 lg:pl-20">
        {/* 头部图片区域 */}
        <ActivityHeader
          activity={activity}
          onShare={handleShare}
          onLike={handleLike}
          isLiked={isLiked}
        />

        {/* 内容卡片 */}
        <div className="relative -mt-8">
          <Card className="overflow-hidden rounded-t-3xl">
            <CardContent className="p-6 space-y-6">
              {/* 活动基本信息 */}
              <ActivityBasicInfo activity={activity} />

              {/* 组织者信息 */}
              <OrganizerInfo activity={activity} onFollow={handleFollow} />

              {/* 参与者统计概览 */}
              <ParticipantStats activity={activity} />

              {/* 参与者头像列表 */}
              <ParticipantAvatars
                activity={activity}
                onViewAll={handleViewAllParticipants}
                onFollowParticipant={handleFollowParticipant}
                onMessageParticipant={handleMessageParticipant}
                onViewProfile={handleViewProfile}
              />

              {/* 活动详情 */}
              <ActivityContent activity={activity} />

              {/* 活动地点 */}
              <ActivityLocation
                activity={activity}
                onViewDetails={handleViewLocationDetails}
                onNavigate={handleNavigate}
              />

              {/* 操作按钮区域 */}
              <ActivityActions
                activity={activity}
                onJoin={handleJoin}
                onComment={handleComment}
                onCreateSimilar={handleCreateSimilar}
              />
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default ActivityDetail;
