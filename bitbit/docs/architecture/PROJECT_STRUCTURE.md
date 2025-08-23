# BitBit 项目目录结构

## 目录组织原则

项目采用功能模块化和组件分层的架构设计，确保代码的可维护性和可扩展性。

## 目录结构

```
src/
├── components/                 # 通用组件库
│   ├── ui/                    # 基础 UI 组件 (设计系统)
│   │   ├── Button/            # 按钮组件
│   │   ├── Card/              # 卡片组件
│   │   ├── Input/             # 输入框组件
│   │   ├── Modal/             # 模态框组件
│   │   ├── Tag/               # 标签组件
│   │   ├── Avatar/            # 头像组件
│   │   ├── Badge/             # 徽章组件
│   │   ├── Spinner/           # 加载器组件
│   │   ├── SearchBar/         # 搜索栏组件
│   │   ├── Container/         # 容器组件
│   │   ├── Grid/              # 网格布局组件
│   │   ├── Stack/             # 堆叠布局组件
│   │   ├── Tabs/              # 标签页组件
│   │   └── index.ts           # 统一导出
│   ├── layout/                # 布局组件
│   │   └── Header.tsx         # 页面头部
│   └── common/                # 通用功能组件
│
├── features/                  # 功能模块
│   ├── activities/            # 活动模块
│   │   ├── components/        # 活动相关业务组件
│   │   │   └── ActivityCard/  # 活动卡片组件
│   │   ├── hooks/             # 活动相关 hooks
│   │   ├── services/          # 活动 API 服务
│   │   ├── store/             # 活动状态管理
│   │   ├── types/             # 活动类型定义
│   │   └── utils/             # 活动工具函数
│   │
│   ├── auth/                  # 认证模块
│   │   ├── components/        # 认证相关组件
│   │   │   └── UserCard/      # 用户卡片组件
│   │   └── ...                # 其他认证相关文件
│   │
│   ├── community/             # 社区模块
│   │   ├── components/        # 社区相关组件
│   │   │   └── PostCard/      # 帖子卡片组件
│   │   └── ...                # 其他社区相关文件
│   │
│   └── exchange/              # 交换模块
│       └── ...                # 交换相关文件
│
├── pages/                     # 页面组件
│   ├── Home.tsx               # 首页
│   ├── ActivityList.tsx       # 活动列表页
│   ├── ActivityDetail.tsx     # 活动详情页
│   ├── Community.tsx          # 社区页面
│   ├── Exchange.tsx           # 交换页面
│   ├── Login.tsx              # 登录页
│   ├── Register.tsx           # 注册页
│   └── Profile.tsx            # 个人资料页
│
├── shared/                    # 共享资源
│   ├── config/                # 配置文件
│   │   ├── routes.ts          # 路由配置
│   │   ├── theme.ts           # 主题配置
│   │   ├── themeUtils.ts      # 主题工具
│   │   └── constants.ts       # 全局常量
│   ├── hooks/                 # 通用 hooks
│   ├── utils/                 # 通用工具函数
│   │   ├── cn.ts              # 类名合并工具
│   │   ├── date.ts            # 日期工具
│   │   └── validation.ts      # 验证工具
│   ├── types/                 # 全局类型定义
│   └── services/              # 通用 API 服务
│
├── store/                     # 全局状态管理
│   ├── slices/                # Redux slices
│   │   ├── authSlice.ts       # 认证状态
│   │   ├── userSlice.ts       # 用户状态
│   │   ├── uiSlice.ts         # UI 状态
│   │   └── settingsSlice.ts   # 设置状态
│   └── index.ts               # Store 配置
│
├── assets/                    # 静态资源
│   ├── fonts/                 # 字体文件
│   ├── icons/                 # 图标文件
│   └── images/                # 图片文件
│
├── styles/                    # 样式文件
│   ├── components.css         # 组件样式
│   ├── design-system.md       # 设计系统文档
│   └── quick-guide.md         # 快速指南
│
└── examples/                  # 示例代码
    └── ThemeUsageExamples.tsx # 主题使用示例
```

## 组件分类说明

### 1. 基础 UI 组件 (`components/ui/`)

- **用途**: 最基础的 UI 原子组件，构成设计系统的基础
- **特点**: 高度通用、无业务逻辑、完全可复用
- **示例**: Button, Input, Card, Modal 等

### 2. 布局组件 (`components/layout/`)

- **用途**: 应用级别的布局和导航组件
- **特点**: 结构性组件，定义页面整体布局
- **示例**: Header, Footer, Sidebar 等

### 3. 业务组件 (`features/*/components/`)

- **用途**: 特定功能模块的业务组件
- **特点**: 包含业务逻辑，与特定功能领域相关
- **示例**: ActivityCard, UserCard, PostCard 等

### 4. 页面组件 (`pages/`)

- **用途**: 路由对应的页面级组件
- **特点**: 组合其他组件，处理页面级别的数据和状态
- **示例**: HomePage, ActivityListPage 等

## 导入规范

### 路径别名配置

```typescript
// tsconfig.json 和 vite.config.ts 已配置以下别名
"@/*": ["./src/*"]
"@/components/*": ["./src/components/*"]
"@/features/*": ["./src/features/*"]
"@/shared/*": ["./src/shared/*"]
"@/pages/*": ["./src/pages/*"]
"@/assets/*": ["./src/assets/*"]
"@/store/*": ["./src/store/*"]
```

### 导入示例

```typescript
// 基础组件
import { Button, Card, Input } from "@/components/ui";

// 布局组件
import Header from "@/components/layout/Header";

// 业务组件
import ActivityCard from "@/features/activities/components/ActivityCard";

// 共享工具
import { cn } from "@/shared/utils/cn";
import { routes } from "@/shared/config/routes";

// 页面组件
import Home from "@/pages/Home";
```

## 开发规范

### 1. 组件依赖原则

- 基础组件不应依赖业务组件
- 业务组件可以使用基础组件
- 避免功能模块之间的循环依赖

### 2. 文件命名规范

- 组件文件使用 PascalCase: `Button.tsx`
- 工具文件使用 camelCase: `dateUtils.ts`
- 常量文件使用 camelCase: `apiConstants.ts`

### 3. 导出规范

- 每个组件目录包含 `index.tsx` 作为主要导出
- 使用 `index.ts` 文件统一导出模块内容
- 优先使用命名导出，默认导出用于主要组件

## 扩展指南

### 添加新功能模块

1. 在 `features/` 下创建新的功能目录
2. 按照现有模块结构创建子目录
3. 在模块的 `index.ts` 中导出主要内容

### 添加新页面

1. 在 `pages/` 目录下创建页面组件
2. 在 `shared/config/routes.ts` 中添加路由配置
3. 更新导航组件（如需要）

### 添加新的基础组件

1. 在 `components/ui/` 下创建组件目录
2. 实现组件逻辑和样式
3. 在 `components/ui/index.ts` 中添加导出
4. 更新组件文档
