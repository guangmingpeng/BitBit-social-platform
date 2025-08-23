import React from "react";
import { Card, CardContent, Avatar, Tag, Button } from "@/components/ui";
import { cn } from "@/shared/utils/cn";

export interface UserCardProps {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  location?: string;
  interests: string[];
  mutualFriends?: number;
  isFollowing?: boolean;
  isOnline?: boolean;
  joinedDate: string;
  className?: string;
  onFollow?: () => void;
  onMessage?: () => void;
  onClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  bio,
  avatar,
  location,
  interests,
  mutualFriends,
  isFollowing = false,
  isOnline = false,
  joinedDate,
  className,
  onFollow,
  onMessage,
  onClick,
}) => {
  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFollow?.();
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMessage?.();
  };

  const handleCardClick = () => {
    onClick?.();
  };

  return (
    <Card
      className={cn("group cursor-pointer", className)}
      hover
      onClick={handleCardClick}
    >
      <CardContent className="p-6 text-center space-y-4">
        {/* 头像 */}
        <div className="flex justify-center">
          <Avatar src={avatar} fallback={name} size="xl" online={isOnline} />
        </div>

        {/* 用户信息 */}
        <div className="space-y-2">
          <h3 className="text-subtitle font-semibold text-text-primary group-hover:text-primary-500 transition-colors">
            {name}
          </h3>
          {bio && (
            <p className="text-body text-text-secondary line-clamp-2">{bio}</p>
          )}
        </div>

        {/* 位置和加入时间 */}
        <div className="space-y-1 text-caption text-text-tertiary">
          {location && (
            <div className="flex items-center justify-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{location}</span>
            </div>
          )}
          <div className="flex items-center justify-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>加入于 {joinedDate}</span>
          </div>
        </div>

        {/* 兴趣标签 */}
        {interests.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {interests.slice(0, 3).map((interest, index) => (
              <Tag key={index} variant="secondary" size="sm">
                {interest}
              </Tag>
            ))}
            {interests.length > 3 && (
              <Tag variant="default" size="sm">
                +{interests.length - 3}
              </Tag>
            )}
          </div>
        )}

        {/* 共同好友 */}
        {mutualFriends && mutualFriends > 0 && (
          <div className="text-caption text-text-tertiary">
            {mutualFriends} 位共同好友
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex gap-2 pt-2">
          <Button
            variant={isFollowing ? "outline" : "primary"}
            size="sm"
            fullWidth
            onClick={handleFollowClick}
          >
            {isFollowing ? "已关注" : "关注"}
          </Button>
          {onMessage && (
            <Button variant="outline" size="sm" onClick={handleMessageClick}>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
