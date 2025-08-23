import React from "react";
import Button from "../Button";
import { cn } from "@/shared/utils/cn";

export interface FeaturedBannerProps {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

const FeaturedBanner: React.FC<FeaturedBannerProps> = ({
  title,
  subtitle,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative h-72 rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-primary-100 via-coral-100 to-lavender-100",
        "p-8 flex flex-col justify-center",
        className
      )}
    >
      {/* 装饰性背景图案 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-16 h-16 bg-primary-300 rounded-full"></div>
        <div className="absolute bottom-8 right-12 w-8 h-8 bg-coral-300 rounded-full"></div>
        <div className="absolute top-12 right-20 w-4 h-4 bg-lavender-300 rounded-full"></div>
      </div>

      <div className="relative z-10 space-y-4 max-w-md">
        <h1 className="text-3xl font-bold text-text-primary">{title}</h1>
        <p className="text-lg text-text-secondary">{subtitle}</p>
        <p className="text-text-secondary">{description}</p>

        <div className="flex space-x-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            onClick={onPrimaryClick}
            className="shadow-lg"
          >
            {primaryButtonText}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={onSecondaryClick}
            className="bg-white/70 backdrop-blur-sm hover:bg-white/90"
          >
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBanner;
