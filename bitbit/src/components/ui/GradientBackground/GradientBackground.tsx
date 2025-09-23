import { type FC, type ReactNode } from "react";

interface GradientBackgroundProps {
  children: ReactNode;
  className?: string;
}

const GradientBackground: FC<GradientBackgroundProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#F0F4FF] to-[#CCE1FF] ${className}`}
      style={{
        background: "linear-gradient(135deg, #F0F4FF 0%, #CCE1FF 100%)",
      }}
    >
      {children}
    </div>
  );
};

export default GradientBackground;
