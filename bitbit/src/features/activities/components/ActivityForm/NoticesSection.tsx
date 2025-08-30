import React from "react";
import { Card, CardContent, Button } from "@/components/ui";
import type { ActivityFormData, NoticeItem } from "../ActivityForm";

interface NoticesSectionProps {
  formData: ActivityFormData;
  onFieldChange: <K extends keyof ActivityFormData>(
    field: K,
    value: ActivityFormData[K]
  ) => void;
}

export const NoticesSection: React.FC<NoticesSectionProps> = ({
  formData,
  onFieldChange,
}) => {
  const addNoticeItem = () => {
    const newNoticeItem: NoticeItem = {
      id: Date.now().toString(),
      content: "",
      important: false,
    };
    onFieldChange("notices", [...formData.notices, newNoticeItem]);
  };

  const updateNoticeItem = (
    index: number,
    field: keyof NoticeItem,
    value: string | boolean
  ) => {
    const updatedNotices = formData.notices.map((noticeItem, i) =>
      i === index ? { ...noticeItem, [field]: value } : noticeItem
    );
    onFieldChange("notices", updatedNotices);
  };

  const removeNoticeItem = (index: number) => {
    onFieldChange(
      "notices",
      formData.notices.filter((_, i) => i !== index)
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-text-primary">
              注意事项
            </label>
            <Button
              type="button"
              size="sm"
              variant="primary"
              onClick={addNoticeItem}
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
              添加注意事项
            </Button>
          </div>

          {formData.notices.map((notice, index) => (
            <div
              key={notice.id}
              className="border border-gray-200 rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">
                  注意事项 {index + 1}
                </h4>
                <div className="flex items-center gap-2">
                  <label className="flex items-center text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={notice.important || false}
                      onChange={(e) =>
                        updateNoticeItem(index, "important", e.target.checked)
                      }
                      className="mr-1"
                    />
                    重要
                  </label>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeNoticeItem(index)}
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
              </div>

              <div>
                <textarea
                  placeholder="请输入注意事项内容"
                  value={notice.content}
                  onChange={(e) =>
                    updateNoticeItem(index, "content", e.target.value)
                  }
                  className="w-full h-20 p-3 text-sm border border-gray-300 rounded-lg resize-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
          ))}

          {/* 当有注意事项时显示的快速添加按钮 */}
          {formData.notices.length > 0 && (
            <div className="flex justify-center">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addNoticeItem}
                className="w-12 h-12 rounded-full border-2 border-dashed border-primary-300 hover:border-primary-500 hover:bg-primary-50 text-primary-500 font-bold text-lg"
              >
                +
              </Button>
            </div>
          )}

          {formData.notices.length === 0 && (
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm">暂无注意事项，点击上方按钮添加</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NoticesSection;
