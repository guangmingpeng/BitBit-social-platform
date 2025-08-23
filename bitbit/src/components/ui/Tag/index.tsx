import React, { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "music" | "food" | "learning" | "reading" | "secondary";
  size?: "sm" | "md" | "lg";
  removable?: boolean;
  onRemove?: () => void;
}

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      removable = false,
      onRemove,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      "inline-flex",
      "items-center",
      "gap-1",
      "rounded-full",
      "font-medium",
      "transition-all",
      "duration-250",
    ];

    const variants = {
      default: ["bg-gray-100", "text-text-primary"],
      music: ["bg-coral-100", "text-coral-500"],
      food: ["bg-mint-100", "text-mint-500"],
      learning: ["bg-sunflower-100", "text-sunflower-500"],
      reading: ["bg-lavender-100", "text-lavender-500"],
      secondary: ["bg-primary-100", "text-primary-500"],
    };

    const sizes = {
      sm: ["px-2", "py-1", "text-caption"],
      md: ["px-3", "py-1.5", "text-body"],
      lg: ["px-4", "py-2", "text-body-lg"],
    };

    return (
      <span
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
        {removable && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 p-0.5 rounded-full hover:bg-black/10 transition-colors"
            aria-label="移除标签"
          >
            <svg
              className="w-3 h-3"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 3L3 9M3 3L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = "Tag";

export default Tag;
