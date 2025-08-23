# BitBit 设计系统 - Tailwind CSS 配置说明

基于 UI 设计规范，我们已经配置了完整的 Tailwind CSS 设计系统。

## 🎨 颜色系统

### 主品牌色 - 活力蓝

```
bg-primary-500    #4E6FFF  主色
bg-primary-200    #7D95FF  主色浅
bg-primary-600    #3050E0  主色深
bg-primary-100    #CCE1FF  主色背景 (20% 透明度等效)
bg-primary-50     #F0F4FF  主色背景淡 (10% 透明度等效)
```

### 辅助色

```
bg-coral-500      #FF6B8B  珊瑚色 (音乐、艺术类活动)
bg-mint-500       #65D1AA  薄荷绿 (美食、健康类活动)
bg-sunflower-500  #FFB951  向日葵 (学习、技能类活动)
bg-lavender-500   #8F7CFF  淡紫色 (读书、心理类活动)
```

### 中性色

```
text-text-primary     #222222  文本主色
text-text-secondary   #666666  次要文本
text-text-tertiary    #999999  辅助文本
bg-gray-200          #E0E0E6  边框色
bg-gray-100          #F3F3F7  背景淡
bg-gray-50           #F9F9FB  背景白
```

### 状态色

```
text-error    #FF5252  错误红
text-success  #12B76A  成功绿
text-warning  #FFC107  警告黄
text-info     #0096FF  信息蓝
```

## 📝 字体系统

### 字体大小类名

```
text-title-1   32px/42px Bold      页面主标题、欢迎页标题
text-title-2   28px/36px Bold      主要内容标题、重要区块标题
text-title-3   24px/31px SemiBold  卡片标题、次级页面标题
text-title-4   20px/26px SemiBold  内容分区标题、弹窗标题
text-subtitle  18px/24px Medium    卡片内标题、活动名称
text-body-lg   16px/24px Regular   主要内容文本、按钮文本
text-body      14px/21px Regular   次要文本、辅助信息
text-caption   12px/18px Regular   标签、注释、时间戳
```

## 🔲 圆角规范

```
rounded-xs    4px   表单元素、小型组件
rounded-sm    8px   卡片、面板、模态框
rounded-lg    16px  主要卡片、内容区块
rounded-full  50%   按钮、标签、徽章
```

## 🌟 阴影效果

```
shadow-light  0px 1px 2px rgba(0,0,0,0.05)   导航栏、底部栏
shadow-card   0px 4px 8px rgba(0,0,0,0.08)   卡片、面板
shadow-modal  0px 8px 24px rgba(0,0,0,0.12)  模态框、弹出菜单
shadow-focus  0px 12px 32px rgba(0,0,0,0.16) 重点弹窗、引导层
```

## 📏 间距系统

基于 4px 网格系统：

```
p-1   4px    p-2   8px    p-3   12px   p-4   16px   p-5   20px
p-6   24px   p-8   32px   p-10  40px   p-12  48px   p-16  64px
p-20  80px   p-24  96px   p-32  128px  p-40  160px  p-48  192px
```

## 🎯 使用示例

### 主要按钮

```html
<button
  class="bg-primary-500 hover:bg-primary-600 text-white text-body-lg font-medium px-6 py-3 rounded-full shadow-card transition-colors duration-250"
>
  确认
</button>
```

### 活动卡片

```html
<div class="bg-gray-50 rounded-lg shadow-card p-6 space-y-4">
  <h3 class="text-title-3 text-text-primary">活动标题</h3>
  <p class="text-body text-text-secondary">活动描述...</p>
  <span
    class="inline-block bg-coral-100 text-coral-500 text-caption px-3 py-1 rounded-full"
  >
    音乐活动
  </span>
</div>
```

### 表单输入

```html
<input
  class="w-full px-4 py-3 border border-gray-200 rounded-xs text-body-lg text-text-primary placeholder:text-text-tertiary focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-colors duration-250"
  placeholder="请输入内容"
/>
```

### 导航栏

```html
<nav class="bg-gray-50 shadow-light px-6 py-4">
  <div class="flex items-center justify-between">
    <h1 class="text-title-4 text-text-primary font-bold">BitBit</h1>
    <div class="flex items-center space-x-4">
      <!-- 导航项 -->
    </div>
  </div>
</nav>
```

## 🏷️ 活动类型颜色

根据活动类型使用对应的辅助色：

- 音乐、艺术类：`bg-coral-500` `text-coral-500`
- 美食、健康类：`bg-mint-500` `text-mint-500`
- 学习、技能类：`bg-sunflower-500` `text-sunflower-500`
- 读书、心理类：`bg-lavender-500` `text-lavender-500`

## 📱 响应式设计

配合 Tailwind 的响应式前缀使用：

```html
<div class="text-body md:text-body-lg lg:text-title-4">响应式文本</div>

<div class="p-4 md:p-6 lg:p-8">响应式间距</div>
```

## 🎨 设计原则

1. **一致性**：统一使用设计系统中定义的颜色、字体和间距
2. **可访问性**：确保足够的对比度和适当的字体大小
3. **简洁性**：避免过度设计，保持界面清晰易懂
4. **灵活性**：设计系统支持各种使用场景和组件变体

这套设计系统确保了 BitBit 平台的视觉一致性和用户体验的统一性。
