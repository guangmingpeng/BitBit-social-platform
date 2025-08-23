import React, { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      "inline-flex",
      "items-center",
      "justify-center",
      "gap-2",
      "font-medium",
      "rounded-lg",
      "transition-all",
      "duration-250",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-offset-2",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
    ];

    const variants = {
      primary: [
        "bg-primary-500",
        "text-white",
        "hover:bg-primary-600",
        "focus:ring-primary-200",
        "shadow-light",
        "hover:shadow-card",
      ],
      secondary: [
        "bg-gray-100",
        "text-text-primary",
        "hover:bg-gray-200",
        "focus:ring-gray-200",
        "border",
        "border-gray-200",
      ],
      outline: [
        "bg-transparent",
        "text-primary-500",
        "border",
        "border-primary-500",
        "hover:bg-primary-50",
        "focus:ring-primary-200",
      ],
      ghost: [
        "bg-transparent",
        "text-primary-500",
        "hover:bg-primary-50",
        "focus:ring-primary-200",
      ],
      danger: [
        "bg-error",
        "text-white",
        "hover:bg-red-600",
        "focus:ring-red-200",
        "shadow-light",
        "hover:shadow-card",
      ],
    };

    const sizes = {
      sm: ["px-3", "py-2", "text-caption"],
      md: ["px-5", "py-3", "text-body"],
      lg: ["px-6", "py-4", "text-body-lg"],
    };

    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          widthStyles,
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
