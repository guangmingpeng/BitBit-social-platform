import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FormInput,
  LoadingButton,
  VerificationCodeInput,
  InterestTags,
} from "@/components/ui";
import { useAuth, useRegisterForm } from "../../hooks";
import { showToast } from "@/store/slices/uiSlice";
import type { AppDispatch } from "@/store";

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { register, wechatLogin, loading, error } = useAuth();
  const { formData, errors, touched, updateField, touchField, validateAll } =
    useRegisterForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    try {
      await register(formData);
      // 显示成功提示
      dispatch(
        showToast({
          message: "注册成功！欢迎加入BitBit！",
          type: "success",
        })
      );
      onSuccess?.();
      navigate("/");
    } catch (error) {
      // Error is handled by the hook
      console.error("Register failed:", error);
    }
  };

  const handleWechatRegister = async () => {
    try {
      await wechatLogin();
      onSuccess?.();
      navigate("/");
    } catch (error) {
      console.error("WeChat register failed:", error);
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* 表单容器 */}
      <div className="bg-white rounded-3xl p-8 shadow-[0px_8px_32px_rgba(0,0,0,0.08)]">
        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 手机号输入 */}
          <FormInput
            label="手机号"
            type="tel"
            placeholder="请输入手机号码"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            onBlur={() => touchField("phone")}
            error={touched.phone ? errors.phone : undefined}
            required
            variant="gray"
            maxLength={11}
          />

          {/* 验证码输入 */}
          <VerificationCodeInput
            phone={formData.phone}
            value={formData.verificationCode}
            onChange={(value) => updateField("verificationCode", value)}
            onBlur={() => touchField("verificationCode")}
            error={
              touched.verificationCode ? errors.verificationCode : undefined
            }
          />

          {/* 昵称输入 */}
          <FormInput
            label="昵称"
            type="text"
            placeholder="请输入昵称 (2-20个字符)"
            value={formData.nickname}
            onChange={(e) => updateField("nickname", e.target.value)}
            onBlur={() => touchField("nickname")}
            error={touched.nickname ? errors.nickname : undefined}
            required
            variant="white"
            maxLength={20}
          />

          {/* 密码输入 */}
          <FormInput
            label="密码"
            type={showPassword ? "text" : "password"}
            placeholder="请输入密码 (至少8位)"
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            onBlur={() => touchField("password")}
            error={touched.password ? errors.password : undefined}
            required
            variant="white"
            showEyeIcon
            onEyeClick={() => setShowPassword(!showPassword)}
          />

          {/* 确认密码输入 */}
          <FormInput
            label="确认密码"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="请再次输入密码"
            value={formData.confirmPassword}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
            onBlur={() => touchField("confirmPassword")}
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
            required
            variant="white"
            showEyeIcon
            onEyeClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          {/* 兴趣标签选择 */}
          <InterestTags
            selectedInterests={formData.interests || []}
            onChange={(interests) => updateField("interests", interests)}
          />

          {/* 用户协议勾选 */}
          <div className="space-y-4">
            <label className="flex items-start cursor-pointer">
              <div className="relative mt-1">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    updateField("agreeToTerms", e.target.checked)
                  }
                  onBlur={() => touchField("agreeToTerms")}
                  className="sr-only"
                />
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    formData.agreeToTerms
                      ? "bg-[#4E6FFF] border-[#4E6FFF]"
                      : "bg-white border-[#E0E0E6]"
                  }`}
                >
                  {formData.agreeToTerms && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
              <div className="ml-3 text-base text-[#666666]">
                我已阅读并同意
                <button
                  type="button"
                  className="mx-1 font-medium text-[#4E6FFF] hover:text-[#3D5BFF] transition-colors"
                  onClick={() => {
                    // TODO: 跳转到用户服务协议页面
                    console.log("用户服务协议");
                  }}
                >
                  《用户服务协议》
                </button>
                和
                <button
                  type="button"
                  className="ml-1 font-medium text-[#4E6FFF] hover:text-[#3D5BFF] transition-colors"
                  onClick={() => {
                    // TODO: 跳转到隐私政策页面
                    console.log("隐私政策");
                  }}
                >
                  《隐私政策》
                </button>
              </div>
            </label>
            {touched.agreeToTerms && errors.agreeToTerms && (
              <p className="text-sm text-red-500 ml-9">{errors.agreeToTerms}</p>
            )}

            {/* 营销信息勾选 */}
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.acceptMarketing}
                  onChange={(e) =>
                    updateField("acceptMarketing", e.target.checked)
                  }
                  className="sr-only"
                />
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    formData.acceptMarketing
                      ? "bg-[#4E6FFF] border-[#4E6FFF]"
                      : "bg-white border-[#E0E0E6]"
                  }`}
                >
                  {formData.acceptMarketing && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
              <span className="ml-3 text-base text-[#666666]">
                接收活动推荐和优惠信息 (可选)
              </span>
            </label>
          </div>

          {/* 注册按钮 */}
          <LoadingButton type="submit" loading={loading} disabled={loading}>
            立即注册
          </LoadingButton>

          {/* 分割线 */}
          <div className="flex items-center">
            <div className="flex-1 h-px bg-[#E0E0E6]"></div>
            <span className="px-4 text-base text-[#999999]">或</span>
            <div className="flex-1 h-px bg-[#E0E0E6]"></div>
          </div>

          {/* 微信注册 */}
          <LoadingButton
            type="button"
            variant="wechat"
            onClick={handleWechatRegister}
          >
            微信快速注册
          </LoadingButton>
        </form>

        {/* 登录提示 */}
        <div className="mt-8 text-center">
          <span className="text-base text-[#666666]">已有账户？</span>
          <button
            type="button"
            className="ml-2 text-base font-medium text-[#4E6FFF] hover:text-[#3D5BFF] transition-colors"
            onClick={() => navigate("/login")}
          >
            立即登录
          </button>
        </div>

        {/* 安全提示 */}
        <div className="mt-6 p-5 bg-[rgba(78,111,255,0.05)] rounded-2xl">
          <div className="flex items-start">
            <span className="text-base text-[#4E6FFF] mr-2">🛡️</span>
            <div>
              <p className="text-base font-medium text-[#4E6FFF] mb-2">
                安全提示
              </p>
              <p className="text-sm text-[#666666] mb-1">
                我们采用银行级加密技术保护您的个人信息安全
              </p>
              <p className="text-sm text-[#666666]">
                注册后即可享受丰富的社交功能和个性化推荐
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
