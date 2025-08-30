import { type FC } from "react";
import { Button, Card, CardContent } from "@/components/ui";
import type { Activity } from "@/shared/types";

interface OrganizerInfoProps {
  activity: Activity;
  onFollow?: () => void;
}

const OrganizerInfo: FC<OrganizerInfoProps> = ({ activity, onFollow }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">组织者</h3>
      <Card className="border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {activity.organizer.username.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {activity.organizer.username}
                </div>
                <div className="text-sm text-gray-600">
                  已组织32次活动 | 4.9星评分
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={onFollow}>
              关注
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizerInfo;
