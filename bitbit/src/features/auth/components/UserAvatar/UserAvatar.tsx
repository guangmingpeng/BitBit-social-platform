import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui";
import { useAuth } from "../../hooks";

interface UserAvatarProps {
  className?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    if (isAuthenticated) {
      setShowMenu(!showMenu);
    } else {
      // 未登录时跳转到登录页面
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowMenu(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProfile = () => {
    navigate("/profile");
    setShowMenu(false);
  };

  if (!isAuthenticated) {
    // 未登录状态
    return (
      <button
        onClick={handleClick}
        className={`flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ${className}`}
      >
        <Avatar src="" fallback="?" size="sm" className="bg-gray-300" />
        <span className="text-sm font-medium text-gray-700">登录</span>
      </button>
    );
  }

  // 已登录状态
  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleClick}
        className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-1 transition-colors"
      >
        <Avatar
          src={user?.avatar || ""}
          fallback={user?.nickname?.charAt(0) || "U"}
          size="md"
          className="cursor-pointer hover:ring-2 hover:ring-primary-200 transition-all"
        />
        {user?.nickname && (
          <span className="text-sm font-medium text-gray-700 hidden md:block">
            {user.nickname}
          </span>
        )}
      </button>

      {/* 用户菜单 */}
      {showMenu && (
        <>
          {/* 遮罩层 */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />

          {/* 菜单内容 */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
            <div className="py-2">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium text-gray-900">
                  {user?.nickname}
                </p>
                <p className="text-xs text-gray-500">{user?.phone}</p>
              </div>

              <button
                onClick={handleProfile}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                个人中心
              </button>

              <button
                onClick={() => {
                  navigate("/profile/settings");
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                设置
              </button>

              <div className="border-t mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  退出登录
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserAvatar;
