import { type FC } from "react";
import type { Activity } from "@/shared/types";

interface ActivityContentProps {
  activity: Activity;
}

const ActivityContent: FC<ActivityContentProps> = ({ activity }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">活动详情</h3>
      <div className="prose max-w-none text-gray-600 mb-4">
        <p>{activity.description}</p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">行程安排</h4>
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-3">
              <span>🕘</span>
              <span>09:00 北门入口集合，签到</span>
            </div>
            <div className="flex items-center gap-3">
              <span>🕙</span>
              <span>09:30 开始登山，沿主路线前行</span>
            </div>
            <div className="flex items-center gap-3">
              <span>🕐</span>
              <span>12:00 到达山顶休息点，午餐</span>
            </div>
            <div className="flex items-center gap-3">
              <span>🕒</span>
              <span>13:30 开始下山，可选择不同难度路线</span>
            </div>
            <div className="flex items-center gap-3">
              <span>🕓</span>
              <span>15:00 预计活动结束，自由解散</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">注意事项</h4>
          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-3">
              <span>👟</span>
              <span>请穿着舒适的运动鞋和运动服装</span>
            </div>
            <div className="flex items-center gap-3">
              <span>🧴</span>
              <span>请自备防晒用品、帽子和足够的水</span>
            </div>
            <div className="flex items-center gap-3">
              <span>🍱</span>
              <span>请自备午餐或小零食</span>
            </div>
            <div className="flex items-center gap-3">
              <span>☔</span>
              <span>如遇大雨将改期，小雨正常进行</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityContent;
