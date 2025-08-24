import React from "react";
import { Input } from "@/components/ui";
import type { PublishStepProps } from "../../types/types";

/**
 * 发布表单第一步：基本信息
 */
export const BasicInfoStep: React.FC<PublishStepProps> = ({
  formData,
  onUpdate,
}) => {
  const categories = [
    { id: "数码产品", name: "数码产品", icon: "📱" },
    { id: "服装服饰", name: "服装服饰", icon: "👔" },
    { id: "家居生活", name: "家居生活", icon: "🏠" },
    { id: "图书文具", name: "图书文具", icon: "📚" },
    { id: "家用电器", name: "家用电器", icon: "🔌" },
    { id: "运动户外", name: "运动户外", icon: "⚽" },
    { id: "美妆护肤", name: "美妆护肤", icon: "💄" },
    { id: "母婴用品", name: "母婴用品", icon: "🍼" },
    { id: "汽车用品", name: "汽车用品", icon: "🚗" },
    { id: "乐器音响", name: "乐器音响", icon: "🎵" },
    { id: "游戏玩具", name: "游戏玩具", icon: "🎮" },
    { id: "自定义", name: "其他 (自定义)", icon: "✏️" },
  ];

  const conditions = [
    { id: "new", name: "全新", description: "未使用过的新品" },
    { id: "like-new", name: "几乎全新", description: "使用极少，无明显瑕疵" },
    { id: "95-new", name: "95新", description: "轻微使用痕迹，功能完好" },
    { id: "90-new", name: "9成新", description: "有一定使用痕迹，功能正常" },
    { id: "85-new", name: "8.5成新", description: "明显使用痕迹，功能正常" },
    { id: "80-new", name: "8成新", description: "较多使用痕迹，功能正常" },
    { id: "custom", name: "自定义", description: "自定义成色描述" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-text-primary">基本信息</h3>

      {/* 商品名称 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          商品名称 <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="请输入商品名称，如：iPhone 13 128GB"
          value={formData.title}
          onChange={(e) => onUpdate({ title: e.target.value })}
        />
      </div>

      {/* 商品分类 */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          商品分类 <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onUpdate({ category: category.id })}
              className={`
                p-3 rounded-lg border-2 transition-all duration-200 text-sm
                ${
                  formData.category === category.id
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-gray-200 hover:border-gray-300 text-text-secondary"
                }
              `}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <div className="font-medium">{category.name}</div>
            </button>
          ))}
        </div>

        {/* 自定义分类输入 */}
        {formData.category === "自定义" && (
          <div className="mt-3">
            <Input
              placeholder="请输入自定义分类"
              value={formData.customCategory || ""}
              onChange={(e) => onUpdate({ customCategory: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* 商品成色 */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          商品成色 <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {conditions.map((condition) => (
            <button
              key={condition.id}
              type="button"
              onClick={() => onUpdate({ condition: condition.id })}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-left
                ${
                  formData.condition === condition.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <div
                className={`font-medium mb-1 ${
                  formData.condition === condition.id
                    ? "text-primary-700"
                    : "text-text-primary"
                }`}
              >
                {condition.name}
              </div>
              <div className="text-sm text-text-secondary">
                {condition.description}
              </div>
            </button>
          ))}
        </div>

        {/* 自定义成色输入 */}
        {formData.condition === "custom" && (
          <div className="mt-3">
            <Input
              placeholder="请描述商品成色"
              value={formData.customCondition || ""}
              onChange={(e) => onUpdate({ customCondition: e.target.value })}
            />
          </div>
        )}
      </div>
    </div>
  );
};
