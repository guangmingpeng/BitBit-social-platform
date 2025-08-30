import { type FC } from "react";
import { Button, Card, CardContent } from "@/components/ui";
import type { Activity } from "@/shared/types";

interface ActivityLocationProps {
  activity: Activity;
  onViewDetails?: () => void;
  onNavigate?: () => void;
}

const ActivityLocation: FC<ActivityLocationProps> = ({
  activity,
  onViewDetails,
  onNavigate,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">活动地点</h3>
      <Card className="bg-gray-50 border-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <div className="font-medium text-gray-900">
                  {activity.location}
                </div>
                <div className="text-sm text-gray-600">活动地点</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-500"
                onClick={onViewDetails}
              >
                查看详细地址
              </Button>
              <Button variant="outline" size="sm" onClick={onNavigate}>
                导航
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLocation;
