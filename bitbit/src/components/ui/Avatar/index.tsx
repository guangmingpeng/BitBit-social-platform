import React, { forwardRef, useState } from "react";
import { cn } from "@/shared/utils/cn";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  fallback?: string;
  online?: boolean;
  squared?: boolean;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      size = "md",
      fallback,
      online,
      squared = false,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    const baseStyles = [
      "relative",
      "flex",
      "items-center",
      "justify-center",
      "bg-gray-100",
      "text-text-secondary",
      "font-medium",
      "select-none",
      "overflow-hidden",
    ];

    const sizes = {
      xs: "w-6 h-6 text-caption",
      sm: "w-8 h-8 text-caption",
      md: "w-10 h-10 text-body",
      lg: "w-12 h-12 text-body",
      xl: "w-16 h-16 text-subtitle",
      "2xl": "w-20 h-20 text-title-4",
    };

    const roundedStyles = squared ? "rounded-lg" : "rounded-full";

    const onlineIndicatorSizes = {
      xs: "w-1.5 h-1.5",
      sm: "w-2 h-2",
      md: "w-2.5 h-2.5",
      lg: "w-3 h-3",
      xl: "w-4 h-4",
      "2xl": "w-5 h-5",
    };

    const onlineIndicatorPositions = {
      xs: "bottom-0 right-0",
      sm: "bottom-0 right-0",
      md: "bottom-0.5 right-0.5",
      lg: "bottom-0.5 right-0.5",
      xl: "bottom-1 right-1",
      "2xl": "bottom-1 right-1",
    };

    // 生成fallback文字（取用户名首字母）
    const getFallbackText = () => {
      if (fallback) {
        return fallback.charAt(0).toUpperCase();
      }
      if (alt) {
        return alt.charAt(0).toUpperCase();
      }
      return "?";
    };

    return (
      <div
        className={cn(baseStyles, sizes[size], roundedStyles, className)}
        ref={ref}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            className={cn("w-full h-full object-cover", roundedStyles)}
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{getFallbackText()}</span>
        )}

        {online && (
          <div
            className={cn(
              "absolute border-2 border-white bg-success rounded-full",
              onlineIndicatorSizes[size],
              onlineIndicatorPositions[size]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
