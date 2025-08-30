import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardContent,
  Badge,
} from "@/components/ui";
import {
  getAllCategories,
  saveUserCustomCategory,
  deleteCustomCategory,
  type Category,
} from "@/shared/constants/categories";

export interface CategorySelectorProps {
  selectedCategory: string;
  onSelect: (categoryId: string) => void;
  allowCustom?: boolean;
  className?: string;
  maxCustomCategories?: number;
}

/**
 * 统一的分类选择组件
 * 复用首页的分类卡片样式，支持自定义分类
 */
export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelect,
  allowCustom = true,
  className = "",
  maxCustomCategories = 5,
}) => {
  const [categories, setCategories] = useState<Category[]>(getAllCategories());
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customCategoryData, setCustomCategoryData] = useState({
    nameZh: "",
    nameEn: "",
    icon: "",
    color: "primary",
  });

  const colors = [
    "primary",
    "coral",
    "mint",
    "sunflower",
    "lavender",
    "success",
    "info",
    "warning",
    "danger",
  ];

  const handleCreateCustomCategory = () => {
    if (!customCategoryData.nameZh.trim()) return;

    const userCustomCategories = categories.filter((cat) => cat.isCustom);
    if (userCustomCategories.length >= maxCustomCategories) {
      alert(`最多只能创建 ${maxCustomCategories} 个自定义分类`);
      return;
    }

    const newCategory = saveUserCustomCategory({
      nameZh: customCategoryData.nameZh.trim(),
      nameEn:
        customCategoryData.nameEn.trim() || customCategoryData.nameZh.trim(),
      icon: customCategoryData.icon || "📝",
      color: customCategoryData.color,
    });

    setCategories(getAllCategories());
    setShowCustomModal(false);
    setCustomCategoryData({
      nameZh: "",
      nameEn: "",
      icon: "",
      color: "primary",
    });
    onSelect(newCategory.id);
  };

  const handleDeleteCategory = (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("确定要删除这个自定义分类吗？")) {
      deleteCustomCategory(categoryId);
      setCategories(getAllCategories());
      if (selectedCategory === categoryId) {
        onSelect("");
      }
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categories.map((category) => (
          <Card
            key={category.id}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md group ${
              selectedCategory === category.id
                ? `ring-2 ring-${category.color}-500 shadow-lg`
                : "hover:shadow-sm"
            }`}
            onClick={() => onSelect(category.id)}
          >
            <CardContent className="p-3 text-center relative">
              {/* 删除按钮（仅自定义分类） */}
              {category.isCustom && (
                <button
                  onClick={(e) => handleDeleteCategory(category.id, e)}
                  className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              )}

              <div className="space-y-1">
                <div className="text-lg">{category.icon}</div>
                <div className="space-y-0.5">
                  <h4 className="font-medium text-xs text-text-primary leading-tight">
                    {category.nameZh}
                  </h4>
                  {category.isCustom && (
                    <Badge
                      variant="secondary"
                      size="sm"
                      className="text-xs px-1 py-0"
                    >
                      自定义
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* 添加自定义分类按钮 */}
        {allowCustom && (
          <Card
            className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md border-2 border-dashed border-gray-300 hover:border-primary-500"
            onClick={() => setShowCustomModal(true)}
          >
            <CardContent className="p-3 text-center">
              <div className="space-y-1">
                <div className="text-lg text-gray-400">+</div>
                <h4 className="font-medium text-xs text-gray-500 leading-tight">
                  自定义分类
                </h4>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 自定义分类创建弹窗 */}
      <Modal open={showCustomModal} onClose={() => setShowCustomModal(false)}>
        <ModalHeader>
          <h3 className="text-lg font-semibold">创建自定义分类</h3>
        </ModalHeader>

        <ModalBody className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              分类名称 <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="输入分类名称"
              value={customCategoryData.nameZh}
              onChange={(e) =>
                setCustomCategoryData((prev) => ({
                  ...prev,
                  nameZh: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              英文名称（可选）
            </label>
            <Input
              placeholder="输入英文名称"
              value={customCategoryData.nameEn}
              onChange={(e) =>
                setCustomCategoryData((prev) => ({
                  ...prev,
                  nameEn: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              图标
            </label>
            <Input
              placeholder="输入一个 emoji 作为图标，如：📝"
              value={customCategoryData.icon}
              onChange={(e) =>
                setCustomCategoryData((prev) => ({
                  ...prev,
                  icon: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              颜色主题
            </label>
            <div className="grid grid-cols-3 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    setCustomCategoryData((prev) => ({ ...prev, color }))
                  }
                  className={`p-2 rounded-lg border-2 transition-colors ${
                    customCategoryData.color === color
                      ? `border-${color}-500 bg-${color}-50`
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-${color}-500 mx-auto`}
                  />
                  <span className="text-xs mt-1 block capitalize">{color}</span>
                </button>
              ))}
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="flex gap-3">
          <Button variant="outline" onClick={() => setShowCustomModal(false)}>
            取消
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateCustomCategory}
            disabled={!customCategoryData.nameZh.trim()}
          >
            创建分类
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CategorySelector;
