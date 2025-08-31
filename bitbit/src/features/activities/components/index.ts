// activities 组件导出
// ActivityCard 已迁移到 @/components/ui/cards，请使用统一的UI组件

// ActivityDetail 子组件导出
export {
  ActivityHeader,
  ActivityBasicInfo,
  OrganizerInfo,
  ActivityContent,
  ActivityLocation,
  ParticipantStats,
  ParticipantAvatars,
  ParticipantDetails,
  ActivityActions,
} from "./ActivityDetail";

export { ActivityForm } from "./ActivityForm";
export type { ActivityFormData, ActivityFormProps } from "./ActivityForm";

export { default as ActivityPreview } from "./ActivityPreview";
