// UI组件统一导出
export { default as Button } from "./Button/index";
export type { ButtonProps } from "./Button/index";

export {
  default as Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card/index";
export type { CardProps } from "./Card/index";

export { default as Tag } from "./Tag/index";
export type { TagProps } from "./Tag/index";

export { default as Icon } from "./Icon";
export { default as Input } from "./Input";
export type { InputProps } from "./Input/index";

export { default as Avatar } from "./Avatar/index";
export type { AvatarProps } from "./Avatar/index";

export { default as Badge } from "./Badge/index";
export type { BadgeProps } from "./Badge/index";

export { default as Breadcrumb } from "./Breadcrumb/index";
export type { BreadcrumbProps, BreadcrumbItem } from "./Breadcrumb/index";

export { default as Spinner } from "./Spinner/index";
export type { SpinnerProps } from "./Spinner/index";

export {
  default as Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "./Modal/index";
export type { ModalProps } from "./Modal/index";

export { default as SearchBar } from "./SearchBar/index";

// 布局组件
export { default as Grid } from "./Grid/index";
export type { GridProps } from "./Grid/index";

export { default as Stack } from "./Stack/index";
export type { StackProps } from "./Stack/index";

export { default as Container } from "./Container/index";
export type { ContainerProps } from "./Container/index";

export { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs/index";
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from "./Tabs/index";

// 业务组件
export { default as ActivityCard } from "../../features/activities/components/ActivityCard/index";
export type { ActivityCardProps } from "../../features/activities/components/ActivityCard/index";

export { default as CommunityPost } from "./CommunityPost/index";
export type { CommunityPostProps } from "./CommunityPost/index";

export { default as ExchangeModal } from "./ExchangeModal/index";
export type {
  ExchangeModalProps,
  ExchangeFormData,
} from "./ExchangeModal/index";

export { default as PurchaseModal } from "./PurchaseModal/index";
export type {
  PurchaseModalProps,
  PurchaseFormData,
} from "./PurchaseModal/index";

// 新增通用组件
export { default as ImageUpload } from "./ImageUpload/index";
export type { ImageUploadProps } from "./ImageUpload/index";

export { default as CategorySelector } from "./CategorySelector/index";
export type { CategorySelectorProps } from "./CategorySelector/index";

export { default as CategoryItem } from "./CategoryItem/index";
export type { CategoryItemProps } from "./CategoryItem/index";

export { default as FeaturedRecommendation } from "./FeaturedRecommendation/index";
export type { FeaturedRecommendationProps } from "./FeaturedRecommendation/index";

export { default as SectionHeader } from "./SectionHeader/index";
export type { SectionHeaderProps } from "./SectionHeader/index";
