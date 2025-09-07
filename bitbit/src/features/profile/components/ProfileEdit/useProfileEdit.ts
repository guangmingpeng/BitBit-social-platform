import { useState, useEffect } from "react";
import type { EditableUserProfile } from "../../types";

// 模拟数据 - 在实际项目中应该从API获取
const getMockProfileData = (): EditableUserProfile => ({
  id: "1",
  username: "zilong_bitbit",
  email: "zilong@bitbit.com",
  fullName: "子龙",
  bio: "热爱音乐和摄影的技术爱好者",
  avatar: "https://picsum.photos/200/200?random=me",
  coverImage: "https://picsum.photos/800/200?random=1",
  age: 25,
  profession: "软件工程师",
  location: "北京市",
  birthDate: "1999-01-01",
  gender: "male",
  socialLinks: {
    website: "https://example.com",
    github: "https://github.com/username",
    twitter: "",
    instagram: "",
    linkedin: "",
    weibo: "",
  },
  interests: [
    { id: "1", name: "摄影", category: "艺术", isPrimary: true },
    { id: "2", name: "音乐", category: "娱乐", isPrimary: true },
    { id: "3", name: "编程", category: "学习", isPrimary: true },
    { id: "4", name: "旅行", category: "生活", isPrimary: false },
    { id: "5", name: "美食", category: "生活", isPrimary: false },
    { id: "6", name: "读书", category: "学习", isPrimary: false },
    { id: "7", name: "运动", category: "健康", isPrimary: false },
    { id: "8", name: "电影", category: "娱乐", isPrimary: false },
  ],
  privacy: {
    profileVisibility: "public",
    showEmail: false,
    showAge: true,
    showLocation: true,
    allowMessages: true,
    allowActivityInvites: true,
  },
  verifications: {
    realName: {
      isVerified: false,
      status: "unverified",
    },
    student: {
      isVerified: false,
      isSchoolEmailVerified: false,
      status: "unverified",
    },
    employment: {
      isVerified: false,
      isCompanyEmailVerified: false,
      status: "unverified",
    },
    phone: {
      isVerified: false,
      status: "unverified",
    },
    email: {
      isVerified: false,
      status: "unverified",
    },
  },
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: new Date().toISOString(),
});

export const useProfileEdit = () => {
  const [profileData, setProfileData] = useState<EditableUserProfile | null>(
    null
  );
  const [originalData, setOriginalData] = useState<EditableUserProfile | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 加载用户数据
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        // 模拟API调用
        await new Promise((resolve) => setTimeout(resolve, 500));
        const data = getMockProfileData();
        setProfileData(data);
        setOriginalData(JSON.parse(JSON.stringify(data))); // 深拷贝作为原始数据
      } catch (err) {
        setError(err instanceof Error ? err.message : "加载失败");
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  // 更新资料数据
  const updateProfile = (updates: Partial<EditableUserProfile>) => {
    if (!profileData) return;

    setProfileData((prev) =>
      prev
        ? {
            ...prev,
            ...updates,
            updatedAt: new Date().toISOString(),
          }
        : null
    );
  };

  // 保存更改
  const saveChanges = async () => {
    if (!profileData) return;

    try {
      setIsSaving(true);
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 更新原始数据
      setOriginalData(JSON.parse(JSON.stringify(profileData)));

      console.log("Profile updated:", profileData);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "保存失败");
    } finally {
      setIsSaving(false);
    }
  };

  // 重置更改
  const resetChanges = () => {
    if (originalData) {
      setProfileData(JSON.parse(JSON.stringify(originalData)));
    }
  };

  return {
    profileData,
    loading,
    error,
    updateProfile,
    saveChanges,
    resetChanges,
    isSaving,
  };
};
