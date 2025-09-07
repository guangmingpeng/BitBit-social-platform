import React from "react";
import { cn } from "@/shared/utils/cn";

export interface SwitchProps {
  checked: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  onChange: (checked: boolean) => void;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  disabled = false,
  size = "md",
  onChange,
  className,
}) => {
  const sizeClasses = {
    sm: {
      switch: "h-5 w-9",
      thumb: "h-3.5 w-3.5",
      translate: checked ? "translate-x-4" : "translate-x-0.5",
      padding: "p-0.5",
    },
    md: {
      switch: "h-6 w-11",
      thumb: "h-4 w-4",
      translate: checked ? "translate-x-5" : "translate-x-1",
      padding: "p-1",
    },
    lg: {
      switch: "h-7 w-14",
      thumb: "h-5 w-5",
      translate: checked ? "translate-x-7" : "translate-x-1",
      padding: "p-1",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "relative inline-flex flex-shrink-0 cursor-pointer rounded-full",
        "transition-all duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "focus:ring-offset-white",
        currentSize.switch,
        currentSize.padding,
        checked
          ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-md"
          : "bg-gray-200 hover:bg-gray-300",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-sm",
        className
      )}
      onClick={() => !disabled && onChange(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={cn(
          "pointer-events-none inline-block transform rounded-full bg-white",
          "shadow-lg ring-0 transition-all duration-200 ease-in-out",
          currentSize.thumb,
          currentSize.translate,
          checked ? "shadow-md" : "shadow-sm"
        )}
      />
    </button>
  );
};

export default Switch;
