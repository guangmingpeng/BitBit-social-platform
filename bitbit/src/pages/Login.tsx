import { type FC } from "react";
import { GradientBackground } from "@/components/ui";
import { AuthHeader, LoginForm } from "@/features/auth/components";

const Login: FC = () => {
  return (
    <GradientBackground>
      <div className="container mx-auto px-4 py-8">
        <AuthHeader title="BitBit 登录" />

        <div className="mt-8">
          <LoginForm />
        </div>

        {/* 底部装饰 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-20 h-20 rounded-full bg-[rgba(255,107,139,0.1)] left-8 bottom-96"></div>
          <div className="absolute w-32 h-32 rounded-full bg-[rgba(101,209,170,0.1)] right-8 bottom-72"></div>
          <div className="absolute w-16 h-16 rounded-full bg-[rgba(255,185,81,0.1)] left-16 bottom-48"></div>
          <div className="absolute w-24 h-24 rounded-full bg-[rgba(143,124,255,0.1)] right-16 bottom-32"></div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default Login;
