import { useLocation, useNavigate } from "react-router-dom";
import { Button, Avatar } from "@/components/ui";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 根据不同路由显示不同标题
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "BitBit";
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
        return "BitBit";
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-light">
      <div className="container-main py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* 左侧：标题 */}
          <h1
            className="text-lg md:text-title-4 text-primary-500 font-bold cursor-pointer hover:text-primary-600 transition-colors"
            onClick={() => navigate("/")}
          >
            {getTitle()}
          </h1>

          {/* 右侧：操作区域 */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* 创建活动按钮 - 仅在首页显示 */}
            {isHomePage && (
              <Button
                variant="primary"
                size="md"
                className="shadow-lg hidden sm:flex"
                onClick={() => console.log("创建活动")}
              >
                <span className="hidden md:inline">创建活动 </span>+
              </Button>
            )}

            {/* 消息通知 */}
            <div className="relative">
              <button
                className="w-9 h-9 md:w-10 md:h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                onClick={() => console.log("查看消息")}
              >
                <span className="text-base md:text-lg">🔔</span>
              </button>
              {/* 未读消息指示器 */}
              <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-coral-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                3
              </div>
            </div>

            {/* 用户头像 */}
            <Avatar
              src=""
              fallback="ZL"
              size="md"
              className="cursor-pointer hover:ring-2 hover:ring-primary-200 transition-all"
              onClick={() => console.log("查看个人信息")}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
