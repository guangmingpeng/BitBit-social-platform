import React from "react";
import { Button } from "@/components/ui";
import { cn } from "@/shared/utils/cn";
import type { OrderDetail, OrderAction } from "../../types";

interface OrderActionsProps {
  order: OrderDetail;
  onAction?: (action: string) => void;
  className?: string;
}

const OrderActions: React.FC<OrderActionsProps> = ({
  order,
  onAction,
  className,
}) => {
  const handleAction = (action: string) => {
    onAction?.(action);
  };

  const getButtonVariant = (type: OrderAction["type"]) => {
    switch (type) {
      case "primary":
        return "primary" as const;
      case "secondary":
        return "secondary" as const;
      case "danger":
        return "danger" as const;
      default:
        return "outline" as const;
    }
  };

  if (!order.availableActions || order.availableActions.length === 0) {
    return null;
  }

  // 将主要操作和次要操作分开
  const primaryActions = order.availableActions.filter(
    (action) => action.type === "primary"
  );
  const secondaryActions = order.availableActions.filter(
    (action) => action.type !== "primary"
  );

  return (
    <div className={cn("bg-white border-t border-gray-100 p-6", className)}>
      <div className="space-y-4">
        {/* 主要操作按钮 */}
        {primaryActions.map((action) => (
          <Button
            key={action.id}
            variant={getButtonVariant(action.type)}
            size="lg"
            className="w-full"
            disabled={action.disabled}
            onClick={() => handleAction(action.action)}
          >
            {action.label}
          </Button>
        ))}

        {/* 次要操作按钮 */}
        {secondaryActions.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {secondaryActions.map((action) => (
              <Button
                key={action.id}
                variant={getButtonVariant(action.type)}
                size="md"
                disabled={action.disabled}
                onClick={() => handleAction(action.action)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderActions;
