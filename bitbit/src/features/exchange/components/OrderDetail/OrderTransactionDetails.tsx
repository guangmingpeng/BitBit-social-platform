import React from "react";
import { Card, CardContent } from "@/components/ui";
import { cn } from "@/shared/utils/cn";
import type { OrderDetail } from "../../types";

interface OrderTransactionDetailsProps {
  order: OrderDetail;
  className?: string;
}

const OrderTransactionDetails: React.FC<OrderTransactionDetailsProps> = ({
  order,
  className,
}) => {
  const getTypeLabel = (type: OrderDetail["type"]) => {
    switch (type) {
      case "buy":
        return "购买";
      case "sell":
        return "出售";
      case "exchange":
        return "交换";
      default:
        return "未知";
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">交易详情</h3>

        <div className="space-y-3">
          {/* 交易类型 */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">交易类型</span>
            <span className="font-medium text-gray-900">
              {getTypeLabel(order.type)}
            </span>
          </div>

          {/* 商品价格 */}
          {order.type !== "exchange" && (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">商品价格</span>
              <span className="font-medium text-gray-900">
                ¥{order.price.toLocaleString()}
              </span>
            </div>
          )}

          {/* 支付方式 */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">支付方式</span>
            <span className="font-medium text-gray-900">
              {order.transactionDetails.paymentMethod}
            </span>
          </div>

          {/* 配送方式 */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">配送方式</span>
            <span className="font-medium text-gray-900">
              {order.transactionDetails.deliveryMethod}
            </span>
          </div>

          {/* 总金额 */}
          {order.type !== "exchange" && (
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">总金额</span>
              <span className="font-semibold text-lg text-gray-900">
                ¥{order.transactionDetails.totalAmount.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTransactionDetails;
