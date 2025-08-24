import React from "react";
import { Grid } from "@/components/ui";
import { ExchangeCard } from "./ExchangeCard";
import type { ExchangeItemData } from "../../../shared/data/exchangeItems";

export interface ExchangeListProps {
  items: ExchangeItemData[];
  viewMode: "grid" | "list";
  onItemClick?: (item: ExchangeItemData) => void;
  onExchange?: (item: ExchangeItemData) => void;
  onLike?: (item: ExchangeItemData) => void;
  isLoading?: boolean;
}

/**
 * Exchange商品列表组件
 * 使用专用的ExchangeCard组件显示商品
 */
const ExchangeList: React.FC<ExchangeListProps> = ({
  items,
  viewMode = "grid",
  onItemClick,
  onExchange,
  onLike,
  isLoading = false,
}) => {
  // 加载状态
  if (isLoading) {
    return (
      <div className="space-y-4">
        {viewMode === "grid" ? (
          <Grid cols={4} gap="lg">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-[420px] bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </Grid>
        ) : (
          <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-32 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // 空状态
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9l3-3 3 3"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">暂无商品</h3>
        <p className="text-gray-500 mb-6">
          还没有找到符合条件的商品，试试调整筛选条件
        </p>
      </div>
    );
  }

  // 渲染商品列表
  return (
    <div className="space-y-4">
      {viewMode === "grid" ? (
        <Grid cols={4} gap="lg">
          {items.map((item) => (
            <ExchangeCard
              key={item.id}
              {...item}
              layout="grid"
              onClick={() => onItemClick?.(item)}
              onExchange={() => onExchange?.(item)}
              onLike={() => onLike?.(item)}
            />
          ))}
        </Grid>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <ExchangeCard
              key={item.id}
              {...item}
              layout="list"
              onClick={() => onItemClick?.(item)}
              onExchange={() => onExchange?.(item)}
              onLike={() => onLike?.(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExchangeList;
