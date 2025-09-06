# ContentFilter 通用筛选组件

## 概述

ContentFilter 是一个通用的筛选和排序组件，专为 Profile 页面的各个子页面设计，支持多种筛选方式、排序选项和搜索功能。

## 特性

- **多种筛选 UI**: 支持 tabs、chips、dropdown 三种筛选界面
- **灵活排序**: 支持多字段排序，包括字符串、数字、日期等
- **搜索功能**: 支持多字段搜索
- **预设配置**: 为不同页面提供预设的筛选排序配置
- **类型安全**: 完整的 TypeScript 支持

## 使用方法

### 基本用法

```tsx
import { ContentFilter, useContentFilter } from "../components/ui";

const MyComponent = () => {
  const filter = useContentFilter({
    data: myData,
    page: "favorites", // 使用预设配置
  });

  return (
    <div>
      <ContentFilter
        filterConfigs={filter.config.filters}
        sortConfig={filter.config.sort}
        searchConfig={filter.config.search}
        activeFilters={filter.activeFilters}
        activeSort={filter.activeSort}
        searchQuery={filter.searchQuery}
        onFilterChange={filter.handleFilterChange}
        onSortChange={filter.handleSortChange}
        onSearchChange={filter.handleSearchChange}
        showFilterCount={true}
        showClearButton={true}
      />

      {/* 渲染筛选后的数据 */}
      {filter.filteredData.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};
```

### 自定义配置

```tsx
const customConfig = {
  filters: [
    {
      type: "tabs",
      key: "status",
      title: "状态",
      options: [
        { key: "all", label: "全部" },
        { key: "active", label: "活跃" },
        { key: "inactive", label: "不活跃" },
      ],
      showCount: true,
    },
  ],
  sort: {
    title: "排序",
    defaultSort: "createTime",
    options: [
      { key: "createTime", label: "创建时间", direction: "desc" },
      { key: "title", label: "标题", direction: "asc" },
    ],
  },
  search: {
    placeholder: "搜索内容...",
    searchFields: ["title", "content"],
  },
};
```

## 预设配置

组件为以下页面提供了预设配置：

### 1. favorites (收藏页面)

- **筛选**: 按类型（活动、帖子、商品）
- **排序**: 收藏时间、标题、价格
- **搜索**: 标题、作者名称

### 2. posts (帖子页面)

- **筛选**: 按分类（音乐、美食、学习、阅读）
- **排序**: 发布时间、点赞数、评论数、标题
- **搜索**: 内容、标签

### 3. trades (交易页面)

- **筛选**: 商品状态（在售、已售、热门）、分类
- **排序**: 发布时间、价格、浏览量、点赞数
- **搜索**: 标题、分类、成色

### 4. activities (活动页面)

- **筛选**: 状态（组织的、参加的、已结束）、分类
- **排序**: 活动时间、参与人数、标题
- **搜索**: 标题、描述、地点

### 5. drafts (草稿页面)

- **筛选**: 按类型（活动、帖子、商品草稿）
- **排序**: 最近修改、创建时间、标题
- **搜索**: 标题、内容

## API

### ContentFilter Props

| 属性            | 类型                               | 默认值       | 描述                   |
| --------------- | ---------------------------------- | ------------ | ---------------------- |
| data            | T[]                                | []           | 可选，要筛选的数据数组 |
| filterConfigs   | FilterConfig[]                     | []           | 筛选器配置             |
| sortConfig      | SortConfig                         | undefined    | 排序配置               |
| searchConfig    | SearchConfig                       | undefined    | 搜索配置               |
| activeFilters   | Record<string, string \| string[]> | {}           | 当前活跃的筛选条件     |
| activeSort      | string                             | undefined    | 当前排序字段           |
| searchQuery     | string                             | ''           | 搜索查询字符串         |
| onFilterChange  | Function                           | undefined    | 筛选变化回调           |
| onSortChange    | Function                           | undefined    | 排序变化回调           |
| onSearchChange  | Function                           | undefined    | 搜索变化回调           |
| layout          | 'horizontal' \| 'vertical'         | 'horizontal' | 布局方向               |
| showFilterCount | boolean                            | true         | 是否显示结果计数       |
| showClearButton | boolean                            | true         | 是否显示清除按钮       |

### useContentFilter Hook

```tsx
const filter = useContentFilter({
  data: T[],
  page: keyof ProfileFilterConfigs,
  initialSort?: string,
  initialFilters?: Record<string, string | string[]>,
  initialSearch?: string,
});
```

返回值：

- `config`: 当前页面的筛选配置
- `activeFilters`: 当前筛选条件
- `activeSort`: 当前排序
- `searchQuery`: 搜索查询
- `filteredData`: 筛选后的数据
- `hasActiveFilters`: 是否有活跃筛选条件
- `handleFilterChange`: 筛选变化处理函数
- `handleSortChange`: 排序变化处理函数
- `handleSearchChange`: 搜索变化处理函数
- `clearAllFilters`: 清除所有筛选
- `totalCount`: 总数据量
- `filteredCount`: 筛选后数据量

## 筛选器类型

### tabs 类型

显示为标签按钮，适用于少量互斥选项。

### chips 类型

显示为芯片标签，支持多选，适用于标签类筛选。

### dropdown 类型

显示为下拉选择框，适用于选项较多的场景。

## 自定义筛选逻辑

```tsx
const customFilterFn = (item, filters) => {
  // 自定义筛选逻辑
  return true; // 或 false
};

<ContentFilter
  customFilterFn={customFilterFn}
  // ... 其他props
/>;
```

## 样式定制

组件使用 Tailwind CSS 类，可以通过 CSS 变量或覆盖类来自定义样式。

```css
.content-filter {
  /* 自定义样式 */
}
```

## 最佳实践

1. **合理选择筛选器类型**: tabs 适合少量选项，dropdown 适合大量选项，chips 适合多选场景
2. **提供有意义的默认排序**: 设置符合用户期望的默认排序方式
3. **搜索字段选择**: 选择用户最可能搜索的字段作为搜索目标
4. **性能优化**: 对于大量数据，考虑使用虚拟滚动或分页
5. **用户体验**: 提供清晰的筛选状态反馈和快速清除功能

## 扩展指南

### 添加新的筛选器类型

1. 在 `types.ts` 中添加新类型
2. 在 `index.tsx` 的 `renderFilter` 方法中添加处理逻辑
3. 在 `configs.ts` 中为新类型添加配置示例

### 添加新的页面配置

1. 在 `configs.ts` 中添加新页面的配置
2. 在 `types.ts` 的 `ProfileFilterConfigs` 中添加类型定义
3. 在筛选逻辑中添加对应的处理函数
