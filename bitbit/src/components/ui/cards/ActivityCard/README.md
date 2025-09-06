/\*\*

- ActivityCard Component Architecture
-
- 这是一个复杂但功能完整的活动卡片组件，支持多种布局和状态。
-
- ## 组件特性
- - 支持 5 种布局模式：default, horizontal, list, compact, minimal
- - 统一的状态管理使用 activityUtils
- - 高度可配置的显示选项
- - 完整的用户交互支持
-
- ## 代码结构
- 1.  数据适配 (lines 50-70)
- 2.  配置获取 (lines 71-220)
- 3.  状态计算 (lines 221-260)
- 4.  事件处理 (lines 261-270)
- 5.  渲染函数 (lines 271-600)
- - renderImages: 图片渲染
- - renderHeader: 头部信息
- - renderContent: 主要内容
- - renderActions: 操作按钮
- 6.  主渲染逻辑 (lines 601-950)
-
- ## 性能考虑
- - 组件使用了合理的条件渲染
- - 避免了不必要的重新计算
- - 使用了 useMemo 优化（如果需要的话）
-
- ## 维护建议
- - 避免在此文件中添加新的布局模式
- - 新的状态逻辑应该添加到 activityUtils
- - 样式更改优先考虑使用 CSS 变量
    \*/

// 当前代码行数: ~950 行
// 复杂度: 高，但可维护
// 状态: 稳定，建议保持现状
