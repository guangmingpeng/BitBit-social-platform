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

export interface ExchangeModalProps {
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
  onConfirm?: (data: ExchangeFormData) => void;
}

export interface ExchangeFormData {
  offerType: "money" | "exchange";
  offerPrice?: number;
  exchangeItem?: {
    title: string;
    description: string;
    images: File[];
  };
  message: string;
  contactMethod: "platform" | "phone" | "wechat";
  contactInfo?: string;
}

const ExchangeModal: React.FC<ExchangeModalProps> = ({
  open,
  onClose,
  item,
  onConfirm,
}) => {
  const [offerType, setOfferType] = useState<"money" | "exchange">("money");
  const [offerPrice, setOfferPrice] = useState<string>("");
  const [exchangeTitle, setExchangeTitle] = useState<string>("");
  const [exchangeDescription, setExchangeDescription] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [contactMethod, setContactMethod] = useState<
    "platform" | "phone" | "wechat"
  >("platform");
  const [contactInfo, setContactInfo] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newImages].slice(0, 4));
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const formData: ExchangeFormData = {
      offerType,
      message,
      contactMethod,
      contactInfo: contactMethod !== "platform" ? contactInfo : undefined,
    };

    if (offerType === "money") {
      formData.offerPrice = Number(offerPrice);
    } else {
      formData.exchangeItem = {
        title: exchangeTitle,
        description: exchangeDescription,
        images,
      };
    }

    onConfirm?.(formData);
    onClose();
  };

  const isValid = () => {
    if (offerType === "money") {
      return offerPrice && Number(offerPrice) > 0 && message.trim();
    } else {
      return (
        exchangeTitle.trim() && exchangeDescription.trim() && message.trim()
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <ModalHeader onClose={onClose}>
        <ModalTitle>发起交换</ModalTitle>
      </ModalHeader>

      <ModalBody className="space-y-6">
        {/* 目标商品信息 */}
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
                <p className="text-lg font-semibold text-primary-500">
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

        {/* 交换方式选择 */}
        <div className="space-y-3">
          <h4 className="font-medium text-text-primary">交换方式</h4>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setOfferType("money")}
              className={cn(
                "p-4 rounded-lg border-2 transition-all text-left",
                offerType === "money"
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  💰
                </div>
                <div>
                  <p className="font-medium text-text-primary">现金购买</p>
                  <p className="text-sm text-text-secondary">直接用现金购买</p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setOfferType("exchange")}
              className={cn(
                "p-4 rounded-lg border-2 transition-all text-left",
                offerType === "exchange"
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  🔄
                </div>
                <div>
                  <p className="font-medium text-text-primary">物品交换</p>
                  <p className="text-sm text-text-secondary">用物品进行交换</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 出价或交换物品信息 */}
        {offerType === "money" ? (
          <div className="space-y-3">
            <h4 className="font-medium text-text-primary">出价金额</h4>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                ¥
              </span>
              <Input
                type="number"
                placeholder="请输入出价金额"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                className="pl-8"
              />
            </div>
            <p className="text-sm text-text-secondary">
              建议价格范围：¥{Math.round(item.price * 0.8)} - ¥{item.price}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="font-medium text-text-primary">交换物品信息</h4>

            <div className="space-y-3">
              <Input
                placeholder="物品名称"
                value={exchangeTitle}
                onChange={(e) => setExchangeTitle(e.target.value)}
              />

              <textarea
                placeholder="详细描述你的物品（状况、购买时间、使用情况等）"
                value={exchangeDescription}
                onChange={(e) => setExchangeDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
              />
            </div>

            {/* 图片上传 */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-text-primary">物品图片</p>
              <div className="flex flex-wrap gap-3">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {images.length < 4 && (
                  <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors">
                    <div className="text-center">
                      <span className="text-2xl text-gray-400">+</span>
                      <p className="text-xs text-text-secondary">添加图片</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-text-secondary">
                最多上传4张图片，支持JPG、PNG格式
              </p>
            </div>
          </div>
        )}

        {/* 留言 */}
        <div className="space-y-3">
          <h4 className="font-medium text-text-primary">给卖家留言</h4>
          <textarea
            placeholder="简要说明你的需求或交换意向..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
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
      </ModalBody>

      <ModalFooter>
        <Button variant="outline" onClick={onClose}>
          取消
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!isValid()}>
          发送交换请求
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ExchangeModal;
