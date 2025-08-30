import React, { useState } from "react";
import { Card, CardContent, Input, Button } from "@/components/ui";

export interface ActivityFormData {
  title: string;
  description: string;
  date: string;
  location: string;
}

interface ActivityFormSimpleProps {
  onSubmit: (data: ActivityFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const ActivityFormSimple: React.FC<ActivityFormSimpleProps> = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<ActivityFormData>({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateFormData = (field: keyof ActivityFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid =
    formData.title &&
    formData.description &&
    formData.date &&
    formData.location;

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">活动标题 *</label>
            <Input
              value={formData.title}
              onChange={(e) => updateFormData("title", e.target.value)}
              placeholder="请输入活动标题"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">活动描述 *</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              placeholder="请描述活动的详细信息..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">活动日期 *</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => updateFormData("date", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">活动地点 *</label>
            <Input
              value={formData.location}
              onChange={(e) => updateFormData("location", e.target.value)}
              placeholder="请输入活动地点"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              取消
            </Button>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "发布中..." : "发布活动"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ActivityFormSimple;
