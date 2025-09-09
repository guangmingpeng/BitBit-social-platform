import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { UserInfo } from "@/shared/components";
import { UserNavigation } from "@/shared/utils/userNavigation";

// 扩展的用户接口，包含更多社区相关信息
export interface CommunityUser {
  id: string;
  name: string;
  fullName?: string;
  avatar: string;
  postCount: number;
  profession?: string;
  age?: number;
  location?: string;
  bio?: string;
  activitiesCount?: number;
  organizedCount?: number;
  followersCount?: number;
  followingCount?: number;
  tags?: string[];
  isFollowed?: boolean;
  isOnline?: boolean;
  joinDate?: string;
  color?: string;
}

// 模拟的活跃用户数据
const mockActiveUsers: CommunityUser[] = [
  {
    id: "user-1",
    name: "摄影师小王", // 用户昵称，在社区中显示
    fullName: "王小明", // 真实姓名，在详细信息中作为补充
    avatar: "https://picsum.photos/32/32?random=9",
    postCount: 25,
    profession: "摄影师",
    age: 28,
    location: "上海",
    bio: "专业摄影师，喜欢记录生活中的美好瞬间。擅长人像摄影和风景摄影。",
    activitiesCount: 12,
    organizedCount: 3,
    followersCount: 128,
    followingCount: 86,
    tags: ["摄影", "旅行", "艺术", "创意"],
    isFollowed: false,
    isOnline: true,
    joinDate: "2023年5月",
    color: "#3B82F6",
  },
  {
    id: "user-2",
    name: "读书达人", // 用户昵称
    fullName: "李雅文", // 真实姓名
    avatar: "https://picsum.photos/32/32?random=10",
    postCount: 42,
    profession: "编辑",
    age: 25,
    location: "北京",
    bio: "资深读书爱好者，每月阅读10本以上书籍。喜欢分享读书心得和推荐好书。",
    activitiesCount: 8,
    organizedCount: 1,
    followersCount: 95,
    followingCount: 156,
    tags: ["读书", "写作", "文学", "哲学"],
    isFollowed: true,
    isOnline: false,
    joinDate: "2023年3月",
    color: "#10B981",
  },
  {
    id: "user-3",
    name: "健身教练小陈", // 用户昵称
    fullName: "陈小力", // 真实姓名
    avatar: "https://picsum.photos/32/32?random=11",
    postCount: 18,
    profession: "健身教练",
    age: 30,
    location: "深圳",
    bio: "专业健身教练，帮助大家科学健身，享受运动的乐趣。",
    activitiesCount: 15,
    organizedCount: 5,
    followersCount: 200,
    followingCount: 50,
    tags: ["健身", "运动", "营养", "健康"],
    isFollowed: false,
    isOnline: true,
    joinDate: "2022年12月",
    color: "#F59E0B",
  },
];

export const useCommunityUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<CommunityUser[]>(mockActiveUsers);
  const [loading, setLoading] = useState(false);

  // 转换CommunityUser为UserInfo格式
  const convertToUserInfo = useCallback((user: CommunityUser): UserInfo => {
    return {
      id: user.id,
      name: user.name,
      fullName: user.fullName,
      avatar: user.avatar,
      color: user.color,
      age: user.age,
      profession: user.profession,
      location: user.location,
      bio: user.bio,
      activitiesCount: user.activitiesCount,
      organizedCount: user.organizedCount,
      postsCount: user.postCount, // 保持数据一致性
      followersCount: user.followersCount,
      followingCount: user.followingCount,
      tags: user.tags,
      isFollowed: user.isFollowed,
      isOnline: user.isOnline,
      joinDate: user.joinDate,
    };
  }, []);

  // 关注/取消关注用户
  const toggleFollow = useCallback(
    async (userId: string) => {
      setLoading(true);

      try {
        // 模拟API调用延迟
        await new Promise((resolve) => setTimeout(resolve, 500));

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? {
                  ...user,
                  isFollowed: !user.isFollowed,
                  followersCount: user.isFollowed
                    ? Math.max(0, (user.followersCount || 0) - 1)
                    : (user.followersCount || 0) + 1,
                }
              : user
          )
        );

        console.log(
          `${
            users.find((u) => u.id === userId)?.isFollowed ? "取消关注" : "关注"
          }用户:`,
          userId
        );
      } catch (error) {
        console.error("关注操作失败:", error);
      } finally {
        setLoading(false);
      }
    },
    [users]
  );

  // 发送私信
  const sendMessage = useCallback(async (userId: string) => {
    console.log("发送私信给用户:", userId);
    // 这里可以打开私信对话框或跳转到消息页面
  }, []);

  // 查看用户资料
  const viewProfile = useCallback(
    async (userId: string) => {
      console.log("查看用户资料:", userId);
      // 使用UserNavigation进行跳转
      const userNavigation = new UserNavigation(navigate);
      userNavigation.navigateToUserProfile(userId);
    },
    [navigate]
  );

  // 刷新活跃用户列表
  const refreshUsers = useCallback(async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 这里可以调用真实的API获取最新的活跃用户数据
      setUsers([...mockActiveUsers]);
      console.log("活跃用户列表已刷新");
    } catch (error) {
      console.error("刷新用户列表失败:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 获取用户的UserInfo
  const getUserInfo = useCallback(
    (userId: string): UserInfo | null => {
      const user = users.find((u) => u.id === userId);
      return user ? convertToUserInfo(user) : null;
    },
    [users, convertToUserInfo]
  );

  return {
    // 数据
    users,
    loading,

    // 转换函数
    convertToUserInfo,
    getUserInfo,

    // 操作函数
    toggleFollow,
    sendMessage,
    viewProfile,
    refreshUsers,
  };
};
