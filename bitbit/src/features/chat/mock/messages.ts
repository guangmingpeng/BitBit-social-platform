import type { Message } from "@/features/chat/types";

export const mockMessages: Message[] = [
  {
    id: "msg1",
    content: "大家好！欢迎参加这次的户外徒步活动！明天天气很好，非常适合登山。",
    senderId: "1",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1天前
    type: "text",
    status: "read",
  },
  {
    id: "msg2",
    content: "太棒了！我已经准备好装备了。Alice，这次路线大概多长？",
    senderId: "2",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20), // 20小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg3",
    content: "路线全程大约12公里，预计用时5-6小时。大家记得带足够的水和食物。",
    senderId: "1",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18), // 18小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg4",
    content: "什么时间开始呢？我可以早点到。",
    senderId: "3",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
    type: "text",
    status: "delivered",
  },
  {
    id: "msg5",
    content: "明天早上8点在公园门口集合，大家记得穿防滑的登山鞋。",
    senderId: "1",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1小时前
    type: "text",
    status: "delivered",
  },
  {
    id: "msg6",
    content: "收到！我会准时到达的。需要我带什么公用装备吗？",
    senderId: "4",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
    type: "text",
    status: "delivered",
  },
  {
    id: "msg7",
    content: "我可以带急救包和对讲机，大家觉得怎么样？",
    senderId: "5",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15分钟前
    type: "text",
    status: "sent",
  },
  {
    id: "msg8",
    content: "太好了！Evan的提议很棒，安全第一。我会带相机记录这次旅行。",
    senderId: "6",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5分钟前
    type: "text",
    status: "sent",
  },
  // conv2的消息 - 与Bob Wang的私聊
  {
    id: "msg_conv2_1",
    content: "嗨Diana，明天的徒步活动你准备去吗？",
    senderId: "2",
    conversationId: "conv2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg_conv2_2",
    content: "当然！我已经准备好了。你有什么好的拍照建议吗？",
    senderId: "4",
    conversationId: "conv2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg_conv2_3",
    content: "明天徒步活动记得带相机哦！",
    senderId: "2",
    conversationId: "conv2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1小时前
    type: "text",
    status: "read",
  },
  // conv3的消息 - 瑜伽晨练
  {
    id: "msg_conv3_1",
    content: "大家好！欢迎参加我们的瑜伽晨练活动。",
    senderId: "4",
    conversationId: "conv3",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2天前
    type: "text",
    status: "read",
  },
  {
    id: "msg_conv3_2",
    content: "这个瑜伽课程很适合初学者吗？我是第一次练习。",
    senderId: "1",
    conversationId: "conv3",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6小时前
    type: "text",
    status: "delivered",
  },
  {
    id: "msg_conv3_3",
    content: "当然适合！我会根据大家的水平调整动作难度。",
    senderId: "4",
    conversationId: "conv3",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4小时前
    type: "text",
    status: "delivered",
  },
  // conv4的消息 - 与Charlie的私聊
  {
    id: "msg_conv4_1",
    content: "你好Charlie！听说你是健身达人，能给我一些跑步建议吗？",
    senderId: "4",
    conversationId: "conv4",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg_conv4_2",
    content: "当然可以！你现在的跑步水平怎么样？",
    senderId: "3",
    conversationId: "conv4",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7), // 7小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg_conv4_3",
    content: "我刚开始跑步，每次大概能跑3-5公里。",
    senderId: "4",
    conversationId: "conv4",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg_conv4_4",
    content: "很好的开始！建议你先保持现有的距离，重点关注跑步姿势和呼吸节奏。",
    senderId: "3",
    conversationId: "conv4",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5小时前
    type: "text",
    status: "delivered",
  },
  // conv5的消息 - 读书分享会
  {
    id: "msg_conv5_1",
    content: "欢迎大家参加我们的读书分享会！",
    senderId: "5",
    conversationId: "conv5",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1天前
    type: "text",
    status: "read",
  },
  {
    id: "msg_conv5_2",
    content: "这期我们要讨论哪本书呢？",
    senderId: "8",
    conversationId: "conv5",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg_conv5_3",
    content: "这次我们来分享《人类简史》，大家都准备好了吗？",
    senderId: "5",
    conversationId: "conv5",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3小时前
    type: "text",
    status: "delivered",
  },
  // conv6的消息 - 周末烘焙工坊
  {
    id: "msg_conv6_1",
    content: "大家好！欢迎来到我们的烘焙工坊，今天我们要学做蛋糕！",
    senderId: "7",
    conversationId: "conv6",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 16), // 16小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg_conv6_2",
    content: "太棒了！我一直想学烘焙，需要带什么工具吗？",
    senderId: "4",
    conversationId: "conv6",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 14), // 14小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg_conv6_3",
    content: "工具我们都准备好了，大家只需要带好心情就可以了！😊",
    senderId: "7",
    conversationId: "conv6",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 13), // 13小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg_conv6_4",
    content: "什么时候开始呢？我很期待！",
    senderId: "9",
    conversationId: "conv6",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
    type: "text",
    status: "delivered",
  },
  // conv7的消息 - 与Grace的私聊
  {
    id: "msg_conv7_1",
    content: "Grace，你的音乐分享活动什么时候开始？",
    senderId: "4",
    conversationId: "conv7",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg_conv7_2",
    content: "明天晚上7点！我会分享一些古典音乐和爵士乐。",
    senderId: "8",
    conversationId: "conv7",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 9), // 9小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg_conv7_3",
    content: "太好了！我会准时参加的。",
    senderId: "4",
    conversationId: "conv7",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8小时前
    type: "text",
    status: "delivered",
  },
  // conv8的消息 - 与Kate Li的私聊
  {
    id: "msg_kate1",
    content: "关于情绪管理的那个话题，我们可以进一步讨论",
    senderId: "11",
    conversationId: "conv8",
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    type: "text",
    status: "read",
  },
  // conv9的消息 - 与Leo Zhang的私聊
  {
    id: "msg_leo1",
    content: "有个新的创业想法想和你聊聊，什么时候有空？",
    senderId: "12",
    conversationId: "conv9",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    type: "text",
    status: "read",
  },
  // conv10的消息 - 与Mia Wang的私聊
  {
    id: "msg_mia1",
    content: "下周的现代舞课程你要不要一起来？",
    senderId: "13",
    conversationId: "conv10",
    timestamp: new Date(Date.now() - 1000 * 60 * 35),
    type: "text",
    status: "delivered",
  },
  // conv11的消息 - 与Nick Liu的私聊
  {
    id: "msg_nick1",
    content: "那个建筑设计方案很不错，我们可以进一步优化",
    senderId: "14",
    conversationId: "conv11",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    type: "text",
    status: "read",
  },
  // conv12的消息 - 与Olivia Zhou的私聊
  {
    id: "msg_olivia1",
    content: "营养计划制定好了，我发给你看看",
    senderId: "15",
    conversationId: "conv12",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    type: "text",
    status: "delivered",
  },
];
