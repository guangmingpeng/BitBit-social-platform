export interface User {
  id: string;
  username: string;
  name?: string;
  fullName?: string;
  email: string;
  avatar?: string;
  color?: string;
  bio?: string;
  profession?: string;
  age?: number;
  location?: string;
  interests?: string[];
  tags?: string[];
  isOnline?: boolean;
  joinedDate?: string;
  joinDate?: string;
  level?: number;
  following?: number;
  followers?: number;
  followersCount?: number;
  followingCount?: number;
  activitiesCount?: number;
  organizedCount?: number;
  postsCount?: number;
  stats?: {
    totalPosts?: number;
    totalExchanges?: number;
  };
  mutualFriends?: number;
  isFollowed?: boolean;
  isOrganizer?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserCardProps {
  user: User;
  layout?: "vertical" | "horizontal" | "compact";
  showActions?: boolean;
  showStats?: boolean;
  showMutualFriends?: boolean;
  showPopover?: boolean; // 新增：是否显示悬停卡片
  isFollowing?: boolean;
  className?: string;
  onClick?: () => void;
  onFollow?: (isFollowing: boolean) => void;
  onMessage?: () => void;
  onViewProfile?: () => void;
}

export type UserListItem = Pick<
  User,
  | "id"
  | "username"
  | "name"
  | "avatar"
  | "bio"
  | "location"
  | "isOnline"
  | "profession"
  | "age"
  | "interests"
> & {
  mutualFriends?: number;
  isFollowing?: boolean;
};
