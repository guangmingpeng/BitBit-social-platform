import type { ProfileData } from "../types";

// 模拟数据
export const mockProfileData: ProfileData = {
  user: {
    id: "1",
    name: "子龙",
    bio: "热爱音乐和摄影的技术爱好者",
    avatar: "",
    level: 3,
    following: 128,
    followers: 256,
    joinedDate: "2023-01-15",
  },
  activities: [
    {
      id: "1",
      title: "爵士乐现场演出",
      category: "音乐表演",
      categoryColor: "bg-pink-100 text-pink-600",
      date: "8月25日",
      time: "20:00-22:00",
      location: "蓝调酒吧",
      description:
        "享受一场精彩的爵士乐演出，与音乐爱好者一起度过美好的夜晚。现场将有专业乐队演奏经典爵士曲目，还有茶点和小食提供。",
      status: "registered",
      daysLeft: 2,
    },
    {
      id: "2",
      title: "咖啡品鉴工作坊",
      category: "美食分享",
      categoryColor: "bg-orange-100 text-orange-600",
      date: "8月26日",
      time: "14:00-16:00",
      location: "星空咖啡馆",
      description:
        "学习咖啡品鉴技巧，从基础知识到专业技能。由资深咖啡师亲自指导，体验不同产区的精品咖啡。",
      status: "registered",
      daysLeft: 3,
    },
    {
      id: "3",
      title: "我组织的Python编程入门课程",
      category: "技能分享",
      categoryColor: "bg-green-100 text-green-600",
      date: "9月28日",
      time: "19:00-21:00",
      location: "科技园会议室",
      description:
        "为初学者准备的Python编程入门课程，从基础语法到实际项目开发。",
      status: "organized", // 我组织的活动
      daysLeft: 7,
      maxParticipants: 30,
      currentParticipants: 22,
    },
    {
      id: "4",
      title: "我组织的已结束摄影交流会",
      category: "技能分享",
      categoryColor: "bg-blue-100 text-blue-600",
      date: "8月15日",
      time: "14:00-17:00",
      location: "中央公园",
      description: "摄影爱好者交流活动，分享摄影技巧和作品。",
      status: "ended", // 我组织的已结束活动
      daysLeft: 0,
      maxParticipants: 25,
      currentParticipants: 18,
    },
    {
      id: "5",
      title: "参加过的已结束读书会",
      category: "阅读",
      categoryColor: "bg-purple-100 text-purple-600",
      date: "8月10日",
      time: "19:00-21:00",
      location: "市图书馆",
      description: "《深度工作》读书分享会。",
      status: "completed", // 参加过的已结束活动
      daysLeft: 0,
      maxParticipants: 15,
      currentParticipants: 12,
    },
    {
      id: "3",
      title: "Python编程入门",
      category: "技能分享",
      categoryColor: "bg-green-100 text-green-600",
      date: "8月28日",
      time: "19:00-21:00",
      location: "科技园会议室",
      description:
        "Python编程基础入门课程，适合编程初学者。从基础语法到实际项目练习，让你快速上手Python开发。",
      status: "organized",
      daysLeft: 5,
    },
    {
      id: "4",
      title: "周末户外摄影",
      category: "户外活动",
      categoryColor: "bg-blue-100 text-blue-600",
      date: "8月31日",
      time: "09:00-15:00",
      location: "西湖景区",
      description:
        "户外摄影实践活动，拍摄美丽的自然风光，学习摄影技巧和构图方法。",
      status: "organized",
      daysLeft: 8,
    },
    {
      id: "5",
      title: "读书分享：《人类简史》",
      category: "学习",
      categoryColor: "bg-yellow-100 text-yellow-600",
      date: "9月2日",
      time: "14:00-16:00",
      location: "咖啡书屋",
      description:
        "分享《人类简史》的读书心得，讨论人类发展历程，一起探讨历史与现实的联系。",
      status: "organized",
      daysLeft: 10,
    },
    {
      id: "6",
      title: "城市骑行探索",
      category: "户外",
      categoryColor: "bg-green-100 text-green-600",
      date: "7月15日 周六",
      time: "08:00-12:00",
      location: "奥林匹克公园",
      description:
        "骑行探索城市美景，领略不同角度的城市风光，适合所有骑行爱好者。",
      status: "ended",
    },
  ],
  achievements: [
    {
      id: "1",
      title: "活动达人",
      icon: "🏆",
      color: "yellow",
      isUnlocked: true,
    },
    {
      id: "2",
      title: "社交新星",
      icon: "🎯",
      color: "blue",
      isUnlocked: true,
    },
    {
      id: "3",
      title: "音乐爱好者",
      icon: "🎵",
      color: "pink",
      isUnlocked: true,
    },
    {
      id: "4",
      title: "内容创作者",
      icon: "📝",
      color: "gray",
      isUnlocked: false,
    },
    {
      id: "5",
      title: "人气之星",
      icon: "🌟",
      color: "gray",
      isUnlocked: false,
    },
  ],
  levelProgress: {
    currentLevel: 3,
    currentExp: 75,
    nextLevelExp: 100,
    expToNext: 25,
  },
  quickAccessItems: [
    {
      id: "1",
      title: "我的订单",
      description: "查看全部交易记录",
      icon: "📋",
      color: "bg-blue-100",
    },
    {
      id: "2",
      title: "我关注的",
      description: "好友、活动和内容",
      icon: "❤️",
      color: "bg-pink-100",
    },
    {
      id: "3",
      title: "我的消息",
      description: "查看私信和通知",
      icon: "💬",
      color: "bg-green-100",
    },
    {
      id: "4",
      title: "设置",
      description: "账号和隐私设置",
      icon: "⚙️",
      color: "bg-purple-100",
    },
  ],
};

export const getProfileData = async (): Promise<ProfileData> => {
  // 模拟API调用延迟
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockProfileData;
};
