# BitBit 组件系统文档

## 概述

BitBit 组件系统是基于 React + TypeScript + Tailwind CSS 构建的现代化 UI 组件库，专为 BitBit 社交活动平台设计。所有组件都遵循统一的设计语言和编程规范，确保界面一致性和代码可维护性。

## 设计原则

### 1. 一致性

- 统一的颜色系统和字体规范
- 一致的间距和圆角规则
- 标准化的交互反馈

### 2. 可访问性

- 支持键盘导航
- 语义化 HTML 结构
- 适当的 ARIA 属性

### 3. 响应式设计

- 移动优先的设计理念
- 自适应布局组件
- 触摸友好的交互

### 4. 性能优化

- 按需加载
- 最小化重渲染
- 优化的动画性能

## 基础组件

### Button 按钮

支持多种变体、尺寸和状态的按钮组件。

**变体**: `primary` | `secondary` | `outline` | `ghost` | `danger`  
**尺寸**: `sm` | `md` | `lg`  
**状态**: `loading` | `disabled`

```tsx
<Button variant="primary" size="md" loading={false}>
  点击按钮
</Button>
```

### Input 输入框

多功能输入组件，支持图标、验证和不同样式。

**变体**: `default` | `search` | `error`  
**尺寸**: `sm` | `md` | `lg`

```tsx
<Input
  label="用户名"
  placeholder="请输入用户名"
  error="用户名不能为空"
  leftIcon={<SearchIcon />}
/>
```

### Card 卡片

灵活的容器组件，用于组织内容。

**变体**: `default` | `elevated` | `outlined`  
**内边距**: `none` | `sm` | `md` | `lg`

```tsx
<Card variant="elevated" hover>
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
    <CardDescription>卡片描述</CardDescription>
  </CardHeader>
  <CardContent>卡片内容</CardContent>
  <CardFooter>
    <Button>操作</Button>
  </CardFooter>
</Card>
```

### Tag 标签

用于分类和标记的标签组件。

**变体**: `default` | `music` | `food` | `learning` | `reading` | `secondary`  
**尺寸**: `sm` | `md` | `lg`

```tsx
<Tag variant="music" removable onRemove={() => {}}>
  音乐
</Tag>
```

### Avatar 头像

用户头像显示组件，支持图片和字母缩写。

**尺寸**: `xs` | `sm` | `md` | `lg` | `xl` | `2xl`

```tsx
<Avatar
  src="avatar.jpg"
  fallback="张三"
  size="md"
  online={true}
  squared={false}
/>
```

### Badge 徽章

数字提示和状态标识组件。

**变体**: `default` | `success` | `warning` | `error` | `info` | `secondary`

```tsx
<Badge count={5} variant="error">
  <Avatar fallback="消息" />
</Badge>
```

### Modal 弹窗

模态对话框组件。

**尺寸**: `sm` | `md` | `lg` | `xl` | `full`

```tsx
<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader>
    <ModalTitle>标题</ModalTitle>
  </ModalHeader>
  <ModalBody>内容</ModalBody>
  <ModalFooter>
    <Button>确认</Button>
  </ModalFooter>
</Modal>
```

### Spinner 加载器

加载状态指示器。

**尺寸**: `xs` | `sm` | `md` | `lg` | `xl`  
**颜色**: `primary` | `white` | `gray`

```tsx
<Spinner size="md" color="primary" />
```

## 布局组件

### Grid 网格

响应式网格布局组件。

**列数**: `1` | `2` | `3` | `4` | `5` | `6`  
**间距**: `none` | `sm` | `md` | `lg` | `xl`

```tsx
<Grid cols={3} gap="md" responsive>
  <div>项目1</div>
  <div>项目2</div>
  <div>项目3</div>
</Grid>
```

### Stack 堆叠

垂直或水平堆叠布局。

**方向**: `vertical` | `horizontal`  
**间距**: `none` | `xs` | `sm` | `md` | `lg` | `xl`  
**对齐**: `start` | `center` | `end` | `stretch`

```tsx
<Stack direction="vertical" spacing="md" align="center">
  <div>项目1</div>
  <div>项目2</div>
</Stack>
```

### Container 容器

响应式容器组件。

**尺寸**: `sm` | `md` | `lg` | `xl` | `full`  
**内边距**: `none` | `sm` | `md` | `lg`

```tsx
<Container size="lg" padding="md">
  内容
</Container>
```

### Tabs 标签页

标签页导航组件。

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">标签1</TabsTrigger>
    <TabsTrigger value="tab2">标签2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">内容1</TabsContent>
  <TabsContent value="tab2">内容2</TabsContent>
</Tabs>
```

## 业务组件

### FeaturedRecommendation 精选推荐区

首页精选推荐区组件，用于展示重点推广的活动或内容。

**特点**:

- 大尺寸视觉展示
- 渐变背景设计
- 双行动按钮布局
- 移动端适配

```tsx
<FeaturedRecommendation
  title="周末音乐节"
  subtitle="6月25-26日 | 湖畔音乐广场"
  description="10+ 乐队现场表演，美食摊位，创意市集..."
  primaryButtonText="立即参加"
  secondaryButtonText="详情"
  onPrimaryClick={() => {}}
  onSecondaryClick={() => {}}
/>
```

### ActivityCard 活动卡片

专为活动展示设计的卡片组件。

```tsx
<ActivityCard
  title="活动标题"
  description="活动描述"
  category="music"
  date="2024-01-20"
  time="14:00-17:00"
  location="活动地点"
  maxParticipants={20}
  currentParticipants={15}
  organizer={{ name: "组织者", avatar: "avatar.jpg" }}
  price={35}
  onJoin={() => {}}
  onClick={() => {}}
/>
```

### UserCard 用户卡片

用户信息展示卡片。

```tsx
<UserCard
  name="用户名"
  bio="用户简介"
  avatar="avatar.jpg"
  location="位置"
  interests={["兴趣1", "兴趣2"]}
  isFollowing={false}
  onFollow={() => {}}
  onMessage={() => {}}
/>
```

### PostCard 动态卡片

社交动态展示卡片。

```tsx
<PostCard
  author={{ name: "作者", avatar: "avatar.jpg" }}
  content="动态内容"
  images={["image1.jpg", "image2.jpg"]}
  category="music"
  publishTime="2小时前"
  likes={24}
  comments={8}
  shares={3}
  onLike={() => {}}
  onComment={() => {}}
/>
```

## 色彩系统

### 主品牌色 (Primary)

- `primary-50`: #F0F4FF
- `primary-100`: #CCE1FF
- `primary-200`: #7D95FF
- `primary-500`: #4E6FFF (主色)
- `primary-600`: #3050E0

### 辅助色 (Secondary)

- **音乐**: coral (珊瑚色)
- **美食**: mint (薄荷绿)
- **学习**: sunflower (向日葵)
- **阅读**: lavender (淡紫色)

### 状态色

- **成功**: #12B76A
- **警告**: #FFC107
- **错误**: #FF5252
- **信息**: #0096FF

### 中性色

- **主文字**: #222222
- **次文字**: #666666
- **辅助文字**: #999999

## 字体系统

- **title-1**: 32px/42px (页面主标题)
- **title-2**: 28px/36px (主要内容标题)
- **title-3**: 24px/31px (卡片标题)
- **title-4**: 20px/26px (内容分区标题)
- **subtitle**: 18px/24px (卡片内标题)
- **body-lg**: 16px/24px (重要正文)
- **body**: 14px/21px (普通正文)
- **caption**: 12px/18px (辅助文字)

## 开发指南

### 组件开发规范

1. **TypeScript**: 所有组件必须使用 TypeScript
2. **Props 接口**: 为每个组件定义清晰的 Props 接口
3. **forwardRef**: 需要 DOM 引用的组件使用 forwardRef
4. **样式类名**: 使用 cn() 工具函数合并类名
5. **可访问性**: 添加适当的 ARIA 属性和语义化标签

### 样式约定

1. **Tailwind CSS**: 使用 Tailwind 原子类
2. **设计令牌**: 使用配置的设计令牌而非硬编码值
3. **响应式**: 优先考虑移动端体验
4. **动画**: 使用 transition-all duration-250 实现流畅过渡

### 文件结构

```
src/components/ui/
├── Button.tsx              # 基础组件
├── Card.tsx
├── Input.tsx
├── ...
├── ActivityCard.tsx        # 业务组件
├── UserCard.tsx
├── PostCard.tsx
└── index.ts               # 统一导出
```

## 使用示例

### 导入组件

```tsx
import { Button, Card, CardContent, ActivityCard } from "@/components/ui";
```

### 组合使用

```tsx
function ActivityPage() {
  return (
    <Container size="lg">
      <Stack direction="vertical" spacing="lg">
        <h1 className="text-title-1">活动列表</h1>
        <Grid cols={3} gap="md">
          <ActivityCard {...activityProps} />
          <ActivityCard {...activityProps} />
          <ActivityCard {...activityProps} />
        </Grid>
      </Stack>
    </Container>
  );
}
```

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 贡献指南

1. 遵循现有的代码风格和命名约定
2. 为新组件编写类型定义和文档
3. 确保组件在不同尺寸下正常工作
4. 添加必要的测试用例
5. 更新组件展示页面
