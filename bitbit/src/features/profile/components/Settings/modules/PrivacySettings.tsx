import React from "react";
import { SettingSwitch, SettingSelect } from "../SettingItem";
import { useSettings } from "../../../hooks/useSettings";

export const PrivacySettings: React.FC = () => {
  const { settings, updateModuleSettings } = useSettings();
  const privacySettings = settings.privacy;

  const visibilityOptions = [
    { label: "公开", value: "public" },
    { label: "仅好友", value: "friends" },
    { label: "私密", value: "private" },
  ];

  const updatePrivacySetting = (
    key: keyof typeof privacySettings,
    value: unknown
  ) => {
    updateModuleSettings("privacy", {
      [key]: value,
    });
  };

  const updateDataSharingSetting = (
    key: keyof typeof privacySettings.dataSharing,
    value: boolean
  ) => {
    updateModuleSettings("privacy", {
      dataSharing: {
        ...privacySettings.dataSharing,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">隐私控制</h2>
        <p className="text-gray-600 mb-6">
          管理您的个人信息可见性和数据使用权限
        </p>
      </div>

      {/* 个人资料可见性 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">个人资料可见性</h3>

        <SettingSelect
          icon="👤"
          iconColor="bg-blue-100"
          title="个人资料可见性"
          description="设置您的个人资料对其他用户的可见程度"
          value={privacySettings.profileVisibility}
          options={visibilityOptions}
          onChange={(value) => updatePrivacySetting("profileVisibility", value)}
        />

        <SettingSwitch
          icon="📧"
          iconColor="bg-green-100"
          title="显示邮箱地址"
          description="在个人资料中显示您的邮箱地址"
          checked={privacySettings.showEmail}
          onChange={(checked) => updatePrivacySetting("showEmail", checked)}
        />

        <SettingSwitch
          icon="🎂"
          iconColor="bg-pink-100"
          title="显示年龄信息"
          description="在个人资料中显示您的年龄"
          checked={privacySettings.showAge}
          onChange={(checked) => updatePrivacySetting("showAge", checked)}
        />

        <SettingSwitch
          icon="📍"
          iconColor="bg-red-100"
          title="显示所在地"
          description="在个人资料中显示您的位置信息"
          checked={privacySettings.showLocation}
          onChange={(checked) => updatePrivacySetting("showLocation", checked)}
        />
      </div>

      {/* 社交权限 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">社交权限</h3>

        <SettingSwitch
          icon="💬"
          iconColor="bg-blue-100"
          title="允许私信"
          description="其他用户可以向您发送私信"
          checked={privacySettings.allowMessages}
          onChange={(checked) => updatePrivacySetting("allowMessages", checked)}
        />

        <SettingSwitch
          icon="🎯"
          iconColor="bg-purple-100"
          title="允许活动邀请"
          description="其他用户可以邀请您参加活动"
          checked={privacySettings.allowActivityInvites}
          onChange={(checked) =>
            updatePrivacySetting("allowActivityInvites", checked)
          }
        />

        <SettingSwitch
          icon="🔍"
          iconColor="bg-orange-100"
          title="允许搜索发现"
          description="其他用户可以通过搜索找到您"
          checked={privacySettings.searchable}
          onChange={(checked) => updatePrivacySetting("searchable", checked)}
        />
      </div>

      {/* 数据权限控制 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">数据权限控制</h3>

        <SettingSwitch
          icon="📊"
          iconColor="bg-teal-100"
          title="数据分析"
          description="允许使用您的数据进行产品改进和分析"
          checked={privacySettings.dataSharing.analytics}
          onChange={(checked) => updateDataSharingSetting("analytics", checked)}
        />

        <SettingSwitch
          icon="🎯"
          iconColor="bg-indigo-100"
          title="个性化推荐"
          description="根据您的使用习惯提供个性化内容推荐"
          checked={privacySettings.dataSharing.personalization}
          onChange={(checked) =>
            updateDataSharingSetting("personalization", checked)
          }
        />

        <SettingSwitch
          icon="🤝"
          iconColor="bg-yellow-100"
          title="第三方数据共享"
          description="与合作伙伴共享匿名化数据以改善服务"
          checked={privacySettings.dataSharing.thirdParty}
          onChange={(checked) =>
            updateDataSharingSetting("thirdParty", checked)
          }
        />
      </div>

      {/* 隐私说明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600">ℹ️</span>
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-2">隐私保护说明</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              我们承诺保护您的隐私安全。您的个人信息将按照我们的隐私政策进行处理，您可以随时调整这些设置。
              如需了解更多信息，请查看我们的
              <button className="text-blue-600 hover:text-blue-800 underline ml-1">
                隐私政策
              </button>
              。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
