import React from "react";
import Button from "../Button";
import { ImageCarousel } from "@/components/common";
import { cn } from "@/shared/utils/cn";

export interface FeaturedRecommendationProps {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  images?: string[];
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

const FeaturedRecommendation: React.FC<FeaturedRecommendationProps> = ({
  title,
  subtitle,
  description,
  primaryButtonText,
  secondaryButtonText,
  images,
  onPrimaryClick,
  onSecondaryClick,
  className,
}) => {
  return (
    <div className={cn("relative h-72 rounded-2xl overflow-hidden", className)}>
      {/* 背景图片轮播或渐变背景 */}
      {images && images.length > 0 ? (
        <ImageCarousel
          images={images}
          alt={title}
          height="288px"
          showIndicators={images.length > 1}
          showArrows={images.length > 1}
          className="absolute inset-0"
          rounded={false}
          autoPlay={true}
          autoPlayInterval={5000}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-coral-100 to-lavender-100" />
      )}

      {/* 内容遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

      {/* 装饰性背景图案 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-16 h-16 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-8 right-12 w-8 h-8 bg-white/20 rounded-full"></div>
        <div className="absolute top-12 right-20 w-4 h-4 bg-white/15 rounded-full"></div>
      </div>

      <div className="relative z-10 p-8 flex flex-col justify-center h-full space-y-4 max-w-md">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-lg text-white/90">{subtitle}</p>
        <p className="text-white/80">{description}</p>

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
            className="bg-white/70 backdrop-blur-sm hover:bg-white/90 text-gray-800"
          >
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRecommendation;
