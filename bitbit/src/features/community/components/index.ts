// community 组件导出
// PostCard 已迁移到 @/components/ui/cards，请使用统一的UI组件
export * from "./PostDetail";

export { default as CommunityPostForm } from "./CommunityPostForm";
export type {
  CommunityPostFormData,
  CommunityPostFormProps,
} from "./CommunityPostForm";

export { default as PostPreview } from "./PostPreview";

// 新增的Community页面组件
export { default as CommunityHeader } from "./CommunityHeader";
export { default as CommunitySearch } from "./CommunitySearch";
export { default as CategorySidebar } from "./CategorySidebar";
export { default as CommunitySidebar } from "./CommunitySidebar";
export { default as PostList } from "./PostList";
