import React, { useState } from "react";
import { SettingNavigation } from "../SettingItem";
import { useSettings } from "../../../hooks/useSettings";
import {
  ChangePasswordModal,
  PhoneBindingModal,
  EmailBindingModal,
  TwoFactorAuthModal,
  DeviceManagementModal,
  SecurityLogsModal,
} from "../modals";

export const AccountSecurity: React.FC = () => {
  const { settings, updateModuleSettings } = useSettings();
  const accountSettings = settings.account;

  const [modals, setModals] = useState({
    changePassword: false,
    phoneBinding: false,
    emailBinding: false,
    twoFactorAuth: false,
    deviceManagement: false,
    securityLogs: false,
  });

  const handleChangePassword = () => {
    setModals((prev) => ({ ...prev, changePassword: true }));
  };

  const handleBindPhone = () => {
    setModals((prev) => ({ ...prev, phoneBinding: true }));
  };

  const handleBindEmail = () => {
    setModals((prev) => ({ ...prev, emailBinding: true }));
  };

  const handleTwoFactorAuth = () => {
    setModals((prev) => ({ ...prev, twoFactorAuth: true }));
  };

  const handleDeviceManagement = () => {
    setModals((prev) => ({ ...prev, deviceManagement: true }));
  };

  const handleSecurityLogs = () => {
    setModals((prev) => ({ ...prev, securityLogs: true }));
  };

  const handlePasswordChangeSuccess = () => {
    // 显示成功提示
    alert("密码修改成功！");
  };

  const handlePhoneBindingSuccess = (phoneNumber: string) => {
    updateModuleSettings("account", { phoneNumber });
    alert("手机绑定成功！");
  };

  const handleEmailBindingSuccess = (email: string) => {
    updateModuleSettings("account", { email });
    alert("邮箱绑定成功！");
  };

  const handleTwoFactorSuccess = (enabled: boolean) => {
    updateModuleSettings("account", { twoFactorEnabled: enabled });
    alert(enabled ? "两步验证已启用！" : "两步验证已禁用！");
  };

  const handleDeviceRemove = (deviceId: string) => {
    const updatedDevices =
      accountSettings.loginDevices?.filter((d) => d.id !== deviceId) || [];
    updateModuleSettings("account", { loginDevices: updatedDevices });
    alert("设备已移除！");
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            账户安全
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            保护您的账户安全，管理登录方式和验证设置
          </p>
        </div>

        {/* 基础安全设置 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            基础安全
          </h3>

          <SettingNavigation
            icon="🔑"
            iconColor="bg-blue-100"
            title="修改密码"
            description="定期更换密码以保护账户安全"
            onClick={handleChangePassword}
          />

          <SettingNavigation
            icon="📱"
            iconColor="bg-green-100"
            title="手机绑定"
            description={
              accountSettings.phoneNumber
                ? `已绑定 ${accountSettings.phoneNumber}`
                : "绑定手机号用于安全验证"
            }
            badge={accountSettings.phoneNumber ? undefined : "未绑定"}
            onClick={handleBindPhone}
          />

          <SettingNavigation
            icon="📧"
            iconColor="bg-purple-100"
            title="邮箱绑定"
            description={
              accountSettings.email
                ? `已绑定 ${accountSettings.email}`
                : "绑定邮箱用于安全验证"
            }
            badge={accountSettings.email ? undefined : "未绑定"}
            onClick={handleBindEmail}
          />
        </div>

        {/* 高级安全设置 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            高级安全
          </h3>

          <SettingNavigation
            icon="🛡️"
            iconColor="bg-red-100"
            title="两步验证"
            description={
              accountSettings.twoFactorEnabled
                ? "已启用两步验证"
                : "启用两步验证增强账户安全"
            }
            badge={accountSettings.twoFactorEnabled ? "已启用" : "建议启用"}
            onClick={handleTwoFactorAuth}
          />

          <SettingNavigation
            icon="💻"
            iconColor="bg-orange-100"
            title="登录设备管理"
            description={`当前有 ${accountSettings.loginDevices.length} 台设备登录`}
            onClick={handleDeviceManagement}
          />

          <SettingNavigation
            icon="📋"
            iconColor="bg-teal-100"
            title="安全日志"
            description="查看账户的登录和安全操作记录"
            onClick={handleSecurityLogs}
          />
        </div>

        {/* 安全状态概览 */}
        <div
          className={`border rounded-lg p-4 ${
            accountSettings.twoFactorEnabled &&
            accountSettings.phoneNumber &&
            accountSettings.email
              ? "bg-green-50 border-green-200"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                accountSettings.twoFactorEnabled &&
                accountSettings.phoneNumber &&
                accountSettings.email
                  ? "bg-green-100"
                  : "bg-yellow-100"
              }`}
            >
              <span>
                {accountSettings.twoFactorEnabled &&
                accountSettings.phoneNumber &&
                accountSettings.email
                  ? "✅"
                  : "⚠️"}
              </span>
            </div>
            <div>
              <h4
                className={`font-medium mb-2 ${
                  accountSettings.twoFactorEnabled &&
                  accountSettings.phoneNumber &&
                  accountSettings.email
                    ? "text-green-900"
                    : "text-yellow-900"
                }`}
              >
                {accountSettings.twoFactorEnabled &&
                accountSettings.phoneNumber &&
                accountSettings.email
                  ? "账户安全状态良好"
                  : "建议完善安全设置"}
              </h4>
              <p
                className={`text-sm leading-relaxed ${
                  accountSettings.twoFactorEnabled &&
                  accountSettings.phoneNumber &&
                  accountSettings.email
                    ? "text-green-700"
                    : "text-yellow-700"
                }`}
              >
                {accountSettings.twoFactorEnabled &&
                accountSettings.phoneNumber &&
                accountSettings.email
                  ? "您的账户已启用完整的安全保护措施，包括双重验证和联系方式绑定。"
                  : "为了更好地保护您的账户安全，建议绑定手机号、邮箱并启用两步验证。"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 模态框 */}
      <ChangePasswordModal
        isOpen={modals.changePassword}
        onClose={() =>
          setModals((prev) => ({ ...prev, changePassword: false }))
        }
        onSuccess={handlePasswordChangeSuccess}
      />

      <PhoneBindingModal
        isOpen={modals.phoneBinding}
        onClose={() => setModals((prev) => ({ ...prev, phoneBinding: false }))}
        onSuccess={handlePhoneBindingSuccess}
        currentPhone={accountSettings.phoneNumber}
      />

      <EmailBindingModal
        isOpen={modals.emailBinding}
        onClose={() => setModals((prev) => ({ ...prev, emailBinding: false }))}
        onSuccess={handleEmailBindingSuccess}
        currentEmail={accountSettings.email}
      />

      <TwoFactorAuthModal
        isOpen={modals.twoFactorAuth}
        onClose={() => setModals((prev) => ({ ...prev, twoFactorAuth: false }))}
        onSuccess={handleTwoFactorSuccess}
        currentlyEnabled={accountSettings.twoFactorEnabled}
      />

      <DeviceManagementModal
        isOpen={modals.deviceManagement}
        onClose={() =>
          setModals((prev) => ({ ...prev, deviceManagement: false }))
        }
        devices={accountSettings.loginDevices || []}
        onDeviceRemove={handleDeviceRemove}
      />

      <SecurityLogsModal
        isOpen={modals.securityLogs}
        onClose={() => setModals((prev) => ({ ...prev, securityLogs: false }))}
      />
    </>
  );
};
