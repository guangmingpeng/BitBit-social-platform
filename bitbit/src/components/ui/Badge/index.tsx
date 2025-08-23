import React, { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "secondary";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  count?: number;
  showZero?: boolean;
  maxCount?: number;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      dot = false,
      count,
      showZero = false,
      maxCount = 99,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      "inline-flex",
      "items-center",
      "justify-center",
      "font-medium",
      "whitespace-nowrap",
    ];

    const variants = {
      default: ["bg-primary-500", "text-white"],
      success: ["bg-success", "text-white"],
      warning: ["bg-warning", "text-white"],
      error: ["bg-error", "text-white"],
      info: ["bg-info", "text-white"],
      secondary: ["bg-gray-500", "text-white"],
    };

    const sizes = {
      sm: dot ? "w-2 h-2" : "px-1.5 py-0.5 text-caption min-w-[18px] h-[18px]",
      md: dot ? "w-2.5 h-2.5" : "px-2 py-1 text-caption min-w-[20px] h-[20px]",
      lg: dot ? "w-3 h-3" : "px-2.5 py-1 text-body min-w-[24px] h-[24px]",
    };

    // 处理数字显示
    const getDisplayCount = () => {
      if (count === undefined) return null;
      if (count === 0 && !showZero) return null;
      if (count > maxCount) return `${maxCount}+`;
      return count.toString();
    };

    const displayCount = getDisplayCount();
    const showBadge = dot || displayCount !== null;

    if (!showBadge) return children as React.ReactElement;

    const badgeContent = dot ? null : displayCount;

    // 如果有children，渲染为相对定位的徽章
    if (children) {
      return (
        <div className="relative inline-flex">
          {children}
          <span
            className={cn(
              baseStyles,
              variants[variant],
              sizes[size],
              "absolute -top-1 -right-1 rounded-full transform translate-x-1/2 -translate-y-1/2",
              className
            )}
            ref={ref}
            {...props}
          >
            {badgeContent}
          </span>
        </div>
      );
    }

    // 独立的徽章组件
    return (
      <span
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          "rounded-full",
          className
        )}
        ref={ref}
        {...props}
      >
        {badgeContent}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
