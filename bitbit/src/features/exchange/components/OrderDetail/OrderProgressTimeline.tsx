import React from "react";
import { Card, CardContent } from "@/components/ui";
import { cn } from "@/shared/utils/cn";
import type { OrderDetail, OrderProgress } from "../../types";

interface OrderProgressTimelineProps {
  order: OrderDetail;
  className?: string;
}

const OrderProgressTimeline: React.FC<OrderProgressTimelineProps> = ({
  order,
  className,
}) => {
  const getStatusConfig = (status: OrderProgress["status"]) => {
    switch (status) {
      case "completed":
        return {
          dotColor: "bg-green-500",
          lineColor: "bg-green-200",
          textColor: "text-gray-900",
          timestampColor: "text-gray-500",
        };
      case "current":
        return {
          dotColor: "bg-blue-500",
          lineColor: "bg-gray-200",
          textColor: "text-gray-900",
          timestampColor: "text-gray-500",
        };
      case "pending":
        return {
          dotColor: "bg-gray-300",
          lineColor: "bg-gray-200",
          textColor: "text-gray-500",
          timestampColor: "text-gray-400",
        };
      default:
        return {
          dotColor: "bg-gray-300",
          lineColor: "bg-gray-200",
          textColor: "text-gray-500",
          timestampColor: "text-gray-400",
        };
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">订单进度</h3>

        <div className="relative">
          {order.progress.map((step, index) => {
            const config = getStatusConfig(step.status);
            const isLast = index === order.progress.length - 1;

            return (
              <div key={step.id} className="relative flex items-start pb-6">
                {/* 时间轴线条 */}
                {!isLast && (
                  <div
                    className={cn(
                      "absolute left-3 top-6 w-0.5 h-full",
                      config.lineColor
                    )}
                  />
                )}

                {/* 时间轴点 */}
                <div
                  className={cn(
                    "relative z-10 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center",
                    config.dotColor
                  )}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>

                {/* 进度内容 */}
                <div className="ml-4 flex-1">
                  <h4 className={cn("font-medium", config.textColor)}>
                    {step.title}
                  </h4>
                  {step.description && (
                    <p className={cn("text-sm mt-1", config.timestampColor)}>
                      {step.description}
                    </p>
                  )}
                  <p className={cn("text-sm mt-1", config.timestampColor)}>
                    {step.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderProgressTimeline;
