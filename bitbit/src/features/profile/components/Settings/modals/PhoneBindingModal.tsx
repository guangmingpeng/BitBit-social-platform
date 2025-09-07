import React, { useState } from "react";

interface PhoneBindingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phoneNumber: string) => void;
  currentPhone?: string;
}

export const PhoneBindingModal: React.FC<PhoneBindingModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentPhone,
}) => {
  const [step, setStep] = useState<"input" | "verify">("input");
  const [formData, setFormData] = useState({
    phoneNumber: "",
    verificationCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSendCode = async () => {
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setErrors({ phoneNumber: "请输入正确的手机号码" });
      return;
    }

    setLoading(true);
    try {
      // TODO: 调用发送验证码API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟API调用

      setStep("verify");
      setErrors({});

      // 启动倒计时
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setErrors({ phoneNumber: "验证码发送失败，请重试" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!formData.verificationCode) {
      setErrors({ verificationCode: "请输入验证码" });
      return;
    }

    if (formData.verificationCode.length !== 6) {
      setErrors({ verificationCode: "验证码为6位数字" });
      return;
    }

    setLoading(true);
    try {
      // TODO: 调用验证码验证API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟API调用

      onSuccess(formData.phoneNumber);
      onClose();
      resetForm();
    } catch {
      setErrors({ verificationCode: "验证码错误，请重新输入" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep("input");
    setFormData({ phoneNumber: "", verificationCode: "" });
    setErrors({});
    setCountdown(0);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />

      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {currentPhone ? "更换手机号" : "绑定手机号"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {currentPhone && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              当前绑定手机：{currentPhone}
            </p>
          </div>
        )}

        {step === "input" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                手机号码
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="请输入手机号码"
                maxLength={11}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phoneNumber}
                </p>
              )}
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
                onClick={handleSendCode}
                disabled={loading || !formData.phoneNumber}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                {loading ? "发送中..." : "发送验证码"}
              </button>
            </div>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-gray-600">验证码已发送至</p>
              <p className="text-lg font-medium text-gray-900">
                {formData.phoneNumber}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                验证码
              </label>
              <input
                type="text"
                value={formData.verificationCode}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    verificationCode: e.target.value.replace(/\D/g, ""),
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                placeholder="请输入6位验证码"
                maxLength={6}
              />
              {errors.verificationCode && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.verificationCode}
                </p>
              )}
            </div>

            <div className="text-center">
              {countdown > 0 ? (
                <p className="text-sm text-gray-500">
                  {countdown}秒后可重新发送
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleSendCode}
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  重新发送验证码
                </button>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep("input")}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                返回
              </button>
              <button
                type="button"
                onClick={handleVerify}
                disabled={loading || formData.verificationCode.length !== 6}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                {loading ? "验证中..." : "确认绑定"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
