import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@/components/ui";
import { cn } from "@/shared/utils/cn";

interface FloatingBackButtonProps {
  /**
   * 点击处理函数，默认为 navigate(-1)
   */
  onClick?: () => void;
  /**
   * 按钮文本提示
   */
  text?: string;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 按钮位置样式变体
   */
  variant?: "elegant" | "minimal" | "vibrant";
  /**
   * 按钮尺寸
   */
  size?: "sm" | "md" | "lg";
}

const FloatingBackButton: React.FC<FloatingBackButtonProps> = ({
  onClick,
  text = "返回",
  className,
  variant = "elegant",
  size = "md",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "minimal":
        return "bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300 hover:shadow-lg";
      case "vibrant":
        return "bg-gradient-to-r from-primary-500 to-primary-600 text-white border-0 hover:from-primary-600 hover:to-primary-700 hover:shadow-xl";
      default:
        return "bg-white shadow-lg border-2 border-primary-300 text-primary-600 hover:bg-primary-25 hover:border-primary-400 hover:shadow-xl";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          button: "w-10 h-10",
          text: "text-xs",
          icon: "sm" as const,
          spacing: "gap-1.5",
        };
      case "lg":
        return {
          button: "w-16 h-16",
          text: "text-sm",
          icon: "lg" as const,
          spacing: "gap-2.5",
        };
      default:
        return {
          button: "w-12 h-12 md:w-14 md:h-14",
          text: "text-xs md:text-sm",
          icon: "md" as const,
          spacing: "gap-2",
        };
    }
  };

  const sizeConfig = getSizeStyles();

  return (
    <div className="fixed left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col items-center group">
        {/* 返回按钮 */}
        <button
          onClick={handleClick}
          className={cn(
            "rounded-full font-semibold transition-all duration-300 flex items-center justify-center relative overflow-hidden",
            "ring-0 hover:ring-4 hover:ring-primary-400/20 focus:ring-4 focus:ring-primary-500/30",
            "transform hover:scale-105 active:scale-95",
            sizeConfig.button,
            getVariantStyles(),
            className
          )}
          aria-label={text}
        >
          {/* 脉冲动画背景 */}
          <div className="absolute inset-0 bg-primary-400/30 rounded-full animate-ping opacity-0 group-hover:opacity-50" />

          {/* 渐变背景效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 via-primary-500/20 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

          {/* 图标容器 */}
          <div className="relative z-10 flex items-center justify-center">
            <Icon
              name="arrow-left"
              size={sizeConfig.icon}
              className="transition-all duration-300 group-hover:-translate-x-1 group-hover:scale-110"
            />
          </div>

          {/* 光晕效果 */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </button>

        {/* 文字提示 */}
        <div
          className={cn(
            "mt-3 px-3 py-2 bg-gray-900/95 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap backdrop-blur-sm shadow-lg border border-gray-700/50",
            "transform translate-y-2 group-hover:translate-y-0",
            sizeConfig.text
          )}
        >
          {text}
          {/* 小箭头 */}
          <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-900/95 rotate-45 border-l border-t border-gray-700/50" />
        </div>
      </div>
    </div>
  );
};

export default FloatingBackButton;
