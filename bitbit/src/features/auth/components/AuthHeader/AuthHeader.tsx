import { type FC } from "react";
import { useNavigate } from "react-router-dom";

interface AuthHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const AuthHeader: FC<AuthHeaderProps> = ({ title, showBackButton = false }) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* 状态栏模拟 */}
      <div className="h-[50px] bg-white flex items-center justify-center">
        <h1 className="text-base font-semibold text-[#222222]">{title}</h1>
      </div>

      {/* 返回按钮 */}
      {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-[70px] w-12 h-12 bg-white rounded-full shadow-[0px_2px_4px_rgba(0,0,0,0.1)] flex items-center justify-center hover:shadow-md transition-shadow"
        >
          <span className="text-lg text-[#222222]">←</span>
        </button>
      )}

      {/* Logo区域 */}
      <div className="flex flex-col items-center mt-6 mb-8">
        <div className="w-[120px] h-[120px] bg-white rounded-full shadow-[0px_8px_24px_rgba(78,111,255,0.15)] flex items-center justify-center mb-6">
          <span className="text-4xl font-bold text-[#4E6FFF]">BB</span>
        </div>

        <h2 className="text-2xl font-bold text-[#222222] mb-2">
          {title === "BitBit 登录" ? "BitBit" : "加入BitBit"}
        </h2>
        <p className="text-base text-[#666666]">
          {title === "BitBit 登录"
            ? "连接你我，分享精彩"
            : "开启你的精彩社交生活"}
        </p>
      </div>
    </div>
  );
};

export default AuthHeader;
