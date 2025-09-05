# BitBit 设计文档组织结构

本目录包含 BitBit 项目的所有设计相关文档和设计稿，按照功能和类型进行分类组织。

## 📂 目录结构

```
docs/design/
├── README.md                    # 本文档，设计文档导航
├── system/                      # 设计系统核心文档
│   ├── design-system.md         # 设计系统完整规范
│   ├── theme-guide.md           # 主题系统使用指南
│   └── quick-guide.md           # 快速使用指南
├── components/                  # 基础组件设计稿
│   ├── button-component.svg     # 按钮组件设计
│   ├── card-component-2.svg     # 卡片组件设计
│   ├── card-content-component.svg # 卡片内容组件
│   ├── tag-component.svg        # 标签组件设计
│   ├── user-avatar-card.svg     # 用户头像卡片
│   ├── function-components.svg  # 功能组件集合
│   ├── interaction-components.svg # 交互组件集合
│   └── layout-component.svg     # 布局组件设计
├── pages/                       # 页面级设计稿
│   ├── bitbit-login-page.svg    # 登录页面设计
│   ├── bitbit-register-page.svg # 注册页面设计
│   ├── bitbit-registration-page.svg # 注册流程页面
│   ├── bitbit-profile-page.svg  # 个人资料页面
│   ├── bitbit-community-page.svg # 社区页面设计
│   ├── bitbit-activity-list.svg # 活动列表页面设计 (新增)
│   ├── bitbit-order-detail-page.svg # 订单详情页面设计 (新增)
│   ├── order-detail-page.md     # 订单详情页面设计规范 (新增)
│   └── fixed-homepage-cn-final.svg # 首页最终设计
└── features/                    # 功能模块设计稿
    ├── UI-design-2.svg          # 综合UI设计稿
    ├── activities/              # 活动功能模块 ⭐ **补充完整设计**
    │   ├── bitbit-activity-detail.svg # 活动详情页
    │   ├── bitbit-activity-registration.svg # 付费活动报名页面设计 (新增)
    │   ├── bitbit-activity-registration-free.svg # 免费活动报名页面设计 (新增)
    │   ├── bitbit-activity-publish.svg # 发布活动页面设计 (新增)
    │   ├── activity-info-components.svg # 活动信息组件
    │   └── activity-participants.svg # 活动参与者组件
    ├── exchange/                # 交换功能模块
    │   ├── bitbit-exchange-detail.svg # 交换详情页
    │   ├── bitbit-exchange-list.svg # 交换列表页 (新增)
    │   ├── exchange-card-component.svg # 交换卡片组件 (新增)
    │   ├── exchange-card-interaction-states.svg # 卡片交互状态 (新增)
    │   └── exchange-card-sizes-variants.svg # 卡片尺寸变体 (新增)
    └── community/               # 社区功能模块
        └── community-post-detail.svg # 社区帖子详情
```

## 📋 使用指南

### 🎨 设计系统文档 (`system/`)

- **design-system.md**: 完整的设计系统规范，包含颜色、字体、间距等所有设计 token
- **theme-guide.md**: 主题系统的详细使用指南，包含亮色/暗色模式
- **quick-guide.md**: 常用设计 token 的快速查询手册

### 🧩 组件设计稿 (`components/`)

包含所有可复用的基础 UI 组件设计稿，这些组件被用于构建页面和功能模块。

### 📄 页面设计稿 (`pages/`)

包含完整的页面级设计稿，展示页面的整体布局和视觉效果。

### ⚡ 功能模块设计稿 (`features/`)

按照应用的核心功能模块分类，包含：

- **activities/**: 活动相关的所有设计稿 ⭐ **补充完整设计**
  - `bitbit-activity-detail.svg`: 活动详情页设计
  - `bitbit-activity-registration.svg`: 付费活动报名页面设计（新增）
  - `bitbit-activity-registration-free.svg`: 免费活动报名页面设计（新增）
  - `bitbit-activity-publish.svg`: 发布活动页面设计（新增）
  - `activity-info-components.svg`: 活动信息组件设计
  - `activity-participants.svg`: 活动参与者组件设计
- **exchange/**: 物品交换相关的设计稿 ⭐ **新增完整设计**
  - `bitbit-exchange-detail.svg`: 交换物品详情页设计
  - `bitbit-exchange-list.svg`: 交换列表页面设计（首页/二手 tab 页）
  - `exchange-card-component.svg`: 核心卡片组件设计（三种布局）
  - `exchange-card-interaction-states.svg`: 卡片交互状态设计（悬停/收藏/禁用）
  - `exchange-card-sizes-variants.svg`: 卡片尺寸规范和响应式布局
- **community/**: 社区功能相关的设计稿

## 🚀 快速开始

1. **查看设计系统**: 从 `system/quick-guide.md` 开始，了解常用的设计 token
2. **组件开发**: 参考 `components/` 目录下的组件设计稿
3. **页面开发**: 查看 `pages/` 目录了解页面整体设计
4. **功能开发**: 根据具体功能模块，查看 `features/` 下对应的设计稿

## 📞 设计规范

所有设计稿均遵循统一的设计系统规范，确保：

- 颜色使用符合品牌色彩规范
- 字体大小和层级关系一致
- 间距和布局符合栅格系统
- 组件状态和交互行为统一

---

_如需更新设计文档或添加新的设计稿，请按照上述目录结构进行分类存放。_
