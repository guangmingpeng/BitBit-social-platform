import React from "react";
import { cn } from "@/shared/utils/cn";
import type { OrderDetail } from "../../types";

interface OrderStatusBannerProps {
  order: OrderDetail;
  className?: string;
}

const OrderStatusBanner: React.FC<OrderStatusBannerProps> = ({
  order,
  className,
}) => {
  const getStatusConfig = (status: OrderDetail["status"]) => {
    switch (status) {
      case "pending":
        return {
          label: "订单待处理",
          bgColor: "bg-yellow-50",
          borderColor: "border-l-yellow-400",
          textColor: "text-yellow-600",
          icon: "⏳",
        };
      case "shipped":
        return {
          label: "订单已发货",
          bgColor: "bg-blue-50",
          borderColor: "border-l-blue-400",
          textColor: "text-blue-600",
          icon: "🚚",
        };
      case "delivered":
        return {
          label: "订单已送达",
          bgColor: "bg-green-50",
          borderColor: "border-l-green-400",
          textColor: "text-green-600",
          icon: "📦",
        };
      case "completed":
        return {
          label: "订单已完成",
          bgColor: "bg-green-50",
          borderColor: "border-l-green-400",
          textColor: "text-green-600",
          icon: "✅",
        };
      case "cancelled":
        return {
          label: "订单已取消",
          bgColor: "bg-red-50",
          borderColor: "border-l-red-400",
          textColor: "text-red-600",
          icon: "❌",
        };
      default:
        return {
          label: "未知状态",
          bgColor: "bg-gray-50",
          borderColor: "border-l-gray-400",
          textColor: "text-gray-600",
          icon: "❓",
        };
    }
  };

  const statusConfig = getStatusConfig(order.status);

  return (
    <div
      className={cn(
        "rounded-lg p-4 border-l-4",
        statusConfig.bgColor,
        statusConfig.borderColor,
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 text-xl">{statusConfig.icon}</div>
          <div>
            <h3 className={cn("text-lg font-medium", statusConfig.textColor)}>
              {statusConfig.label}
            </h3>
            <p className="text-sm text-gray-600">订单号: {order.orderNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{order.createTime}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusBanner;
