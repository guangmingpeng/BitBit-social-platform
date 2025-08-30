import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "@/components/ui";
import { cn } from "@/shared/utils/cn";

interface ImageCarouselProps {
  /**
   * 图片数组
   */
  images: string[];
  /**
   * 替代文本
   */
  alt?: string;
  /**
   * 轮播组件类名
   */
  className?: string;
  /**
   * 图片容器类名
   */
  imageClassName?: string;
  /**
   * 显示指示器
   */
  showIndicators?: boolean;
  /**
   * 显示导航箭头
   */
  showArrows?: boolean;
  /**
   * 显示图片计数器
   */
  showCounter?: boolean;
  /**
   * 自动播放
   */
  autoPlay?: boolean;
  /**
   * 自动播放间隔（毫秒）
   */
  autoPlayInterval?: number;
  /**
   * 轮播高度
   */
  height?: string | number;
  /**
   * 圆角样式
   */
  rounded?: boolean;
  /**
   * 图片填充方式
   */
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none";
  /**
   * 点击图片的回调
   */
  onImageClick?: (index: number, image: string) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  alt = "",
  className,
  imageClassName,
  showIndicators = true,
  showArrows = true,
  showCounter = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  height = "300px",
  rounded = true,
  objectFit = "cover",
  onImageClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 自动播放逻辑
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const interval = setInterval(goToNext, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, images.length, goToNext]);

  // 如果没有图片，显示占位符
  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-200 text-gray-400",
          rounded && "rounded-lg",
          className
        )}
        style={{ height }}
      >
        <div className="text-center">
          <Icon name="view" size="lg" className="mx-auto mb-2" />
          <p>暂无图片</p>
        </div>
      </div>
    );
  }

  // 只有一张图片时的简化显示
  if (images.length === 1) {
    return (
      <div
        className={cn(
          "relative overflow-hidden",
          rounded && "rounded-lg",
          className
        )}
        style={{ height }}
      >
        <img
          src={images[0]}
          alt={alt}
          className={cn(
            "w-full h-full cursor-pointer transition-transform duration-300 hover:scale-105",
            objectFit === "cover" && "object-cover",
            objectFit === "contain" && "object-contain",
            objectFit === "fill" && "object-fill",
            objectFit === "scale-down" && "object-scale-down",
            objectFit === "none" && "object-none",
            imageClassName
          )}
          onClick={() => onImageClick?.(0, images[0])}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden group",
        rounded && "rounded-lg",
        className
      )}
      style={{ height }}
    >
      {/* 图片容器 */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${alt} ${index + 1}`}
            className={cn(
              "w-full h-full flex-shrink-0 cursor-pointer",
              objectFit === "cover" && "object-cover",
              objectFit === "contain" && "object-contain",
              objectFit === "fill" && "object-fill",
              objectFit === "scale-down" && "object-scale-down",
              objectFit === "none" && "object-none",
              imageClassName
            )}
            onClick={() => onImageClick?.(index, image)}
          />
        ))}
      </div>

      {/* 导航箭头 */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-opacity duration-200 z-10"
          >
            <Icon name="arrow-left" size="sm" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-opacity duration-200 z-10"
          >
            <Icon name="arrow-right" size="sm" />
          </button>
        </>
      )}

      {/* 指示器 */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/60 hover:bg-white/80"
              )}
            />
          ))}
        </div>
      )}

      {/* 图片计数器 */}
      {showCounter && images.length > 1 && (
        <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
