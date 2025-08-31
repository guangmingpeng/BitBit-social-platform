import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui";

// 通用用户信息接口
export interface UserInfo {
  id: string;
  name: string;
  fullName?: string;
  avatar?: string;
  color?: string;
  age?: number;
  profession?: string;
  location?: string;
  bio?: string;
  activitiesCount?: number;
  organizedCount?: number;
  postsCount?: number;
  followersCount?: number;
  followingCount?: number;
  tags?: string[];
  isFollowed?: boolean;
  isOrganizer?: boolean;
  isOnline?: boolean;
  joinDate?: string;
}

interface UserCardPopoverProps {
  user: UserInfo;
  children: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  offset?: number;
  showActions?: boolean;
  onFollow?: (userId: string) => void;
  onMessage?: (userId: string) => void;
  onViewProfile?: (userId: string) => void;
  className?: string;
}

const UserCardPopover: React.FC<UserCardPopoverProps> = ({
  user,
  children,
  placement = "right",
  offset = 8,
  showActions = true,
  onFollow,
  onMessage,
  onViewProfile,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showPopover = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(true);
  };

  const hidePopover = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 150); // 延迟隐藏，避免鼠标移动到popover时消失
  };

  const handleMouseEnter = () => {
    showPopover();
  };

  const handleMouseLeave = () => {
    hidePopover();
  };

  const handlePopoverMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handlePopoverMouseLeave = () => {
    hidePopover();
  };

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverWidth = 320;
      const popoverHeight = 400; // 增加高度以适应新的布局

      let top = 0;
      let left = 0;

      switch (placement) {
        case "right":
          top = triggerRect.top + triggerRect.height / 2 - popoverHeight / 2;
          left = triggerRect.right + offset;
          break;
        case "left":
          top = triggerRect.top + triggerRect.height / 2 - popoverHeight / 2;
          left = triggerRect.left - popoverWidth - offset;
          break;
        case "top":
          top = triggerRect.top - popoverHeight - offset;
          left = triggerRect.left + triggerRect.width / 2 - popoverWidth / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + offset;
          left = triggerRect.left + triggerRect.width / 2 - popoverWidth / 2;
          break;
      }

      // 确保popover不会超出屏幕边界，增加边距
      const padding = 20;
      top = Math.max(
        padding,
        Math.min(top, window.innerHeight - popoverHeight - padding)
      );
      left = Math.max(
        padding,
        Math.min(left, window.innerWidth - popoverWidth - padding)
      );

      setPosition({ top, left });
    }
  }, [isVisible, placement, offset]);

  const handleFollow = () => {
    if (onFollow) {
      onFollow(user.id);
    }
  };

  const handleMessage = () => {
    if (onMessage) {
      onMessage(user.id);
    }
  };

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(user.id);
    }
  };

  const renderUserAvatar = () => {
    if (user.avatar) {
      return (
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover cursor-pointer hover:scale-105 transition-transform duration-250 ring-2 ring-gray-100"
            onClick={handleViewProfile}
          />
          {user.isOnline && (
            <div className="absolute -bottom-1 -right-1">
              <div className="w-4 h-4 bg-mint-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="relative">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-title-4 cursor-pointer hover:scale-105 transition-transform duration-250 ring-2 ring-gray-100 shadow-sm"
          style={{ backgroundColor: user.color || "#6B7280" }}
          onClick={handleViewProfile}
        >
          {user.name.charAt(0)}
        </div>
        {user.isOnline && (
          <div className="absolute -bottom-1 -right-1">
            <div className="w-4 h-4 bg-mint-500 rounded-full border-2 border-white shadow-sm"></div>
          </div>
        )}
      </div>
    );
  };

  const renderStats = () => {
    const statsItems = [];

    if (user.postsCount !== undefined) {
      statsItems.push({
        count: user.postsCount,
        label: "帖子",
        color: "text-primary-500",
      });
    }
    if (user.activitiesCount !== undefined) {
      statsItems.push({
        count: user.activitiesCount,
        label: "活动",
        color: "text-primary-500",
      });
    }
    if (user.organizedCount !== undefined && user.organizedCount > 0) {
      statsItems.push({
        count: user.organizedCount,
        label: "组织",
        color: "text-primary-500",
      });
    }
    if (user.followersCount !== undefined) {
      statsItems.push({
        count: user.followersCount,
        label: "粉丝",
        color: "text-primary-500",
      });
    }

    if (statsItems.length === 0) return null;

    return (
      <div className="flex items-center justify-center gap-1 flex-wrap">
        {statsItems.map((item, index) => (
          <React.Fragment key={index}>
            <span className={`${item.color} font-semibold`}>{item.count}</span>
            <span className="text-text-secondary">{item.label}</span>
            {index < statsItems.length - 1 && (
              <span className="text-text-tertiary mx-1">·</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const popoverContent = (
    <div
      ref={popoverRef}
      className="fixed z-50 bg-white rounded-lg shadow-focus border border-gray-200 w-80 max-h-96 overflow-y-auto"
      style={{
        top: position.top,
        left: position.left,
        animation: isVisible
          ? "fadeInUp 0.2s ease-out"
          : "fadeOut 0.15s ease-in forwards",
      }}
      onMouseEnter={handlePopoverMouseEnter}
      onMouseLeave={handlePopoverMouseLeave}
    >
      {/* 头部区域 - 头像和基本信息 */}
      <div className="p-5 pb-4 border-b border-gray-100">
        <div className="flex items-start gap-4">
          {/* 头像 */}
          <div className="flex-shrink-0">{renderUserAvatar()}</div>

          {/* 用户信息 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4
                className="text-title-4 text-text-primary cursor-pointer hover:text-primary-500 transition-colors truncate font-semibold"
                onClick={handleViewProfile}
              >
                {user.name}
              </h4>
              {user.isOrganizer && (
                <span className="bg-sunflower-500 text-white text-caption px-2 py-1 rounded-full font-medium flex-shrink-0">
                  组织者
                </span>
              )}
            </div>

            {/* 真实姓名作为补充信息 */}
            {user.fullName && user.fullName !== user.name && (
              <p className="text-body text-text-tertiary mb-2">
                真实姓名：{user.fullName}
              </p>
            )}

            {/* 基本信息 */}
            {(user.profession || user.age || user.location) && (
              <p className="text-body text-text-secondary mb-2">
                {[user.profession, user.age && `${user.age}岁`, user.location]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 主体内容区域 */}
      <div className="p-5 pt-4 space-y-4">
        {/* 统计信息 */}
        {renderStats() && (
          <div className="bg-gray-50 rounded-sm p-3">
            <div className="text-body text-center font-medium">
              {renderStats()}
            </div>
          </div>
        )}

        {/* 个人简介 */}
        {user.bio && (
          <div>
            <h5 className="text-body font-medium text-text-primary mb-2">
              个人简介
            </h5>
            <p
              className="text-body text-text-secondary leading-relaxed overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical" as const,
              }}
            >
              {user.bio}
            </p>
          </div>
        )}

        {/* 兴趣标签 */}
        {user.tags && user.tags.length > 0 && (
          <div>
            <h5 className="text-body font-medium text-text-primary mb-3">
              兴趣标签
            </h5>
            <div className="flex gap-2 flex-wrap">
              {user.tags.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-50 text-primary-500 text-caption rounded-full font-medium border border-primary-100"
                >
                  {tag}
                </span>
              ))}
              {user.tags.length > 4 && (
                <span className="text-caption text-text-tertiary px-2 py-1">
                  +{user.tags.length - 4} 更多
                </span>
              )}
            </div>
          </div>
        )}

        {/* 加入时间 */}
        {user.joinDate && (
          <p className="text-caption text-text-tertiary border-t border-gray-100 pt-3">
            加入于 {user.joinDate}
          </p>
        )}
      </div>

      {/* 操作按钮区域 */}
      {showActions && (
        <div className="p-5 pt-0">
          <div className="flex gap-3">
            <Button
              variant={user.isFollowed ? "secondary" : "primary"}
              size="sm"
              onClick={handleFollow}
              className="flex-1 font-medium"
            >
              {user.isFollowed ? "已关注" : "关注"}
            </Button>
            {onMessage && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMessage}
                className="flex-shrink-0"
              >
                私信
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {isVisible && createPortal(popoverContent, document.body)}
    </>
  );
};

export default UserCardPopover;
