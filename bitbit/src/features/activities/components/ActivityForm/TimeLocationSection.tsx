import React from "react";
import { Card, CardContent, Input, DateTimePicker } from "@/components/ui";
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
  // 处理开始时间变化
  const handleStartDateChange = (value: string) => {
    onFieldChange("startDate", value);

    // 如果结束时间已设置且小于等于新的开始时间，则清空结束时间
    if (
      formData.endDate &&
      value &&
      new Date(value) >= new Date(formData.endDate)
    ) {
      onFieldChange("endDate", "");
    }
  };

  // 处理结束时间变化
  const handleEndDateChange = (value: string) => {
    // 如果开始时间已设置且新的结束时间小于等于开始时间，则不允许设置
    if (
      formData.startDate &&
      value &&
      new Date(value) <= new Date(formData.startDate)
    ) {
      // 自动设置为开始时间后1小时
      const startTime = new Date(formData.startDate);
      startTime.setHours(startTime.getHours() + 1);
      onFieldChange("endDate", startTime.toISOString());
      return;
    }
    onFieldChange("endDate", value);
  };

  // 检查时间冲突
  const hasTimeConflict =
    formData.startDate &&
    formData.endDate &&
    new Date(formData.endDate) <= new Date(formData.startDate);

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
              <DateTimePicker
                value={formData.startDate}
                onChange={handleStartDateChange}
                onFocus={() => onFieldFocus("startDate")}
                placeholder="选择开始时间"
                className="w-full"
                minDate={new Date()}
              />
              {formData.startDate && (
                <p className="text-xs text-green-600 mt-1">✓ 开始时间已设置</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                结束时间 <span className="text-red-500">*</span>
              </label>
              <DateTimePicker
                value={formData.endDate}
                onChange={handleEndDateChange}
                onFocus={() => onFieldFocus("endDate")}
                placeholder="选择结束时间"
                className="w-full"
                minDate={
                  formData.startDate
                    ? new Date(
                        Math.max(
                          new Date().getTime(),
                          new Date(formData.startDate).getTime()
                        )
                      )
                    : new Date()
                }
              />
              {formData.startDate && !formData.endDate && (
                <p className="text-xs text-gray-500 mt-1">
                  结束时间需要晚于开始时间
                </p>
              )}
              {hasTimeConflict && (
                <p className="text-xs text-red-500 mt-1">
                  ⚠️ 结束时间不能早于或等于开始时间
                </p>
              )}
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
