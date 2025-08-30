import React from "react";
import { Card, CardContent, Input } from "@/components/ui";
import type { ActivityFormData } from "../ActivityForm";

interface BasicInfoSectionProps {
  formData: ActivityFormData;
  onFieldChange: <K extends keyof ActivityFormData>(
    field: K,
    value: ActivityFormData[K]
  ) => void;
  onFieldFocus: (fieldName: string) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formData,
  onFieldChange,
  onFieldFocus,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          基本信息
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              活动标题 <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="请输入活动标题..."
              value={formData.title}
              onChange={(e) => onFieldChange("title", e.target.value)}
              onFocus={() => onFieldFocus("title")}
              className="text-lg"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoSection;
