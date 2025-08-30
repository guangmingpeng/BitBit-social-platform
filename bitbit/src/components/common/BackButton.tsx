import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon } from "@/components/ui";
import { cn } from "@/shared/utils/cn";

interface BackButtonProps {
  /**
   * 按钮样式变体
   */
  variant?: "default" | "floating" | "outline" | "ghost";
  /**
   * 按钮尺寸
   */
  size?: "sm" | "md" | "lg";
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 按钮文本，默认为"返回"
   */
  text?: string;
  /**
   * 是否显示图标
   */
  showIcon?: boolean;
  /**
   * 点击处理函数，默认为 navigate(-1)
   */
  onClick?: () => void;
  /**
   * 是否固定定位（用于浮动在页面上）
   */
  fixed?: boolean;
  /**
   * 固定位置（当fixed为true时）
   */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const BackButton: React.FC<BackButtonProps> = ({
  variant = "default",
  size = "md",
  className,
  text = "返回",
  showIcon = true,
  onClick,
  fixed = false,
  position = "top-left",
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
      case "floating":
        return "bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 text-gray-700 hover:bg-white hover:shadow-xl";
      case "outline":
        return "border-2 border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50";
      case "ghost":
        return "bg-transparent text-gray-600 hover:bg-gray-100";
      default:
        return "bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "h-8 px-3 text-sm";
      case "lg":
        return "h-12 px-6 text-base font-semibold";
      default:
        return "h-10 px-4 text-sm font-medium";
    }
  };

  const getPositionStyles = () => {
    if (!fixed) return "";

    switch (position) {
      case "top-right":
        return "fixed top-4 right-4 z-50";
      case "bottom-left":
        return "fixed bottom-4 left-4 z-50";
      case "bottom-right":
        return "fixed bottom-4 right-4 z-50";
      default:
        return "fixed top-4 left-4 z-50";
    }
  };

  if (variant === "floating" && fixed) {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200",
          getVariantStyles(),
          "w-12 h-12", // 固定圆形尺寸
          getPositionStyles(),
          className
        )}
        aria-label={text}
      >
        {showIcon && <Icon name="arrow-left" size="sm" />}
      </button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      variant={
        variant === "default" ? "primary" : (variant as "outline" | "ghost")
      }
      size={size}
      className={cn(
        "inline-flex items-center gap-2 transition-all duration-200",
        getSizeStyles(),
        getPositionStyles(),
        className
      )}
    >
      {showIcon && <Icon name="arrow-left" size="sm" />}
      {text}
    </Button>
  );
};

export default BackButton;
