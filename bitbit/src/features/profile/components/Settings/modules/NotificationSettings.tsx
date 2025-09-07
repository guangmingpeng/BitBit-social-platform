import React from "react";
import { SettingSwitch } from "../SettingItem";
import { useSettings } from "../../../hooks/useSettings";

export const NotificationSettings: React.FC = () => {
  const { settings, updateModuleSettings } = useSettings();
  const notificationSettings = settings.notifications;

  const updatePushSetting = (
    key: keyof typeof notificationSettings.push,
    value: boolean
  ) => {
    updateModuleSettings("notifications", {
      push: {
        ...notificationSettings.push,
        [key]: value,
      },
    });
  };

  const updateEmailSetting = (
    key: keyof typeof notificationSettings.email,
    value: boolean
  ) => {
    updateModuleSettings("notifications", {
      email: {
        ...notificationSettings.email,
        [key]: value,
      },
    });
  };

  const updateSmsSetting = (
    key: keyof typeof notificationSettings.sms,
    value: boolean
  ) => {
    updateModuleSettings("notifications", {
      sms: {
        ...notificationSettings.sms,
        [key]: value,
      },
    });
  };

  const updateDoNotDisturbSetting = (
    key: keyof typeof notificationSettings.doNotDisturb,
    value: boolean | string
  ) => {
    updateModuleSettings("notifications", {
      doNotDisturb: {
        ...notificationSettings.doNotDisturb,
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">通知设置</h2>
        <p className="text-gray-600 mb-6">管理您接收通知的方式和时间</p>
      </div>

      {/* 推送通知 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">推送通知</h3>

        <SettingSwitch
          icon="🎯"
          iconColor="bg-purple-100"
          title="活动通知"
          description="活动报名、取消、提醒等消息"
          checked={notificationSettings.push.activities}
          onChange={(checked) => updatePushSetting("activities", checked)}
        />

        <SettingSwitch
          icon="💬"
          iconColor="bg-blue-100"
          title="私信通知"
          description="新私信和聊天消息"
          checked={notificationSettings.push.messages}
          onChange={(checked) => updatePushSetting("messages", checked)}
        />

        <SettingSwitch
          icon="🔄"
          iconColor="bg-green-100"
          title="交易通知"
          description="商品交易、订单状态变更"
          checked={notificationSettings.push.exchanges}
          onChange={(checked) => updatePushSetting("exchanges", checked)}
        />

        <SettingSwitch
          icon="🏛️"
          iconColor="bg-orange-100"
          title="社区通知"
          description="帖子点赞、评论、关注等"
          checked={notificationSettings.push.community}
          onChange={(checked) => updatePushSetting("community", checked)}
        />

        <SettingSwitch
          icon="📢"
          iconColor="bg-red-100"
          title="营销通知"
          description="促销活动、新功能推广"
          checked={notificationSettings.push.marketing}
          onChange={(checked) => updatePushSetting("marketing", checked)}
        />
      </div>

      {/* 邮件通知 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">邮件通知</h3>

        <SettingSwitch
          icon="📧"
          iconColor="bg-purple-100"
          title="活动邮件"
          description="重要活动信息邮件提醒"
          checked={notificationSettings.email.activities}
          onChange={(checked) => updateEmailSetting("activities", checked)}
        />

        <SettingSwitch
          icon="💌"
          iconColor="bg-blue-100"
          title="消息邮件"
          description="重要私信的邮件通知"
          checked={notificationSettings.email.messages}
          onChange={(checked) => updateEmailSetting("messages", checked)}
        />

        <SettingSwitch
          icon="📦"
          iconColor="bg-green-100"
          title="交易邮件"
          description="订单确认、发货等邮件"
          checked={notificationSettings.email.exchanges}
          onChange={(checked) => updateEmailSetting("exchanges", checked)}
        />

        <SettingSwitch
          icon="🗞️"
          iconColor="bg-teal-100"
          title="社区周报"
          description="每周社区动态汇总邮件"
          checked={notificationSettings.email.community}
          onChange={(checked) => updateEmailSetting("community", checked)}
        />

        <SettingSwitch
          icon="📬"
          iconColor="bg-indigo-100"
          title="订阅邮件"
          description="产品资讯、功能更新邮件"
          checked={notificationSettings.email.newsletter}
          onChange={(checked) => updateEmailSetting("newsletter", checked)}
        />

        <SettingSwitch
          icon="🎁"
          iconColor="bg-pink-100"
          title="营销邮件"
          description="优惠活动、推广邮件"
          checked={notificationSettings.email.marketing}
          onChange={(checked) => updateEmailSetting("marketing", checked)}
        />
      </div>

      {/* 短信通知 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">短信通知</h3>

        <SettingSwitch
          icon="🔒"
          iconColor="bg-red-100"
          title="安全验证"
          description="登录验证、密码重置等安全相关短信"
          checked={notificationSettings.sms.security}
          onChange={(checked) => updateSmsSetting("security", checked)}
        />

        <SettingSwitch
          icon="⚠️"
          iconColor="bg-yellow-100"
          title="重要提醒"
          description="账户异常、重要交易等紧急短信"
          checked={notificationSettings.sms.important}
          onChange={(checked) => updateSmsSetting("important", checked)}
        />
      </div>

      {/* 勿扰模式 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">勿扰模式</h3>

        <SettingSwitch
          icon="🌙"
          iconColor="bg-gray-100"
          title="启用勿扰模式"
          description="在指定时间段内不接收非紧急通知"
          checked={notificationSettings.doNotDisturb.enabled}
          onChange={(checked) => updateDoNotDisturbSetting("enabled", checked)}
        />

        {notificationSettings.doNotDisturb.enabled && (
          <>
            <div className="pl-14 space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600 w-16">开始时间</label>
                <input
                  type="time"
                  value={notificationSettings.doNotDisturb.startTime}
                  onChange={(e) =>
                    updateDoNotDisturbSetting("startTime", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600 w-16">结束时间</label>
                <input
                  type="time"
                  value={notificationSettings.doNotDisturb.endTime}
                  onChange={(e) =>
                    updateDoNotDisturbSetting("endTime", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <SettingSwitch
                title="仅周末启用"
                description="勿扰模式只在周末生效"
                checked={notificationSettings.doNotDisturb.weekendsOnly}
                onChange={(checked) =>
                  updateDoNotDisturbSetting("weekendsOnly", checked)
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
