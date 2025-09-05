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
    images: [
      "https://picsum.photos/800/600?random=jazz1",
      "https://picsum.photos/800/600?random=jazz2",
      "https://picsum.photos/800/600?random=jazz3",
    ],
    price: 68,
    isFree: false,
    isJoined: true, // 测试用户已报名状态
    status: "published",
    tags: ["音乐", "爵士", "现场演出"],
    startTime: "2025-09-15T20:00:00Z", // 未来活动
    endTime: "2025-09-15T22:00:00Z",
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
    images: [
      "https://picsum.photos/800/600?random=coffee1",
      "https://picsum.photos/800/600?random=coffee2",
    ],
    price: 128,
    isFree: false,
    isJoined: false, // 测试用户未报名状态
    status: "published",
    tags: ["咖啡", "品鉴", "学习"],
    startTime: "2025-09-25T14:00:00Z", // 未来活动
    endTime: "2025-09-25T16:00:00Z",
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
    currentParticipants: 20,
    maxParticipants: 20, // 满员状态测试
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
    isJoined: false, // 测试用户未报名但已满员
    status: "published",
    tags: ["户外", "徒步", "健康"],
    startTime: "2025-09-20T09:00:00Z", // 未来活动
    endTime: "2025-09-20T17:00:00Z",
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
    isJoined: true, // 测试用户已报名但活动已结束
    status: "completed", // 已完成状态
    tags: ["读书", "分享", "交流"],
    startTime: "2024-08-28T19:00:00Z", // 已过期活动
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
  {
    id: "music-festival-2024",
    title: "周末音乐节",
    description:
      "为期两天的音乐盛宴，汇聚10+乐队现场表演，美食摊位，创意市集，与音乐爱好者一起度过难忘的周末时光。",
    category: "music",
    date: "6月25-26日",
    time: "10:00-22:00",
    location: "湖畔音乐广场",
    currentParticipants: 156,
    maxParticipants: 500,
    organizer: {
      id: "org-festival",
      username: "音乐节组委会",
      email: "festival@example.com",
      avatar: "https://picsum.photos/40/40?random=festival",
      bio: "专业音乐节策划团队",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    images: [
      "https://picsum.photos/800/600?random=festival1",
      "https://picsum.photos/800/600?random=festival2",
      "https://picsum.photos/800/600?random=festival3",
    ],
    price: 168,
    isFree: false,
    status: "published",
    tags: ["音乐节", "现场演出", "户外活动", "美食"],
    startTime: "2024-06-25T10:00:00Z",
    endTime: "2024-06-26T22:00:00Z",
    capacity: 500,
    coverImage: "https://picsum.photos/800/600?random=festival1",
    createdAt: "2024-06-01T10:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z",
    detailContent: `
      <h3>活动介绍</h3>
      <p>欢迎参加我们的周末音乐节！这是一场为期两天的音乐盛宴，汇聚了来自各地的优秀乐队和音乐人。</p>
      
      <h3>精彩亮点</h3>
      <ul>
        <li>10+知名乐队现场表演</li>
        <li>多种音乐风格：摇滚、民谣、电子、爵士</li>
        <li>丰富美食摊位和特色小吃</li>
        <li>创意市集和手工艺品展示</li>
        <li>互动游戏和抽奖活动</li>
        <li>专业音响设备和舞台效果</li>
      </ul>
      
      <h3>演出安排</h3>
      <h4>6月25日（周六）</h4>
      <ul>
        <li>10:00-12:00 开场表演 - 民谣组合</li>
        <li>14:00-16:00 摇滚专场</li>
        <li>18:00-20:00 电子音乐时间</li>
        <li>20:30-22:00 压轴演出</li>
      </ul>
      
      <h4>6月26日（周日）</h4>
      <ul>
        <li>10:00-12:00 爵士乐专场</li>
        <li>14:00-16:00 独立音乐人展示</li>
        <li>18:00-20:00 经典怀旧金曲</li>
        <li>20:30-22:00 闭幕大合唱</li>
      </ul>
      
      <h3>注意事项</h3>
      <ul>
        <li>门票包含两日活动，无需重复购买</li>
        <li>现场有充足的餐饮和休息区域</li>
        <li>建议穿着舒适的鞋子和服装</li>
        <li>雨天照常举行，有雨棚覆盖</li>
        <li>禁止自带酒精饮料</li>
        <li>现场有专业安保和医疗服务</li>
      </ul>
    `,
  },
  // 用户创建的活动
  {
    id: "3",
    title: "Python编程入门",
    description:
      "Python编程基础入门课程，适合编程初学者。从基础语法到实际项目练习，让你快速上手Python开发。",
    category: "learning",
    date: "8月28日",
    time: "19:00-21:00",
    location: "科技园会议室",
    currentParticipants: 15,
    maxParticipants: 30,
    organizer: {
      id: "current_user",
      username: "子龙",
      email: "zilong@example.com",
      avatar: "",
      bio: "热爱技术分享的程序员",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    images: [
      "https://picsum.photos/800/600?random=python1",
      "https://picsum.photos/800/600?random=python2",
    ],
    price: 0,
    isFree: true,
    isJoined: false, // 用户未报名但是自己组织的活动
    status: "published",
    tags: ["编程", "Python", "学习"],
    startTime: "2024-08-28T19:00:00Z",
    endTime: "2024-08-28T21:00:00Z",
    capacity: 30,
    coverImage: "https://picsum.photos/800/600?random=python",
    createdAt: "2024-08-25T10:00:00Z",
    updatedAt: "2024-08-25T10:00:00Z",
    detailContent: `
      <h3>课程介绍</h3>
      <p>这是一门专为编程初学者设计的Python入门课程，将带你从零开始学习Python编程。</p>
      
      <h3>课程内容</h3>
      <ul>
        <li>Python基础语法和数据类型</li>
        <li>控制结构：条件语句和循环</li>
        <li>函数的定义和使用</li>
        <li>列表、字典等数据结构</li>
        <li>实际项目练习</li>
      </ul>
      
      <h3>适合人群</h3>
      <ul>
        <li>编程零基础的初学者</li>
        <li>想要学习Python的技术爱好者</li>
        <li>希望提升编程技能的学生</li>
      </ul>
      
      <h3>课程收获</h3>
      <ul>
        <li>掌握Python基础语法</li>
        <li>能够编写简单的Python程序</li>
        <li>具备继续深入学习的基础</li>
        <li>获得实际项目经验</li>
      </ul>
    `,
  },
  {
    id: "4",
    title: "周末户外摄影",
    description:
      "户外摄影实践活动，拍摄美丽的自然风光，学习摄影技巧和构图方法。",
    category: "learning",
    date: "8月31日",
    time: "09:00-15:00",
    location: "西湖景区",
    currentParticipants: 8,
    maxParticipants: 15,
    organizer: {
      id: "current_user",
      username: "子龙",
      email: "zilong@example.com",
      avatar: "",
      bio: "摄影爱好者，喜欢记录生活美好",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    images: [
      "https://picsum.photos/800/600?random=photography1",
      "https://picsum.photos/800/600?random=photography2",
    ],
    price: 0,
    isFree: true,
    status: "published",
    tags: ["摄影", "户外", "风光"],
    startTime: "2025-09-10T09:00:00Z",
    endTime: "2025-09-10T15:00:00Z",
    capacity: 15,
    coverImage: "https://picsum.photos/800/600?random=photography",
    createdAt: "2024-08-26T14:00:00Z",
    updatedAt: "2024-08-26T14:00:00Z",
    detailContent: `
      <h3>活动介绍</h3>
      <p>这是一次户外摄影实践活动，我们将前往风景优美的西湖景区，在实际拍摄中学习摄影技巧。</p>
      
      <h3>活动安排</h3>
      <ul>
        <li>09:00-10:00 集合点名，摄影基础知识讲解</li>
        <li>10:00-12:00 风光摄影实践 - 湖光山色</li>
        <li>12:00-13:00 午餐休息</li>
        <li>13:00-15:00 人像摄影实践 - 构图与光影</li>
      </ul>
      
      <h3>学习内容</h3>
      <ul>
        <li>摄影基础理论：光圈、快门、ISO</li>
        <li>构图技巧：三分法、对称构图等</li>
        <li>风光摄影要点</li>
        <li>人像摄影技巧</li>
        <li>后期处理基础</li>
      </ul>
      
      <h3>携带物品</h3>
      <ul>
        <li>相机（单反或微单优先）</li>
        <li>备用电池和存储卡</li>
        <li>舒适的徒步鞋</li>
        <li>防晒用品</li>
        <li>水和简单食物</li>
      </ul>
    `,
  },
  {
    id: "5",
    title: "读书分享：《人类简史》",
    description:
      "分享《人类简史》的读书心得，讨论人类发展历程，一起探讨历史与现实的联系。",
    category: "reading",
    date: "9月2日",
    time: "14:00-16:00",
    location: "咖啡书屋",
    currentParticipants: 12,
    maxParticipants: 20,
    organizer: {
      id: "current_user",
      username: "子龙",
      email: "zilong@example.com",
      avatar: "",
      bio: "热爱阅读和思考的文学爱好者",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    images: [
      "https://picsum.photos/800/600?random=reading1",
      "https://picsum.photos/800/600?random=reading2",
    ],
    price: 0,
    isFree: true,
    status: "published",
    tags: ["读书", "历史", "分享"],
    startTime: "2025-09-05T14:00:00Z",
    endTime: "2025-09-05T16:00:00Z",
    capacity: 20,
    coverImage: "https://picsum.photos/800/600?random=reading",
    createdAt: "2024-08-28T16:00:00Z",
    updatedAt: "2024-08-28T16:00:00Z",
    detailContent: `
      <h3>读书会介绍</h3>
      <p>《人类简史》是一本关于人类发展历程的经典著作，本次读书会将围绕这本书展开深入讨论。</p>
      
      <h3>讨论主题</h3>
      <ul>
        <li>认知革命：语言的力量</li>
        <li>农业革命：文明的开始</li>
        <li>科学革命：现代世界的诞生</li>
        <li>人工智能时代的思考</li>
      </ul>
      
      <h3>活动流程</h3>
      <ul>
        <li>14:00-14:30 自我介绍和开场</li>
        <li>14:30-15:30 核心章节讨论</li>
        <li>15:30-15:45 茶歇时间</li>
        <li>15:45-16:00 总结和下期预告</li>
      </ul>
      
      <h3>参与要求</h3>
      <ul>
        <li>至少读过书籍的主要章节</li>
        <li>准备一个感兴趣的讨论点</li>
        <li>带着开放的心态参与讨论</li>
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
