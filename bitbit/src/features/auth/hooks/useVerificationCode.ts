import { useState, useCallback } from "react";
import { AuthService } from "../services/authService";

interface UseVerificationCodeReturn {
  countdown: number;
  isCountingDown: boolean;
  loading: boolean;
  error: string | null;
  sendCode: (phone: string) => Promise<void>;
  clearError: () => void;
}

export const useVerificationCode = (): UseVerificationCodeReturn => {
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCode = useCallback(async (phone: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await AuthService.sendVerificationCode(phone);

      if (response.success && response.countdown) {
        // 开始倒计时
        setCountdown(response.countdown);

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "发送验证码失败";
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    countdown,
    isCountingDown: countdown > 0,
    loading,
    error,
    sendCode,
    clearError,
  };
};
