import React, { useState, useRef, useEffect } from "react";
import { Button, Card, CardContent } from "@/components/ui";
import { cn } from "@/shared/utils/cn";
import type { PublishFormData, PublishStep } from "../types/types";
import {
  BasicInfoStep,
  DetailInfoStep,
  ProductDisplayStep,
  ContactInfoStep,
  PreviewStep,
} from "./PublishSteps";

interface PublishWizardProps {
  initialData?: Partial<PublishFormData>;
  onSubmit?: (data: PublishFormData) => Promise<void>;
  onChange?: (data: PublishFormData) => void;
}

const PublishWizard: React.FC<PublishWizardProps> = ({
  initialData,
  onSubmit,
  onChange,
}) => {
  const [formData, setFormData] = useState<PublishFormData>({
    title: "",
    category: "",
    condition: "new",
    price: 0,
    originalPrice: 0,
    description: "",
    location: "",
    images: [],
    specifications: [],
    exchangePreferences: [],
    contactMethod: "platform",
    contactInfo: "",
    deliveryOptions: {
      shipping: false,
      freeShipping: false,
      pickup: false,
      meetup: false,
      localOnly: false,
    },
    paymentMethods: {
      cash: false,
      bankTransfer: false,
      wechatPay: false,
      alipay: false,
    },
    paymentQRCodes: [],
  });

  // 用于追踪已处理的initialData
  const processedInitialDataRef = useRef<Partial<PublishFormData> | null>(null);

  // 当initialData发生有意义的变化时更新表单数据
  useEffect(() => {
    if (initialData && initialData !== processedInitialDataRef.current) {
      // 检查是否是真正的数据更新（不是空对象）
      const hasData = Object.values(initialData).some((value) => {
        if (Array.isArray(value)) return value.length > 0;
        return value !== undefined && value !== null && value !== "";
      });

      if (hasData) {
        setFormData((prev) => ({ ...prev, ...initialData }));
        processedInitialDataRef.current = initialData;
      }
    }
  }, [initialData]);

  // 当表单数据变化时通知父组件
  useEffect(() => {
    onChange?.(formData);
  }, [formData, onChange]);

  const [currentStep, setCurrentStep] = useState<PublishStep>(1);

  const steps = [
    {
      id: 1 as PublishStep,
      name: "基本信息",
      description: "商品名称、分类、成色",
    },
    {
      id: 2 as PublishStep,
      name: "详细信息",
      description: "规格参数、交换偏好",
    },
    {
      id: 3 as PublishStep,
      name: "商品展示",
      description: "价格、描述、图片上传",
    },
    { id: 4 as PublishStep, name: "联系方式", description: "联系方式设置" },
    { id: 5 as PublishStep, name: "预览发布", description: "确认信息并发布" },
  ];

  const handleFormUpdate = (updates: Partial<PublishFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const isStepValid = (step: PublishStep): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.title.trim() &&
          formData.category &&
          formData.condition
        );
      case 2:
        return true; // 规格参数和交换偏好为可选
      case 3:
        return !!(
          formData.price > 0 &&
          formData.description.trim() &&
          formData.images.length > 0 &&
          formData.location.trim()
        );
      case 4:
        return (
          formData.contactMethod === "platform" ||
          !!(formData.contactInfo && formData.contactInfo.trim() !== "")
        );
      case 5:
        return true; // 预览步骤始终有效
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as PublishStep);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as PublishStep);
    }
  };

  const handleSubmit = async () => {
    if (onSubmit) {
      await onSubmit(formData);
    }
  };

  const renderStepContent = () => {
    const stepProps = {
      formData,
      onUpdate: handleFormUpdate,
      onNext: handleNext,
      onPrev: handlePrev,
      isValid: isStepValid(currentStep),
    };

    switch (currentStep) {
      case 1:
        return <BasicInfoStep {...stepProps} />;
      case 2:
        return <DetailInfoStep {...stepProps} />;
      case 3:
        return <ProductDisplayStep {...stepProps} />;
      case 4:
        return <ContactInfoStep {...stepProps} />;
      case 5:
        return <PreviewStep {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* 步骤导航 */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    currentStep === step.id
                      ? "bg-primary-500 text-white"
                      : currentStep > step.id
                      ? "bg-primary-100 text-primary-700"
                      : "bg-gray-200 text-gray-500"
                  )}
                >
                  {step.id}
                </div>
                <div className="hidden md:block">
                  <div
                    className={cn(
                      "font-medium text-sm",
                      currentStep === step.id
                        ? "text-primary-700"
                        : currentStep > step.id
                        ? "text-primary-600"
                        : "text-gray-500"
                    )}
                  >
                    {step.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {step.description}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-12 h-0.5 mx-2",
                    currentStep > step.id ? "bg-primary-500" : "bg-gray-200"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 表单内容 */}
      <Card>
        <CardContent className="p-8">
          {renderStepContent()}

          {/* 步骤导航按钮 */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              上一步
            </Button>

            <div className="flex gap-2">
              {currentStep < 5 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                >
                  下一步
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepValid(currentStep)}
                >
                  发布商品
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublishWizard;
