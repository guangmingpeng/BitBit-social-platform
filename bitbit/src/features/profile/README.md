# Profile Feature

这个模块实现了 BitBit 社交平台的个人主页功能，基于 UI 设计稿进行开发。

## 功能特性

### 核心功能

- 🧑‍💼 **用户信息展示** - 头像、姓名、简介、等级、关注/粉丝数
- 📋 **多标签导航** - 我的活动、帖子、交易、收藏、草稿箱
- 🎯 **活动管理** - 支持筛选（全部、组织的、参加的、已结束）
- 🏆 **成就系统** - 徽章展示和等级进度条
- ⚡ **快速访问** - 订单、关注、消息、设置等快捷入口

### 技术特性

- 🎨 **响应式设计** - 适配不同屏幕尺寸
- ⚡ **性能优化** - 组件懒加载和状态管理
- 🔄 **状态管理** - 使用自定义 hooks 管理状态
- 💫 **交互反馈** - 加载状态和错误处理
- 🎭 **骨架屏** - 提升用户体验

## 目录结构

```
src/features/profile/
├── components/           # 组件目录
│   ├── UserProfile/     # 用户资料组件
│   ├── ProfileTabs/     # 标签导航组件
│   ├── ActivityCard/    # 活动卡片组件
│   ├── ActivityFilter/  # 活动筛选组件
│   ├── AchievementBadges/ # 成就徽章组件
│   ├── QuickAccess/     # 快速访问组件
│   ├── LoadingState/    # 加载状态组件
│   └── index.ts         # 组件导出
├── hooks/               # 自定义hooks
│   └── index.ts         # hook导出
├── services/            # 服务层
│   └── index.ts         # API服务
├── types/               # 类型定义
│   └── index.ts         # 类型导出
├── utils/               # 工具函数
│   └── index.ts         # 工具函数导出
├── store/               # 状态管理（预留）
└── index.ts             # 功能模块导出
```

## 组件说明

### UserProfile

用户基本信息展示组件，包含：

- 头像和用户名
- 等级显示
- 个人简介
- 关注/粉丝数统计
- 编辑资料按钮

### ProfileTabs

标签导航组件，支持：

- 5 个主要标签页切换
- 活跃状态指示
- 平滑过渡动画

### ActivityCard

活动卡片组件，展示：

- 活动封面图
- 基本信息（标题、分类、时间、地点）
- 状态标识（已报名/已组织/已结束）
- 操作按钮（查看详情/编辑）

### ActivityFilter

活动筛选组件，支持：

- 4 种筛选类型
- 响应式布局
- 状态切换

### AchievementBadges

成就系统组件，包含：

- 徽章网格展示
- 解锁/未解锁状态
- 等级进度条
- 经验值显示

### QuickAccess

快速访问功能，提供：

- 4 个主要功能入口
- 图标和描述
- 帮助支持入口

## 数据类型

### User

```typescript
interface User {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  level: number;
  following: number;
  followers: number;
  joinedDate: string;
}
```

### Activity

```typescript
interface Activity {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: "registered" | "organized" | "ended";
  daysLeft?: number;
  image?: string;
}
```

## 自定义 Hooks

### useProfile

```typescript
const { profileData, loading, error } = useProfile();
```

- 获取用户资料数据
- 处理加载状态
- 错误处理

### useProfileTabs

```typescript
const { activeTab, handleTabChange } = useProfileTabs();
```

- 管理标签页状态
- 提供切换方法

### useActivityFilter

```typescript
const { activeFilter, setActiveFilter, filteredActivities } =
  useActivityFilter(activities);
```

- 管理活动筛选状态
- 自动过滤活动列表

## 使用示例

```tsx
import { Profile } from "../features/profile";

function App() {
  return <Profile />;
}
```

## 样式规范

### 设计系统

- **主色调**: `#4E6FFF` (蓝色)
- **圆角**: `rounded-2xl` (16px)
- **阴影**: `shadow-sm` 轻微阴影
- **间距**: 使用 Tailwind 标准间距系统
- **字体**: Inter 字体系列

### 响应式断点

- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+

## 性能优化

1. **组件拆分** - 按功能模块拆分组件
2. **状态管理** - 使用 hooks 减少不必要的渲染
3. **懒加载** - 图片和重型组件懒加载
4. **缓存** - API 数据缓存
5. **骨架屏** - 提升感知性能

## 扩展性

该模块设计时考虑了扩展性：

- 新增标签页只需在`ProfileTab`类型中添加
- 新增徽章类型在数据中配置即可
- 快速访问功能支持动态配置
- 组件支持自定义样式和行为

## 测试建议

1. **组件测试** - 每个组件的渲染和交互
2. **Hook 测试** - 状态管理逻辑
3. **集成测试** - 完整的用户流程
4. **响应式测试** - 不同屏幕尺寸
5. **性能测试** - 加载时间和内存使用
