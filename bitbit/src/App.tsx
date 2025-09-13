import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import { routes } from "@/shared/config/routes";
import Header from "@/components/layout/Header";
import SearchBar from "@/components/ui/SearchBar";
import ComponentShowcase from "@/components/ComponentShowcase";
import { devConfig } from "@/config/dev.config";
import { Icon } from "@/components/ui";
// import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton"; // 暂时隐藏主题切换
import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="app-container bg-gray-50 min-h-screen">
      <Header />
      {isHomePage && <SearchBar />}
      <main className="main-content flex-1">
        <Suspense
          fallback={
            <div className="container-main py-8 text-center text-body text-text-secondary">
              Loading...
            </div>
          }
        >
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
            <Route path="/components" element={<ComponentShowcase />} />
          </Routes>
        </Suspense>
      </main>
      {/* 固定底部导航栏 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 px-4 py-2 z-50">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-around items-center">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-tab-item ${isActive ? "nav-tab-active" : ""}`
              }
            >
              <div className="flex flex-col items-center">
                <Icon name="home" size="lg" className="mb-1" />
                <span className="text-xs">首页</span>
              </div>
            </NavLink>
            <NavLink
              to="/activities"
              className={({ isActive }) =>
                `nav-tab-item ${isActive ? "nav-tab-active" : ""}`
              }
            >
              <div className="flex flex-col items-center">
                <Icon name="activity" size="lg" className="mb-1" />
                <span className="text-xs">活动</span>
              </div>
            </NavLink>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                `nav-tab-item ${isActive ? "nav-tab-active" : ""}`
              }
            >
              <div className="flex flex-col items-center">
                <Icon name="community" size="lg" className="mb-1" />
                <span className="text-xs">社区</span>
              </div>
            </NavLink>
            <NavLink
              to="/exchange"
              className={({ isActive }) =>
                `nav-tab-item ${isActive ? "nav-tab-active" : ""}`
              }
            >
              <div className="flex flex-col items-center">
                <Icon name="exchange" size="lg" className="mb-1" />
                <span className="text-xs">二手</span>
              </div>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `nav-tab-item ${isActive ? "nav-tab-active" : ""}`
              }
            >
              <div className="flex flex-col items-center">
                <Icon name="profile" size="lg" className="mb-1" />
                <span className="text-xs">我的</span>
              </div>
            </NavLink>
          </div>
        </div>
        {/* 主题切换按钮 - 暂时隐藏，后续实现 */}
        {/* <ThemeToggleButton /> */}

        {/* 用于开发调试的组件页面链接 - 根据环境变量控制显示 */}
        {devConfig.showDebugComponents && (
          <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2">
            <NavLink
              to="/components"
              className="bg-gray-800 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
            >
              组件
            </NavLink>
            <NavLink
              to="/test/navigation-demo"
              className="bg-indigo-600 text-white px-3 py-1 rounded text-xs hover:bg-indigo-700 transition-colors"
            >
              导航演示
            </NavLink>
            <NavLink
              to="/test/icon-showcase"
              className="bg-rose-600 text-white px-3 py-1 rounded text-xs hover:bg-rose-700 transition-colors"
            >
              图标展示
            </NavLink>
            <NavLink
              to="/test/user-navigation"
              className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
            >
              用户导航
            </NavLink>
            <NavLink
              to="/exchange-showcase"
              className="bg-primary-500 text-white px-3 py-1 rounded text-xs hover:bg-primary-600 transition-colors"
            >
              交换卡片
            </NavLink>
            <NavLink
              to="/test/user-card"
              className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-colors"
            >
              用户卡片
            </NavLink>
            <NavLink
              to="/test/chat"
              className="bg-purple-500 text-white px-3 py-1 rounded text-xs hover:bg-purple-600 transition-colors"
            >
              聊天功能
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
