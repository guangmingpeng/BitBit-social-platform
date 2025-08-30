import React from "react";
import { Card, CardContent, ImageUpload } from "@/components/ui";
import type { ActivityFormData } from "../ActivityForm";

interface ImageUploadSectionProps {
  formData: ActivityFormData;
  onFieldChange: <K extends keyof ActivityFormData>(
    field: K,
    value: ActivityFormData[K]
  ) => void;
  onFieldFocus: (fieldName: string) => void;
}

export const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  formData,
  onFieldChange,
  onFieldFocus,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            活动图片（可选）
          </label>
          <div onFocus={() => onFieldFocus("images")}>
            <ImageUpload
              images={formData.images}
              onUpload={(images) => onFieldChange("images", images)}
              onRemove={(index) =>
                onFieldChange(
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
  );
};

export default ImageUploadSection;
