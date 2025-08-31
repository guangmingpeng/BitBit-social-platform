import React, { useState } from "react";
import { Card, CardContent, Input, Button, Tag } from "@/components/ui";

interface PresetTag {
  label: string;
  variant: "default" | "music" | "food" | "learning" | "reading" | "secondary";
}

interface TagsInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  onFieldFocus?: () => void;
  maxTags?: number;
  placeholder?: string;
  presetTags?: PresetTag[];
  title?: string;
  description?: string;
  showPresets?: boolean;
}

// 默认的社区预设标签
const DEFAULT_COMMUNITY_PRESET_TAGS: PresetTag[] = [
  { label: "摄影技巧", variant: "learning" },
  { label: "美食制作", variant: "food" },
  { label: "读书分享", variant: "reading" },
  { label: "音乐推荐", variant: "music" },
  { label: "学习心得", variant: "learning" },
  { label: "生活随想", variant: "default" },
  { label: "技术分享", variant: "learning" },
  { label: "旅行日记", variant: "default" },
];

export const TagsInput: React.FC<TagsInputProps> = ({
  tags,
  onTagsChange,
  onFieldFocus,
  maxTags = 10,
  placeholder = "输入标签...",
  presetTags = DEFAULT_COMMUNITY_PRESET_TAGS,
  title = "添加标签（可选）",
  description,
  showPresets = true,
}) => {
  const [currentTag, setCurrentTag] = useState("");

  const addTag = () => {
    if (
      currentTag.trim() &&
      !tags.includes(currentTag.trim()) &&
      tags.length < maxTags
    ) {
      onTagsChange([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const addPresetTag = (tag: string) => {
    if (!tags.includes(tag) && tags.length < maxTags) {
      onTagsChange([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  // 获取标签的颜色变体
  const getTagVariant = (tag: string) => {
    const presetTag = presetTags.find((preset) => preset.label === tag);
    return presetTag?.variant || "default";
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4" onFocus={onFieldFocus}>
          <div>
            <label className="block text-sm font-medium text-text-primary">
              {title}
            </label>
            {description && (
              <p className="text-xs text-text-secondary mt-1">{description}</p>
            )}
          </div>

          {/* 预设标签选择 */}
          {showPresets && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">推荐标签</h4>
              <div className="flex flex-wrap gap-2">
                {presetTags.map((presetTag) => (
                  <button
                    key={presetTag.label}
                    type="button"
                    onClick={() => addPresetTag(presetTag.label)}
                    disabled={
                      tags.includes(presetTag.label) || tags.length >= maxTags
                    }
                    className={`px-3 py-1 text-sm rounded-full border transition-all ${
                      tags.includes(presetTag.label)
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 hover:border-primary-300"
                    }`}
                  >
                    #{presetTag.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 自定义标签输入 */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">自定义标签</h4>
            <div className="flex gap-2">
              <Input
                placeholder={placeholder}
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                className="flex-1"
                disabled={tags.length >= maxTags}
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                disabled={
                  !currentTag.trim() ||
                  tags.includes(currentTag.trim()) ||
                  tags.length >= maxTags
                }
              >
                添加
              </Button>
            </div>
          </div>

          {/* 已添加的标签 */}
          {tags.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">
                已选标签 ({tags.length}/{maxTags})
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
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

          {tags.length === 0 && (
            <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-2xl mb-2">🏷️</div>
              <p className="text-sm">
                {showPresets
                  ? "选择推荐标签或添加自定义标签"
                  : "添加自定义标签"}
                ，让内容更容易被发现
              </p>
            </div>
          )}

          {description && (
            <p className="text-xs text-text-secondary">{description}</p>
          )}

          <p className="text-xs text-text-secondary">
            按 Enter 或点击添加按钮来添加标签，最多可添加 {maxTags} 个标签
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TagsInput;
