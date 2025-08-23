import React, { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "search" | "error";
  inputSize?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  label?: string;
  description?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      inputSize = "md",
      leftIcon,
      rightIcon,
      error,
      label,
      description,
      type,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      "w-full",
      "border",
      "rounded-lg",
      "text-body",
      "text-text-primary",
      "placeholder:text-text-tertiary",
      "transition-all",
      "duration-250",
      "focus:outline-none",
      "focus:ring-2",
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
      "disabled:bg-gray-50",
    ];

    const variants = {
      default: [
        "border-gray-200",
        "focus:border-primary-500",
        "focus:ring-primary-100",
      ],
      search: [
        "border-gray-200",
        "rounded-full",
        "focus:border-primary-500",
        "focus:ring-primary-100",
      ],
      error: ["border-error", "focus:border-error", "focus:ring-red-100"],
    };

    const sizes = {
      sm: leftIcon || rightIcon ? "py-2 px-3" : "py-2 px-3",
      md: leftIcon || rightIcon ? "py-3 px-4" : "py-3 px-4",
      lg: leftIcon || rightIcon ? "py-4 px-5" : "py-4 px-5",
    };

    const paddingWithIcons = {
      sm: {
        left: leftIcon ? "pl-9" : "",
        right: rightIcon ? "pr-9" : "",
      },
      md: {
        left: leftIcon ? "pl-10" : "",
        right: rightIcon ? "pr-10" : "",
      },
      lg: {
        left: leftIcon ? "pl-12" : "",
        right: rightIcon ? "pr-12" : "",
      },
    };

    const iconSizes = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const iconPositions = {
      sm: {
        left: "left-3",
        right: "right-3",
      },
      md: {
        left: "left-3",
        right: "right-3",
      },
      lg: {
        left: "left-4",
        right: "right-4",
      },
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-body font-medium text-text-primary">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 text-text-tertiary",
                iconPositions[inputSize].left
              )}
            >
              <div className={iconSizes[inputSize]}>{leftIcon}</div>
            </div>
          )}
          <input
            type={type}
            className={cn(
              baseStyles,
              variants[error ? "error" : variant],
              sizes[inputSize],
              paddingWithIcons[inputSize].left,
              paddingWithIcons[inputSize].right,
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 text-text-tertiary",
                iconPositions[inputSize].right
              )}
            >
              <div className={iconSizes[inputSize]}>{rightIcon}</div>
            </div>
          )}
        </div>
        {description && !error && (
          <p className="text-caption text-text-secondary">{description}</p>
        )}
        {error && <p className="text-caption text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
