import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FormInput,
  LoadingButton,
  VerificationCodeInput,
} from "@/components/ui";
import { useAuth, useLoginForm } from "../../hooks";
import { showToast } from "@/store/slices/uiSlice";
import type { AppDispatch } from "@/store";

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { login, wechatLogin, loading, error } = useAuth();
  const { formData, errors, touched, updateField, touchField, validateAll } =
    useLoginForm();
  const showRememberMe = true;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    try {
      await login(formData);
      // 显示成功提示
      dispatch(
        showToast({
          message: "登录成功！",
          type: "success",
        })
      );
      onSuccess?.();
      navigate("/");
    } catch (error) {
      // Error is handled by the hook
      console.error("Login failed:", error);
    }
  };

  const handleWechatLogin = async () => {
    try {
      await wechatLogin();
      onSuccess?.();
      navigate("/");
    } catch (error) {
      console.error("WeChat login failed:", error);
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* 表单容器 */}
      <div className="bg-white rounded-3xl p-8 shadow-[0px_8px_32px_rgba(0,0,0,0.08)]">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-[#222222] mb-2">
            欢迎回来
          </h2>
          <p className="text-base text-[#666666]">登录您的BitBit账户</p>
        </div>

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
            placeholder="138****8888"
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

          {/* 记住我和忘记密码 */}
          {showRememberMe && (
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      updateField("rememberMe", e.target.checked)
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      formData.rememberMe
                        ? "bg-[#4E6FFF] border-[#4E6FFF]"
                        : "bg-white border-[#E0E0E6]"
                    }`}
                  >
                    {formData.rememberMe && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
                <span className="ml-3 text-base text-[#666666]">记住我</span>
              </label>

              <button
                type="button"
                className="text-base font-medium text-[#4E6FFF] hover:text-[#3D5BFF] transition-colors"
                onClick={() => {
                  // TODO: 实现忘记密码功能
                  console.log("忘记密码");
                }}
              >
                忘记密码？
              </button>
            </div>
          )}

          {/* 登录按钮 */}
          <LoadingButton type="submit" loading={loading} disabled={loading}>
            登录
          </LoadingButton>

          {/* 分割线 */}
          <div className="flex items-center">
            <div className="flex-1 h-px bg-[#E0E0E6]"></div>
            <span className="px-4 text-base text-[#999999]">或</span>
            <div className="flex-1 h-px bg-[#E0E0E6]"></div>
          </div>

          {/* 微信登录 */}
          <LoadingButton
            type="button"
            variant="wechat"
            onClick={handleWechatLogin}
          >
            微信登录
          </LoadingButton>
        </form>

        {/* 注册提示 */}
        <div className="mt-8 text-center">
          <span className="text-base text-[#666666]">还没有账户？</span>
          <button
            type="button"
            className="ml-2 text-base font-medium text-[#4E6FFF] hover:text-[#3D5BFF] transition-colors"
            onClick={() => navigate("/register")}
          >
            立即注册
          </button>
        </div>

        {/* 服务条款 */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-[#999999]">登录即表示您同意我们的</p>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <button
              type="button"
              className="font-medium text-[#4E6FFF] hover:text-[#3D5BFF] transition-colors"
              onClick={() => {
                // TODO: 跳转到用户服务协议页面
                console.log("用户服务协议");
              }}
            >
              《用户服务协议》
            </button>
            <span className="text-[#999999]">和</span>
            <button
              type="button"
              className="font-medium text-[#4E6FFF] hover:text-[#3D5BFF] transition-colors"
              onClick={() => {
                // TODO: 跳转到隐私政策页面
                console.log("隐私政策");
              }}
            >
              《隐私政策》
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
