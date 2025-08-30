# FloatingBackButton 组件文档

## 概述

`FloatingBackButton` 是一个优雅的浮动返回按钮组件，具有多种样式变体和丰富的动画效果。

## 特性

- 🎨 三种预设样式变体（elegant、minimal、vibrant）
- 📱 响应式设计，支持多种尺寸
- ✨ 丰富的动画效果（悬停、点击、脉冲等）
- 🔧 高度可自定义
- ♿ 良好的无障碍支持

## 使用方法

```tsx
import { FloatingBackButton } from "@/components/common";

// 基础使用
<FloatingBackButton />

// 自定义文本和样式
<FloatingBackButton
  text="返回详情"
  variant="elegant"
  size="md"
  onClick={() => navigate('/activities')}
/>
```

## Props

| 参数        | 类型                                  | 默认值         | 描述                 |
| ----------- | ------------------------------------- | -------------- | -------------------- |
| `onClick`   | `() => void`                          | `navigate(-1)` | 点击事件处理函数     |
| `text`      | `string`                              | `"返回"`       | 悬停时显示的提示文本 |
| `className` | `string`                              | -              | 自定义样式类名       |
| `variant`   | `"elegant" \| "minimal" \| "vibrant"` | `"elegant"`    | 样式变体             |
| `size`      | `"sm" \| "md" \| "lg"`                | `"md"`         | 按钮尺寸             |

## 样式变体

### Elegant

- 白色背景，蓝色边框
- 适合大多数场景
- 优雅简洁的设计

### Minimal

- 半透明背景，细边框
- 适合轻量级场景
- 简约现代的风格

### Vibrant

- 渐变背景，无边框
- 适合需要突出的场景
- 活力鲜明的效果

## 尺寸规格

- **Small**: 40px × 40px
- **Medium**: 48px × 48px (桌面端 56px × 56px)
- **Large**: 64px × 64px

## 动画效果

- 悬停时的缩放和阴影效果
- 图标的平移和缩放动画
- 脉冲和光晕效果
- 提示文本的淡入淡出

## 使用示例

在活动详情页中使用：

```tsx
<FloatingBackButton text="返回上页" variant="vibrant" size="md" />
```

在表单页面中使用：

```tsx
<FloatingBackButton
  text="返回详情"
  variant="elegant"
  size="md"
  onClick={() => navigate(`/activities/${activityId}`)}
/>
```
