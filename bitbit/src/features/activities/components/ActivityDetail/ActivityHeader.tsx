import { type FC } from "react";
import { Icon } from "@/components/ui";
import { ImageCarousel } from "@/components/common";
import type { Activity } from "@/shared/types";

interface ActivityHeaderProps {
  activity: Activity;
  onShare: () => void;
  onLike: () => void;
  isLiked: boolean;
}

const ActivityHeader: FC<ActivityHeaderProps> = ({
  activity,
  onShare,
  onLike,
  isLiked,
}) => {
  return (
    <div className="relative h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
      <ImageCarousel
        images={activity.images || []}
        alt={activity.title}
        height="384px"
        showIndicators={activity.images && activity.images.length > 1}
        showArrows={activity.images && activity.images.length > 1}
        showCounter={activity.images && activity.images.length > 1}
        className="absolute inset-0"
        rounded={false}
        onImageClick={(index, image) => {
          // 可以添加图片预览逻辑
          console.log("点击图片:", index, image);
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

      {/* 右上角操作按钮 */}
      <div className="absolute top-4 right-20 flex gap-2 z-20">
        {/* 分享按钮 */}
        <button
          onClick={onShare}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-white transition-colors shadow-sm"
        >
          <Icon name="share" size="sm" />
        </button>

        {/* 收藏按钮 */}
        <button
          onClick={onLike}
          className={`w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors shadow-sm ${
            isLiked
              ? "bg-red-50/90 border border-red-400 text-red-500"
              : "bg-white/80 border border-gray-300 text-gray-600 hover:bg-white"
          }`}
        >
          <Icon name={isLiked ? "heart-filled" : "heart-outline"} size="sm" />
        </button>
      </div>
    </div>
  );
};

export default ActivityHeader;
