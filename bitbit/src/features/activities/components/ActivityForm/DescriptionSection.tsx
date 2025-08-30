import React from "react";
import { Card, CardContent } from "@/components/ui";
import type { ActivityFormData } from "../ActivityForm";

interface DescriptionSectionProps {
  formData: ActivityFormData;
  onFieldChange: <K extends keyof ActivityFormData>(
    field: K,
    value: ActivityFormData[K]
  ) => void;
  onFieldFocus: (fieldName: string) => void;
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  formData,
  onFieldChange,
  onFieldFocus,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            活动描述 <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="详细描述活动内容、目标、流程等..."
            value={formData.description}
            onChange={(e) => onFieldChange("description", e.target.value)}
            onFocus={() => onFieldFocus("description")}
            className="w-full min-h-[150px] p-3 border border-gray-300 rounded-lg resize-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DescriptionSection;
