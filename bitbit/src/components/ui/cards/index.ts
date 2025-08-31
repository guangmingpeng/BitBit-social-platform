// 统一的卡片组件导出
export { ActivityCard } from "./ActivityCard";
export { PostCard } from "./PostCard";

// 导出类型
export type { ActivityCardProps, Activity } from "./ActivityCard/types";
export type { PostCardProps, Post } from "./PostCard/types";

// 基础卡片组件
export { BaseCard } from "../BaseCard";
export type {
  BaseCardProps,
  CardLayout,
  CardActions,
  CardStats,
  CardMeta,
} from "../BaseCard/types";
export { getCardVariantClasses, getLayoutClasses } from "../BaseCard/variants";
