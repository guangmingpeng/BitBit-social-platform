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

// 从 exchange 功能模块导入订单详情页
const OrderDetailPage = lazy(
  () => import("@/features/exchange/pages/OrderDetailPage")
);
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
    path: "/profile/edit",
    element: ProfileEdit,
  },
  {
    path: "/profile",
    element: Profile,
  },
  {
    path: "/profile/:tab",
    element: Profile,
  },
];
