import { useState, useEffect } from "react";

interface ActivityFilters {
  category?: string;
  searchTerm?: string;
  sortBy?: string;
}

interface CommunityFilters {
  category?: string;
  searchTerm?: string;
  sortBy?: string;
}

interface ExchangeFilters {
  category?: string;
  searchTerm?: string;
  priceRange?: [number, number];
}

const STORAGE_KEY = "bitbit-navigation-filters";

interface StoredFilters {
  activity: ActivityFilters;
  community: CommunityFilters;
  exchange: ExchangeFilters;
}

const getStoredFilters = (): StoredFilters => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : {
          activity: {},
          community: {},
          exchange: {},
        };
  } catch {
    return {
      activity: {},
      community: {},
      exchange: {},
    };
  }
};

const setStoredFilters = (filters: StoredFilters) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  } catch {
    // 忽略存储错误
  }
};

export const useNavigationFilters = () => {
  const [filters, setFilters] = useState<StoredFilters>(getStoredFilters);

  useEffect(() => {
    setStoredFilters(filters);
  }, [filters]);

  const setActivityFilters = (newFilters: Partial<ActivityFilters>) => {
    setFilters((prev) => ({
      ...prev,
      activity: { ...prev.activity, ...newFilters },
    }));
  };

  const setCommunityFilters = (newFilters: Partial<CommunityFilters>) => {
    setFilters((prev) => ({
      ...prev,
      community: { ...prev.community, ...newFilters },
    }));
  };

  const setExchangeFilters = (newFilters: Partial<ExchangeFilters>) => {
    setFilters((prev) => ({
      ...prev,
      exchange: { ...prev.exchange, ...newFilters },
    }));
  };

  const clearActivityFilters = () => {
    setFilters((prev) => ({ ...prev, activity: {} }));
  };

  const clearCommunityFilters = () => {
    setFilters((prev) => ({ ...prev, community: {} }));
  };

  const clearExchangeFilters = () => {
    setFilters((prev) => ({ ...prev, exchange: {} }));
  };

  return {
    activityFilters: filters.activity,
    communityFilters: filters.community,
    exchangeFilters: filters.exchange,
    setActivityFilters,
    setCommunityFilters,
    setExchangeFilters,
    clearActivityFilters,
    clearCommunityFilters,
    clearExchangeFilters,
  };
};
