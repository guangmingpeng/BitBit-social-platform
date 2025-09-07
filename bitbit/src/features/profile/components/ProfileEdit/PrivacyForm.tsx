import React from "react";
import { cn } from "@/shared/utils/cn";
import type { EditableUserProfile } from "../../types";

interface PrivacyFormProps {
  data: EditableUserProfile;
  onChange: (updates: Partial<EditableUserProfile>) => void;
  isPreviewMode?: boolean;
}

// 隐私级别预设
const privacyLevels = [
  {
    id: "public",
    name: "公开",
    icon: "🌐",
    description: "所有人都可以看到你的资料",
    settings: {
      profileVisibility: "public" as const,
      showEmail: false,
      showAge: true,
      showLocation: true,
      allowMessages: true,
      allowActivityInvites: true,
    },
  },
  {
    id: "friends",
    name: "好友可见",
    icon: "👥",
    description: "只有关注你的用户可以看到详细资料",
    settings: {
      profileVisibility: "friends" as const,
      showEmail: false,
      showAge: true,
      showLocation: false,
      allowMessages: true,
      allowActivityInvites: true,
    },
  },
  {
    id: "private",
    name: "私密",
    icon: "🔒",
    description: "最小化信息展示，注重隐私保护",
    settings: {
      profileVisibility: "private" as const,
      showEmail: false,
      showAge: false,
      showLocation: false,
      allowMessages: false,
      allowActivityInvites: false,
    },
  },
];

// 详细隐私设置
const privacySettings = [
  {
    id: "showEmail",
    label: "显示邮箱地址",
    description: "其他用户可以看到你的邮箱地址",
    icon: "📧",
  },
  {
    id: "showAge",
    label: "显示年龄信息",
    description: "在个人资料中显示你的年龄",
    icon: "🎂",
  },
  {
    id: "showLocation",
    label: "显示所在地",
    description: "在个人资料中显示你的位置信息",
    icon: "📍",
  },
  {
    id: "allowMessages",
    label: "允许私信",
    description: "其他用户可以给你发送私信",
    icon: "💬",
  },
  {
    id: "allowActivityInvites",
    label: "允许活动邀请",
    description: "其他用户可以邀请你参加活动",
    icon: "🎉",
  },
];

export const PrivacyForm: React.FC<PrivacyFormProps> = ({
  data,
  onChange,
  isPreviewMode = false,
}) => {
  const currentPrivacy = data.privacy;

  // 应用隐私级别设置
  const applyPrivacyLevel = (
    levelSettings: (typeof privacyLevels)[0]["settings"]
  ) => {
    onChange({
      privacy: {
        ...currentPrivacy,
        ...levelSettings,
      },
    });
  };

  // 切换单个隐私设置
  const togglePrivacySetting = (key: keyof EditableUserProfile["privacy"]) => {
    onChange({
      privacy: {
        ...currentPrivacy,
        [key]: !currentPrivacy[key],
      },
    });
  };

  // 判断当前是否匹配某个隐私级别
  const getCurrentPrivacyLevel = () => {
    for (const level of privacyLevels) {
      const matches = Object.entries(level.settings).every(
        ([key, value]) =>
          currentPrivacy[key as keyof typeof currentPrivacy] === value
      );
      if (matches) return level.id;
    }
    return "custom";
  };

  const currentLevel = getCurrentPrivacyLevel();

  if (isPreviewMode) {
    const currentLevelInfo = privacyLevels.find((l) => l.id === currentLevel);

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          隐私设置预览
        </h2>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{currentLevelInfo?.icon || "⚙️"}</span>
            <div>
              <h3 className="font-medium text-gray-900">
                {currentLevelInfo?.name || "自定义设置"}
              </h3>
              <p className="text-sm text-gray-600">
                {currentLevelInfo?.description || "使用自定义隐私设置"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">当前设置：</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {privacySettings.map((setting) => {
                const isEnabled =
                  currentPrivacy[setting.id as keyof typeof currentPrivacy];
                return (
                  <div key={setting.id} className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        isEnabled ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></span>
                    <span className="text-sm text-gray-600">
                      {setting.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      {isEnabled ? "开启" : "关闭"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">隐私设置</h2>

      {/* 快速设置 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">隐私级别</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {privacyLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => applyPrivacyLevel(level.settings)}
              className={cn(
                "p-4 border-2 rounded-lg text-left transition-all",
                currentLevel === level.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{level.icon}</span>
                <span className="font-medium">{level.name}</span>
              </div>
              <p className="text-sm text-gray-600">{level.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 资料可见性 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">资料可见性</h3>
        <div className="space-y-3">
          {[
            { value: "public", label: "公开", description: "所有人都可以看到" },
            {
              value: "friends",
              label: "好友可见",
              description: "只有关注你的用户可以看到",
            },
            {
              value: "private",
              label: "私密",
              description: "只有你自己可以看到",
            },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name="profileVisibility"
                value={option.value}
                checked={currentPrivacy.profileVisibility === option.value}
                onChange={(e) =>
                  onChange({
                    privacy: {
                      ...currentPrivacy,
                      profileVisibility: e.target
                        .value as EditableUserProfile["privacy"]["profileVisibility"],
                    },
                  })
                }
                className="w-4 h-4 text-blue-600"
              />
              <div>
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-600">
                  {option.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 详细设置 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">详细设置</h3>
        <div className="space-y-4">
          {privacySettings.map((setting) => {
            const isEnabled = Boolean(
              currentPrivacy[setting.id as keyof typeof currentPrivacy]
            );

            return (
              <div
                key={setting.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{setting.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {setting.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {setting.description}
                    </div>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={() =>
                      togglePrivacySetting(
                        setting.id as keyof EditableUserProfile["privacy"]
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* 隐私提示 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">隐私保护提示</h4>
            <p className="text-sm text-blue-700">
              我们会严格保护你的隐私信息。你可以随时修改这些设置，调整信息的可见范围。
              建议定期检查隐私设置，确保符合你的期望。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
