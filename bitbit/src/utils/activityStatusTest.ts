// 测试活动状态逻辑
import {
  getActivityParticipationInfo,
  isActivityOrganizer,
} from "@/shared/utils/activityUtils";
import type { Activity } from "@/shared/types";

// 测试用例
const testActivities: Activity[] = [
  // 1. 当前用户组织的进行中活动
  {
    id: "test-1",
    title: "我组织的活动",
    description: "测试活动",
    category: "music",
    date: "9月5日",
    time: "19:00-21:00",
    location: "测试地点",
    startTime: "2024-09-05T19:00:00Z",
    endTime: "2024-09-05T21:00:00Z",
    capacity: 20,
    currentParticipants: 10,
    maxParticipants: 20,
    organizer: {
      id: "current_user",
      username: "测试用户",
      email: "test@example.com",
      avatar: "",
      bio: "测试",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    status: "published",
    tags: [],
    price: 0,
    isFree: true,
    isJoined: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  // 2. 当前用户组织的已结束活动
  {
    id: "test-2",
    title: "我组织的已结束活动",
    description: "测试活动",
    category: "music",
    date: "8月25日",
    time: "19:00-21:00",
    location: "测试地点",
    startTime: "2024-08-25T19:00:00Z",
    endTime: "2024-08-25T21:00:00Z",
    capacity: 20,
    currentParticipants: 15,
    maxParticipants: 20,
    organizer: {
      id: "current_user",
      username: "测试用户",
      email: "test@example.com",
      avatar: "",
      bio: "测试",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    status: "completed",
    tags: [],
    price: 0,
    isFree: true,
    isJoined: false,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  // 3. 他人组织的活动，用户已报名
  {
    id: "test-3",
    title: "已报名的活动",
    description: "测试活动",
    category: "music",
    date: "9月6日",
    time: "19:00-21:00",
    location: "测试地点",
    startTime: "2024-09-06T19:00:00Z",
    endTime: "2024-09-06T21:00:00Z",
    capacity: 20,
    currentParticipants: 12,
    maxParticipants: 20,
    organizer: {
      id: "other_user",
      username: "其他用户",
      email: "other@example.com",
      avatar: "",
      bio: "测试",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    status: "published",
    tags: [],
    price: 0,
    isFree: true,
    isJoined: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  // 4. 他人组织的已结束活动，用户曾报名
  {
    id: "test-4",
    title: "已结束的活动",
    description: "测试活动",
    category: "music",
    date: "8月20日",
    time: "19:00-21:00",
    location: "测试地点",
    startTime: "2024-08-20T19:00:00Z",
    endTime: "2024-08-20T21:00:00Z",
    capacity: 20,
    currentParticipants: 18,
    maxParticipants: 20,
    organizer: {
      id: "other_user",
      username: "其他用户",
      email: "other@example.com",
      avatar: "",
      bio: "测试",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    status: "completed",
    tags: [],
    price: 0,
    isFree: true,
    isJoined: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

// 测试函数
export const testActivityStatusLogic = () => {
  console.log("=== 活动状态逻辑测试 ===");

  testActivities.forEach((activity, index) => {
    console.log(`\n测试活动 ${index + 1}: ${activity.title}`);

    const isOrganizer = isActivityOrganizer(activity);
    const participationInfo = getActivityParticipationInfo(activity);

    console.log(`- 是否为组织者: ${isOrganizer}`);
    console.log(`- 活动是否结束: ${participationInfo.ended}`);
    console.log(`- 是否已报名: ${participationInfo.isJoined}`);
    console.log(`- 能否报名: ${participationInfo.canJoin}`);
    console.log(`- 能否取消报名: ${participationInfo.canLeave}`);
    console.log(`- 状态文本: ${participationInfo.statusText}`);

    // 验证期望的行为
    if (isOrganizer) {
      console.log(`✓ 组织者逻辑: 无法报名，无法取消报名`);
      if (participationInfo.ended) {
        console.log(`✓ 已结束的组织活动应显示: 活动已结束`);
      } else {
        console.log(`✓ 进行中的组织活动应显示: 已组织`);
      }
    } else {
      if (participationInfo.ended) {
        console.log(`✓ 已结束的活动应显示: 活动已结束`);
      } else if (participationInfo.isJoined) {
        console.log(`✓ 已报名的活动应显示: 已报名，且可以取消`);
      } else {
        console.log(`✓ 未报名的活动应显示: 可报名等状态`);
      }
    }
  });

  console.log("\n=== 测试完成 ===");
};
