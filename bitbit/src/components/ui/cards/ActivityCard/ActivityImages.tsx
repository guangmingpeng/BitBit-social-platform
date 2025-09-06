import React from "react";
import { cn } from "@/shared/utils/cn";
import { ImageCarousel } from "@/components/common";

interface ActivityImagesProps {
  images?: string[];
  title: string;
  layout: "default" | "horizontal" | "list" | "compact" | "minimal";
  categoryConfig: {
    icon: string;
    label: string;
    color: string;
  };
  statusConfig: {
    text: string;
    bgColor: string;
    textColor: string;
    secondaryText?: string;
    secondaryBgColor?: string;
    secondaryTextColor?: string;
    showAsLabel: boolean;
  };
  showImages: boolean;
}

export const ActivityImages: React.FC<ActivityImagesProps> = ({
  images,
  title,
  layout,
  categoryConfig,
  statusConfig,
  showImages,
}) => {
  if (!showImages || !images || images.length === 0) return null;

  if (layout === "compact") {
    return (
      <div className="flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden bg-gray-100 relative">
        <ImageCarousel
          images={images}
          alt={title}
          height="80px"
          showIndicators={false}
          showArrows={false}
          showCounter={images.length > 1}
          rounded={false}
          className="rounded-lg"
        />
      </div>
    );
  }

  if (layout === "minimal") {
    return (
      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden relative">
        <ImageCarousel
          images={images}
          alt={title}
          height="64px"
          showIndicators={false}
          showArrows={false}
          showCounter={images.length > 1}
          rounded={false}
          className="rounded-lg"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-48 rounded-lg overflow-hidden">
      <ImageCarousel
        images={images}
        alt={title}
        height="192px"
        showIndicators={images.length > 1}
        showArrows={images.length > 1}
        showCounter={images.length > 1}
        className="rounded-none"
        rounded={false}
      />

      {/* 分类标签 */}
      <div className="absolute top-3 left-3 z-10">
        <span
          className={cn(
            "px-2 py-1 rounded text-xs font-medium",
            categoryConfig.color
          )}
        >
          {categoryConfig.icon} {categoryConfig.label}
        </span>
      </div>

      {/* 状态标签 */}
      {statusConfig.showAsLabel && (
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
          <span
            className={cn(
              "px-2 py-1 rounded text-xs font-medium",
              statusConfig.bgColor,
              statusConfig.textColor
            )}
          >
            {statusConfig.text}
          </span>
          {/* 显示次要状态标签（如已组织+已结束） */}
          {statusConfig.secondaryText && (
            <span
              className={cn(
                "px-2 py-1 rounded text-xs font-medium",
                statusConfig.secondaryBgColor,
                statusConfig.secondaryTextColor
              )}
            >
              {statusConfig.secondaryText}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
