import { useState, useEffect, useMemo } from "react";
import type { ExchangeFilters } from "../types/types";
import {
  getAllExchangeItems,
  getItemsByCategory,
  searchItems,
  getExchangeItemById,
  type ExchangeItemData,
} from "@/shared/data/exchangeItems";

/**
 * 用于管理交换物品列表的Hook
 */
export const useExchangeItems = (filters?: ExchangeFilters) => {
  const [items, setItems] = useState<ExchangeItemData[]>([]);
  const [loading, setLoading] = useState(false);

  const filteredItems = useMemo(() => {
    let result = getAllExchangeItems();

    if (!filters) return result;

    // 按分类筛选
    if (filters.category) {
      result = getItemsByCategory(filters.category);
    }

    // 按搜索词筛选
    if (filters.searchTerm) {
      const searchResults = searchItems(filters.searchTerm);
      if (filters.category) {
        result = searchResults.filter(
          (item) => item.category === filters.category
        );
      } else {
        result = searchResults;
      }
    }

    // 价格范围筛选
    if (filters.priceRange) {
      result = result.filter(
        (item) =>
          item.price >= filters.priceRange!.min &&
          item.price <= filters.priceRange!.max
      );
    }

    // 成色筛选
    if (filters.condition) {
      result = result.filter((item) => item.condition === filters.condition);
    }

    // 地区筛选
    if (filters.location && filters.location.trim()) {
      result = result.filter(
        (item) => item.location && item.location.includes(filters.location!)
      );
    }

    // 排序
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price_asc":
          result = result.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          result = result.sort((a, b) => b.price - a.price);
          break;
        case "popularity":
          result = result.sort((a, b) => b.stats.views - a.stats.views);
          break;
        case "newest":
        default:
          // 使用timeAgo字段进行排序，或者使用ID作为替代
          result = result.sort((a, b) => b.id.localeCompare(a.id));
          break;
      }
    }

    return result;
  }, [filters]);

  useEffect(() => {
    setItems(filteredItems);
  }, [filteredItems]);

  const refetch = () => {
    setLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setItems(filteredItems);
      setLoading(false);
    }, 500);
  };

  return {
    items,
    loading,
    error: null,
    refetch,
    total: items.length,
  };
};

/**
 * 用于管理单个交换物品详情的Hook
 */
export const useExchangeItem = (id: string) => {
  const [item, setItem] = useState<ExchangeItemData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError(null);

      try {
        // 模拟API调用延迟
        await new Promise((resolve) => setTimeout(resolve, 300));
        const fetchedItem = getExchangeItemById(id);

        if (!fetchedItem) {
          throw new Error("商品不存在");
        }

        setItem(fetchedItem);
      } catch (err) {
        setError(err instanceof Error ? err.message : "加载失败");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  return {
    item,
    loading,
    error,
    refetch: () => {
      if (id) {
        const fetchedItem = getExchangeItemById(id);
        setItem(fetchedItem);
      }
    },
  };
};

/**
 * 用于管理交换请求的Hook
 */
export const useExchangeRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitExchangeRequest = async (data: Record<string, unknown>) => {
    setLoading(true);
    setError(null);

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟随机成功/失败
      if (Math.random() > 0.1) {
        console.log("交换请求已发送:", data);
        return { success: true, message: "交换请求已发送" };
      } else {
        throw new Error("网络错误，请稍后重试");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "提交失败";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    submitExchangeRequest,
    loading,
    error,
  };
};

/**
 * 用于管理收藏状态的Hook
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  const isFavorite = (itemId: string) => favorites.has(itemId);

  return {
    favorites: Array.from(favorites),
    toggleFavorite,
    isFavorite,
  };
};

/**
 * 用于管理浏览历史的Hook
 */
export const useViewHistory = () => {
  const [viewHistory, setViewHistory] = useState<string[]>([]);

  const addToHistory = (itemId: string) => {
    setViewHistory((prev) => {
      const newHistory = prev.filter((id) => id !== itemId);
      return [itemId, ...newHistory].slice(0, 10); // 最多保存10个历史记录
    });
  };

  const clearHistory = () => {
    setViewHistory([]);
  };

  return {
    viewHistory,
    addToHistory,
    clearHistory,
  };
};
