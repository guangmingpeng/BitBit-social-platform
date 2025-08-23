# BitBit 社交活动平台

一个现代化的社交活动平台，基于 React + TypeScript + Vite 构建。

## 🚀 快速开始

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build
```

### 访问地址

- 开发环境: http://localhost:5173/

## 📚 项目文档

### 完整文档

查看 [docs/README.md](./docs/README.md) 获取完整的项目文档导航。

### 核心文档快速链接

- [🏗️ 系统架构设计](./docs/architecture/bitbit-架构设计.md)
- [📁 项目目录结构](./docs/architecture/PROJECT_STRUCTURE.md)
- [🎨 设计系统规范](./docs/design/design-system.md)
- [🧩 UI 组件库](./docs/components/ui-components.md)

## 🛠️ 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **状态管理**: Redux Toolkit + React Query
- **路由管理**: React Router v6
- **组件库**: 自研设计系统
- **代码规范**: ESLint + Prettier

## 🏗️ 项目结构

```
src/
├── components/        # 通用组件库
│   ├── ui/           # 基础 UI 组件
│   ├── layout/       # 布局组件
│   └── common/       # 通用功能组件
├── features/         # 功能模块
│   ├── activities/   # 活动模块
│   ├── auth/         # 认证模块
│   ├── community/    # 社区模块
│   └── exchange/     # 交换模块
├── shared/           # 共享资源
│   ├── config/       # 配置文件
│   ├── utils/        # 工具函数
│   ├── types/        # 类型定义
│   └── services/     # API 服务
├── pages/            # 页面组件
└── store/            # 全局状态管理
```

## 🎯 功能模块

### 核心功能

- 🎉 **活动管理**: 活动发布、参与、管理
- 🏘️ **社区交流**: 用户社区、帖子分享
- 🔄 **二手交换**: 物品交换、交易
- 👤 **用户系统**: 用户注册、登录、个人资料

### 技术特性

- 📱 **响应式设计**: 适配移动端和桌面端
- 🌓 **主题切换**: 支持明暗主题
- ⚡ **性能优化**: 懒加载、代码分割
- 🛡️ **类型安全**: 完整的 TypeScript 支持

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

该项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

💡 **获取帮助**: 如有问题，请查看 [项目文档](./docs/README.md) 或提交 Issue。
