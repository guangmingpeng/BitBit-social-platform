import React, { useState } from "react";
import { Card, CardContent, Input, Button, Tag } from "@/components/ui";
import type { ActivityFormData } from "../ActivityForm";

interface TagsSectionProps {
  formData: ActivityFormData;
  onFieldChange: <K extends keyof ActivityFormData>(
    field: K,
    value: ActivityFormData[K]
  ) => void;
}

export const TagsSection: React.FC<TagsSectionProps> = ({
  formData,
  onFieldChange,
}) => {
  const [currentTag, setCurrentTag] = useState("");

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      onFieldChange("tags", [...formData.tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onFieldChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            活动标签（可选）
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
                !currentTag.trim() || formData.tags.includes(currentTag.trim())
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
        </div>
      </CardContent>
    </Card>
  );
};

export default TagsSection;
