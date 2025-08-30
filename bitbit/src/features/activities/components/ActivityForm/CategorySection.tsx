import React from "react";
import { Card, CardContent, CategorySelector } from "@/components/ui";
import type { ActivityFormData } from "../ActivityForm";

interface CategorySectionProps {
  formData: ActivityFormData;
  onFieldChange: <K extends keyof ActivityFormData>(
    field: K,
    value: ActivityFormData[K]
  ) => void;
  onFieldFocus: (fieldName: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  formData,
  onFieldChange,
  onFieldFocus,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            活动分类 <span className="text-red-500">*</span>
          </label>
          <div onFocus={() => onFieldFocus("category")}>
            <CategorySelector
              selectedCategory={formData.category}
              onSelect={(categoryId) => onFieldChange("category", categoryId)}
              allowCustom={true}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySection;
