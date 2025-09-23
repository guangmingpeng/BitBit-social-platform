import React from "react";
import { Card, CardContent } from "@/components/ui";
import { cn } from "@/shared/utils/cn";
import type { Order } from "@/shared/data/profileMockData";

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
  className?: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick, className }) => {
  const getStatusConfig = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return { label: "待处理", color: "bg-yellow-100 text-yellow-600" };
      case "completed":
        return { label: "已完成", color: "bg-green-100 text-green-600" };
      case "cancelled":
        return { label: "已取消", color: "bg-red-100 text-red-600" };
      case "shipped":
        return { label: "已发货", color: "bg-blue-100 text-blue-600" };
      case "delivered":
        return { label: "已送达", color: "bg-green-100 text-green-600" };
      default:
        return { label: "未知", color: "bg-gray-100 text-gray-600" };
    }
  };

  const getTypeConfig = (type: Order["type"]) => {
    switch (type) {
      case "buy":
        return { label: "购买", color: "text-blue-600", icon: "🛒" };
      case "sell":
        return { label: "出售", color: "text-green-600", icon: "💰" };
      case "exchange":
        return { label: "交换", color: "text-purple-600", icon: "🔄" };
      default:
        return { label: "订单", color: "text-gray-600", icon: "📦" };
    }
  };

  const statusConfig = getStatusConfig(order.status);
  const typeConfig = getTypeConfig(order.type);

  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-md transition-all duration-200",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex gap-3 sm:gap-4">
          {/* 商品图片 */}
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src={order.itemImage}
              alt={order.itemTitle}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 订单信息 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2 gap-2">
              <h3 className="font-medium text-gray-900 line-clamp-1 text-sm sm:text-base">
                {order.itemTitle}
              </h3>
              <div
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0",
                  statusConfig.color
                )}
              >
                {statusConfig.label}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-1">
              <span className={cn("flex items-center gap-1", typeConfig.color)}>
                <span>{typeConfig.icon}</span>
                <span className="whitespace-nowrap">{typeConfig.label}</span>
              </span>
              {order.type !== "exchange" && (
                <span className="font-medium whitespace-nowrap">
                  ¥{order.price}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span className="truncate pr-2">{order.otherParty.name}</span>
              <span className="whitespace-nowrap flex-shrink-0">
                {order.createTime}
              </span>
            </div>

            <div className="text-xs text-gray-400 truncate">
              订单号: {order.orderNumber}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
