// Settings 组件导出
export { Settings } from "./SettingsLayout";
export { SettingsNavigation } from "./SettingsNavigation";

// Setting Item 组件导出 - 使用明确的重命名
export {
  SettingItem as SettingsItemComponent,
  SettingSwitch,
  SettingSelect,
  SettingNavigation,
} from "./SettingItem";

// Settings 模块导出 - 使用命名导出避免冲突
export {
  AccountSecurity as SettingsAccountSecurity,
  NotificationSettings as SettingsNotificationSettings,
  PrivacySettings as SettingsPrivacySettings,
  ApplicationSettings as SettingsApplicationSettings,
  AboutSettings as SettingsAboutSettings,
} from "./modules";
