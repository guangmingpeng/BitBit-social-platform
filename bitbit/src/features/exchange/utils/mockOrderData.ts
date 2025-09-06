import type { OrderDetail } from "../types";

// 模拟订单详情数据
export const mockOrderDetails: Record<string, OrderDetail> = {
  "order-1": {
    id: "order-1",
    type: "buy",
    itemTitle: "MacBook Pro 13寸 M2芯片",
    itemImage: "https://picsum.photos/300/300?random=macbook1",
    itemDescription:
      "全新未拆封，原装配件齐全，支持官方保修。配置：8GB内存，256GB存储，深空灰色。",
    price: 8500,
    status: "completed",
    createTime: "2024-08-20",
    orderNumber: "BB20240820001",

    otherParty: {
      id: "seller-1",
      name: "数码达人",
      avatar: "https://picsum.photos/80/80?random=seller1",
      rating: 4.8,
      creditLevel: "信用优良",
      responseTime: "平均2小时内回复",
    },

    transactionDetails: {
      paymentMethod: "在线支付",
      deliveryMethod: "快递配送",
      totalAmount: 8500,
      fees: 0,
    },

    progress: [
      {
        id: "progress-1",
        title: "订单已送达",
        description: "商品已成功送达，请确认收货",
        timestamp: "2024-08-22 14:30",
        status: "completed",
      },
      {
        id: "progress-2",
        title: "订单已发货",
        description: "卖家已发货，正在配送中",
        timestamp: "2024-08-21 09:15",
        status: "completed",
      },
      {
        id: "progress-3",
        title: "订单已创建",
        description: "订单创建成功，等待卖家发货",
        timestamp: "2024-08-20 16:45",
        status: "completed",
      },
    ],

    availableActions: [
      {
        id: "confirm-receipt",
        label: "确认收货",
        type: "primary",
        action: "confirm_receipt",
      },
      {
        id: "view-logistics",
        label: "查看物流",
        type: "secondary",
        action: "view_logistics",
      },
      {
        id: "contact-other",
        label: "联系对方",
        type: "secondary",
        action: "contact_other",
      },
    ],
  },

  "order-2": {
    id: "order-2",
    type: "sell",
    itemTitle: "iPhone 14 Pro 256G 深空黑",
    itemImage: "https://picsum.photos/300/300?random=iphone1",
    itemDescription: "九成新，无磕碰，功能正常，原装充电器和包装盒齐全。",
    price: 6800,
    status: "shipped",
    createTime: "2024-08-25",
    orderNumber: "BB20240825002",

    otherParty: {
      id: "buyer-1",
      name: "手机收藏家",
      avatar: "https://picsum.photos/80/80?random=buyer1",
      rating: 4.5,
      creditLevel: "信用良好",
      responseTime: "平均4小时内回复",
    },

    transactionDetails: {
      paymentMethod: "在线支付",
      deliveryMethod: "快递配送",
      totalAmount: 6800,
      fees: 20,
    },

    progress: [
      {
        id: "progress-1",
        title: "商品已发货",
        description: "已通过顺丰快递发出，预计1-2天到达",
        timestamp: "2024-08-26 10:30",
        status: "completed",
      },
      {
        id: "progress-2",
        title: "买家已付款",
        description: "买家已完成付款，等待发货",
        timestamp: "2024-08-25 15:20",
        status: "completed",
      },
      {
        id: "progress-3",
        title: "订单已创建",
        description: "订单创建成功，等待买家付款",
        timestamp: "2024-08-25 12:00",
        status: "completed",
      },
    ],

    availableActions: [
      {
        id: "view-logistics",
        label: "查看物流",
        type: "primary",
        action: "view_logistics",
      },
      {
        id: "contact-buyer",
        label: "联系买家",
        type: "secondary",
        action: "contact_other",
      },
    ],
  },

  "order-3": {
    id: "order-3",
    type: "exchange",
    itemTitle: "Sony A7M3 全画幅相机",
    itemImage: "https://picsum.photos/300/300?random=sony1",
    itemDescription: "想要交换 Canon EOS R6 或同等价值的全画幅相机。",
    price: 0,
    status: "pending",
    createTime: "2024-08-28",
    orderNumber: "BB20240828003",

    otherParty: {
      id: "photographer-1",
      name: "摄影师小王",
      avatar: "https://picsum.photos/80/80?random=photographer1",
      rating: 4.9,
      creditLevel: "信用极佳",
      responseTime: "平均1小时内回复",
    },

    transactionDetails: {
      paymentMethod: "物品交换",
      deliveryMethod: "面对面交换",
      totalAmount: 0,
      fees: 0,
    },

    progress: [
      {
        id: "progress-1",
        title: "等待确认交换",
        description: "对方正在考虑交换提议",
        timestamp: "2024-08-28 14:15",
        status: "current",
      },
      {
        id: "progress-2",
        title: "交换意向已发送",
        description: "已向对方发送交换请求",
        timestamp: "2024-08-28 14:15",
        status: "completed",
      },
    ],

    availableActions: [
      {
        id: "cancel-exchange",
        label: "取消交换",
        type: "danger",
        action: "cancel_exchange",
      },
      {
        id: "contact-other",
        label: "联系对方",
        type: "secondary",
        action: "contact_other",
      },
    ],
  },
};

export const getOrderDetail = (orderId: string): OrderDetail | null => {
  return mockOrderDetails[orderId] || null;
};
