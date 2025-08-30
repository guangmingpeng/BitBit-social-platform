import React from "react";
import { Card, CardContent, Input } from "@/components/ui";
import type { ActivityFormData } from "../ActivityForm";

interface RegistrationSectionProps {
  formData: ActivityFormData;
  onFieldChange: <K extends keyof ActivityFormData>(
    field: K,
    value: ActivityFormData[K]
  ) => void;
  onFieldFocus: (fieldName: string) => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  formData,
  onFieldChange,
  onFieldFocus,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          报名信息
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                最大参与人数
              </label>
              <Input
                type="number"
                min="1"
                max="1000"
                value={formData.maxParticipants}
                onChange={(e) =>
                  onFieldChange(
                    "maxParticipants",
                    parseInt(e.target.value) || 0
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                活动费用（元）
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={formData.fee}
                onChange={(e) =>
                  onFieldChange("fee", parseFloat(e.target.value) || 0)
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              报名截止时间 <span className="text-red-500">*</span>
            </label>
            <Input
              type="datetime-local"
              value={formData.registrationDeadline}
              onChange={(e) =>
                onFieldChange("registrationDeadline", e.target.value)
              }
              onFocus={(e) => {
                onFieldFocus("registrationDeadline");
                e.currentTarget.showPicker?.();
              }}
              className="cursor-pointer"
              onClick={(e) => {
                e.currentTarget.showPicker?.();
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              参与要求
            </label>
            <textarea
              placeholder="描述参与者需要满足的条件或准备的物品..."
              value={formData.requirements}
              onChange={(e) => onFieldChange("requirements", e.target.value)}
              className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              联系方式 <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="请输入联系方式（微信、QQ、手机号等）"
              value={formData.contactInfo}
              onChange={(e) => onFieldChange("contactInfo", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationSection;
