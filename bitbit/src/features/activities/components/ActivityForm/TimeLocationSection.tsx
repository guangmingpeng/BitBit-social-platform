import React from "react";
import { Card, CardContent, Input } from "@/components/ui";
import type { ActivityFormData } from "../ActivityForm";

interface TimeLocationSectionProps {
  formData: ActivityFormData;
  onFieldChange: <K extends keyof ActivityFormData>(
    field: K,
    value: ActivityFormData[K]
  ) => void;
  onFieldFocus: (fieldName: string) => void;
}

export const TimeLocationSection: React.FC<TimeLocationSectionProps> = ({
  formData,
  onFieldChange,
  onFieldFocus,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          时间和地点
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                开始时间 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => onFieldChange("startDate", e.target.value)}
                  onFocus={(e) => {
                    onFieldFocus("startDate");
                    // 聚焦时也显示选择器
                    e.currentTarget.showPicker?.();
                  }}
                  className="cursor-pointer w-full"
                  onClick={(e) => {
                    // 确保点击时显示日期时间选择器
                    e.currentTarget.showPicker?.();
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                结束时间 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => onFieldChange("endDate", e.target.value)}
                  onFocus={(e) => {
                    onFieldFocus("endDate");
                    // 聚焦时也显示选择器
                    e.currentTarget.showPicker?.();
                  }}
                  className="cursor-pointer w-full"
                  onClick={(e) => {
                    // 确保点击时显示日期时间选择器
                    e.currentTarget.showPicker?.();
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isOnline}
                onChange={(e) => onFieldChange("isOnline", e.target.checked)}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-text-primary">
                线上活动
              </span>
            </label>

            {formData.isOnline ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary">
                  会议链接 <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="请输入会议链接（如：腾讯会议、Zoom等）"
                  value={formData.meetingLink}
                  onChange={(e) => onFieldChange("meetingLink", e.target.value)}
                  onFocus={() => onFieldFocus("location")}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary">
                  活动地点 <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="请输入活动地点..."
                  value={formData.location}
                  onChange={(e) => onFieldChange("location", e.target.value)}
                  onFocus={() => onFieldFocus("location")}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeLocationSection;
