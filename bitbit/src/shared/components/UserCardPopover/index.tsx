import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import { navigateToChatFromUserCard } from "@/features/chat/utils";

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
  const navigate = useNavigate();
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
      const popoverWidth = 340; // 略微增加宽度
      const popoverHeight = 420; // 固定高度，确保所有内容可见

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
    console.log("UserCardPopover handleMessage:", {
      userId: user.id,
      hasCustomCallback: !!onMessage,
    });

    if (onMessage) {
      // 如果有自定义回调，只执行回调，不执行默认导航
      console.log("执行自定义onMessage回调:", user.id);
      onMessage(user.id);
    } else {
      // 默认行为：导航到聊天页面
      console.log("使用默认聊天导航:", { userId: user.id, name: user.name });
      navigateToChatFromUserCard(navigate, user.id, {
        name: user.name,
        avatar: user.avatar,
      });
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
        {statsItems.slice(0, 4).map(
          (
            item,
            index // 最多显示4个统计项
          ) => (
            <React.Fragment key={index}>
              <span className={`${item.color} font-semibold text-sm`}>
                {item.count}
              </span>
              <span className="text-text-secondary text-xs">{item.label}</span>
              {index < Math.min(statsItems.length, 4) - 1 && (
                <span className="text-text-tertiary mx-0.5">·</span>
              )}
            </React.Fragment>
          )
        )}
      </div>
    );
  };

  const popoverContent = (
    <div
      ref={popoverRef}
      className="fixed z-50 bg-white rounded-lg shadow-focus border border-gray-200"
      style={{
        top: position.top,
        left: position.left,
        width: "340px", // 固定宽度
        height: "420px", // 固定高度
        animation: isVisible
          ? "fadeInUp 0.2s ease-out"
          : "fadeOut 0.15s ease-in forwards",
      }}
      onMouseEnter={handlePopoverMouseEnter}
      onMouseLeave={handlePopoverMouseLeave}
      onClick={(e) => {
        // 阻止popover内的点击关闭popover
        e.stopPropagation();
      }}
    >
      {/* 头部区域 - 头像和基本信息 */}
      <div className="p-4 pb-3 border-b border-gray-100">
        <div className="flex items-start gap-3">
          {/* 头像 */}
          <div className="flex-shrink-0">{renderUserAvatar()}</div>

          {/* 用户信息 */}
          <div className="flex-1 min-w-0">
            {/* 用户名和关注按钮 - 优化布局 */}
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <h4
                  className="text-title-4 text-text-primary cursor-pointer hover:text-primary-500 transition-colors font-semibold"
                  onClick={handleViewProfile}
                  title={user.name}
                  style={{
                    maxWidth: "140px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.name}
                </h4>

                {user.isOrganizer && (
                  <span className="bg-sunflower-500 text-white text-caption px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                    组织者
                  </span>
                )}
              </div>

              {/* 关注按钮 - 独立区域，避免挤压用户名 - 使用primary突出显示 */}
              {showActions && (
                <Button
                  variant={user.isFollowed ? "secondary" : "primary"}
                  size="sm"
                  onClick={handleFollow}
                  className="flex-shrink-0 font-medium ml-2"
                >
                  {user.isFollowed ? "已关注" : "关注"}
                </Button>
              )}
            </div>

            {/* 真实姓名作为补充信息 */}
            {user.fullName && user.fullName !== user.name && (
              <p
                className="text-caption text-text-tertiary mb-1"
                title={user.fullName}
                style={{
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                真实姓名：{user.fullName}
              </p>
            )}

            {/* 基本信息 */}
            {(user.profession || user.age || user.location) && (
              <p
                className="text-caption text-text-secondary"
                title={[
                  user.profession,
                  user.age && `${user.age}岁`,
                  user.location,
                ]
                  .filter(Boolean)
                  .join(" · ")}
                style={{
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {[user.profession, user.age && `${user.age}岁`, user.location]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 主体内容区域 - 使用 flex 布局和固定高度 */}
      <div className="flex flex-col h-80">
        {" "}
        {/* 固定主体区域高度 */}
        {/* 统计信息 */}
        {renderStats() && (
          <div className="flex-shrink-0 mx-4 mt-3 bg-gray-50 rounded-lg p-2.5">
            <div className="text-caption text-center font-medium">
              {renderStats()}
            </div>
          </div>
        )}
        {/* 可滚动内容区域 */}
        <div className="flex-1 overflow-y-auto px-4 pt-3 pb-2 space-y-3">
          {/* 个人简介 */}
          {user.bio && (
            <div>
              <h5 className="text-caption font-medium text-text-primary mb-1.5">
                个人简介
              </h5>
              <p
                className="text-caption text-text-secondary leading-relaxed"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                }}
                title={user.bio} // 添加完整内容的 tooltip
              >
                {user.bio}
              </p>
            </div>
          )}

          {/* 兴趣标签 */}
          {user.tags && user.tags.length > 0 && (
            <div>
              <h5 className="text-caption font-medium text-text-primary mb-2">
                兴趣标签
              </h5>
              <div className="flex gap-1.5 flex-wrap">
                {user.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-primary-50 text-primary-500 text-xs rounded-full font-medium border border-primary-100"
                    title={tag}
                    style={{
                      maxWidth: "80px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag}
                  </span>
                ))}
                {user.tags.length > 4 && (
                  <span className="text-xs text-text-tertiary px-2 py-0.5">
                    +{user.tags.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 加入时间 */}
          {user.joinDate && (
            <div className="border-t border-gray-100 pt-2">
              <p className="text-xs text-text-tertiary">
                加入于 {user.joinDate}
              </p>
            </div>
          )}
        </div>
        {/* 操作按钮区域 - 默认显示两个按钮：查看主页 + 发私信 */}
        {showActions && (
          <div className="flex-shrink-0 p-4 pt-3 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-3">
              {/* 查看主页按钮 - 使用secondary作为默认高亮 */}
              <Button
                variant="secondary"
                size="sm"
                onClick={handleViewProfile}
                leftIcon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                }
                fullWidth
              >
                查看主页
              </Button>

              {/* 私信按钮 - 使用outline作为次要操作 */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleMessage}
                leftIcon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z"
                    />
                  </svg>
                }
                fullWidth
              >
                发私信
              </Button>
            </div>
          </div>
        )}
      </div>
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
