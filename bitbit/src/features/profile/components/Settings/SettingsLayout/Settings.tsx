import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent } from "@/components/ui";
import { FloatingBackButton, ConfirmExitDialog } from "@/components/common";
import { useConfirmExit } from "@/shared/hooks";
import { cn } from "@/shared/utils/cn";
import { SettingsNavigation } from "../SettingsNavigation";
import { useSettingsNavigation } from "../../../hooks/useSettingsNavigation";
import { useSettings } from "../../../hooks/useSettings";
import type { SettingsModule, UserSettings } from "../../../types";
import {
  AccountSecurity,
  NotificationSettings,
  PrivacySettings,
  ApplicationSettings,
  AboutSettings,
} from "../modules";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [originalSettingsData, setOriginalSettingsData] =
    useState<UserSettings | null>(null);

  const { navigationItems, activeModule, setActiveModule } =
    useSettingsNavigation("account");
  const { settings, loading, error, saveSettings, isDirty, saving } =
    useSettings();

  // 当首次加载数据时，保存原始数据用于比较
  React.useEffect(() => {
    if (settings && !originalSettingsData) {
      setOriginalSettingsData(JSON.parse(JSON.stringify(settings)));
    }
  }, [settings, originalSettingsData]);

  // 检查是否有未保存的更改
  const hasUnsavedChanges = (currentData: UserSettings) => {
    if (!originalSettingsData || !currentData) return false;
    return JSON.stringify(currentData) !== JSON.stringify(originalSettingsData);
  };

  // 保存草稿函数
  const saveDraft = async (data: UserSettings) => {
    console.log("保存设置草稿:", data);
    localStorage.setItem("settingsDraft", JSON.stringify(data));
    setOriginalSettingsData(JSON.parse(JSON.stringify(data)));
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
  } = useConfirmExit<UserSettings>({
    onSaveDraft: saveDraft,
    hasUnsavedChanges,
    defaultBackPath: "/profile",
  });

  // 更新表单数据到hook
  React.useEffect(() => {
    if (settings) {
      setCurrentFormData(settings);
    }
  }, [settings, setCurrentFormData]);

  // 处理模块切换
  const handleModuleChange = (module: SettingsModule) => {
    setActiveModule(module);
  };

  // 处理保存
  const handleSave = async () => {
    try {
      await saveSettings();
      // 保存成功后，更新原始数据
      if (settings) {
        setOriginalSettingsData(JSON.parse(JSON.stringify(settings)));
      }
    } catch (error) {
      console.error("保存失败:", error);
    }
  };

  // 处理取消 - 使用智能返回
  const handleCancel = () => {
    if (settings) {
      handleBackClick(settings);
    } else {
      navigate("/profile");
    }
  };

  // 处理预览
  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
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

  if (error || !settings) {
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
      case "account":
        return <AccountSecurity />;
      case "notifications":
        return <NotificationSettings />;
      case "privacy":
        return <PrivacySettings />;
      case "app":
        return <ApplicationSettings />;
      case "about":
        return <AboutSettings />;
      default:
        return <AccountSecurity />;
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
        title="确认退出设置"
        content="您有未保存的设置更改，是否要保存为草稿？"
        isSaving={isConfirmSaving}
      />

      {/* 页面头部 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 pl-20 md:pl-24 lg:pl-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">设置中心</h1>
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
                disabled={saving || !isDirty}
                loading={saving}
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
                  {navigationItems.map(
                    (item: {
                      id: SettingsModule;
                      icon: string;
                      title: string;
                    }) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveModule(item.id)}
                        className={cn(
                          "flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                          activeModule === item.id
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                        )}
                      >
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* 桌面端侧边栏导航 */}
            <div className="hidden lg:block">
              <SettingsNavigation
                items={navigationItems}
                activeModule={activeModule}
                onModuleChange={handleModuleChange}
              />
            </div>
          </div>

          {/* 右侧设置区域 */}
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

export default Settings;
