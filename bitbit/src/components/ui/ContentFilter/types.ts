export interface FilterOption {
  key: string;
  label: string;
  count?: number; // 可选的计数显示
}

export interface SortOption {
  key: string;
  label: string;
  direction?: "asc" | "desc";
}

export interface FilterConfig {
  type: "tabs" | "dropdown" | "chips"; // 不同的UI表现形式
  key?: string; // 筛选器的key，用于标识筛选条件
  title?: string;
  options: FilterOption[];
  allowMultiple?: boolean; // 是否允许多选
  showCount?: boolean; // 是否显示计数
}

export interface SortConfig {
  title?: string;
  options: SortOption[];
  defaultSort?: string;
}

export interface SearchConfig {
  placeholder?: string;
  searchFields?: string[]; // 指定搜索的字段
}

export interface ContentFilterProps<T = Record<string, unknown>> {
  // 数据 - 如果不提供，只显示筛选UI
  data?: T[];

  // 配置
  filterConfigs?: FilterConfig[];
  sortConfig?: SortConfig;
  searchConfig?: SearchConfig;

  // 当前状态
  activeFilters?: Record<string, string | string[]>;
  activeSort?: string;
  searchQuery?: string;

  // 事件回调
  onFilterChange?: (filterKey: string, value: string | string[]) => void;
  onSortChange?: (sortKey: string) => void;
  onSearchChange?: (query: string) => void;
  onDataChange?: (filteredData: T[]) => void;

  // UI配置
  layout?: "horizontal" | "vertical";
  showFilterCount?: boolean;
  showClearButton?: boolean;

  // 自定义渲染
  renderCustomFilter?: (
    config: FilterConfig,
    activeValue: string | string[]
  ) => React.ReactNode;

  // 自定义过滤和排序逻辑
  customFilterFn?: (
    item: unknown,
    filters: Record<string, string | string[]>
  ) => boolean;
  customSortFn?: (items: unknown[], sortKey: string) => unknown[];
}

// 预定义的配置类型，用于不同的页面场景
export interface ProfileFilterConfigs {
  favorites: {
    filters: FilterConfig[];
    sort: SortConfig;
    search: SearchConfig;
  };
  posts: {
    filters: FilterConfig[];
    sort: SortConfig;
    search: SearchConfig;
  };
  trades: {
    filters: FilterConfig[];
    sort: SortConfig;
    search: SearchConfig;
  };
  activities: {
    filters: FilterConfig[];
    sort: SortConfig;
    search: SearchConfig;
  };
  drafts: {
    filters: FilterConfig[];
    sort: SortConfig;
    search: SearchConfig;
  };
}
