import { type FC } from "react";
import { Button } from "@/components/ui";
import { UserCardPopover, type UserInfo } from "@/shared/components";

interface ParticipantCardProps {
  participant: {
    id: string;
    name: string;
    fullName?: string;
    avatar?: string;
    color: string;
    age?: number;
    profession?: string;
    location?: string;
    activitiesCount?: number;
    organizedCount?: number;
    tags?: string[];
    isFollowed?: boolean;
    isOrganizer?: boolean;
    isOnline?: boolean;
  };
  onFollow?: (participantId: string) => void;
  onMessage?: (participantId: string) => void;
  onViewProfile?: (participantId: string) => void;
  className?: string;
  showPopover?: boolean;
}

const ParticipantCardEnhanced: FC<ParticipantCardProps> = ({
  participant,
  onFollow,
  onMessage,
  onViewProfile,
  className = "",
  showPopover = false,
}) => {
  const handleFollow = () => {
    if (onFollow) {
      onFollow(participant.id);
    }
  };

  const handleMessage = () => {
    if (onMessage) {
      onMessage(participant.id);
    }
  };

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(participant.id);
    }
  };

  // 转换为UserInfo格式
  const userInfo: UserInfo = {
    id: participant.id,
    name: participant.name,
    fullName: participant.fullName,
    avatar: participant.avatar,
    color: participant.color,
    age: participant.age,
    profession: participant.profession,
    location: participant.location,
    activitiesCount: participant.activitiesCount,
    organizedCount: participant.organizedCount,
    tags: participant.tags,
    isFollowed: participant.isFollowed,
    isOrganizer: participant.isOrganizer,
    isOnline: participant.isOnline,
  };

  const cardContent = (
    <div
      className={`bg-white rounded-lg shadow-lg border p-4 w-80 ${className}`}
    >
      <div className="flex items-start gap-3">
        {/* 头像 */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-medium text-lg relative cursor-pointer hover:scale-105 transition-transform"
          style={{ backgroundColor: participant.color }}
          onClick={handleViewProfile}
        >
          {participant.name}

          {/* 在线状态指示器 */}
          {participant.isOnline && (
            <div className="absolute -bottom-1 -right-1">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          )}
        </div>

        {/* 用户信息 */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4
              className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={handleViewProfile}
            >
              {participant.fullName || participant.name}
            </h4>
            {participant.isOrganizer && (
              <span className="bg-orange-400 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                组织者
              </span>
            )}
          </div>

          {participant.profession &&
            participant.age &&
            participant.location && (
              <p className="text-sm text-gray-600 mb-2">
                {participant.profession} · {participant.age}岁 ·{" "}
                {participant.location}
              </p>
            )}

          {(participant.activitiesCount !== undefined ||
            participant.organizedCount !== undefined) && (
            <p className="text-sm text-gray-500 mb-3">
              {participant.activitiesCount !== undefined &&
                `参与过${participant.activitiesCount}次活动`}
              {participant.activitiesCount !== undefined &&
                participant.organizedCount !== undefined &&
                " · "}
              {participant.organizedCount !== undefined &&
                (participant.organizedCount > 0
                  ? `组织过${participant.organizedCount}次活动`
                  : "新人")}
            </p>
          )}

          {/* 兴趣标签 */}
          {participant.tags && participant.tags.length > 0 && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {participant.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-2">
            <Button
              variant={participant.isFollowed ? "secondary" : "outline"}
              size="sm"
              onClick={handleFollow}
            >
              {participant.isFollowed ? "已关注" : "关注"}
            </Button>
            <Button variant="primary" size="sm" onClick={handleMessage}>
              私信
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // 如果启用弹窗，则用UserCardPopover包装
  if (showPopover) {
    return (
      <UserCardPopover
        user={userInfo}
        onFollow={onFollow}
        onMessage={onMessage}
        onViewProfile={onViewProfile}
      >
        {cardContent}
      </UserCardPopover>
    );
  }

  return cardContent;
};

export default ParticipantCardEnhanced;
