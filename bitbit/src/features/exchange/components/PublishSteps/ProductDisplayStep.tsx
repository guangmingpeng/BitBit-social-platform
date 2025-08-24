import React from "react";
import { Input, Icon } from "@/components/ui";
import type { PublishStepProps } from "../../types/types";

/**
 * 发布表单第三步：商品展示
 */
export const ProductDisplayStep: React.FC<PublishStepProps> = ({
  formData,
  onUpdate,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      const updatedImages = [...formData.images, ...newImages].slice(0, 9);
      onUpdate({ images: updatedImages });
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    onUpdate({ images: updatedImages });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-text-primary">商品展示</h3>

      {/* 价格信息 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            出售价格 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
              ¥
            </span>
            <Input
              type="number"
              placeholder="0"
              value={formData.price || ""}
              onChange={(e) =>
                onUpdate({ price: parseFloat(e.target.value) || 0 })
              }
              className="pl-8"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            原价 (可选)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
              ¥
            </span>
            <Input
              type="number"
              placeholder="0"
              value={formData.originalPrice || ""}
              onChange={(e) =>
                onUpdate({
                  originalPrice: parseFloat(e.target.value) || undefined,
                })
              }
              className="pl-8"
            />
          </div>
        </div>
      </div>

      {/* 商品描述 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          商品描述 <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="详细描述商品的使用情况、外观状态、功能是否完好等..."
          value={formData.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
          rows={4}
        />
        <div className="text-xs text-text-tertiary text-right">
          {formData.description.length}/500
        </div>
      </div>

      {/* 商品图片 */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          商品图片 <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-text-secondary">
          最多上传 9 张图片，第一张将作为封面图
        </p>

        <div className="grid grid-cols-3 gap-4">
          {/* 已上传的图片 */}
          {formData.images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`商品图片 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 封面标识 */}
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded">
                  封面
                </div>
              )}
              {/* 删除按钮 */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}

          {/* 上传按钮 */}
          {formData.images.length < 9 && (
            <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <Icon name="plus" size="lg" className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">添加图片</span>
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

        {formData.images.length === 0 && (
          <div className="text-sm text-red-500">请至少上传一张商品图片</div>
        )}
      </div>

      {/* 所在地区 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          所在地区 <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="如：北京市海淀区"
          value={formData.location}
          onChange={(e) => onUpdate({ location: e.target.value })}
        />
      </div>
    </div>
  );
};
