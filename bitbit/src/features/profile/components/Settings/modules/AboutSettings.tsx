import React from "react";
import { SettingNavigation } from "../SettingItem";

export const AboutSettings: React.FC = () => {
  const handleViewHelp = () => {
    // TODO: 打开帮助中心
    window.open("/help", "_blank");
  };

  const handleSendFeedback = () => {
    // TODO: 发送反馈功能
    window.open("mailto:support@bitbit.com?subject=用户反馈", "_blank");
  };

  const handleViewPrivacyPolicy = () => {
    // TODO: 查看隐私政策
    window.open("/privacy", "_blank");
  };

  const handleViewTerms = () => {
    // TODO: 查看服务条款
    window.open("/terms", "_blank");
  };

  const handleViewLicenses = () => {
    // TODO: 查看开源许可
    window.open("/licenses", "_blank");
  };

  const handleViewStatus = () => {
    // 查看服务状态
    window.open("/status", "_blank");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">关于帮助</h2>
        <p className="text-gray-600 mb-6">了解平台信息，获取帮助和支持</p>
      </div>

      {/* 应用信息 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-white text-2xl">🎯</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">BitBit 社交平台</h3>
            <p className="text-gray-600">连接兴趣，分享生活</p>
            <p className="text-sm text-gray-500 mt-1">版本 1.0.0</p>
          </div>
        </div>
      </div>

      {/* 帮助支持 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">帮助支持</h3>

        <SettingNavigation
          icon="❓"
          iconColor="bg-green-100"
          title="帮助中心"
          description="查看常见问题和使用指南"
          onClick={handleViewHelp}
        />

        <SettingNavigation
          icon="💬"
          iconColor="bg-orange-100"
          title="意见反馈"
          description="向我们发送建议和问题反馈"
          onClick={handleSendFeedback}
        />

        <SettingNavigation
          icon="�"
          iconColor="bg-blue-100"
          title="服务状态"
          description="查看平台服务运行状态"
          onClick={handleViewStatus}
        />
      </div>

      {/* 法律条款 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">法律条款</h3>

        <SettingNavigation
          icon="🔒"
          iconColor="bg-purple-100"
          title="隐私政策"
          description="了解我们如何保护您的隐私"
          onClick={handleViewPrivacyPolicy}
        />

        <SettingNavigation
          icon="📋"
          iconColor="bg-teal-100"
          title="服务条款"
          description="查看使用条款和用户协议"
          onClick={handleViewTerms}
        />

        <SettingNavigation
          icon="📜"
          iconColor="bg-indigo-100"
          title="开源许可"
          description="查看第三方库和开源组件许可"
          onClick={handleViewLicenses}
        />
      </div>

      {/* 联系我们 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3">联系我们</h3>
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">
            <span className="font-medium">客服邮箱:</span> support@bitbit.com
          </p>
          <p className="text-gray-600">
            <span className="font-medium">官方网站:</span> www.bitbit.com
          </p>
          <p className="text-gray-600">
            <span className="font-medium">工作时间:</span> 周一至周五 9:00-18:00
          </p>
        </div>
      </div>

      {/* 社区链接 */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">加入社区</h3>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
            <span>📘</span>
            <span className="text-sm font-medium">关注微博</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
            <span>💬</span>
            <span className="text-sm font-medium">加入微信群</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <span>🐙</span>
            <span className="text-sm font-medium">GitHub</span>
          </button>
        </div>
      </div>

      {/* 感谢信息 */}
      <div className="text-center py-6 text-gray-500 text-sm">
        <p>感谢您使用 BitBit 社交平台</p>
        <p className="mt-1">让我们一起创造更美好的社交体验 ❤️</p>
      </div>
    </div>
  );
};
