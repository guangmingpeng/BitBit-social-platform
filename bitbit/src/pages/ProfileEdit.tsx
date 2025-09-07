import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent } from "@/components/ui";
import { FloatingBackButton, ConfirmExitDialog } from "@/components/common";
import { useConfirmExit } from "@/shared/hooks";
import { cn } from "@/shared/utils/cn";
import {
  ProfileEditNavigation,
  BasicInfoForm,
  InterestsForm,
  PrivacyForm,
  SocialLinksForm,
  useProfileEdit,
} from "@/features/profile/components/ProfileEdit";
import { VerificationForm } from "@/features/profile/components/ProfileEdit/VerificationForm";
import type { EditableUserProfile } from "@/features/profile/types";

export type ProfileEditModule =
  | "basic"
  | "interests"
  | "privacy"
  | "social"
  | "verification";

const ProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<ProfileEditModule>("basic");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [originalProfileData, setOriginalProfileData] =
    useState<EditableUserProfile | null>(null);

  const { profileData, loading, error, updateProfile, saveChanges, isSaving } =
    useProfileEdit();

  // 当首次加载数据时，保存原始数据用于比较
  React.useEffect(() => {
    if (profileData && !originalProfileData) {
      setOriginalProfileData(JSON.parse(JSON.stringify(profileData)));
    }
  }, [profileData, originalProfileData]);

  // 检查是否有未保存的更改
  const hasUnsavedChanges = (currentData: EditableUserProfile) => {
    if (!originalProfileData || !currentData) return false;

    // 深度比较关键字段
    const fieldsToCheck = [
      "fullName",
      "bio",
      "avatar",
      "coverImage",
      "age",
      "profession",
      "location",
      "birthDate",
      "gender",
    ];

    // 检查基础字段
    for (const field of fieldsToCheck) {
      if (
        currentData[field as keyof EditableUserProfile] !==
        originalProfileData[field as keyof EditableUserProfile]
      ) {
        return true;
      }
    }

    // 检查社交链接
    const currentSocialLinks = currentData.socialLinks;
    const originalSocialLinks = originalProfileData.socialLinks;
    for (const key in currentSocialLinks) {
      if (
        currentSocialLinks[key as keyof typeof currentSocialLinks] !==
        originalSocialLinks[key as keyof typeof originalSocialLinks]
      ) {
        return true;
      }
    }

    // 检查兴趣标签
    const currentInterests = JSON.stringify(
      currentData.interests.sort((a, b) => a.id.localeCompare(b.id))
    );
    const originalInterests = JSON.stringify(
      originalProfileData.interests.sort((a, b) => a.id.localeCompare(b.id))
    );
    if (currentInterests !== originalInterests) {
      return true;
    }

    // 检查隐私设置
    const currentPrivacy = JSON.stringify(currentData.privacy);
    const originalPrivacy = JSON.stringify(originalProfileData.privacy);
    if (currentPrivacy !== originalPrivacy) {
      return true;
    }

    return false;
  };

  // 保存草稿函数
  const saveDraft = async (data: EditableUserProfile) => {
    console.log("保存个人资料草稿:", data);
    // 这里可以保存到localStorage或其他存储
    localStorage.setItem("profileEditDraft", JSON.stringify(data));
    // 保存草稿后也要更新原始数据，避免下次进入时认为有未保存的更改
    setOriginalProfileData(JSON.parse(JSON.stringify(data)));
  };

  // 使用确认退出hook
  const {
    showConfirmDialog,
    isSaving: isConfirmSaving,
    handleBackClick,
    handleConfirmExit,
    handleSaveAndExit,
    closeConfirmDialog,
    setCurrentFormData,
  } = useConfirmExit<EditableUserProfile>({
    onSaveDraft: saveDraft,
    hasUnsavedChanges,
    defaultBackPath: "/profile",
  });

  // 更新表单数据到hook
  React.useEffect(() => {
    if (profileData) {
      setCurrentFormData(profileData);
    }
  }, [profileData, setCurrentFormData]);

  // 处理模块切换
  const handleModuleChange = (module: ProfileEditModule) => {
    setActiveModule(module);
  };

  // 处理数据更新
  const handleDataUpdate = (updates: Partial<EditableUserProfile>) => {
    updateProfile(updates);
    if (profileData) {
      setCurrentFormData({ ...profileData, ...updates });
    }
  };

  // 处理保存
  const handleSave = async () => {
    try {
      await saveChanges();
      // 保存成功后，更新原始数据
      if (profileData) {
        setOriginalProfileData(JSON.parse(JSON.stringify(profileData)));
      }
      // 可以显示成功提示
    } catch (error) {
      console.error("保存失败:", error);
      // 可以显示错误提示
    }
  };

  // 处理取消 - 使用智能返回
  const handleCancel = () => {
    if (profileData) {
      handleBackClick(profileData);
    } else {
      navigate("/profile");
    }
  };

  // 处理预览
  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // 计算完成度
  const calculateCompleteness = (): number => {
    if (!profileData) return 0;

    let completed = 0;
    const total = 10;

    if (profileData.fullName) completed++;
    if (profileData.bio) completed++;
    if (profileData.avatar) completed++;
    if (profileData.profession) completed++;
    if (profileData.location) completed++;
    if (profileData.interests?.length > 0) completed++;
    if (Object.values(profileData.socialLinks).some((link) => link))
      completed++;
    if (profileData.age) completed++;
    if (profileData.gender) completed++;
    if (profileData.birthDate) completed++;

    return Math.round((completed / total) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "加载失败"}</p>
          <Button onClick={() => window.location.reload()}>重试</Button>
        </div>
      </div>
    );
  }

  const renderActiveModule = () => {
    switch (activeModule) {
      case "basic":
        return (
          <BasicInfoForm
            data={profileData}
            onChange={handleDataUpdate}
            isPreviewMode={isPreviewMode}
          />
        );
      case "interests":
        return (
          <InterestsForm
            data={profileData}
            onChange={handleDataUpdate}
            isPreviewMode={isPreviewMode}
          />
        );
      case "privacy":
        return (
          <PrivacyForm
            data={profileData}
            onChange={handleDataUpdate}
            isPreviewMode={isPreviewMode}
          />
        );
      case "social":
        return (
          <SocialLinksForm
            data={profileData}
            onChange={handleDataUpdate}
            isPreviewMode={isPreviewMode}
          />
        );
      case "verification":
        return (
          <VerificationForm
            data={profileData}
            onChange={handleDataUpdate}
            isPreviewMode={isPreviewMode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 左侧浮动返回按钮 */}
      <FloatingBackButton
        text="返回个人中心"
        variant="elegant"
        size="md"
        onClick={handleCancel}
      />

      {/* 确认退出对话框 */}
      <ConfirmExitDialog
        isOpen={showConfirmDialog}
        onClose={closeConfirmDialog}
        onConfirmExit={handleConfirmExit}
        onSaveAndExit={handleSaveAndExit}
        title="确认退出编辑"
        content="您有未保存的个人资料更改，是否要保存为草稿？"
        isSaving={isConfirmSaving}
      />

      {/* 页面头部 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 pl-20 md:pl-24 lg:pl-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                个人资料编辑
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handlePreview}
                className="gap-2"
              >
                <span className="text-lg">👁️</span>
                {isPreviewMode ? "编辑" : "预览"}
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={isSaving}
                loading={isSaving}
                className="gap-2"
              >
                <span className="text-lg">💾</span>
                保存
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pl-20 md:pl-24 lg:pl-28">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 桌面端左侧导航 / 移动端顶部导航 */}
          <div className="lg:w-64 lg:flex-shrink-0">
            <div className="lg:hidden mb-6">
              {/* 移动端标签导航 */}
              <div className="bg-white border border-gray-200 rounded-lg p-1">
                <div className="flex overflow-x-auto">
                  {[
                    { key: "basic", label: "基础", icon: "📝" },
                    { key: "interests", label: "兴趣", icon: "🏷️" },
                    { key: "privacy", label: "隐私", icon: "🔒" },
                    { key: "social", label: "社交", icon: "🔗" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() =>
                        setActiveModule(tab.key as ProfileEditModule)
                      }
                      className={cn(
                        "flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                        activeModule === tab.key
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      )}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 桌面端侧边栏导航 */}
            <div className="hidden lg:block">
              <ProfileEditNavigation
                activeModule={activeModule}
                onModuleChange={handleModuleChange}
                completeness={calculateCompleteness()}
              />
            </div>
          </div>

          {/* 右侧编辑区域 */}
          <div className="flex-1">
            <Card>
              <CardContent className="p-6">{renderActiveModule()}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
