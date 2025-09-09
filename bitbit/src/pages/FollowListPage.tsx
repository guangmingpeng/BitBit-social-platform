import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { FollowList } from "@/features/profile/components/FollowList";

/**
 * 关注/粉丝列表页面
 * 根据路径判断显示关注列表还是粉丝列表
 */
export const FollowListPage: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const location = useLocation();

  // 根据路径判断列表类型
  const isFollowingList = location.pathname.includes("following");
  const type = isFollowingList ? "following" : "followers";

  return (
    <div className="min-h-screen bg-gray-50" data-section="follow-list">
      <FollowList type={type} userId={userId} />
    </div>
  );
};

export default FollowListPage;
