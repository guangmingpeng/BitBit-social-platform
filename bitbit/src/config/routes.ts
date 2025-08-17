import { lazy } from "react";

// 懒加载页面组件
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ActivityList = lazy(() => import("../pages/ActivityList"));
const ActivityDetail = lazy(() => import("../pages/ActivityDetail"));
const Exchange = lazy(() => import("../pages/Exchange"));
const Community = lazy(() => import("../pages/Community"));
const Profile = lazy(() => import("../pages/Profile"));

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
    path: "/exchange",
    element: Exchange,
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
