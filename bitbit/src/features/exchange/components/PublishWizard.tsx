import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  onSubmit?: (data: PublishFormData) => Promise<void>;
}

const PublishWizard: React.FC<PublishWizardProps> = ({ onSubmit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PublishFormData>({
    title: "",
    category: "",
    customCategory: "",
    condition: "",
    customCondition: "",
    price: 0,
    originalPrice: undefined,
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
      cash: true,
      bankTransfer: false,
      wechatPay: false,
      alipay: false,
    },
    paymentQRCodes: [],
  });

  const [currentStep, setCurrentStep] = useState<PublishStep>(1);
  const [publishStatus, setPublishStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [publishError, setPublishError] = useState<string>("");

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
    setPublishStatus("loading");
    setPublishError("");

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // 默认的提交逻辑
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (Math.random() > 0.1) {
          console.log("发布商品数据:", formData);
        } else {
          throw new Error("网络错误，请稍后重试");
        }
      }
      setPublishStatus("success");
    } catch (error) {
      setPublishStatus("error");
      setPublishError(error instanceof Error ? error.message : "发布失败");
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

  const renderStatusContent = () => {
    if (publishStatus === "loading") {
      return (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mb-4"></div>
          <h3 className="text-lg font-medium text-text-primary mb-2">
            正在发布商品...
          </h3>
          <p className="text-text-secondary">请稍候，正在上传商品信息</p>
        </div>
      );
    }

    if (publishStatus === "success") {
      return (
        <div className="space-y-6">
          {/* 成功状态 */}
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-medium text-text-primary mb-2">
              发布成功！
            </h3>
            <p className="text-text-secondary mb-6">
              你的商品已成功发布，买家很快就能看到了
            </p>
          </div>

          {/* 商品预览卡片 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              你的商品预览
            </h4>

            <div className="bg-white rounded-lg p-4 flex gap-4">
              {/* 商品图片 */}
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
                {formData.images.length > 0 ? (
                  <img
                    src={URL.createObjectURL(formData.images[0])}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-300">📦</span>
                )}
              </div>

              {/* 商品信息 */}
              <div className="flex-1 min-w-0">
                <h5 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                  {formData.title}
                </h5>
                <p className="text-sm text-gray-600 mb-2">
                  {formData.condition} | {formData.category}
                </p>
                <div className="text-lg font-bold text-primary-500">
                  ¥{formData.price.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-green-700 bg-green-100 rounded-lg px-3 py-2">
              💡
              你的商品将在几分钟内出现在商品列表中，其他用户就能看到并联系你了！
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="primary"
              onClick={() => navigate("/exchange?newItem=true")}
              className="flex items-center gap-2"
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              查看我的商品
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/exchange")}
              className="flex items-center gap-2"
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              继续逛逛
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setPublishStatus("idle");
                setCurrentStep(1);
                setFormData({
                  title: "",
                  category: "",
                  customCategory: "",
                  condition: "",
                  customCondition: "",
                  price: 0,
                  originalPrice: undefined,
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
                    cash: true,
                    bankTransfer: false,
                    wechatPay: false,
                    alipay: false,
                  },
                  paymentQRCodes: [],
                });
              }}
              className="flex items-center gap-2"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              再发一个
            </Button>
          </div>
        </div>
      );
    }

    if (publishStatus === "error") {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-medium text-text-primary mb-2">
            发布失败
          </h3>
          <p className="text-text-secondary mb-6">{publishError}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => setPublishStatus("idle")}>重新尝试</Button>
            <Button variant="outline" onClick={() => navigate("/exchange")}>
              返回列表
            </Button>
          </div>
        </div>
      );
    }

    return null;
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
          {publishStatus === "idle"
            ? renderStepContent()
            : renderStatusContent()}

          {/* 步骤导航按钮 */}
          {publishStatus === "idle" && (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PublishWizard;
