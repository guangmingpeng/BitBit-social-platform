import type { Activity } from "@/shared/types";

// 活动数据
export const mockActivities: Activity[] = [
  {
    id: "1",
    title: "爵士乐现场演出",
    description:
      "享受一场精彩的爵士乐演出，与音乐爱好者一起度过美好的夜晚。现场将有专业乐队演奏经典爵士曲目，还有茶点和小食提供。",
    category: "music",
    date: "8月25日",
    time: "20:00-22:00",
    location: "蓝调酒吧",
    currentParticipants: 42,
    maxParticipants: 50,
    organizer: {
      id: "org1",
      username: "musicclub",
      email: "music@example.com",
      avatar: "https://picsum.photos/40/40?random=1",
      bio: "专注于推广爵士乐文化",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    images: ["https://picsum.photos/800/600?random=jazz"],
    price: 68,
    isFree: false,
    status: "published",
    tags: ["音乐", "爵士", "现场演出"],
    startTime: "2024-08-25T20:00:00Z",
    endTime: "2024-08-25T22:00:00Z",
    capacity: 50,
    coverImage: "https://picsum.photos/800/600?random=jazz",
    createdAt: "2024-08-20T10:00:00Z",
    updatedAt: "2024-08-20T10:00:00Z",
    detailContent: `
      <h3>活动介绍</h3>
      <p>欢迎来到我们的爵士乐现场演出！这是一场为爵士乐爱好者精心准备的音乐盛宴。</p>
      
      <h3>演出亮点</h3>
      <ul>
        <li>专业爵士乐队现场演奏</li>
        <li>经典曲目与现代创新的完美结合</li>
        <li>提供精美茶点和小食</li>
        <li>与音乐家互动交流的机会</li>
      </ul>
      
      <h3>注意事项</h3>
      <ul>
        <li>请提前15分钟到场</li>
        <li>演出期间请保持安静</li>
        <li>可以自带乐器参与即兴演奏</li>
      </ul>
    `,
  },
  {
    id: "2",
    title: "咖啡品鉴工作坊",
    description:
      "学习咖啡品鉴技巧，从基础知识到专业技能。由资深咖啡师亲自指导，体验不同产区的精品咖啡。",
    category: "food",
    date: "8月26日",
    time: "14:00-16:00",
    location: "星空咖啡馆",
    currentParticipants: 18,
    maxParticipants: 25,
    organizer: {
      id: "org2",
      username: "coffeemaster",
      email: "coffee@example.com",
      avatar: "https://picsum.photos/40/40?random=2",
      bio: "资深咖啡师，专注咖啡文化推广",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    images: ["https://picsum.photos/800/600?random=coffee"],
    price: 128,
    isFree: false,
    status: "published",
    tags: ["咖啡", "品鉴", "学习"],
    startTime: "2024-08-26T14:00:00Z",
    endTime: "2024-08-26T16:00:00Z",
    capacity: 25,
    coverImage: "https://picsum.photos/800/600?random=coffee",
    createdAt: "2024-08-20T11:00:00Z",
    updatedAt: "2024-08-20T11:00:00Z",
    detailContent: `
      <h3>课程内容</h3>
      <p>这是一堂专业的咖啡品鉴课程，由经验丰富的咖啡师带领大家探索咖啡的奥秘。</p>
      
      <h3>学习收获</h3>
      <ul>
        <li>了解咖啡豆的产地和处理方式</li>
        <li>掌握咖啡品鉴的基本技巧</li>
        <li>体验不同烘焙度的咖啡差异</li>
        <li>学习手冲咖啡的基本方法</li>
      </ul>
      
      <h3>费用包含</h3>
      <ul>
        <li>精品咖啡豆品鉴</li>
        <li>专业器具使用</li>
        <li>咖啡知识资料包</li>
        <li>精美小点心</li>
      </ul>
    `,
  },
  {
    id: "3",
    title: "周末徒步活动",
    description:
      "享受自然风光，结识新朋友。轻松的徒步路线，适合各个年龄段参与。",
    category: "learning",
    date: "8月27日",
    time: "09:00-17:00",
    location: "香山公园",
    currentParticipants: 12,
    maxParticipants: 20,
    organizer: {
      id: "org3",
      username: "outdoorclub",
      email: "outdoor@example.com",
      avatar: "https://picsum.photos/40/40?random=3",
      bio: "专业户外活动组织",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    images: ["https://picsum.photos/800/600?random=hiking"],
    price: 0,
    isFree: true,
    status: "published",
    tags: ["户外", "徒步", "健康"],
    startTime: "2024-08-27T09:00:00Z",
    endTime: "2024-08-27T17:00:00Z",
    capacity: 20,
    coverImage: "https://picsum.photos/800/600?random=hiking",
    createdAt: "2024-08-20T12:00:00Z",
    updatedAt: "2024-08-20T12:00:00Z",
    detailContent: `
      <h3>活动安排</h3>
      <p>一次轻松愉快的户外徒步活动，让我们在大自然中放松身心，结识新朋友。</p>
      
      <h3>路线介绍</h3>
      <ul>
        <li>总距离约8公里，难度适中</li>
        <li>沿途有多个观景点</li>
        <li>预计用时6-7小时（含休息）</li>
        <li>终点有茶点补给</li>
      </ul>
      
      <h3>装备建议</h3>
      <ul>
        <li>舒适的徒步鞋</li>
        <li>防晒用品</li>
        <li>足够的饮水</li>
        <li>轻便背包</li>
      </ul>
    `,
  },
  {
    id: "4",
    title: "读书分享会",
    description: "分享最近阅读的好书，交流读书心得。本期主题：《深度工作》",
    category: "reading",
    date: "8月28日",
    time: "19:00-21:00",
    location: "市图书馆三楼",
    currentParticipants: 8,
    maxParticipants: 15,
    organizer: {
      id: "org4",
      username: "bookclub",
      email: "reading@example.com",
      avatar: "https://picsum.photos/40/40?random=4",
      bio: "热爱阅读，分享智慧",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    images: ["https://picsum.photos/800/600?random=books"],
    price: 0,
    isFree: true,
    status: "published",
    tags: ["读书", "分享", "交流"],
    startTime: "2024-08-28T19:00:00Z",
    endTime: "2024-08-28T21:00:00Z",
    capacity: 15,
    coverImage: "https://picsum.photos/800/600?random=books",
    createdAt: "2024-08-20T13:00:00Z",
    updatedAt: "2024-08-20T13:00:00Z",
    detailContent: `
      <h3>本期主题</h3>
      <p>《深度工作》- 如何在信息爆炸的时代保持专注，提高工作效率。</p>
      
      <h3>活动形式</h3>
      <ul>
        <li>主题分享（30分钟）</li>
        <li>小组讨论（45分钟）</li>
        <li>自由交流（45分钟）</li>
      </ul>
      
      <h3>参与方式</h3>
      <ul>
        <li>可以分享读过的好书</li>
        <li>交流读书心得和方法</li>
        <li>推荐值得阅读的书籍</li>
      </ul>
    `,
  },
];

// 获取所有活动
export const getAllActivities = (): Activity[] => {
  return mockActivities;
};

// 根据ID获取活动
export const getActivityById = (id: string): Activity | undefined => {
  return mockActivities.find((activity) => activity.id === id);
};

// 根据分类获取活动
export const getActivitiesByCategory = (category: string): Activity[] => {
  if (!category) return mockActivities;
  return mockActivities.filter((activity) => activity.category === category);
};

// 搜索活动
export const searchActivities = (searchTerm: string): Activity[] => {
  if (!searchTerm) return mockActivities;
  const term = searchTerm.toLowerCase();
  return mockActivities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(term) ||
      activity.description.toLowerCase().includes(term) ||
      activity.tags.some((tag) => tag.toLowerCase().includes(term))
  );
};

// 获取热门活动（按参与人数排序）
export const getPopularActivities = (limit: number = 4): Activity[] => {
  return [...mockActivities]
    .sort((a, b) => b.currentParticipants - a.currentParticipants)
    .slice(0, limit);
};

// 获取即将开始的活动
export const getUpcomingActivities = (limit: number = 4): Activity[] => {
  const now = new Date();
  return mockActivities
    .filter((activity) => new Date(activity.startTime) > now)
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    )
    .slice(0, limit);
};
