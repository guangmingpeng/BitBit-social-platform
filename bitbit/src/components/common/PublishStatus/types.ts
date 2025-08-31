export interface PublishStatusProps<T = unknown> {
  status: "idle" | "loading" | "success" | "error";
  error?: string;
  onRetry: () => void;
  onReset: () => void;
  successConfig: {
    title: string;
    description: string;
    publishedItemId?: string; // 发布成功后的ID
    previewData: {
      title: string;
      category?: string;
      condition?: string;
      price?: number;
      image?: string | File;
      type: "activity" | "post" | "item";
    };
    // 完整的表单数据，用于渲染详细预览
    fullPreviewData?: T;
    actions: {
      primary: {
        label: string;
        href?: string;
        generateHref?: (id: string) => string;
      };
      secondary: {
        label: string;
        href: string;
      };
      tertiary?: {
        label: string;
        onClick: () => void;
      };
    };
  };
  loadingConfig: {
    title: string;
    description: string;
  };
}
