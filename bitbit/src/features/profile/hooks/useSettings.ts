import { useState, useEffect, useCallback } from "react";
import type { UserSettings } from "../types";

// 默认设置
const defaultSettings: UserSettings = {
  account: {
    twoFactorEnabled: false,
    phoneNumber: undefined,
    email: undefined,
    backupCodes: [],
    loginDevices: [],
    securityLogs: [],
  },
  notifications: {
    push: {
      activities: true,
      messages: true,
      exchanges: true,
      community: true,
      marketing: false,
    },
    email: {
      activities: true,
      messages: true,
      exchanges: true,
      community: false,
      newsletter: false,
      marketing: false,
    },
    sms: {
      security: true,
      important: true,
    },
    doNotDisturb: {
      enabled: false,
      startTime: "22:00",
      endTime: "08:00",
      weekendsOnly: false,
    },
  },
  privacy: {
    profileVisibility: "public",
    showEmail: false,
    showAge: true,
    showLocation: true,
    allowMessages: true,
    allowActivityInvites: true,
    searchable: true,
    dataSharing: {
      analytics: true,
      personalization: true,
      thirdParty: false,
    },
  },
  app: {
    theme: "auto",
    language: "zh-CN",
    fontSize: "medium",
    animations: true,
    imageQuality: "high",
    autoPlayVideo: true,
    reducedMotion: false,
    highContrast: false,
  },
};

export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  // 加载设置
  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 从 localStorage 加载设置
      const stored = localStorage.getItem("user-settings");
      if (stored) {
        const parsedSettings = JSON.parse(stored);
        setSettings({ ...defaultSettings, ...parsedSettings });
      }

      // 在实际应用中，这里应该从API加载设置
      // const settings = await settingsApi.getUserSettings();
      // setSettings(settings);
    } catch (err) {
      console.error("Failed to load settings:", err);
      setError("加载设置失败");
    } finally {
      setLoading(false);
    }
  }, []);

  // 更新单个设置模块
  const updateModuleSettings = useCallback(
    <T extends keyof UserSettings>(
      module: T,
      updates: Partial<UserSettings[T]>
    ) => {
      setSettings((prev) => ({
        ...prev,
        [module]: {
          ...prev[module],
          ...updates,
        },
      }));
      setIsDirty(true);
    },
    []
  );

  // 更新单个设置项
  const updateSetting = useCallback(
    (module: keyof UserSettings, key: string, value: unknown) => {
      setSettings((prev) => ({
        ...prev,
        [module]: {
          ...prev[module],
          [key]: value,
        },
      }));
      setIsDirty(true);
    },
    []
  );

  // 保存设置
  const saveSettings = useCallback(async () => {
    try {
      setSaving(true);
      setError(null);

      // 保存到 localStorage
      localStorage.setItem("user-settings", JSON.stringify(settings));

      // 在实际应用中，这里应该调用API保存设置
      // await settingsApi.updateUserSettings(settings);

      setIsDirty(false);
    } catch (err) {
      console.error("Failed to save settings:", err);
      setError("保存设置失败");
    } finally {
      setSaving(false);
    }
  }, [settings]);

  // 重置设置
  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
    setIsDirty(true);
  }, []);

  // 重置到初始状态
  const discardChanges = useCallback(() => {
    loadSettings();
    setIsDirty(false);
  }, [loadSettings]);

  // 初始化加载
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return {
    settings,
    loading,
    error,
    isDirty,
    saving,
    updateModuleSettings,
    updateSetting,
    saveSettings,
    resetSettings,
    discardChanges,
    reload: loadSettings,
  };
};

// 主题Hook
export const useTheme = () => {
  const { settings, updateSetting } = useSettings();

  const setTheme = useCallback(
    (theme: "light" | "dark" | "auto") => {
      updateSetting("app", "theme", theme);
    },
    [updateSetting]
  );

  return {
    theme: settings.app.theme,
    setTheme,
  };
};
