import { type FC } from "react";
import { Button, Icon } from "@/components/ui";
import type { Activity } from "@/shared/types";
import { getActivityParticipationInfo } from "@/shared/utils/activityUtils";

interface ActivityActionsProps {
  activity: Activity;
  onJoin?: () => void;
  onLeave?: () => void;
  onComment?: () => void;
  onCreateSimilar?: () => void;
  onJoinChat?: () => void; // 新增聊天群功能
}

const ActivityActions: FC<ActivityActionsProps> = ({
  activity,
  onJoin,
  onLeave,
  onComment,
  onCreateSimilar,
  onJoinChat,
}) => {
  const participationInfo = getActivityParticipationInfo(activity);
  const { ended, isOrganizer, canJoin, canLeave, statusText, isJoined } =
    participationInfo;

  return (
    <div className="pt-6 border-t border-gray-100">
      <div className="flex items-center gap-3">
        <button
          className="w-12 h-12 rounded-lg border-2 border-blue-300 bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 shadow-sm"
          onClick={onComment}
          disabled={ended}
        >
          <Icon name="comment" size="md" />
        </button>

        {/* 聊天群按钮 - 只有参与者可以加入 */}
        {(isJoined || isOrganizer) && (
          <button
            className="w-12 h-12 rounded-lg border-2 border-green-300 bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 hover:border-green-400 transition-all duration-200 shadow-sm"
            onClick={onJoinChat}
            title="加入活动群聊"
          >
            <Icon name="comment" size="md" />
          </button>
        )}

        {/* 根据活动状态和用户身份显示不同的按钮 */}
        {ended ? (
          <Button
            disabled
            className="flex-1 h-12 text-base font-semibold bg-gray-100 text-gray-500 cursor-not-allowed"
            size="lg"
          >
            活动已结束
          </Button>
        ) : isOrganizer ? (
          <Button
            disabled
            className="flex-1 h-12 text-base font-semibold bg-green-100 text-green-600 cursor-default"
            size="lg"
          >
            已组织
          </Button>
        ) : isJoined ? (
          <div className="flex-1 flex gap-2">
            <Button
              disabled
              className="flex-1 h-12 text-base font-semibold bg-blue-100 text-blue-600 cursor-default"
              size="lg"
            >
              已报名
            </Button>
            {canLeave && (
              <Button
                onClick={onLeave}
                variant="outline"
                className="h-12 px-4 text-base font-medium text-red-600 border-red-300 hover:bg-red-50"
                size="lg"
              >
                取消
              </Button>
            )}
          </div>
        ) : (
          <Button
            onClick={onJoin}
            disabled={!canJoin}
            className="flex-1 h-12 text-base font-semibold"
            size="lg"
          >
            {canJoin
              ? `立即报名 ${activity.isFree ? "" : `(¥${activity.price})`}`
              : statusText}
          </Button>
        )}

        <Button
          variant="outline"
          className="px-6 h-12 text-base font-medium"
          onClick={onCreateSimilar}
        >
          创建同类活动
        </Button>
      </div>
    </div>
  );
};

export default ActivityActions;
