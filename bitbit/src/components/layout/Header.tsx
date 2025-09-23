import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import { useNotifications } from "@/features/notifications";
import { UserAvatar } from "@/features/auth/components";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { stats } = useNotifications();

  const isHomePage = location.pathname === "/";

  // 获取页面标题（非首页时显示）
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/activities":
        return "活动";
      case "/community":
        return "社区";
      case "/exchange":
        return "二手";
      case "/profile":
        return "个人中心";
      case "/components":
        return "组件";
      default:
        return null;
    }
  };

  const pageTitle = getPageTitle();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-light">
      <div className="container-main py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* 左侧：Logo和页面标题 */}
          <div className="flex items-center gap-3">
            {/* Logo - 始终可点击返回首页 */}
            <h1
              className="text-lg md:text-title-4 text-primary-500 font-bold cursor-pointer hover:text-primary-600 transition-colors"
              onClick={() => navigate("/")}
            >
              BitBit
            </h1>

            {/* 页面标题 - 非首页时显示 */}
            {pageTitle && (
              <>
                <span className="text-text-tertiary mx-2">|</span>
                <h2 className="text-lg md:text-title-4 text-text-primary font-medium">
                  {pageTitle}
                </h2>
              </>
            )}
          </div>

          {/* 右侧：操作区域 */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* 创建活动按钮 - 仅在首页显示 */}
            {isHomePage && (
              <Button
                variant="primary"
                size="md"
                className="shadow-lg hidden sm:flex"
                onClick={() => navigate("/publish-activity")}
              >
                <span className="hidden md:inline">创建活动 </span>+
              </Button>
            )}

            {/* 消息通知 - 统一的通知入口 */}
            <div className="relative">
              <button
                className="w-9 h-9 md:w-10 md:h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                onClick={() =>
                  navigate("/notifications", {
                    state: {
                      fromSource:
                        location.pathname === "/"
                          ? "home"
                          : location.pathname.startsWith("/activities")
                          ? "activities"
                          : location.pathname.startsWith("/community")
                          ? "community"
                          : location.pathname.startsWith("/exchange")
                          ? "exchange"
                          : location.pathname.startsWith("/profile")
                          ? "profile"
                          : "other",
                    },
                  })
                }
                title="查看所有通知"
              >
                <span className="text-base md:text-lg">🔔</span>
              </button>
              {/* 未读消息指示器 */}
              {stats.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-coral-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                  {stats.unread > 99 ? "99+" : stats.unread}
                </div>
              )}
            </div>

            {/* 用户头像 */}
            <UserAvatar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
