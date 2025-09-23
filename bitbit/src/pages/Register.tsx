import { type FC } from "react";
import { GradientBackground } from "@/components/ui";
import { AuthHeader, RegisterForm } from "@/features/auth/components";

const Register: FC = () => {
  return (
    <GradientBackground>
      <div className="container mx-auto px-4 py-8">
        <AuthHeader title="BitBit 注册" showBackButton />

        <div className="mt-8">
          <RegisterForm />
        </div>

        {/* 底部装饰 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-16 h-16 rounded-full bg-[rgba(255,107,139,0.1)] left-8 bottom-96"></div>
          <div className="absolute w-20 h-20 rounded-full bg-[rgba(101,209,170,0.1)] right-8 bottom-80"></div>
          <div className="absolute w-12 h-12 rounded-full bg-[rgba(255,185,81,0.1)] left-12 bottom-60"></div>
          <div className="absolute w-18 h-18 rounded-full bg-[rgba(143,124,255,0.1)] right-12 bottom-40"></div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default Register;
