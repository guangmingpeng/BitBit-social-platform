import React, { useState } from "react";

interface TwoFactorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (enabled: boolean) => void;
  currentlyEnabled: boolean;
}

export const TwoFactorAuthModal: React.FC<TwoFactorAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentlyEnabled,
}) => {
  const [step, setStep] = useState<"confirm" | "setup" | "verify" | "disable">(
    currentlyEnabled ? "disable" : "confirm"
  );
  const [qrCode, setQrCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSetupTwoFactor = async () => {
    setLoading(true);
    try {
      // TODO: 调用API生成QR码
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟QR码数据
      setQrCode(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
      );
      setStep("setup");
    } catch {
      setError("生成验证码失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      setError("请输入6位验证码");
      return;
    }

    setLoading(true);
    try {
      // TODO: 调用API验证验证码
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟备份码
      const codes = Array.from({ length: 8 }, () =>
        Math.random().toString(36).substring(2, 8).toUpperCase()
      );
      setBackupCodes(codes);
      setStep("verify");
    } catch {
      setError("验证码错误，请重新输入");
    } finally {
      setLoading(false);
    }
  };

  const handleDisableTwoFactor = async () => {
    setLoading(true);
    try {
      // TODO: 调用API禁用两步验证
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSuccess(false);
      onClose();
      resetModal();
    } catch {
      setError("禁用两步验证失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    onSuccess(true);
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setStep(currentlyEnabled ? "disable" : "confirm");
    setQrCode("");
    setVerificationCode("");
    setBackupCodes([]);
    setError("");
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />

      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {currentlyEnabled ? "禁用两步验证" : "启用两步验证"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* 确认启用 */}
        {step === "confirm" && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                增强账户安全
              </h3>
              <p className="text-gray-600 mb-6">
                两步验证为您的账户提供额外的安全保护。即使密码被泄露，攻击者也无法访问您的账户。
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">准备工作：</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  • 安装身份验证应用（如 Google Authenticator、Microsoft
                  Authenticator）
                </li>
                <li>• 确保手机在身边以扫描二维码</li>
                <li>• 准备安全的地方保存备份码</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleSetupTwoFactor}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                {loading ? "设置中..." : "开始设置"}
              </button>
            </div>
          </div>
        )}

        {/* 扫描二维码 */}
        {step === "setup" && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                扫描二维码
              </h3>
              <p className="text-gray-600 mb-4">
                使用身份验证应用扫描下方二维码
              </p>
            </div>

            <div className="flex justify-center">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                {qrCode ? (
                  <img
                    src={qrCode}
                    alt="QR Code"
                    className="w-full h-full rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500">二维码加载中...</span>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>无法扫描？</strong> 手动输入密钥：
                <br />
                <code className="bg-yellow-100 px-2 py-1 rounded text-xs">
                  JBSWY3DPEHPK3PXP
                </code>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                验证码
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(e.target.value.replace(/\D/g, ""))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                placeholder="输入6位验证码"
                maxLength={6}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep("confirm")}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                返回
              </button>
              <button
                type="button"
                onClick={handleVerifyCode}
                disabled={loading || verificationCode.length !== 6}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                {loading ? "验证中..." : "验证"}
              </button>
            </div>
          </div>
        )}

        {/* 备份码 */}
        {step === "verify" && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                两步验证已启用
              </h3>
              <p className="text-gray-600 mb-4">
                请保存以下备份码，当您无法使用身份验证应用时可以使用
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">备份码：</h4>
              <div className="grid grid-cols-2 gap-2">
                {backupCodes.map((code, index) => (
                  <div
                    key={index}
                    className="bg-white p-2 rounded border text-center font-mono text-sm"
                  >
                    {code}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-800">
                <strong>重要提醒：</strong>
                <br />
                • 请将备份码保存在安全的地方
                <br />
                • 每个备份码只能使用一次
                <br />• 建议打印或写在纸上离线保存
              </p>
            </div>

            <button
              type="button"
              onClick={handleComplete}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              我已安全保存备份码
            </button>
          </div>
        )}

        {/* 禁用两步验证 */}
        {step === "disable" && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                确认禁用两步验证
              </h3>
              <p className="text-gray-600 mb-4">
                禁用两步验证会降低您的账户安全性。确定要继续吗？
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-800">
                禁用后，您的账户将只使用密码保护，建议定期更换强密码。
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleDisableTwoFactor}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                {loading ? "禁用中..." : "确认禁用"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
