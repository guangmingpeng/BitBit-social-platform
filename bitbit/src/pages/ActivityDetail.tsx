import { type FC, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Card, CardContent, Button } from "@/components/ui";
import { useUserNavigation } from "../shared/utils/userNavigation";
import FloatingBackButton from "../components/common/FloatingBackButton";
import { getActivityById } from "@/shared/data/activities";
import { useSmartNavigation } from "@/shared/hooks/useSmartNavigation";
import { getActivityParticipationInfo } from "@/shared/utils/activityUtils";
import { navigateToChatFromActivity } from "@/features/chat/utils";
import type { Activity } from "@/shared/types";
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

interface ProfileActivity {
  id: string;
  status: "registered" | "organized" | "ended";
  title?: string;
  category?: string;
  date?: string;
  time?: string;
  location?: string;
  description?: string;
}

interface LocationState {
  fromProfile?: boolean;
  fromChat?: boolean; // 从聊天群设置跳转
  profileData?: {
    activities?: ProfileActivity[];
  };
}

const ActivityDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const userNavigation = useUserNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const { smartGoBack, navigateWithSource } = useSmartNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [activityData, setActivityData] = useState<Activity | null>(null);

  // 获取活动详情并处理用户参与状态
  useEffect(() => {
    if (!id) return;

    const baseActivity = getActivityById(id);
    if (!baseActivity) {
      setActivityData(null);
      return;
    }

    // 根据来源确定用户参与状态
    const state = location.state as LocationState;
    if (state?.fromProfile && state.profileData?.activities) {
      const profileActivity = state.profileData.activities.find(
        (a: ProfileActivity) => a.id === baseActivity.id
      );
      if (profileActivity) {
        // 基于profile中的活动状态设置isJoined和组织者状态
        let isJoined = false;

        // 根据profile活动状态确定参与状态
        if (profileActivity.status === "registered") {
          isJoined = true;
        } else if (profileActivity.status === "organized") {
          // 对于组织的活动，设置组织者为当前用户，并且默认已报名
          isJoined = true;
        }

        setActivityData({ ...baseActivity, isJoined });
        return;
      }
    }

    setActivityData(baseActivity);
  }, [id, location.state]);

  if (!activityData) {
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

  const participationInfo = getActivityParticipationInfo(activityData);

  const handleJoin = () => {
    if (!activityData) return;

    if (participationInfo.canJoin) {
      // 跳转到报名页面，使用智能导航记录来源
      navigateWithSource("activity-detail")(
        `/activities/${activityData.id}/register`
      );
    }
  };

  const handleLeave = () => {
    if (!activityData) return;

    if (participationInfo.canLeave) {
      // 确认取消报名
      const confirmed = window.confirm(
        "确定要取消报名吗？取消后可能无法再次报名。"
      );
      if (confirmed) {
        // 这里应该调用API取消报名
        console.log("取消报名:", activityData.title);
        alert("已成功取消报名");
        // 更新活动状态
        setActivityData({ ...activityData, isJoined: false });
      }
    }
  };

  const handleShare = () => {
    if (!activityData) return;
    // 分享活动逻辑
    console.log("分享活动:", activityData.title);
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
    if (!participationInfo.ended) {
      console.log("评论活动");
    }
  };

  const handleCreateSimilar = () => {
    // 跳转到创建活动页面
    navigateWithSource("activity-detail")("/publish-activity");
  };

  // 处理加入聊天群
  const handleJoinChat = () => {
    if (activityData) {
      // 导航到活动群聊
      const conversationId = `activity-chat-${activityData.id}`;
      navigateToChatFromActivity(
        navigate,
        activityData.id,
        activityData.title,
        conversationId
      );
    }
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
    // 使用智能导航跳转到用户页面
    userNavigation.smartNavigateToUser(participantId);
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
          activity={activityData}
          onShare={handleShare}
          onLike={handleLike}
          isLiked={isLiked}
        />

        {/* 内容卡片 */}
        <div className="relative -mt-8">
          <Card className="overflow-hidden rounded-t-3xl">
            <CardContent className="p-6 space-y-6">
              {/* 活动基本信息 */}
              <ActivityBasicInfo activity={activityData} />

              {/* 组织者信息 */}
              <OrganizerInfo activity={activityData} onFollow={handleFollow} />

              {/* 参与者统计概览 */}
              <ParticipantStats activity={activityData} />

              {/* 参与者头像列表 */}
              <ParticipantAvatars
                activity={activityData}
                onViewAll={handleViewAllParticipants}
                onFollowParticipant={handleFollowParticipant}
                onMessageParticipant={handleMessageParticipant}
                onViewProfile={handleViewProfile}
              />

              {/* 活动详情 */}
              <ActivityContent activity={activityData} />

              {/* 活动地点 */}
              <ActivityLocation
                activity={activityData}
                onViewDetails={handleViewLocationDetails}
                onNavigate={handleNavigate}
              />

              {/* 操作按钮区域 */}
              <ActivityActions
                activity={activityData}
                onJoin={handleJoin}
                onLeave={handleLeave}
                onComment={handleComment}
                onCreateSimilar={handleCreateSimilar}
                onJoinChat={handleJoinChat}
              />
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default ActivityDetail;
