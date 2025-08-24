import React from "react";
import { Card, CardContent } from "@/components/ui";

interface PublishFormData {
  title: string;
  category: string;
  customCategory?: string;
  condition: string;
  customCondition?: string;
  price: number;
  originalPrice?: number;
  description: string;
  location: string;
  images: File[];
  specifications: Array<{ key: string; value: string }>;
  exchangePreferences: string[];
  contactMethod: "platform" | "phone" | "wechat";
  contactInfo?: string;
  deliveryOptions: {
    shipping: boolean;
    freeShipping: boolean;
    pickup: boolean;
    meetup: boolean;
    localOnly: boolean;
  };
  paymentMethods: {
    cash: boolean;
    bankTransfer: boolean;
    wechatPay: boolean;
    alipay: boolean;
  };
  paymentQRCodes: File[];
}

interface Condition {
  id: string;
  name: string;
  description: string;
}

interface ItemPreviewProps {
  formData: PublishFormData;
  conditions: Condition[];
}

const ItemPreview: React.FC<ItemPreviewProps> = ({ formData, conditions }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* 商品图片预览 */}
        <div className="relative">
          {formData.images.length > 0 && (
            <img
              src={URL.createObjectURL(formData.images[0])}
              alt={formData.title}
              className="w-full h-64 object-cover"
            />
          )}
          {formData.images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              +{formData.images.length - 1}
            </div>
          )}
        </div>

        <div className="p-6">
          {/* 标题和价格 */}
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-text-primary mb-2">
              {formData.title}
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary-500">
                ¥{formData.price}
              </span>
              {formData.originalPrice && (
                <span className="text-text-secondary line-through">
                  ¥{formData.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* 基本信息 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-sm text-text-secondary">分类：</span>
              <span className="text-text-primary">
                {formData.category === "自定义"
                  ? formData.customCategory
                  : formData.category}
              </span>
            </div>
            <div>
              <span className="text-sm text-text-secondary">成色：</span>
              <span className="text-text-primary">
                {formData.condition === "custom"
                  ? formData.customCondition
                  : conditions.find((c) => c.id === formData.condition)?.name}
              </span>
            </div>
            {formData.location && (
              <div>
                <span className="text-sm text-text-secondary">地点：</span>
                <span className="text-text-primary">{formData.location}</span>
              </div>
            )}
          </div>

          {/* 商品描述 */}
          <div className="mb-4">
            <h5 className="font-medium text-text-primary mb-2">商品描述</h5>
            <p className="text-text-secondary text-sm leading-relaxed">
              {formData.description}
            </p>
          </div>

          {/* 规格参数 */}
          {formData.specifications.length > 0 && (
            <div className="mb-4">
              <h5 className="font-medium text-text-primary mb-2">规格参数</h5>
              <div className="grid grid-cols-2 gap-2">
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-text-secondary">{spec.key}：</span>
                    <span className="text-text-primary">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 交换偏好 */}
          {formData.exchangePreferences.length > 0 && (
            <div className="mb-4">
              <h5 className="font-medium text-text-primary mb-2">交换偏好</h5>
              <div className="flex flex-wrap gap-2">
                {formData.exchangePreferences.map((preference, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm"
                  >
                    {preference}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 交易方式 */}
          <div className="mb-4">
            <h5 className="font-medium text-text-primary mb-2">交易方式</h5>
            <div className="flex flex-wrap gap-2">
              {formData.deliveryOptions.shipping && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                  支持邮寄{formData.deliveryOptions.freeShipping && " (包邮)"}
                </span>
              )}
              {formData.deliveryOptions.pickup && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                  线下自取
                </span>
              )}
              {formData.deliveryOptions.meetup && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                  线下面交
                </span>
              )}
              {formData.deliveryOptions.localOnly && (
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm">
                  仅同城
                </span>
              )}
            </div>
          </div>

          {/* 支付方式 */}
          <div>
            <h5 className="font-medium text-text-primary mb-2">支付方式</h5>
            <div className="flex flex-wrap gap-2">
              {formData.paymentMethods.cash && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  现金
                </span>
              )}
              {formData.paymentMethods.bankTransfer && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  银行转账
                </span>
              )}
              {formData.paymentMethods.wechatPay && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                  微信支付
                </span>
              )}
              {formData.paymentMethods.alipay && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                  支付宝
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemPreview;
