import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Input,
  Button,
  Tag,
  ImageUpload,
  CategorySelector,
} from "@/components/ui";

export interface CommunityPostFormData {
  title: string;
  content: string;
  category: string;
  tags: string[];
  images: File[];
  isPrivate: boolean;
  allowComments: boolean;
}

export interface CommunityPostFormProps {
  initialData?: Partial<CommunityPostFormData>;
  onSubmit: (data: CommunityPostFormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  onChange?: (data: CommunityPostFormData) => void;
  onFieldFocus?: (fieldName: string) => void;
}

/**
 * 社区帖子发布表单组件
 * 提取自 PublishPost 页面，支持复用
 */
export const CommunityPostForm: React.FC<CommunityPostFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  onChange,
  onFieldFocus,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CommunityPostFormData>({
    title: "",
    content: "",
    category: "",
    tags: [],
    images: [],
    isPrivate: false,
    allowComments: true,
    ...initialData,
  });

  const [currentTag, setCurrentTag] = useState("");

  // 当表单数据变化时通知父组件
  useEffect(() => {
    onChange?.(formData);
  }, [formData, onChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1);
    }
  };

  const updateField = <K extends keyof CommunityPostFormData>(
    field: K,
    value: CommunityPostFormData[K]
  ) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      onChange?.(newData);
      return newData;
    });
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      updateField("tags", [...formData.tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateField(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const isValid =
    formData.title.trim() && formData.content.trim() && formData.category;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 标题 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              帖子标题 <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="请输入帖子标题..."
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              onFocus={() => onFieldFocus?.("title")}
              className="text-lg"
            />
            <div className="text-xs text-text-tertiary text-right">
              {formData.title.length}/100
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分类选择 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-text-primary">
              选择分类 <span className="text-red-500">*</span>
            </label>
            <div onFocus={() => onFieldFocus?.("category")}>
              <CategorySelector
                selectedCategory={formData.category}
                onSelect={(categoryId) => updateField("category", categoryId)}
                allowCustom={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 内容 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              帖子内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="分享你的想法、经验或故事..."
              value={formData.content}
              onChange={(e) => updateField("content", e.target.value)}
              onFocus={() => onFieldFocus?.("content")}
              className="w-full min-h-[200px] p-3 border border-gray-300 rounded-lg resize-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
            <div className="text-xs text-text-tertiary text-right">
              {formData.content.length}/2000
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 图片上传 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-text-primary">
              添加图片（可选）
            </label>
            <div onFocus={() => onFieldFocus?.("images")}>
              <ImageUpload
                images={formData.images}
                onUpload={(images) => updateField("images", images)}
                onRemove={(index) =>
                  updateField(
                    "images",
                    formData.images.filter((_, i) => i !== index)
                  )
                }
                maxImages={6}
                description="最多上传 6 张图片，支持 JPG、PNG 格式"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 标签 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-text-primary">
              添加标签（可选）
            </label>

            {/* 标签输入 */}
            <div className="flex gap-2">
              <Input
                placeholder="输入标签..."
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                disabled={
                  !currentTag.trim() ||
                  formData.tags.includes(currentTag.trim())
                }
              >
                添加
              </Button>
            </div>

            {/* 已添加的标签 */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Tag
                    key={tag}
                    variant="secondary"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag} ×
                  </Tag>
                ))}
              </div>
            )}

            <p className="text-xs text-text-secondary">
              按 Enter 或点击添加按钮来添加标签，点击标签可删除
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 发布设置 */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-text-primary">发布设置</h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPrivate}
                  onChange={(e) => updateField("isPrivate", e.target.checked)}
                  className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-text-secondary">
                  设为私密帖子（只有关注我的人可以看到）
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.allowComments}
                  onChange={(e) =>
                    updateField("allowComments", e.target.checked)
                  }
                  className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-text-secondary">
                  允许其他用户评论
                </span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 操作按钮 */}
      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          取消
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? "发布中..." : "发布帖子"}
        </Button>
      </div>
    </form>
  );
};

export default CommunityPostForm;
