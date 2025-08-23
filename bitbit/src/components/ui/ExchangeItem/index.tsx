import React from "react";
import Card, { CardContent } from "../Card";
import Button from "../Button";
import { cn } from "@/shared/utils/cn";

export interface ExchangeItemProps {
  id: string;
  title: string;
  condition: string;
  category: string;
  price: number;
  image?: string;
  icon?: string;
  onClick?: () => void;
  onExchange?: () => void;
  className?: string;
}

const ExchangeItem: React.FC<ExchangeItemProps> = ({
  title,
  condition,
  category,
  price,
  image,
  icon = "📦",
  onClick,
  onExchange,
  className,
}) => {
  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-md transition-all duration-300",
        className
      )}
      hover
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-4">
        {/* 顶部区域：图标和基本信息 */}
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              icon
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary line-clamp-1">
              {title}
            </h3>
            <p className="text-text-tertiary text-sm">
              {condition} | {category}
            </p>
            <p className="text-coral-500 font-semibold text-lg mt-1">
              ¥{price}
            </p>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onExchange?.();
            }}
          >
            交换
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-primary-300 text-primary-600 hover:bg-primary-50 hover:border-primary-400"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            详情
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExchangeItem;
