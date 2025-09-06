import React from "react";
import { Card, CardContent, Button } from "@/components/ui";
import { cn } from "@/shared/utils/cn";
import type { OrderDetail } from "../../types";

interface OrderOtherPartyProps {
  order: OrderDetail;
  onContact?: () => void;
  className?: string;
}

const OrderOtherParty: React.FC<OrderOtherPartyProps> = ({
  order,
  onContact,
  className,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
      >
        ⭐
      </span>
    ));
  };

  const getInitials = (name: string) => {
    return name.slice(0, 2);
  };

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">交易对方</h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* 头像 */}
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {order.otherParty.avatar ? (
                <img
                  src={order.otherParty.avatar}
                  alt={order.otherParty.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-600 font-medium text-sm">
                  {getInitials(order.otherParty.name)}
                </span>
              )}
            </div>

            {/* 用户信息 */}
            <div>
              <h4 className="text-lg font-medium text-gray-900">
                {order.otherParty.name}
              </h4>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {renderStars(order.otherParty.rating)}
                </div>
                <span className="text-sm text-gray-500">
                  {order.otherParty.creditLevel}
                </span>
              </div>
              {order.otherParty.responseTime && (
                <p className="text-sm text-gray-500 mt-1">
                  响应时间: {order.otherParty.responseTime}
                </p>
              )}
            </div>
          </div>

          {/* 联系按钮 */}
          <Button
            variant="outline"
            size="sm"
            onClick={onContact}
            className="px-4 py-2"
          >
            联系对方
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderOtherParty;
