import { cn } from "@/shared/utils/cn";

export const getCardVariantClasses = (
  variant: "default" | "outlined" | "elevated" | "flat" = "default",
  size: "sm" | "md" | "lg" = "md",
  clickable: boolean = false,
  disabled: boolean = false,
  loading: boolean = false
) => {
  const baseClasses =
    "rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  const variantClasses = {
    default:
      "bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm",
    outlined: "bg-white border-2 border-gray-200 hover:border-gray-300",
    elevated: "bg-white shadow-md hover:shadow-lg border-0",
    flat: "bg-gray-50 border-0 hover:bg-gray-100",
  };

  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    clickable && "cursor-pointer",
    disabled && "opacity-50 cursor-not-allowed",
    loading && "animate-pulse"
  );
};

export const getLayoutClasses = (
  layout: "default" | "compact" | "minimal" | "horizontal" | "list" = "default"
) => {
  const layoutClasses = {
    default: "space-y-4",
    compact: "space-y-2",
    minimal: "space-y-1",
    horizontal: "flex items-center space-x-4 space-y-0",
    list: "flex items-start space-x-3 space-y-0",
  };

  return layoutClasses[layout];
};
