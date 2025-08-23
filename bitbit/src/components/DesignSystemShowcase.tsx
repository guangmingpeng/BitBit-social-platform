import React from "react";

// BitBit 设计系统展示组件
const DesignSystemShowcase: React.FC = () => {
  return (
    <div className="container-main py-12 space-y-12">
      {/* 颜色系统展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 text-text-primary font-bold">颜色系统</h2>

        {/* 主品牌色 */}
        <div className="space-y-3">
          <h3 className="text-title-4 text-text-primary font-semibold">
            主品牌色 - 活力蓝
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-lg mb-2"></div>
              <span className="text-caption text-text-tertiary">50</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-lg mb-2"></div>
              <span className="text-caption text-text-tertiary">100</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-200 rounded-lg mb-2"></div>
              <span className="text-caption text-text-tertiary">200</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-lg mb-2"></div>
              <span className="text-caption text-text-tertiary">500</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-lg mb-2"></div>
              <span className="text-caption text-text-tertiary">600</span>
            </div>
          </div>
        </div>

        {/* 辅助色 */}
        <div className="space-y-3">
          <h3 className="text-title-4 text-text-primary font-semibold">
            辅助色
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-coral-500 rounded-lg mb-2"></div>
              <span className="text-caption text-text-tertiary">珊瑚色</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-mint-500 rounded-lg mb-2"></div>
              <span className="text-caption text-text-tertiary">薄荷绿</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sunflower-500 rounded-lg mb-2"></div>
              <span className="text-caption text-text-tertiary">向日葵</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-lavender-500 rounded-lg mb-2"></div>
              <span className="text-caption text-text-tertiary">淡紫色</span>
            </div>
          </div>
        </div>
      </section>

      {/* 字体系统展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 text-text-primary font-bold">字体系统</h2>
        <div className="space-y-4">
          <div>
            <span className="text-caption text-text-tertiary block mb-1">
              title-1
            </span>
            <p className="text-title-1">页面主标题、欢迎页标题</p>
          </div>
          <div>
            <span className="text-caption text-text-tertiary block mb-1">
              title-2
            </span>
            <p className="text-title-2">主要内容标题、重要区块标题</p>
          </div>
          <div>
            <span className="text-caption text-text-tertiary block mb-1">
              title-3
            </span>
            <p className="text-title-3">卡片标题、次级页面标题</p>
          </div>
          <div>
            <span className="text-caption text-text-tertiary block mb-1">
              title-4
            </span>
            <p className="text-title-4">内容分区标题、弹窗标题</p>
          </div>
          <div>
            <span className="text-caption text-text-tertiary block mb-1">
              subtitle
            </span>
            <p className="text-subtitle">卡片内标题、活动名称</p>
          </div>
          <div>
            <span className="text-caption text-text-tertiary block mb-1">
              body-lg
            </span>
            <p className="text-body-lg">主要内容文本、按钮文本</p>
          </div>
          <div>
            <span className="text-caption text-text-tertiary block mb-1">
              body
            </span>
            <p className="text-body">次要文本、辅助信息</p>
          </div>
          <div>
            <span className="text-caption text-text-tertiary block mb-1">
              caption
            </span>
            <p className="text-caption">标签、注释、时间戳</p>
          </div>
        </div>
      </section>

      {/* 按钮组件展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 text-text-primary font-bold">按钮组件</h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary">主要按钮</button>
          <button className="btn-secondary">次要按钮</button>
          <button className="btn-outline">边框按钮</button>
          <button className="btn-ghost">幽灵按钮</button>
        </div>
      </section>

      {/* 表单组件展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 text-text-primary font-bold">表单组件</h2>
        <div className="max-w-md space-y-4">
          <input className="input-field" placeholder="普通输入框" type="text" />
          <input
            className="input-field input-error"
            placeholder="错误状态输入框"
            type="text"
          />
        </div>
      </section>

      {/* 卡片组件展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 text-text-primary font-bold">卡片组件</h2>
        <div className="grid-cards">
          <div className="card">
            <h3 className="text-title-3 text-text-primary mb-3">普通卡片</h3>
            <p className="text-body text-text-secondary mb-4">
              这是一个普通的卡片组件，用于展示内容。
            </p>
            <span className="tag-music">音乐活动</span>
          </div>
          <div className="card-hover">
            <h3 className="text-title-3 text-text-primary mb-3">悬停卡片</h3>
            <p className="text-body text-text-secondary mb-4">
              这是一个带悬停效果的卡片组件，鼠标悬停时会有阴影变化。
            </p>
            <span className="tag-food">美食活动</span>
          </div>
        </div>
      </section>

      {/* 活动标签展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 text-text-primary font-bold">活动标签</h2>
        <div className="flex flex-wrap gap-4">
          <span className="tag-music">音乐活动</span>
          <span className="tag-food">美食活动</span>
          <span className="tag-learning">学习活动</span>
          <span className="tag-reading">读书活动</span>
        </div>
      </section>

      {/* 状态提示展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 text-text-primary font-bold">状态提示</h2>
        <div className="space-y-4 max-w-md">
          <div className="status-success">成功提示信息</div>
          <div className="status-error">错误提示信息</div>
          <div className="status-warning">警告提示信息</div>
          <div className="status-info">信息提示</div>
        </div>
      </section>

      {/* 阴影系统展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 text-text-primary font-bold">阴影系统</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-light">
            <h4 className="text-subtitle mb-2">轻阴影</h4>
            <p className="text-body text-text-secondary">用于导航栏、底部栏</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-card">
            <h4 className="text-subtitle mb-2">卡片阴影</h4>
            <p className="text-body text-text-secondary">用于卡片、面板</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-modal">
            <h4 className="text-subtitle mb-2">模态框阴影</h4>
            <p className="text-body text-text-secondary">
              用于模态框、弹出菜单
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-focus">
            <h4 className="text-subtitle mb-2">焦点阴影</h4>
            <p className="text-body text-text-secondary">
              用于重点弹窗、引导层
            </p>
          </div>
        </div>
      </section>

      {/* 圆角系统展示 */}
      <section className="space-y-6">
        <h2 className="text-title-2 text-text-primary font-bold">圆角系统</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-primary-100 p-6 rounded-xs">
            <h4 className="text-subtitle mb-2">XS 圆角</h4>
            <p className="text-body text-text-secondary">4px - 表单元素</p>
          </div>
          <div className="bg-primary-100 p-6 rounded-sm">
            <h4 className="text-subtitle mb-2">SM 圆角</h4>
            <p className="text-body text-text-secondary">8px - 卡片面板</p>
          </div>
          <div className="bg-primary-100 p-6 rounded-lg">
            <h4 className="text-subtitle mb-2">LG 圆角</h4>
            <p className="text-body text-text-secondary">16px - 主要卡片</p>
          </div>
          <div className="bg-primary-100 p-6 rounded-full">
            <h4 className="text-subtitle mb-2">Full 圆角</h4>
            <p className="text-body text-text-secondary">50% - 按钮标签</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignSystemShowcase;
