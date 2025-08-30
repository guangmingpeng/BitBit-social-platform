import React from "react";
import { Card, CardContent, Input, Button } from "@/components/ui";
import type { ActivityFormData, ScheduleItem } from "../ActivityForm";

interface ScheduleSectionProps {
  formData: ActivityFormData;
  onFieldChange: <K extends keyof ActivityFormData>(
    field: K,
    value: ActivityFormData[K]
  ) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  formData,
  onFieldChange,
}) => {
  const addScheduleItem = () => {
    const newScheduleItem: ScheduleItem = {
      id: Date.now().toString(),
      time: "",
      title: "",
      description: "",
      icon: "📅",
    };
    onFieldChange("schedule", [...formData.schedule, newScheduleItem]);
  };

  const updateScheduleItem = (
    index: number,
    field: keyof ScheduleItem,
    value: string
  ) => {
    const updatedSchedule = formData.schedule.map((scheduleItem, i) =>
      i === index ? { ...scheduleItem, [field]: value } : scheduleItem
    );
    onFieldChange("schedule", updatedSchedule);
  };

  const removeScheduleItem = (index: number) => {
    onFieldChange(
      "schedule",
      formData.schedule.filter((_, i) => i !== index)
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-text-primary">
              时间安排
            </label>
            <Button
              type="button"
              size="sm"
              variant="primary"
              onClick={addScheduleItem}
              className="font-medium px-4 py-2 shadow-sm"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              添加时间项
            </Button>
          </div>

          {formData.schedule.map((item, index) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">
                  时间项 {index + 1}
                </h4>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => removeScheduleItem(index)}
                  className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    时间
                  </label>
                  <Input
                    type="time"
                    value={item.time}
                    onChange={(e) =>
                      updateScheduleItem(index, "time", e.target.value)
                    }
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    标题
                  </label>
                  <Input
                    placeholder="时间点标题"
                    value={item.title}
                    onChange={(e) =>
                      updateScheduleItem(index, "title", e.target.value)
                    }
                    className="text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  描述（可选）
                </label>
                <textarea
                  placeholder="详细描述该时间点的活动内容"
                  value={item.description || ""}
                  onChange={(e) =>
                    updateScheduleItem(index, "description", e.target.value)
                  }
                  className="w-full h-16 p-2 text-sm border border-gray-300 rounded-lg resize-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
          ))}

          {/* 当有时间安排项目时显示的快速添加按钮 */}
          {formData.schedule.length > 0 && (
            <div className="flex justify-center">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addScheduleItem}
                className="w-12 h-12 rounded-full border-2 border-dashed border-primary-300 hover:border-primary-500 hover:bg-primary-50 text-primary-500 font-bold text-lg"
              >
                +
              </Button>
            </div>
          )}

          {formData.schedule.length === 0 && (
            <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <svg
                className="w-12 h-12 mx-auto mb-2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm">暂无时间安排，点击上方按钮添加</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleSection;
