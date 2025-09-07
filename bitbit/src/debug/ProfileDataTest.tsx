import React from "react";
import { UserProfile } from "@/features/profile/components/UserProfile";
import { mockProfileData } from "@/features/profile/services";

/**
 * 用于测试个人资料数据显示的调试组件
 */
export const ProfileDataTest: React.FC = () => {
  const handleEditProfile = () => {
    console.log("编辑资料被点击");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">个人资料数据测试</h1>

      {/* 显示原始数据 */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">用户数据:</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(mockProfileData.user, null, 2)}
        </pre>
      </div>

      {/* 显示UserProfile组件 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">UserProfile组件渲染:</h2>
        <UserProfile
          user={mockProfileData.user}
          onEditProfile={handleEditProfile}
        />
      </div>
    </div>
  );
};
