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
      date: "6月15日 周三",
      time: "20:00-22:00",
      location: "蓝调酒吧",
      description:
        "现场爵士乐演出，多位知名爵士乐手演奏经典曲目，还有即兴互动环节。",
      status: "registered",
      daysLeft: 2,
    },
    {
      id: "2",
      title: "周末爬山活动",
      category: "户外活动",
      categoryColor: "bg-blue-100 text-blue-600",
      date: "6月18日 周六",
      time: "09:00-15:00",
      location: "莫干山风景区",
      description:
        "一起登山，欣赏美丽的自然风光，感受大自然的魅力。适合所有年龄段的参与者。",
      status: "registered",
      daysLeft: 5,
    },
    {
      id: "3",
      title: "摄影技巧分享会",
      category: "技能分享",
      categoryColor: "bg-green-100 text-green-600",
      date: "6月24日 周五",
      time: "14:00-16:00",
      location: "创意空间",
      description:
        "分享实用的摄影技巧和后期处理方法，适合初学者和有一定基础的摄影爱好者。",
      status: "organized",
      daysLeft: 11,
    },
    {
      id: "4",
      title: "周末音乐分享会",
      category: "音乐",
      categoryColor: "bg-purple-100 text-purple-600",
      date: "8月30日 周五",
      time: "19:00-21:00",
      location: "文化活动中心",
      description: "分享最新音乐作品，与音乐爱好者交流心得，现场还有小型演出。",
      status: "registered",
      daysLeft: 1,
    },
    {
      id: "5",
      title: "读书会：《深度工作》",
      category: "学习",
      categoryColor: "bg-yellow-100 text-yellow-600",
      date: "9月10日 周日",
      time: "15:00-17:00",
      location: "咖啡书屋",
      description:
        "讨论《深度工作》一书的核心理念，分享实践心得，提高工作效率。",
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
