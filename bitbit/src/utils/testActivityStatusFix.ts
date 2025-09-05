// 测试活动状态一致性修复
import { getAllActivities } from "@/shared/data/activities";
import { canJoinActivity, isActivityEnded } from "@/shared/utils/activityUtils";

export const testActivityStatusConsistency = () => {
  console.log("=== 测试活动状态一致性修复 ===");

  const activities = getAllActivities();

  // 筛选出状态为 published 的活动
  const publishedActivities = activities.filter(
    (activity) => activity.status === "published"
  );

  console.log(
    `\n找到 ${publishedActivities.length} 个状态为 published 的活动:\n`
  );

  publishedActivities.forEach((activity, index) => {
    const isEnded = isActivityEnded(activity);
    const canJoin = canJoinActivity(activity);
    const endTime = new Date(activity.endTime);
    const now = new Date();
    const isPastEndTime = endTime < now;

    console.log(`${index + 1}. ${activity.title}`);
    console.log(`   结束时间: ${activity.endTime}`);
    console.log(`   当前时间: ${now.toISOString()}`);
    console.log(`   时间已过期: ${isPastEndTime}`);
    console.log(`   isActivityEnded(): ${isEnded}`);
    console.log(`   canJoinActivity(): ${canJoin}`);
    console.log(`   用户已报名: ${activity.isJoined}`);

    // 检查逻辑一致性
    if (isPastEndTime && canJoin) {
      console.log(`   ⚠️  警告: 已过期活动仍可报名!`);
    } else if (isEnded && canJoin) {
      console.log(`   ⚠️  警告: 已结束活动仍可报名!`);
    } else if (
      !isEnded &&
      !canJoin &&
      !activity.isJoined &&
      activity.currentParticipants < activity.maxParticipants
    ) {
      console.log(`   ⚠️  警告: 进行中活动无法报名!`);
    } else {
      console.log(`   ✅ 状态逻辑正确`);
    }

    console.log("");
  });

  console.log("=== 测试完成 ===");
};

// 页面加载时自动执行测试
if (typeof window !== "undefined") {
  testActivityStatusConsistency();
}
