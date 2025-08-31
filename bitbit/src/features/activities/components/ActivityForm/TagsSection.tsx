import React, { useState } from "react";
import { Card, CardContent, Input, Button, Tag } from "@/components/ui";
import type { ActivityFormData } from "../ActivityForm";

interface TagsSectionProps {
  formData: ActivityFormData;
  onFieldChange: <K extends keyof ActivityFormData>(
    field: K,
    value: ActivityFormData[K]
  ) => void;
  onFieldFocus?: (fieldName: string) => void;
}

// 预设活动标签，结合设计系统颜色
const PRESET_TAGS = [
  { label: "初学者友好", variant: "learning" as const },
  { label: "免费", variant: "default" as const },
  { label: "需预约", variant: "secondary" as const },
  { label: "线上活动", variant: "music" as const },
  { label: "户外活动", variant: "food" as const },
  { label: "亲子友好", variant: "reading" as const },
  { label: "专业培训", variant: "learning" as const },
  { label: "交流分享", variant: "music" as const },
  { label: "团队建设", variant: "food" as const },
  { label: "文化艺术", variant: "reading" as const },
  { label: "技能提升", variant: "learning" as const },
  { label: "健康运动", variant: "food" as const },
];

export const TagsSection: React.FC<TagsSectionProps> = ({
  formData,
  onFieldChange,
  onFieldFocus,
}) => {
  const [currentTag, setCurrentTag] = useState("");

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      onFieldChange("tags", [...formData.tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const addPresetTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      onFieldChange("tags", [...formData.tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onFieldChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  // 获取标签的变体颜色
  const getTagVariant = (tag: string) => {
    const presetTag = PRESET_TAGS.find((preset) => preset.label === tag);
    return presetTag?.variant || "default";
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4" onFocus={() => onFieldFocus?.("tags")}>
          <label className="block text-sm font-medium text-text-primary">
            活动标签（可选）
          </label>

          {/* 预设标签选择 */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">推荐标签</h4>
            <div className="flex flex-wrap gap-2">
              {PRESET_TAGS.map((presetTag) => (
                <button
                  key={presetTag.label}
                  type="button"
                  onClick={() => addPresetTag(presetTag.label)}
                  disabled={formData.tags.includes(presetTag.label)}
                  className={`text-sm px-3 py-1 rounded-full border transition-all duration-250 ${
                    formData.tags.includes(presetTag.label)
                      ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-300 text-gray-500"
                      : "hover:scale-105 cursor-pointer border-dashed border-gray-300 text-gray-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50"
                  }`}
                >
                  + {presetTag.label}
                </button>
              ))}
            </div>
          </div>

          {/* 自定义标签输入 */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">自定义标签</h4>
            <div className="flex gap-2">
              <Input
                placeholder="输入自定义标签..."
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                onFocus={() => onFieldFocus?.("tags")}
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
          </div>

          {/* 已添加的标签 */}
          {formData.tags.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">
                已选标签 ({formData.tags.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Tag
                    key={tag}
                    variant={getTagVariant(tag)}
                    size="sm"
                    removable
                    onRemove={() => removeTag(tag)}
                    className="cursor-pointer hover:scale-105 transition-transform duration-200"
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {formData.tags.length === 0 && (
            <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-2xl mb-2">🏷️</div>
              <p className="text-sm">
                选择推荐标签或添加自定义标签，让活动更容易被发现
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TagsSection;
