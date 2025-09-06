import React from "react";
import { Card, CardContent, Tag } from "@/components/ui";
import { cn } from "@/shared/utils/cn";
import type { OrderDetail } from "../../types";

interface OrderItemInfoProps {
  order: OrderDetail;
  className?: string;
}

const OrderItemInfo: React.FC<OrderItemInfoProps> = ({ order, className }) => {
  const getTypeConfig = (type: OrderDetail["type"]) => {
    switch (type) {
      case "buy":
        return {
          label: "购买",
          color: "bg-blue-100 text-blue-600",
          icon: "🛒",
        };
      case "sell":
        return {
          label: "出售",
          color: "bg-green-100 text-green-600",
          icon: "💰",
        };
      case "exchange":
        return {
          label: "交换",
          color: "bg-purple-100 text-purple-600",
          icon: "🔄",
        };
      default:
        return {
          label: "订单",
          color: "bg-gray-100 text-gray-600",
          icon: "📦",
        };
    }
  };

  const typeConfig = getTypeConfig(order.type);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* 商品图片 */}
          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={order.itemImage}
              alt={order.itemTitle}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 商品信息 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {order.itemTitle}
              </h3>
              <Tag className={typeConfig.color}>
                <span className="mr-1">{typeConfig.icon}</span>
                {typeConfig.label}
              </Tag>
            </div>

            {order.itemDescription && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {order.itemDescription}
              </p>
            )}

            {/* 价格信息 */}
            {order.type !== "exchange" && (
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  ¥{order.price.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemInfo;
