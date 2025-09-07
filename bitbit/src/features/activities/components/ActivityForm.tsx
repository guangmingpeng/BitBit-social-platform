import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BasicInfoSection,
  ImageUploadSection,
  CategorySection,
  DescriptionSection,
  TimeLocationSection,
  RegistrationSection,
  ScheduleSection,
  NoticesSection,
  TagsSection,
  FormActions,
} from "./ActivityForm/index";

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface NoticeItem {
  id: string;
  content: string;
  important?: boolean;
}

export interface ActivityFormData {
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  location: string;
  maxParticipants: number;
  registrationDeadline: string;
  fee: number;
  tags: string[];
  images: File[];
  requirements: string;
  contactInfo: string;
  isOnline: boolean;
  meetingLink?: string;
  schedule: ScheduleItem[];
  notices: NoticeItem[];
}

export interface ActivityFormProps {
  initialData?: Partial<ActivityFormData>;
  onSubmit: (data: ActivityFormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  onChange?: (data: ActivityFormData) => void;
  onFieldFocus?: (fieldName: string) => void;
}

/**
 * 活动发布表单组件
 * 提取自 PublishActivity 页面，支持复用
 */
export const ActivityForm: React.FC<ActivityFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  onChange,
  onFieldFocus,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ActivityFormData>({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    location: "",
    maxParticipants: 20,
    registrationDeadline: "",
    fee: 0,
    tags: [],
    images: [],
    requirements: "",
    contactInfo: "",
    isOnline: false,
    meetingLink: "",
    schedule: [],
    notices: [],
    ...initialData,
  });

  // 处理字段焦点的函数
  const handleFieldFocus = (fieldName: string) => {
    onFieldFocus?.(fieldName);
  };

  // 当initialData变化时更新表单数据（但避免循环依赖）
  const prevInitialDataRef = useRef<Partial<ActivityFormData> | undefined>(
    undefined
  );
  useEffect(() => {
    if (initialData && initialData !== prevInitialDataRef.current) {
      // 检查是否是有意义的初始数据更新（标题不为空说明是真实的草稿数据）
      if (initialData.title && initialData.title.trim()) {
        setFormData((prev) => ({
          ...prev,
          ...initialData,
        }));
      }
      prevInitialDataRef.current = initialData;
    }
  }, [initialData]);

  // 当表单数据变化时通知父组件
  useEffect(() => {
    onChange?.(formData);
  }, [formData, onChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1);
    }
  };

  const updateField = <K extends keyof ActivityFormData>(
    field: K,
    value: ActivityFormData[K]
  ) => {
    setFormData((prev: ActivityFormData) => {
      const newData = { ...prev, [field]: value };
      onChange?.(newData);
      return newData;
    });
  };

  const isValid =
    formData.title &&
    formData.description &&
    formData.category &&
    formData.startDate &&
    formData.endDate &&
    formData.registrationDeadline &&
    (formData.isOnline ? formData.meetingLink : formData.location) &&
    formData.contactInfo;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 基本信息 */}
      <BasicInfoSection
        formData={formData}
        onFieldChange={updateField}
        onFieldFocus={handleFieldFocus}
      />

      {/* 图片上传 */}
      <ImageUploadSection
        formData={formData}
        onFieldChange={updateField}
        onFieldFocus={handleFieldFocus}
      />

      {/* 时间和地点 */}
      <TimeLocationSection
        formData={formData}
        onFieldChange={updateField}
        onFieldFocus={handleFieldFocus}
      />

      {/* 报名信息 */}
      <RegistrationSection
        formData={formData}
        onFieldChange={updateField}
        onFieldFocus={handleFieldFocus}
      />

      {/* 分类选择 */}
      <CategorySection
        formData={formData}
        onFieldChange={updateField}
        onFieldFocus={handleFieldFocus}
      />

      {/* 活动描述 */}
      <DescriptionSection
        formData={formData}
        onFieldChange={updateField}
        onFieldFocus={handleFieldFocus}
      />

      {/* 活动安排 */}
      <ScheduleSection
        formData={formData}
        onFieldChange={updateField}
        onFieldFocus={handleFieldFocus}
      />

      {/* 注意事项 */}
      <NoticesSection formData={formData} onFieldChange={updateField} />

      {/* 标签 */}
      <TagsSection
        formData={formData}
        onFieldChange={updateField}
        onFieldFocus={handleFieldFocus}
      />

      {/* 操作按钮 */}
      <FormActions
        isValid={!!isValid}
        isSubmitting={isSubmitting}
        onSubmit={() => {}} // FormActions会使用form的type="submit"来提交
        onCancel={handleCancel}
      />
    </form>
  );
};
