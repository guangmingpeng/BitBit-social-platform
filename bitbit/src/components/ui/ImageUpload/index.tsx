import React from "react";
import { Icon } from "@/components/ui";

export interface ImageUploadProps {
  images: File[];
  onUpload: (files: File[]) => void;
  onRemove: (index: number) => void;
  maxImages?: number;
  showCover?: boolean;
  className?: string;
  uploadText?: string;
  description?: string;
}

/**
 * 通用图片上传组件
 * 复用自二手交换功能，支持多图上传、删除、封面标识等
 */
export const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onUpload,
  onRemove,
  maxImages = 9,
  showCover = false,
  className = "",
  uploadText = "添加图片",
  description,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      const updatedImages = [...images, ...newImages].slice(0, maxImages);
      onUpload(updatedImages);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {description && (
        <p className="text-sm text-text-secondary">{description}</p>
      )}

      <div className="grid grid-cols-3 gap-4">
        {/* 已上传的图片 */}
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(image)}
                alt={`图片 ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 封面标识 */}
            {showCover && index === 0 && (
              <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded">
                封面
              </div>
            )}

            {/* 删除按钮 */}
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}

        {/* 上传按钮 */}
        {images.length < maxImages && (
          <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
            <Icon name="plus" size="lg" className="text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">{uploadText}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      {images.length === 0 && (
        <div className="text-sm text-red-500">请至少上传一张图片</div>
      )}

      {maxImages > 1 && (
        <div className="text-xs text-text-tertiary">
          已上传 {images.length}/{maxImages} 张图片
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
