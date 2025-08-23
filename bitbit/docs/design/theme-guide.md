# BitBit 主题系统使用指南

## 概述

BitBit 项目已经配置了完整的主题系统，支持亮色/暗色模式切换，并提供了丰富的设计 token 和工具函数。

## 文件结构

```
src/
├── config/
│   ├── theme.ts           # 主题配置和工具函数
│   └── themeUtils.ts      # 主题相关 Hook 和工具
├── examples/
│   └── ThemeUsageExamples.tsx  # 使用示例组件
└── styles/
    ├── index.css          # 全局样式
    ├── components.css     # 组件样式
    └── design-system.md   # 设计系统文档
```

## 快速开始

### 1. 基本用法

```tsx
import { getPrimaryColor, getActivityTagStyle } from "../config/theme";

// 获取主品牌色
const primaryColor = getPrimaryColor(500); // #4E6FFF

// 获取活动标签样式
const musicTagStyle = getActivityTagStyle("music");
// 返回: { backgroundColor: '#FFCCD6', color: '#FF6B8B' }
```

### 2. 主题切换

```tsx
import { useThemeToggle } from "../config/themeUtils";

function App() {
  const { theme, toggleTheme, isDark } = useThemeToggle();

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <button onClick={toggleTheme}>
        切换到{isDark ? "亮色" : "暗色"}模式
      </button>
    </div>
  );
}
```

### 3. 主题感知组件

```tsx
import { useThemeColors } from "../config/themeUtils";

function ThemedCard({ theme }) {
  const colors = useThemeColors(theme);

  return (
    <div
      style={{
        backgroundColor: colors.bg.primary,
        color: colors.text.primary,
        border: `1px solid ${colors.border}`,
      }}
    >
      内容会根据主题自动调整颜色
    </div>
  );
}
```

## 核心功能

### 🎨 颜色系统

- **主品牌色**: `getPrimaryColor(shade)`
- **活动类型色**: `getActivityColor(type, variant)`
- **主题感知色**: `getTextColor()`, `getBgColor()`, `getBorderColor()`
- **状态色**: `getStatusColor(status)`

### 📝 字体系统

- 支持 8 种字体大小规范
- 从 `TYPOGRAPHY` 对象获取完整样式
- 已配置在 Tailwind 中，可直接使用类名

### 🌓 主题切换

- **useThemeToggle**: 完整的主题切换 Hook
- **useSystemTheme**: 监听系统主题偏好
- **useThemeColors**: 获取当前主题颜色配置

### 📱 响应式支持

- `createResponsiveStyle()`: 创建响应式样式对象
- `BREAKPOINTS`: 标准断点配置
- 与 Tailwind 响应式类完全兼容

## 使用场景

### 场景 1: Tailwind 类名 (推荐)

```tsx
// 基本使用
<div className="bg-primary-500 text-white p-4 rounded-lg">
  使用 Tailwind 类名
</div>

// 响应式
<div className="text-body md:text-body-lg lg:text-title-4">
  响应式文本
</div>

// 主题感知 (需要配置暗色模式类)
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  主题感知背景
</div>
```

### 场景 2: 内联样式

```tsx
import { getBgColor, getTextColor, SPACING } from "../config/theme";

<div
  style={{
    backgroundColor: getBgColor("primary", theme),
    color: getTextColor("primary", theme),
    padding: SPACING[4],
  }}
>
  程序化样式
</div>;
```

### 场景 3: 活动标签

```tsx
import { ActivityTag } from '../examples/ThemeUsageExamples';

<ActivityTag type="music">音乐活动</ActivityTag>
<ActivityTag type="food">美食分享</ActivityTag>
<ActivityTag type="learning">学习交流</ActivityTag>
<ActivityTag type="reading">读书心得</ActivityTag>
```

### 场景 4: CSS-in-JS

```tsx
import { generateGlobalStyles } from "../config/themeUtils";

const globalStyles = generateGlobalStyles(theme);
// 可以注入到 styled-components 或其他 CSS-in-JS 库
```

## 最佳实践

### ✅ 推荐做法

1. **优先使用 Tailwind 类名**，它们已经包含了完整的设计系统
2. **复杂动态样式使用工具函数**，如主题切换、活动类型标签
3. **使用 TypeScript 类型**确保类型安全
4. **利用 Hook 缓存计算结果**避免重复计算

### ❌ 避免做法

1. **不要硬编码颜色值**，始终从主题配置获取
2. **不要混用多种样式方案**，在同一组件内保持一致
3. **不要在渲染时进行重量级计算**，使用 useMemo 缓存

## 扩展主题

### 添加新颜色

```typescript
// 在 theme.ts 中扩展 COLORS 对象
export const COLORS = {
  // 现有配置...

  // 新增颜色
  brand: {
    secondary: "#FF6B8B",
    accent: "#65D1AA",
  },
} as const;
```

### 添加新的活动类型

```typescript
// 扩展活动类型
activity: {
  // 现有类型...

  sports: {
    bg: "#E8F4FD",
    text: "#0096FF",
  },
}
```

## 与 Redux 集成

```tsx
// 在 uiSlice.ts 中已经定义了主题状态
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/slices/uiSlice";

function ThemeToggleButton() {
  const theme = useSelector((state) => state.ui.theme);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(toggleTheme())}>当前主题: {theme}</button>
  );
}
```

## 总结

配置 `theme.ts` 是**非常必要的**，因为：

1. **项目已有主题切换功能**但缺少实现
2. **支持程序化访问设计 token**
3. **提供暗色模式支持**
4. **增强开发体验**和代码复用性
5. **保持设计系统的一致性**

现在的配置提供了完整的主题解决方案，既可以使用 Tailwind 类名的便利性，也可以在需要时进行精确的程序化控制。
