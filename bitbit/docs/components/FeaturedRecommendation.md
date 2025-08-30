# FeaturedRecommendation 精选推荐区组件

## 概述

`FeaturedRecommendation` 是一个专门用于首页精选内容推荐的视觉组件。它采用大尺寸设计和渐变背景，用于突出展示平台重点推广的活动、功能或内容。

## 设计理念

### 视觉层次

- **主要元素**: 大标题、副标题、描述文字
- **行动元素**: 主要按钮 + 次要按钮的双重选择
- **背景装饰**: 渐变色彩 + 几何装饰元素

### 功能定位

- **内容策略**: 作为平台内容策略的展示窗口
- **用户引导**: 引导用户参与高价值活动
- **品牌展示**: 体现平台的活跃度和品质

## API 接口

```typescript
interface FeaturedRecommendationProps {
  title: string; // 主标题
  subtitle: string; // 副标题（时间地点等）
  description: string; // 描述文字
  primaryButtonText: string; // 主要按钮文字
  secondaryButtonText: string; // 次要按钮文字
  onPrimaryClick?: () => void; // 主要按钮点击事件
  onSecondaryClick?: () => void; // 次要按钮点击事件
  className?: string; // 自定义样式类
}
```

## 使用示例

### 基础用法

```tsx
import { FeaturedRecommendation } from "@/components/ui";

function HomePage() {
  return (
    <FeaturedRecommendation
      title="周末音乐节"
      subtitle="6月25-26日 | 湖畔音乐广场"
      description="10+ 乐队现场表演，美食摊位，创意市集..."
      primaryButtonText="立即参加"
      secondaryButtonText="详情"
      onPrimaryClick={() =>
        navigate("/activities/music-festival-2024/register")
      }
      onSecondaryClick={() => navigate("/activities/music-festival-2024")}
    />
  );
}
```

### 与导航系统集成

```tsx
import { useSmartNavigation } from "@/shared/hooks/useSmartNavigation";

function HomePage() {
  const { navigateWithSource } = useSmartNavigation();

  return (
    <FeaturedRecommendation
      title="学习分享会"
      subtitle="本周六 14:00 | 图书馆"
      description="技术大咖分享最新前端技术趋势..."
      primaryButtonText="立即报名"
      secondaryButtonText="了解更多"
      onPrimaryClick={() =>
        navigateWithSource("home")("/activities/tech-share-2024/register")
      }
      onSecondaryClick={() =>
        navigateWithSource("home")("/activities/tech-share-2024")
      }
    />
  );
}
```

## 设计规范

### 尺寸规格

- **高度**: 288px (h-72)
- **内边距**: 32px (p-8)
- **圆角**: 16px (rounded-2xl)

### 色彩系统

- **背景渐变**: `from-primary-100 via-coral-100 to-lavender-100`
- **主标题**: `text-text-primary` (#222222)
- **副标题**: `text-text-secondary` (#666666)
- **描述文字**: `text-text-secondary` (#666666)

### 按钮规格

- **主要按钮**: `variant="primary"` + `size="lg"` + `shadow-lg`
- **次要按钮**: `variant="ghost"` + `size="lg"` + 半透明背景

### 装饰元素

- **大圆形**: 16x16 位于右上角
- **小圆形**: 8x8 位于右下角
- **中圆形**: 4x4 位于右侧中部

## 响应式设计

### 移动端适配

- 文字大小自动调整
- 按钮布局保持水平排列
- 装饰元素位置自适应

### 断点适配

```css
/* 手机端 */
@media (max-width: 768px) {
  .featured-recommendation {
    padding: 1.5rem; /* p-6 */
    height: 256px; /* h-64 */
  }
}
```

## 使用场景

### 1. 活动推广

- **音乐节、艺术展**: 展示大型活动
- **学习分享会**: 推广知识类活动
- **社区聚会**: 宣传社交活动

### 2. 功能推广

- **新功能上线**: 引导用户体验
- **季节性活动**: 节日特别推广
- **合作伙伴**: 第三方内容推荐

### 3. 内容策略

- **提升参与度**: 突出高质量内容
- **引导行为**: 促进用户转化
- **品牌建设**: 体现平台价值

## 最佳实践

### 内容编写

1. **标题简洁有力**: 6-8 个字最佳
2. **副标题信息完整**: 包含时间、地点等关键信息
3. **描述突出亮点**: 3-4 个核心卖点

### 按钮文案

1. **主按钮行动导向**: "立即参加"、"马上报名"
2. **次按钮信息导向**: "详情"、"了解更多"

### 更新频率

- **建议**: 每周更新 1-2 次
- **避免**: 长期展示同一内容
- **监控**: 关注点击率和转化效果

## 可访问性

### 键盘导航

- 支持 Tab 键切换焦点
- 支持 Enter 和 Space 键激活按钮

### 屏幕阅读器

- 语义化的 HTML 结构
- 适当的 ARIA 标签
- 有意义的 alt 文本

### 色彩对比

- 文字与背景对比度 ≥ 4.5:1
- 按钮状态有明确的视觉反馈

## 性能优化

### 图片优化

- 使用 WebP 格式
- 实现懒加载
- 提供 placeholder

### 动画性能

- 使用 CSS transforms
- 避免重排和重绘
- 60fps 流畅动画

## 维护指南

### 代码结构

```
FeaturedRecommendation/
├── index.tsx          # 主组件文件
├── types.ts           # 类型定义
├── styles.module.css  # 样式文件
└── README.md          # 组件文档
```

### 测试覆盖

- 单元测试: 组件渲染和交互
- 视觉测试: 不同状态的快照
- 可访问性测试: a11y 合规性

### 版本更新

- 遵循语义化版本控制
- 保持向后兼容性
- 详细的 CHANGELOG
