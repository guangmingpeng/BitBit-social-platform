import React, { useState, useEffect, useRef } from "react";
import type {
  ConversationParticipant,
  ParticipantRole,
} from "@/features/chat/types";
import type { User } from "@/types";
import UserCardPopover from "@/shared/components/UserCardPopover";
import { cn } from "@/shared/utils/cn";

interface GroupMemberItemProps {
  participant: ConversationParticipant;
  currentUserId: string;
  isAdmin: boolean;
  onRoleChange?: (userId: string, newRole: ParticipantRole) => void;
  onRemoveMember?: (userId: string) => void;
  showActions: boolean;
  onToggleActions: () => void;
  className?: string;
}

const GroupMemberItem: React.FC<GroupMemberItemProps> = ({
  participant,
  currentUserId,
  isAdmin,
  onRoleChange,
  onRemoveMember,
  showActions,
  onToggleActions,
  className,
}) => {
  const isCurrentUser = participant.userId === currentUserId;
  const canManage = isAdmin && !isCurrentUser;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState<"bottom" | "top">("bottom");

  // 检测菜单应该显示的位置
  const checkMenuPosition = () => {
    if (!menuButtonRef.current) return;

    const buttonRect = menuButtonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const menuHeight = 120; // 预估菜单高度
    const spaceBelow = viewportHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    // 同时考虑容器滚动区域
    const container = menuButtonRef.current.closest(".max-h-80");
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const spaceBelowInContainer = containerRect.bottom - buttonRect.bottom;
      const spaceAboveInContainer = buttonRect.top - containerRect.top;

      // 优先考虑容器内空间，如果容器内空间不足则考虑视口空间
      if (
        spaceBelowInContainer < menuHeight &&
        spaceAboveInContainer > menuHeight
      ) {
        setMenuPosition("top");
      } else if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
        setMenuPosition("top");
      } else {
        setMenuPosition("bottom");
      }
    } else {
      // 如果下方空间不足且上方空间充足，则向上显示
      if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
        setMenuPosition("top");
      } else {
        setMenuPosition("bottom");
      }
    }
  };

  // 当菜单显示时检测位置
  useEffect(() => {
    if (showActions) {
      checkMenuPosition();

      // 监听窗口大小变化和滚动事件，重新计算位置
      const handleResize = () => checkMenuPosition();
      const handleScroll = () => checkMenuPosition();

      window.addEventListener("resize", handleResize);
      window.addEventListener("scroll", handleScroll, true);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", handleScroll, true);
      };
    }
  }, [showActions]);

  const getDisplayName = (user: User) => {
    return user.name || user.username || user.email.split("@")[0];
  };

  const getRoleText = (role: ParticipantRole) => {
    switch (role) {
      case "owner":
        return "群主";
      case "admin":
        return "管理员";
      case "member":
        return "成员";
      default:
        return "成员";
    }
  };

  const getRoleBadgeColor = (role: ParticipantRole) => {
    switch (role) {
      case "owner":
        return "bg-red-100 text-red-600";
      case "admin":
        return "bg-blue-100 text-blue-600";
      case "member":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // 将用户数据转换为UserCardPopover需要的格式
  const convertUserForPopover = (user: User) => ({
    ...user,
    name: getDisplayName(user),
    followersCount: Math.floor(Math.random() * 500), // 模拟数据
    followingCount: Math.floor(Math.random() * 200),
    postsCount: Math.floor(Math.random() * 50),
    activitiesCount: Math.floor(Math.random() * 20),
    isFollowed: false, // 在群聊中默认未关注
    tags: ["户外", "运动", "旅行"], // 模拟兴趣标签
    isOnline: user.isOnline,
  });

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 hover:bg-gray-50 transition-colors",
        className
      )}
    >
      <UserCardPopover
        user={convertUserForPopover(participant.user)}
        placement="left"
        onFollow={() => console.log("Follow user:", participant.userId)}
        onMessage={() => console.log("Message user:", participant.userId)}
        onViewProfile={() => console.log("View profile:", participant.userId)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer">
          {/* 头像 */}
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              {participant.user.avatar ? (
                <img
                  src={participant.user.avatar}
                  alt={getDisplayName(participant.user)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 text-sm font-medium">
                  {getDisplayName(participant.user).charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* 在线状态 */}
            {participant.user.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>

          {/* 用户信息 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {getDisplayName(participant.user)}
                {isCurrentUser && (
                  <span className="text-gray-500 ml-1">(我)</span>
                )}
              </h4>
              <span
                className={cn(
                  "px-2 py-0.5 text-xs rounded-full",
                  getRoleBadgeColor(participant.role)
                )}
              >
                {getRoleText(participant.role)}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {participant.user.isOnline ? "在线" : "离线"}
              {participant.user.profession && (
                <span className="ml-2">• {participant.user.profession}</span>
              )}
            </p>
          </div>
        </div>
      </UserCardPopover>

      {/* 操作按钮 */}
      {canManage && (
        <div className="relative">
          <button
            ref={menuButtonRef}
            onClick={onToggleActions}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {showActions && (
            <div
              className={cn(
                "absolute right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px]",
                "z-[100] animate-in fade-in-0 zoom-in-95 duration-200", // 添加进入动画
                menuPosition === "top"
                  ? "bottom-8 slide-in-from-bottom-2"
                  : "top-8 slide-in-from-top-2"
              )}
            >
              {participant.role === "member" && onRoleChange && (
                <button
                  onClick={() => {
                    onRoleChange(participant.userId, "admin");
                    onToggleActions();
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  设为管理员
                </button>
              )}
              {participant.role === "admin" && onRoleChange && (
                <button
                  onClick={() => {
                    onRoleChange(participant.userId, "member");
                    onToggleActions();
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  取消管理员
                </button>
              )}
              {onRemoveMember && (
                <button
                  onClick={() => {
                    onRemoveMember(participant.userId);
                    onToggleActions();
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  移出群聊
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface GroupMembersListProps {
  participants: ConversationParticipant[];
  currentUserId: string;
  onRoleChange?: (userId: string, newRole: ParticipantRole) => void;
  onRemoveMember?: (userId: string) => void;
  onInviteMembers?: () => void;
  className?: string;
}

const GroupMembersList: React.FC<GroupMembersListProps> = ({
  participants,
  currentUserId,
  onRoleChange,
  onRemoveMember,
  onInviteMembers,
  className,
}) => {
  const [activeMenuUserId, setActiveMenuUserId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentUser = participants.find((p) => p.userId === currentUserId);
  const isAdmin =
    currentUser?.role === "admin" || currentUser?.role === "owner";

  // 按角色排序：群主 -> 管理员 -> 普通成员
  const sortedParticipants = [...participants].sort((a, b) => {
    const roleOrder = { owner: 0, admin: 1, member: 2 };
    return roleOrder[a.role] - roleOrder[b.role];
  });

  const handleToggleActions = (userId: string) => {
    setActiveMenuUserId(activeMenuUserId === userId ? null : userId);
  };

  // 点击外部区域关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveMenuUserId(null);
      }
    };

    if (activeMenuUserId) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [activeMenuUserId]);

  return (
    <div ref={containerRef} className={cn("bg-white rounded-lg", className)}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          群成员 ({participants.length})
        </h3>
        {isAdmin && onInviteMembers && (
          <button
            onClick={onInviteMembers}
            className="flex items-center gap-1 px-3 py-1.5 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors"
          >
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            邀请成员
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto">
        {sortedParticipants.map((participant) => (
          <GroupMemberItem
            key={participant.userId}
            participant={participant}
            currentUserId={currentUserId}
            isAdmin={isAdmin}
            onRoleChange={onRoleChange}
            onRemoveMember={onRemoveMember}
            showActions={activeMenuUserId === participant.userId}
            onToggleActions={() => handleToggleActions(participant.userId)}
          />
        ))}
      </div>

      {/* 成员统计信息 */}
      <div className="p-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>
            在线: {participants.filter((p) => p.user.isOnline).length} 人
          </span>
          <span>
            管理员:{" "}
            {
              participants.filter(
                (p) => p.role === "admin" || p.role === "owner"
              ).length
            }{" "}
            人
          </span>
        </div>
      </div>
    </div>
  );
};

export default GroupMembersList;
