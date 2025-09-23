import type {
  BaseCardProps,
  CardLayout,
  CardActions,
} from "../../BaseCard/types";

export interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
  content: string;
  images?: string[];
  category?: "music" | "food" | "learning" | "reading";
  tags?: string[];
  publishTime: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface PostCardProps
  extends Omit<BaseCardProps, "children">,
    CardLayout,
    CardActions {
  post: Post;

  // 帖子特定的回调
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onTagClick?: (tag: string) => void;
  onViewDetail?: () => void;

  // 管理相关回调（仅对自己的帖子显示）
  onEdit?: () => void;
  onDelete?: () => void;

  // 显示控制
  showAuthor?: boolean;
  showImages?: boolean;
  showCategory?: boolean;
  showTags?: boolean;
  showPublishTime?: boolean;
  showInteractionStats?: boolean;
  showManagementActions?: boolean; // 是否显示编辑和删除按钮
}
