import { type FC } from "react";
import { Button, Icon } from "@/components/ui";
import type { Activity } from "@/shared/types";

interface ActivityActionsProps {
  activity: Activity;
  onJoin: () => void;
  onComment?: () => void;
  onCreateSimilar?: () => void;
}

const ActivityActions: FC<ActivityActionsProps> = ({
  activity,
  onJoin,
  onComment,
  onCreateSimilar,
}) => {
  const isFull = activity.currentParticipants >= activity.maxParticipants;

  return (
    <div className="pt-6 border-t border-gray-100">
      <div className="flex items-center gap-3">
        <button
          className="w-12 h-12 rounded-lg border-2 border-blue-300 bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 shadow-sm"
          onClick={onComment}
        >
          <Icon name="comment" size="md" />
        </button>

        <Button
          onClick={onJoin}
          disabled={isFull}
          className="flex-1 h-12 text-base font-semibold"
          size="lg"
        >
          {isFull
            ? "活动已满"
            : `立即参加 ${activity.isFree ? "" : `(¥${activity.price})`}`}
        </Button>

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
