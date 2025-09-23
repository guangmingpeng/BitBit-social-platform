import { type FC, useState } from "react";
import FormInput from "../FormInput";
import { useVerificationCode } from "@/features/auth/hooks";

interface VerificationCodeInputProps {
  phone: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
}

const VerificationCodeInput: FC<VerificationCodeInputProps> = ({
  phone,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
}) => {
  const { countdown, isCountingDown, loading, sendCode } =
    useVerificationCode();
  const [sendError, setSendError] = useState<string>("");

  const handleSendCode = async () => {
    if (!phone || phone.length !== 11) {
      setSendError("请先输入正确的手机号");
      return;
    }

    try {
      setSendError("");
      await sendCode(phone);
    } catch {
      // Error is already handled by the hook
    }
  };

  const getButtonText = () => {
    if (loading) return "发送中...";
    if (isCountingDown) return `${countdown}s`;
    return "获取验证码";
  };

  const isButtonDisabled = loading || isCountingDown || disabled || !phone;

  return (
    <div className="space-y-2">
      <label className="block text-base font-medium text-[#222222]">
        验证码 <span className="text-red-500">*</span>
      </label>

      <div className="flex gap-4">
        <div className="flex-1">
          <FormInput
            type="text"
            placeholder="请输入验证码"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            error={error}
            disabled={disabled}
            maxLength={6}
          />
        </div>

        <button
          type="button"
          className={`
            w-[120px] h-[60px] rounded-xl text-base font-medium transition-all duration-200
            ${
              isButtonDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#4E6FFF] text-white hover:bg-[#3D5BFF] active:bg-[#2E4AFF]"
            }
          `}
          onClick={handleSendCode}
          disabled={isButtonDisabled}
        >
          {getButtonText()}
        </button>
      </div>

      {sendError && <p className="text-sm text-red-500">{sendError}</p>}
    </div>
  );
};

export default VerificationCodeInput;
