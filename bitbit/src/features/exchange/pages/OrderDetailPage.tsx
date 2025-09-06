import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FloatingBackButton from "@/components/common/FloatingBackButton";
import {
  OrderStatusBanner,
  OrderItemInfo,
  OrderTransactionDetails,
  OrderOtherParty,
  OrderProgressTimeline,
  OrderActions,
} from "../components/OrderDetail";
import type { OrderDetail } from "../types";
import { getOrderDetail } from "../utils/mockOrderData";

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟API调用
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        // 模拟延迟
        await new Promise((resolve) => setTimeout(resolve, 500));

        // 使用模拟数据
        const orderData = getOrderDetail(orderId || "");
        setOrder(orderData);
      } catch (error) {
        console.error("获取订单详情失败:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  const handleAction = (action: string) => {
    switch (action) {
      case "confirm_receipt":
        console.log("确认收货");
        // 这里应该调用确认收货API
        break;
      case "view_logistics":
        console.log("查看物流");
        // 跳转到物流页面或显示物流弹窗
        break;
      case "contact_other":
        console.log("联系对方");
        // 跳转到聊天页面或显示联系方式
        break;
      default:
        console.log("未知操作:", action);
    }
  };

  const handleContact = () => {
    console.log("联系对方");
    // 实现联系功能
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">订单不存在</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 左侧浮动返回按钮 */}
      <FloatingBackButton
        text="返回上页"
        variant="elegant"
        size="md"
        onClick={() => navigate(-1)}
      />

      {/* 页面内容 */}
      <div className="pb-32">
        <div className="max-w-7xl mx-auto px-4 py-6 pl-12 md:pl-16 lg:pl-20 space-y-6">
          {/* 页面标题 */}
          <div className="pt-4">
            <h1 className="text-2xl font-bold text-gray-900">订单详情</h1>
          </div>

          {/* 订单状态横幅 */}
          <OrderStatusBanner order={order} />

          {/* 商品信息 */}
          <OrderItemInfo order={order} />

          {/* 交易详情 */}
          <OrderTransactionDetails order={order} />

          {/* 交易对方 */}
          <OrderOtherParty order={order} onContact={handleContact} />

          {/* 订单进度 */}
          <OrderProgressTimeline order={order} />
        </div>
      </div>

      {/* 底部操作按钮 */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto pl-12 md:pl-16 lg:pl-20">
          <OrderActions order={order} onAction={handleAction} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
