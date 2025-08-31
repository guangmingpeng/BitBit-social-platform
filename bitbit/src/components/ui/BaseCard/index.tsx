import React from "react";
import { cn } from "@/shared/utils/cn";
import type { BaseCardProps } from "./types";
import { getCardVariantClasses } from "./variants";

export const BaseCard: React.FC<BaseCardProps> = ({
  className,
  children,
  variant = "default",
  size = "md",
  clickable = false,
  disabled = false,
  loading = false,
  onClick,
  onHover,
}) => {
  const cardClasses = getCardVariantClasses(
    variant,
    size,
    clickable,
    disabled,
    loading
  );

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (
      !disabled &&
      !loading &&
      onClick &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={cn(cardClasses, className)}
      onClick={handleClick}
      onMouseEnter={onHover}
      onKeyDown={handleKeyDown}
      tabIndex={clickable && !disabled ? 0 : undefined}
      role={clickable ? "button" : undefined}
      aria-disabled={disabled}
    >
      {loading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
