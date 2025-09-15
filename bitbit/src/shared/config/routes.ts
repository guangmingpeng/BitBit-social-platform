import { lazy } from "react";

// 懒加载页面组件
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ActivityList = lazy(() => import("@/pages/ActivityList"));
const ActivityDetail = lazy(() => import("@/pages/ActivityDetail"));
const ActivityRegistration = lazy(() => import("@/pages/ActivityRegistration"));
const PublishActivity = lazy(() => import("@/pages/PublishActivity"));
const Exchange = lazy(() => import("@/pages/Exchange"));
const ExchangeDetail = lazy(() => import("@/pages/ExchangeDetail"));
const PublishItem = lazy(() => import("@/pages/PublishItem"));
const Community = lazy(() => import("@/pages/Community"));
const PostDetail = lazy(() => import("@/pages/PostDetail"));
const PublishPost = lazy(() => import("@/pages/PublishPost"));
const Profile = lazy(() => import("@/pages/Profile"));
const ProfileEdit = lazy(() => import("../../pages/ProfileEdit"));
const ProfileSettings = lazy(() => import("../../pages/ProfileSettings"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const NavigationDemo = lazy(() => import("@/pages/NavigationDemo"));
const IconShowcase = lazy(() => import("@/pages/IconShowcase"));

// 新增的Profile相关页面
const FollowListPage = lazy(() => import("@/pages/FollowListPage"));
const OtherUserProfilePage = lazy(
  () => import("@/features/profile/components/OtherUserProfile")
);

// 从 exchange 功能模块导入订单详情页
const OrderDetailPage = lazy(
  () => import("@/features/exchange/pages/OrderDetailPage")
);

// 测试页面
const UserCardTest = lazy(() => import("@/pages/UserCardTest"));
const UserNavigationTest = lazy(() => import("@/pages/UserNavigationTest"));
const ChatTestPage = lazy(() => import("@/pages/ChatTestPage"));
const ChatPage = lazy(() => import("@/pages/ChatPage"));
const ChatDemo = lazy(() => import("@/pages/ChatDemo"));
const UserCardPopoverDemo = lazy(
  () => import("@/examples/UserCardPopoverDemo")
);
const ButtonVariantsDemo = lazy(() => import("@/examples/ButtonVariantsDemo"));
// 路由配置
export const routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/register",
    element: Register,
  },
  {
    path: "/activities",
    element: ActivityList,
  },
  {
    path: "/activities/:id",
    element: ActivityDetail,
  },
  {
    path: "/activities/:id/register",
    element: ActivityRegistration,
  },
  {
    path: "/publish-activity",
    element: PublishActivity,
  },
  {
    path: "/exchange",
    element: Exchange,
  },
  {
    path: "/exchange/:id",
    element: ExchangeDetail,
  },
  {
    path: "/exchange/publish",
    element: PublishItem,
  },
  {
    path: "/orders/:orderId",
    element: OrderDetailPage,
  },
  {
    path: "/community",
    element: Community,
  },
  {
    path: "/community/publish",
    element: PublishPost,
  },
  {
    path: "/community/:id",
    element: PostDetail,
  },
  {
    path: "/notifications",
    element: Notifications,
  },
  {
    path: "/chat",
    element: ChatPage,
  },
  {
    path: "/profile/edit",
    element: ProfileEdit,
  },
  {
    path: "/profile/settings",
    element: ProfileSettings,
  },
  {
    path: "/profile",
    element: Profile,
  },
  {
    path: "/profile/:tab",
    element: Profile,
  },
  {
    path: "/profile/following",
    element: FollowListPage,
  },
  {
    path: "/profile/followers",
    element: FollowListPage,
  },
  {
    path: "/user/:userId",
    element: OtherUserProfilePage,
  },
  {
    path: "/user/:userId/:tab",
    element: OtherUserProfilePage,
  },
  {
    path: "/user/:userId/following",
    element: FollowListPage,
  },
  {
    path: "/user/:userId/followers",
    element: FollowListPage,
  },
  {
    path: "/test/user-card",
    element: UserCardTest,
  },
  {
    path: "/test/user-navigation",
    element: UserNavigationTest,
  },
  {
    path: "/test/chat",
    element: ChatTestPage,
  },
  {
    path: "/test/chat-demo",
    element: ChatDemo,
  },
  {
    path: "/test/navigation-demo",
    element: NavigationDemo,
  },
  {
    path: "/test/icon-showcase",
    element: IconShowcase,
  },
  {
    path: "/test/user-card-popover",
    element: UserCardPopoverDemo,
  },
  {
    path: "/test/button-variants",
    element: ButtonVariantsDemo,
  },
];
