import React from "react";
import { Card, CardContent, Avatar, Tag, Button } from "@/components/ui";
import UserCardPopover, {
  type UserInfo,
} from "@/shared/components/UserCardPopover";
import { cn } from "@/shared/utils/cn";
import type { UserCardProps } from "./types";

export const UserCard: React.FC<UserCardProps> = ({
  user,
  layout = "vertical",
  showActions = true,
  showStats = true,
  showMutualFriends = false,
  showPopover = false,
  isFollowing = false,
  className,
  onClick,
  onFollow,
  onMessage,
  onViewProfile,
}) => {
  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFollow?.(isFollowing);
  };

  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMessage?.();
  };

  const handleCardClick = () => {
    onClick?.();
  };

  const displayName = user.name || user.username;

  // 将User类型转换为UserInfo类型，用于Popover
  const userInfoForPopover: UserInfo = {
    id: user.id,
    name: displayName,
    fullName: user.fullName,
    avatar: user.avatar,
    color: user.color,
    age: user.age,
    profession: user.profession,
    location: user.location,
    bio: user.bio,
    activitiesCount: user.activitiesCount,
    organizedCount: user.organizedCount,
    postsCount: user.stats?.totalPosts || user.postsCount,
    followersCount: user.followers || user.followersCount,
    followingCount: user.following || user.followingCount,
    tags: user.tags || user.interests,
    isFollowed: user.isFollowed || isFollowing,
    isOrganizer: user.isOrganizer,
    isOnline: user.isOnline,
    joinDate: user.joinDate || user.joinedDate,
  };

  const renderUserCard = () => {
    if (layout === "horizontal") {
      return (
        <Card
          className={cn("group cursor-pointer", className)}
          hover
          onClick={handleCardClick}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              {/* 头像 */}
              <Avatar
                src={user.avatar}
                fallback={displayName}
                size="lg"
                online={user.isOnline}
              />

              {/* 用户信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {displayName}
                  </h3>
                  {user.level && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                      Lv.{user.level}
                    </span>
                  )}
                </div>

                {user.bio && (
                  <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                    {user.bio}
                  </p>
                )}

                {/* 位置和职业信息 */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  {user.profession && <span>{user.profession}</span>}
                  {user.profession && (user.age || user.location) && (
                    <span>·</span>
                  )}
                  {user.age && <span>{user.age}岁</span>}
                  {user.age && user.location && <span>·</span>}
                  {user.location && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{user.location}</span>
                    </div>
                  )}
                </div>

                {/* 兴趣标签 */}
                {(user.interests || user.tags) &&
                  (user.interests?.length || user.tags?.length) && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {(user.interests || user.tags)
                        ?.slice(0, 2)
                        .map((interest, index) => (
                          <Tag key={index} variant="secondary" size="sm">
                            {interest}
                          </Tag>
                        ))}
                      {(user.interests?.length || user.tags?.length || 0) >
                        2 && (
                        <Tag variant="default" size="sm">
                          +
                          {(user.interests?.length || user.tags?.length || 0) -
                            2}
                        </Tag>
                      )}
                    </div>
                  )}

                {/* 统计信息 */}
                {showStats &&
                  (user.activitiesCount !== undefined || user.stats) && (
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {user.activitiesCount !== undefined && (
                        <span>参与活动 {user.activitiesCount}</span>
                      )}
                      {user.stats?.totalPosts !== undefined && (
                        <span>发布帖子 {user.stats.totalPosts}</span>
                      )}
                    </div>
                  )}

                {/* 共同好友 */}
                {showMutualFriends &&
                  user.mutualFriends &&
                  user.mutualFriends > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      {user.mutualFriends} 位共同好友
                    </div>
                  )}
              </div>

              {/* 操作按钮 */}
              {showActions && (
                <div className="flex gap-2">
                  <Button
                    variant={isFollowing ? "outline" : "primary"}
                    size="sm"
                    onClick={handleFollowClick}
                  >
                    {isFollowing ? "已关注" : "关注"}
                  </Button>
                  {onMessage && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleMessageClick}
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      );
    }

    if (layout === "compact") {
      return (
        <Card
          className={cn("group cursor-pointer", className)}
          hover
          onClick={handleCardClick}
        >
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <Avatar
                src={user.avatar}
                fallback={displayName}
                size="md"
                online={user.isOnline}
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                  {displayName}
                </h3>
                {user.bio && (
                  <p className="text-xs text-gray-600 line-clamp-1">
                    {user.bio}
                  </p>
                )}
              </div>
              {showActions && (
                <Button
                  variant={isFollowing ? "outline" : "primary"}
                  size="sm"
                  onClick={handleFollowClick}
                >
                  {isFollowing ? "已关注" : "关注"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      );
    }

    // 默认垂直布局
    return (
      <Card
        className={cn("group cursor-pointer", className)}
        hover
        onClick={handleCardClick}
      >
        <CardContent className="p-6 text-center space-y-4">
          {/* 头像 */}
          <div className="flex justify-center">
            <Avatar
              src={user.avatar}
              fallback={displayName}
              size="xl"
              online={user.isOnline}
            />
          </div>

          {/* 用户信息 */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {displayName}
              </h3>
              {user.level && (
                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-sm font-medium">
                  Lv.{user.level}
                </span>
              )}
            </div>
            {user.bio && (
              <p className="text-sm text-gray-600 line-clamp-2">{user.bio}</p>
            )}
          </div>

          {/* 位置和加入时间 */}
          <div className="space-y-1 text-xs text-gray-500">
            {/* 职业、年龄、位置 */}
            {(user.profession || user.age || user.location) && (
              <div className="flex items-center justify-center gap-2">
                {user.profession && <span>{user.profession}</span>}
                {user.profession && (user.age || user.location) && (
                  <span>·</span>
                )}
                {user.age && <span>{user.age}岁</span>}
                {user.age && user.location && <span>·</span>}
                {user.location && (
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{user.location}</span>
                  </div>
                )}
              </div>
            )}
            {(user.joinedDate || user.joinDate) && (
              <div className="flex items-center justify-center gap-1">
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>加入于 {user.joinedDate || user.joinDate}</span>
              </div>
            )}
          </div>

          {/* 兴趣标签 */}
          {(user.interests || user.tags) &&
            (user.interests?.length || user.tags?.length) && (
              <div className="flex flex-wrap justify-center gap-2">
                {(user.interests || user.tags)
                  ?.slice(0, 3)
                  .map((interest, index) => (
                    <Tag key={index} variant="secondary" size="sm">
                      {interest}
                    </Tag>
                  ))}
                {(user.interests?.length || user.tags?.length || 0) > 3 && (
                  <Tag variant="default" size="sm">
                    +{(user.interests?.length || user.tags?.length || 0) - 3}
                  </Tag>
                )}
              </div>
            )}

          {/* 统计信息 */}
          {showStats && (user.activitiesCount !== undefined || user.stats) && (
            <div className="flex justify-center gap-4 text-xs text-gray-500">
              {user.activitiesCount !== undefined && (
                <span>参与活动 {user.activitiesCount}</span>
              )}
              {user.stats?.totalPosts !== undefined && (
                <span>发布帖子 {user.stats.totalPosts}</span>
              )}
              {user.stats?.totalExchanges !== undefined && (
                <span>交易次数 {user.stats.totalExchanges}</span>
              )}
            </div>
          )}

          {/* 共同好友 */}
          {showMutualFriends &&
            user.mutualFriends &&
            user.mutualFriends > 0 && (
              <div className="text-xs text-gray-500">
                {user.mutualFriends} 位共同好友
              </div>
            )}

          {/* 操作按钮 */}
          {showActions && (
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMessageClick}
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // 如果启用了Popover，则包装在UserCardPopover中
  if (showPopover) {
    return (
      <UserCardPopover
        user={userInfoForPopover}
        onFollow={(_userId) => onFollow?.(isFollowing)}
        onMessage={onMessage ? () => onMessage() : undefined}
        onViewProfile={onViewProfile ? () => onViewProfile() : undefined}
        showActions={showActions}
      >
        {renderUserCard()}
      </UserCardPopover>
    );
  }

  return renderUserCard();
};
