import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UseConfirmExitOptions<T = Record<string, unknown>> {
  /**
   * 草稿保存函数
   */
  onSaveDraft?: (data: T) => Promise<void> | void;
  /**
   * 检查是否有未保存的更改
   */
  hasUnsavedChanges?: (data: T) => boolean;
  /**
   * 默认返回路径
   */
  defaultBackPath?: string;
}

interface UseConfirmExitReturn<T = Record<string, unknown>> {
  /**
   * 是否显示确认对话框
   */
  showConfirmDialog: boolean;
  /**
   * 是否正在保存
   */
  isSaving: boolean;
  /**
   * 显示确认对话框
   */
  openConfirmDialog: () => void;
  /**
   * 关闭确认对话框
   */
  closeConfirmDialog: () => void;
  /**
   * 处理返回按钮点击
   */
  handleBackClick: (formData?: T) => void;
  /**
   * 确认退出（不保存）
   */
  handleConfirmExit: () => void;
  /**
   * 保存并退出
   */
  handleSaveAndExit: () => void;
  /**
   * 设置当前表单数据
   */
  setCurrentFormData: (data: T) => void;
}

export const useConfirmExit = <T = Record<string, unknown>>(
  options: UseConfirmExitOptions<T> = {}
): UseConfirmExitReturn<T> => {
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const currentFormDataRef = useRef<T | null>(null);
  const pendingNavigationRef = useRef<(() => void) | null>(null);

  const { onSaveDraft, hasUnsavedChanges, defaultBackPath = "/" } = options;

  // 设置当前表单数据
  const setCurrentFormData = useCallback((data: T) => {
    currentFormDataRef.current = data;
  }, []);

  // 打开确认对话框
  const openConfirmDialog = useCallback(() => {
    setShowConfirmDialog(true);
  }, []);

  // 关闭确认对话框
  const closeConfirmDialog = useCallback(() => {
    setShowConfirmDialog(false);
    pendingNavigationRef.current = null;
  }, []);

  // 执行导航
  const executeNavigation = useCallback(() => {
    if (pendingNavigationRef.current) {
      pendingNavigationRef.current();
    } else {
      navigate(defaultBackPath);
    }
  }, [navigate, defaultBackPath]);

  // 处理返回按钮点击
  const handleBackClick = useCallback(
    (formData?: T) => {
      const dataToCheck = formData || currentFormDataRef.current;

      // 如果有检查函数且有未保存的更改，显示确认对话框
      if (hasUnsavedChanges && dataToCheck && hasUnsavedChanges(dataToCheck)) {
        // 设置待执行的导航函数
        pendingNavigationRef.current = () => navigate(-1);
        openConfirmDialog();
      } else {
        // 直接返回
        navigate(-1);
      }
    },
    [hasUnsavedChanges, navigate, openConfirmDialog]
  );

  // 确认退出（不保存）
  const handleConfirmExit = useCallback(() => {
    setShowConfirmDialog(false);
    executeNavigation();
  }, [executeNavigation]);

  // 保存并退出
  const handleSaveAndExit = useCallback(async () => {
    if (!onSaveDraft || !currentFormDataRef.current) {
      handleConfirmExit();
      return;
    }

    setIsSaving(true);
    try {
      await onSaveDraft(currentFormDataRef.current);
      setShowConfirmDialog(false);
      executeNavigation();
    } catch (error) {
      console.error("保存草稿失败:", error);
      // 这里可以显示错误提示
    } finally {
      setIsSaving(false);
    }
  }, [onSaveDraft, handleConfirmExit, executeNavigation]);

  // 清理函数
  useEffect(() => {
    return () => {
      pendingNavigationRef.current = null;
      currentFormDataRef.current = null;
    };
  }, []);

  return {
    showConfirmDialog,
    isSaving,
    openConfirmDialog,
    closeConfirmDialog,
    handleBackClick,
    handleConfirmExit,
    handleSaveAndExit,
    setCurrentFormData,
  };
};
