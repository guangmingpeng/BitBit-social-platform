import React from "react";
import { Card, CardContent, Tag, Button } from "@/components/ui";
import { cn } from "@/shared/utils/cn";
import type { Draft } from "@/shared/data/profileMockData";

interface DraftCardProps {
  draft: Draft;
  onClick?: () => void;
  onDelete?: () => void;
  onPublish?: () => void;
  onEdit?: () => void; // 新增编辑回调
  className?: string;
}

const DraftCard: React.FC<DraftCardProps> = ({
  draft,
  onClick,
  onDelete,
  onPublish,
  onEdit,
  className,
}) => {
  const getTypeConfig = (type: Draft["type"]) => {
    switch (type) {
      case "activity":
        return {
          label: "活动",
          color: "bg-blue-100 text-blue-600",
          icon: "🎯",
        };
      case "post":
        return {
          label: "帖子",
          color: "bg-green-100 text-green-600",
          icon: "📝",
        };
      case "exchange":
        return {
          label: "商品",
          color: "bg-purple-100 text-purple-600",
          icon: "🛍️",
        };
      default:
        return {
          label: "草稿",
          color: "bg-gray-100 text-gray-600",
          icon: "📄",
        };
    }
  };

  const typeConfig = getTypeConfig(draft.type);

  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-md transition-all duration-200 group",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* 草稿图片预览 */}
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            {draft.images && draft.images.length > 0 ? (
              <img
                src={draft.images[0]}
                alt={draft.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl text-gray-300">{typeConfig.icon}</span>
            )}
          </div>

          {/* 草稿信息 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Tag className={typeConfig.color}>{typeConfig.label}</Tag>
                <div className="text-xs text-gray-500">
                  完成度 {draft.progress}%
                </div>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.();
                  }}
                  className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
                >
                  继续编辑
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPublish?.();
                  }}
                  className="text-green-600 hover:text-green-700 border-green-200 hover:border-green-300"
                >
                  发布
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.();
                  }}
                  className="text-red-500 hover:text-red-600 border-red-200 hover:border-red-300"
                >
                  删除
                </Button>
              </div>
            </div>

            <h3 className="font-medium text-gray-900 line-clamp-1 mb-2">
              {draft.title}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {draft.content}
            </p>

            {/* 进度条 */}
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>编辑进度</span>
                <span>{draft.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${draft.progress}%` }}
                />
              </div>
            </div>

            <div className="text-xs text-gray-400">
              最后编辑: {draft.lastEditTime}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DraftCard;
