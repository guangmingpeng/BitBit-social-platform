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
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
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
      <nav className="bg-white shadow-light px-4 py-6 relative">
        <div className="container-main">
          <div className="flex justify-center space-x-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-tab-item ${isActive ? "nav-tab-active" : ""}`
              }
            >
              首页
            </NavLink>
            <NavLink
              to="/activities"
              className={({ isActive }) =>
                `nav-tab-item ${isActive ? "nav-tab-active" : ""}`
              }
            >
              活动
            </NavLink>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                `nav-tab-item ${isActive ? "nav-tab-active" : ""}`
              }
            >
              社区
            </NavLink>
            <NavLink
              to="/exchange"
              className={({ isActive }) =>
                `nav-tab-item ${isActive ? "nav-tab-active" : ""}`
              }
            >
              二手
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `nav-tab-item ${isActive ? "nav-tab-active" : ""}`
              }
            >
              我的
            </NavLink>
          </div>
        </div>
        {/* 主题切换按钮 */}
        <ThemeToggleButton />

        {/* 用于开发调试的组件页面链接 */}
        <div className="fixed bottom-20 right-4 z-50 flex gap-2">
          <NavLink
            to="/components"
            className="bg-gray-800 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
          >
            组件
          </NavLink>
          <NavLink
            to="/exchange-showcase"
            className="bg-primary-500 text-white px-3 py-1 rounded text-xs hover:bg-primary-600 transition-colors"
          >
            交换卡片
          </NavLink>
        </div>
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
