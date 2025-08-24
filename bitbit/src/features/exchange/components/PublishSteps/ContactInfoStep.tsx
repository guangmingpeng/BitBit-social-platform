import React from "react";
import { Input } from "@/components/ui";
import type { PublishStepProps } from "../../types/types";

/**
 * 发布表单第四步：联系方式
 */
export const ContactInfoStep: React.FC<PublishStepProps> = ({
  formData,
  onUpdate,
}) => {
  const handleQRCodeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newQRCodes = Array.from(e.target.files);
      const updatedQRCodes = [...formData.paymentQRCodes, ...newQRCodes].slice(
        0,
        2
      );
      onUpdate({ paymentQRCodes: updatedQRCodes });
    }
  };

  const removeQRCode = (index: number) => {
    const updatedQRCodes = formData.paymentQRCodes.filter(
      (_, i) => i !== index
    );
    onUpdate({ paymentQRCodes: updatedQRCodes });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-text-primary">联系方式</h3>

      {/* 联系方式选择 */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          联系方式 <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="contactMethod"
              value="platform"
              checked={formData.contactMethod === "platform"}
              onChange={(e) =>
                onUpdate({
                  contactMethod: e.target.value as
                    | "platform"
                    | "phone"
                    | "wechat",
                })
              }
              className="mr-3"
            />
            <div>
              <div className="font-medium">站内消息 (推荐)</div>
              <div className="text-sm text-text-secondary">
                通过平台内置消息系统联系，安全可靠
              </div>
            </div>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="contactMethod"
              value="phone"
              checked={formData.contactMethod === "phone"}
              onChange={(e) =>
                onUpdate({
                  contactMethod: e.target.value as
                    | "platform"
                    | "phone"
                    | "wechat",
                })
              }
              className="mr-3"
            />
            <div>
              <div className="font-medium">手机号码</div>
              <div className="text-sm text-text-secondary">
                直接电话联系，更加便捷
              </div>
            </div>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="contactMethod"
              value="wechat"
              checked={formData.contactMethod === "wechat"}
              onChange={(e) =>
                onUpdate({
                  contactMethod: e.target.value as
                    | "platform"
                    | "phone"
                    | "wechat",
                })
              }
              className="mr-3"
            />
            <div>
              <div className="font-medium">微信号</div>
              <div className="text-sm text-text-secondary">
                通过微信沟通交流
              </div>
            </div>
          </label>
        </div>

        {/* 联系信息输入 */}
        {formData.contactMethod !== "platform" && (
          <div className="mt-3">
            <Input
              placeholder={
                formData.contactMethod === "phone"
                  ? "请输入手机号码"
                  : "请输入微信号"
              }
              value={formData.contactInfo || ""}
              onChange={(e) => onUpdate({ contactInfo: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* 配送方式 */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          配送方式
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.deliveryOptions.shipping}
              onChange={(e) =>
                onUpdate({
                  deliveryOptions: {
                    ...formData.deliveryOptions,
                    shipping: e.target.checked,
                  },
                })
              }
              className="mr-2"
            />
            快递配送
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.deliveryOptions.freeShipping}
              onChange={(e) =>
                onUpdate({
                  deliveryOptions: {
                    ...formData.deliveryOptions,
                    freeShipping: e.target.checked,
                  },
                })
              }
              className="mr-2"
            />
            包邮
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.deliveryOptions.pickup}
              onChange={(e) =>
                onUpdate({
                  deliveryOptions: {
                    ...formData.deliveryOptions,
                    pickup: e.target.checked,
                  },
                })
              }
              className="mr-2"
            />
            上门自提
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.deliveryOptions.meetup}
              onChange={(e) =>
                onUpdate({
                  deliveryOptions: {
                    ...formData.deliveryOptions,
                    meetup: e.target.checked,
                  },
                })
              }
              className="mr-2"
            />
            线下见面
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.deliveryOptions.localOnly}
              onChange={(e) =>
                onUpdate({
                  deliveryOptions: {
                    ...formData.deliveryOptions,
                    localOnly: e.target.checked,
                  },
                })
              }
              className="mr-2"
            />
            仅限同城
          </label>
        </div>
      </div>

      {/* 支付方式 */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          支付方式
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.paymentMethods.cash}
              onChange={(e) =>
                onUpdate({
                  paymentMethods: {
                    ...formData.paymentMethods,
                    cash: e.target.checked,
                  },
                })
              }
              className="mr-2"
            />
            现金交易
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.paymentMethods.bankTransfer}
              onChange={(e) =>
                onUpdate({
                  paymentMethods: {
                    ...formData.paymentMethods,
                    bankTransfer: e.target.checked,
                  },
                })
              }
              className="mr-2"
            />
            银行转账
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.paymentMethods.wechatPay}
              onChange={(e) =>
                onUpdate({
                  paymentMethods: {
                    ...formData.paymentMethods,
                    wechatPay: e.target.checked,
                  },
                })
              }
              className="mr-2"
            />
            微信支付
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.paymentMethods.alipay}
              onChange={(e) =>
                onUpdate({
                  paymentMethods: {
                    ...formData.paymentMethods,
                    alipay: e.target.checked,
                  },
                })
              }
              className="mr-2"
            />
            支付宝
          </label>
        </div>

        {/* 收款码上传 */}
        {(formData.paymentMethods.wechatPay ||
          formData.paymentMethods.alipay) && (
          <div className="mt-4 space-y-3">
            <label className="block text-sm font-medium text-text-primary">
              收款码 (最多2张)
            </label>

            <div className="flex gap-4">
              {/* 已上传的收款码 */}
              {formData.paymentQRCodes.map((qrCode, index) => (
                <div key={index} className="relative group">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(qrCode)}
                      alt={`收款码 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeQRCode(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* 上传按钮 */}
              {formData.paymentQRCodes.length < 2 && (
                <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-colors">
                  <span className="text-2xl text-gray-400">+</span>
                  <span className="text-xs text-gray-500 mt-1">添加</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleQRCodeUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
