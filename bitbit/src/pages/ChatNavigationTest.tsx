import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "@/components/ui";
import UserCardPopover from "@/shared/components/UserCardPopover";
import {
  navigateToChatFromUserCard,
  navigateToChatFromExchange,
  navigateToChatFromNotification,
  navigateToChatFromActivity,
} from "@/features/chat/utils";

const ChatNavigationTest: React.FC = () => {
  const navigate = useNavigate();

  // 示例用户数据
  const exampleUser = {
    id: "user-123",
    name: "张小明",
    fullName: "张小明",
    avatar: "https://picsum.photos/60/60?random=user1",
    age: 25,
    profession: "产品设计师",
    location: "北京市朝阳区",
    bio: "热爱设计，喜欢户外运动，擅长UI/UX设计。希望通过BitBit认识更多志同道合的朋友。",
    activitiesCount: 15,
    organizedCount: 3,
    postsCount: 28,
    followersCount: 156,
    followingCount: 89,
    tags: ["设计", "摄影", "徒步", "咖啡"],
    isFollowed: false,
    isOrganizer: true,
    isOnline: true,
    joinDate: "2024年3月",
  };

  const testDirectNavigation = () => {
    navigateToChatFromUserCard(navigate, "direct-user-123", {
      name: "直接导航测试用户",
      avatar: "https://picsum.photos/60/60?random=direct",
    });
  };

  const testExchangeNavigation = () => {
    navigateToChatFromExchange(
      navigate,
      "seller-456",
      {
        name: "卖家小王",
        avatar: "https://picsum.photos/60/60?random=seller",
      },
      {
        id: "item-789",
        title: "iPhone 14 Pro 深空黑色",
      }
    );
  };

  const testNotificationNavigation = () => {
    navigateToChatFromNotification(navigate, {
      conversationId: "conv-notification-123",
      userId: "notification-user",
      userName: "通知用户",
      userAvatar: "https://picsum.photos/60/60?random=notification",
      type: "private",
    });
  };

  const testActivityNavigation = () => {
    navigateToChatFromActivity(
      navigate,
      "activity-101",
      "周末摄影聚会",
      "activity-conv-202"
    );
  };

  return (
    <Container size="lg" className="py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-4">聊天导航功能测试</h1>
          <p className="text-gray-600">测试各种场景下的聊天页面导航功能</p>
        </div>

        {/* 用户卡片测试 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">用户卡片私信测试</h2>
          <p className="text-gray-600 mb-4">
            将鼠标悬浮在头像上，然后点击"发私信"按钮测试
          </p>
          <div className="flex items-center gap-4">
            <UserCardPopover
              user={exampleUser}
              placement="right"
              showActions={true}
            >
              <img
                src={exampleUser.avatar}
                alt={exampleUser.name}
                className="w-12 h-12 rounded-full cursor-pointer hover:ring-2 hover:ring-primary-300 transition-all"
              />
            </UserCardPopover>
            <div>
              <p className="font-medium">{exampleUser.name}</p>
              <p className="text-sm text-gray-500">悬浮查看详细信息</p>
            </div>
          </div>
        </div>

        {/* 直接导航测试 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">直接导航测试</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={testDirectNavigation}
              variant="primary"
              className="w-full"
            >
              测试用户卡片私信导航
            </Button>

            <Button
              onClick={testExchangeNavigation}
              variant="secondary"
              className="w-full"
            >
              测试商品联系卖家导航
            </Button>

            <Button
              onClick={testNotificationNavigation}
              variant="outline"
              className="w-full"
            >
              测试通知消息导航
            </Button>

            <Button
              onClick={testActivityNavigation}
              variant="ghost"
              className="w-full"
            >
              测试活动群聊导航
            </Button>
          </div>
        </div>

        {/* 聊天页面参数说明 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">聊天页面参数说明</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>userId:</strong> 目标用户ID（用于私聊）
            </p>
            <p>
              <strong>userName:</strong> 用户名显示
            </p>
            <p>
              <strong>userAvatar:</strong> 用户头像
            </p>
            <p>
              <strong>conversationId:</strong> 现有会话ID
            </p>
            <p>
              <strong>type:</strong> 会话类型（private/group/activity）
            </p>
            <p>
              <strong>from:</strong>{" "}
              来源页面（userCard/exchange/notification/activity）
            </p>
            <p>
              <strong>itemId:</strong> 关联商品/活动ID
            </p>
            <p>
              <strong>itemTitle:</strong> 关联商品/活动标题
            </p>
            <p>
              <strong>message:</strong> 预设消息内容
            </p>
          </div>
        </div>

        {/* 返回按钮 */}
        <div className="flex justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="px-8"
          >
            返回上一页
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ChatNavigationTest;
