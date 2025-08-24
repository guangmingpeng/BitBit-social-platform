# BitBit 设计系统快速使用指南

## 🚀 快速开始

BitBit 设计系统已经完全配置在 Tailwind CSS 中，你可以直接在组件中使用所有的设计 token。

## 📋 常用类名速查

### 🎨 颜色类名

```css
/* 主品牌色 */
bg-primary-500     /* 主色背景 */
text-primary-500   /* 主色文本 */
border-primary-500 /* 主色边框 */

/* 辅助色 */
bg-coral-500       /* 珊瑚色 - 音乐艺术 */
bg-mint-500        /* 薄荷绿 - 美食健康 */
bg-sunflower-500   /* 向日葵 - 学习技能 */
bg-lavender-500    /* 淡紫色 - 读书心理 */

/* 中性色 */
text-text-primary    /* #222222 主要文本 */
text-text-secondary  /* #666666 次要文本 */
text-text-tertiary   /* #999999 辅助文本 */
bg-gray-50          /* #F9F9FB 背景白 */
bg-gray-100         /* #F3F3F7 背景淡 */
border-gray-200     /* #E0E0E6 边框色 */

/* 状态色 */
text-error    /* #FF5252 错误红 */
text-success  /* #12B76A 成功绿 */
text-warning  /* #FFC107 警告黄 */
text-info     /* #0096FF 信息蓝 */
```

### 📝 字体类名

```css
text-title-1   /* 32px/42px Bold - 页面主标题 */
text-title-2   /* 28px/36px Bold - 主要内容标题 */
text-title-3   /* 24px/31px SemiBold - 卡片标题 */
text-title-4   /* 20px/26px SemiBold - 内容分区标题 */
text-subtitle  /* 18px/24px Medium - 副标题 */
text-body-lg   /* 16px/24px Regular - 主要内容文本 */
text-body      /* 14px/21px Regular - 次要文本 */
text-caption   /* 12px/18px Regular - 辅助文本 */
```

### 🔲 圆角类名

```css
rounded-xs   /* 4px - 表单元素 */
rounded-sm   /* 8px - 卡片面板 */
rounded-lg   /* 16px - 主要卡片 */
rounded-full /* 50% - 按钮标签 */
```

### 🌟 阴影类名

```css
shadow-light  /* 浅阴影 - 导航栏 */
shadow-card   /* 卡片阴影 - 卡片面板 */
shadow-modal  /* 模态框阴影 - 弹窗 */
shadow-focus  /* 强调阴影 - 重点元素 */
```

## 🧩 预设组件类

### 按钮

```html
<button class="btn-primary">主要按钮</button>
<button class="btn-secondary">次要按钮</button>
<button class="btn-outline">边框按钮</button>
<button class="btn-ghost">幽灵按钮</button>
```

### 表单输入

```html
<input class="input-field" placeholder="普通输入框" />
<input class="input-field input-error" placeholder="错误状态" />
```

### 卡片

```html
<div class="card">普通卡片</div>
<div class="card-hover">悬停卡片</div>
```

### 活动标签

```html
<span class="tag-music">音乐活动</span>
<span class="tag-food">美食活动</span>
<span class="tag-learning">学习活动</span>
<span class="tag-reading">读书活动</span>
```

### 状态提示

```html
<div class="status-success">成功提示</div>
<div class="status-error">错误提示</div>
<div class="status-warning">警告提示</div>
<div class="status-info">信息提示</div>
```

### 导航

```html
<a class="nav-item">普通导航项</a> <a class="nav-item-active">激活导航项</a>
```

## 📱 常用布局

### 容器

```html
<div class="container-main">主要容器</div>
<div class="container-narrow">窄容器</div>
```

### 网格布局

```html
<div class="grid-cards">卡片网格</div>
<div class="grid-activities">活动网格</div>
```

## 💡 实际使用示例

### 活动卡片

```jsx
const ActivityCard = ({ activity }) => (
  <div className="card-hover">
    <h3 className="text-title-3 text-text-primary mb-3">{activity.title}</h3>
    <p className="text-body text-text-secondary mb-4 text-clamp-2">
      {activity.description}
    </p>
    <div className="flex justify-between items-center">
      <span className={`tag-${activity.type}`}>{activity.category}</span>
      <span className="text-caption text-text-tertiary">{activity.time}</span>
    </div>
  </div>
);
```

### 表单组件

```jsx
const FormField = ({ label, error, ...props }) => (
  <div className="space-y-2">
    <label className="block text-body font-medium text-text-primary">
      {label}
    </label>
    <input className={`input-field ${error ? "input-error" : ""}`} {...props} />
    {error && <p className="text-caption text-error">{error}</p>}
  </div>
);
```

### 按钮组件

```jsx
const Button = ({ variant = "primary", children, ...props }) => (
  <button className={`btn-${variant} focus-visible`} {...props}>
    {children}
  </button>
);
```

### 页面布局

```jsx
const PageLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <nav className="bg-gray-50 shadow-light">
      <div className="container-main py-4">{/* 导航内容 */}</div>
    </nav>
    <main className="container-main py-8">{children}</main>
  </div>
);
```

## 🎯 在 JavaScript 中使用

如果需要在 JS/TS 代码中使用设计 token：

```javascript
import {
  getPrimaryColor,
  getActivityColor,
  getActivityTagStyle,
  SPACING,
  SHADOWS,
} from "../config/theme";

// 获取颜色
const primaryColor = getPrimaryColor(500); // #4E6FFF
const musicColor = getActivityColor("music"); // #FF6B8B

// 获取样式对象
const tagStyle = getActivityTagStyle("music");
// { backgroundColor: '#FFCCD6', color: '#FF6B8B' }

// 内联样式
<div
  style={{
    padding: SPACING[4], // 16px
    boxShadow: SHADOWS.card,
    backgroundColor: primaryColor,
  }}
>
  动态样式内容
</div>;
```

## 📐 响应式使用

```html
<!-- 响应式字体大小 -->
<h1 class="text-title-3 md:text-title-2 lg:text-title-1">响应式标题</h1>

<!-- 响应式间距 -->
<div class="p-4 md:p-6 lg:p-8">响应式内边距</div>

<!-- 响应式网格 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  响应式网格布局
</div>
```

## ✅ 最佳实践

1. **保持一致性** - 始终使用设计系统中定义的 token
2. **语义化命名** - 使用有意义的类名组合
3. **响应式优先** - 考虑移动端体验
4. **可访问性** - 确保足够的对比度和交互反馈
5. **性能优化** - 合理使用动画和过渡效果

## 🔧 自定义扩展

如需添加新的设计 token，请修改 `tailwind.config.js` 和 `src/config/theme.ts` 文件。

遵循现有的命名规范和色彩体系，确保设计系统的一致性。
