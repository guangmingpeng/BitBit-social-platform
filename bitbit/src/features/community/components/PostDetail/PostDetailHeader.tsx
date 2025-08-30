import { type FC } from "react";
import { Icon } from "@/components/ui";

interface PostDetailHeaderProps {
  title: string;
  onBack: () => void;
  onMore: () => void;
}

const PostDetailHeader: FC<PostDetailHeaderProps> = ({
  title,
  onBack,
  onMore,
}) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between h-16 px-4">
        {/* 返回按钮 - 参考FloatingBackButton的样式 */}
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-full font-semibold transition-all duration-300 flex items-center justify-center relative overflow-hidden bg-white shadow-lg border-2 border-primary-300 text-primary-600 hover:bg-primary-25 hover:border-primary-400 hover:shadow-xl ring-0 hover:ring-4 hover:ring-primary-400/20 focus:ring-4 focus:ring-primary-500/30 transform hover:scale-105 active:scale-95 group"
        >
          {/* 脉冲动画背景 */}
          <div className="absolute inset-0 bg-primary-400/30 rounded-full animate-ping opacity-0 group-hover:opacity-50" />

          {/* 渐变背景效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 via-primary-500/20 to-primary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />

          {/* 图标容器 */}
          <div className="relative z-10 flex items-center justify-center">
            <Icon
              name="arrow-left"
              size="md"
              className="transition-all duration-300 group-hover:-translate-x-1 group-hover:scale-110"
            />
          </div>

          {/* 光晕效果 */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </button>

        {/* 标题 */}
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>

        {/* 更多操作 */}
        <button
          onClick={onMore}
          className="w-12 h-12 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path d="M10 4a2 2 0 100-4 2 2 0 000 4z" />
            <path d="M10 20a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PostDetailHeader;
