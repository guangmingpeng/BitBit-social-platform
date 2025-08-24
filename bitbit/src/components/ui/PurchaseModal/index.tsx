import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Avatar,
  Card,
  CardContent,
} from "@/components/ui";
import { cn } from "@/shared/utils/cn";

export interface PurchaseModalProps {
  open: boolean;
  onClose: () => void;
  item: {
    id: string;
    title: string;
    image: string;
    price: number;
    seller: {
      name: string;
      avatar: string;
      rating: number;
    };
  };
  onConfirm?: (data: PurchaseFormData) => void;
}

export interface PurchaseFormData {
  paymentMethod: "alipay" | "wechat" | "bank";
  message: string;
  contactMethod: "platform" | "phone" | "wechat";
  contactInfo?: string;
  meetingLocation?: string;
  preferredTime?: string;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  open,
  onClose,
  item,
  onConfirm,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<
    "alipay" | "wechat" | "bank"
  >("alipay");
  const [message, setMessage] = useState<string>("");
  const [contactMethod, setContactMethod] = useState<
    "platform" | "phone" | "wechat"
  >("platform");
  const [contactInfo, setContactInfo] = useState<string>("");
  const [meetingLocation, setMeetingLocation] = useState<string>("");
  const [preferredTime, setPreferredTime] = useState<string>("");

  const paymentMethods = [
    { id: "alipay", name: "支付宝", icon: "💳", color: "blue" },
    { id: "wechat", name: "微信支付", icon: "💚", color: "green" },
    { id: "bank", name: "银行转账", icon: "🏦", color: "gray" },
  ];

  const handleSubmit = () => {
    const formData: PurchaseFormData = {
      paymentMethod,
      message,
      contactMethod,
      contactInfo: contactMethod !== "platform" ? contactInfo : undefined,
      meetingLocation: meetingLocation.trim() || undefined,
      preferredTime: preferredTime.trim() || undefined,
    };

    onConfirm?.(formData);
    onClose();
  };

  const isValid = () => {
    const hasMessage = message.trim().length > 0;
    const hasContactInfo =
      contactMethod === "platform" || contactInfo.trim().length > 0;
    return hasMessage && hasContactInfo;
  };

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <ModalHeader onClose={onClose}>
        <ModalTitle>确认购买</ModalTitle>
      </ModalHeader>

      <ModalBody className="space-y-6">
        {/* 商品信息 */}
        <Card variant="outlined" className="bg-gray-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-text-primary">{item.title}</h4>
                <p className="text-2xl font-bold text-primary-500">
                  ¥{item.price}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Avatar
                  src={item.seller.avatar}
                  alt={item.seller.name}
                  fallback={item.seller.name[0]}
                  size="sm"
                />
                <div>
                  <p className="text-sm font-medium">{item.seller.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-yellow-500">★</span>
                    <span className="text-xs text-text-secondary">
                      {item.seller.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 支付方式 */}
        <div className="space-y-3">
          <h4 className="font-medium text-text-primary">支付方式</h4>
          <div className="grid grid-cols-3 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() =>
                  setPaymentMethod(method.id as "alipay" | "wechat" | "bank")
                }
                className={cn(
                  "p-4 rounded-lg border-2 transition-all text-center",
                  paymentMethod === method.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="text-2xl mb-1">{method.icon}</div>
                <p className="text-sm font-medium">{method.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 交易方式说明 */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-medium text-amber-800 mb-2">💡 安全交易提醒</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• 建议当面交易，一手交钱一手交货</li>
            <li>• 收到商品并确认无误后再付款</li>
            <li>• 注意核对商品与描述是否一致</li>
            <li>• 如遇到问题，请及时联系客服</li>
          </ul>
        </div>

        {/* 交易信息 */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-primary">交易信息</h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                交易地点
              </label>
              <Input
                placeholder="建议的交易地点"
                value={meetingLocation}
                onChange={(e) => setMeetingLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                方便时间
              </label>
              <Input
                placeholder="如：周末下午、工作日晚上"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 给卖家留言 */}
        <div className="space-y-3">
          <h4 className="font-medium text-text-primary">给卖家留言 *</h4>
          <textarea
            placeholder="告诉卖家你的购买意向、交易方式或其他要求..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
          />
        </div>

        {/* 联系方式 */}
        <div className="space-y-3">
          <h4 className="font-medium text-text-primary">联系方式</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="contact"
                value="platform"
                checked={contactMethod === "platform"}
                onChange={(e) =>
                  setContactMethod(
                    e.target.value as "platform" | "phone" | "wechat"
                  )
                }
                className="w-4 h-4 text-primary-500"
              />
              <span className="text-sm">站内消息（推荐）</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="contact"
                value="phone"
                checked={contactMethod === "phone"}
                onChange={(e) =>
                  setContactMethod(
                    e.target.value as "platform" | "phone" | "wechat"
                  )
                }
                className="w-4 h-4 text-primary-500"
              />
              <span className="text-sm">手机号码</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="contact"
                value="wechat"
                checked={contactMethod === "wechat"}
                onChange={(e) =>
                  setContactMethod(
                    e.target.value as "platform" | "phone" | "wechat"
                  )
                }
                className="w-4 h-4 text-primary-500"
              />
              <span className="text-sm">微信号</span>
            </label>
          </div>

          {contactMethod !== "platform" && (
            <Input
              placeholder={
                contactMethod === "phone" ? "请输入手机号码" : "请输入微信号"
              }
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          )}
        </div>

        {/* 费用明细 */}
        <Card variant="outlined">
          <CardContent className="p-4">
            <h4 className="font-medium text-text-primary mb-3">费用明细</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">商品价格</span>
                <span className="text-text-primary">¥{item.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">平台服务费</span>
                <span className="text-text-primary">免费</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span className="text-text-primary">总计</span>
                  <span className="text-xl text-primary-500">
                    ¥{item.price}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ModalBody>

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          取消
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!isValid()}>
          确认购买
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PurchaseModal;
