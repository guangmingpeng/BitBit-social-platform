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
const Profile = lazy(() => import("@/pages/Profile"));

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
    path: "/community",
    element: Community,
  },
  {
    path: "/profile",
    element: Profile,
  },
];
