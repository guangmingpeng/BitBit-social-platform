import { useState } from "react";

export interface UsePublishStatusProps<T> {
  onSubmit: (data: T) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface UsePublishStatusReturn<T> {
  publishStatus: "idle" | "loading" | "success" | "error";
  publishError: string;
  publishedItemId: string | null;
  handleSubmit: () => Promise<void>;
  handleRetry: () => void;
  handleReset: () => void;
  setPublishData: (data: T) => void;
}

export function usePublishStatus<T>({
  onSubmit,
  onSuccess,
  onError,
}: UsePublishStatusProps<T>): UsePublishStatusReturn<T> {
  const [publishStatus, setPublishStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [publishError, setPublishError] = useState<string>("");
  const [publishData, setPublishData] = useState<T | null>(null);
  const [publishedItemId, setPublishedItemId] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!publishData) {
      setPublishStatus("error");
      setPublishError("没有要发布的数据");
      return;
    }

    setPublishStatus("loading");
    setPublishError("");

    try {
      await onSubmit(publishData);
      // 模拟生成ID
      const generatedId = `${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      setPublishedItemId(generatedId);
      setPublishStatus("success");
      onSuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "发布失败，请重试";
      setPublishStatus("error");
      setPublishError(errorMessage);
      onError?.(errorMessage);
    }
  };

  const handleRetry = () => {
    handleSubmit();
  };

  const handleReset = () => {
    setPublishStatus("idle");
    setPublishError("");
    setPublishedItemId(null);
  };

  return {
    publishStatus,
    publishError,
    publishedItemId,
    handleSubmit,
    handleRetry,
    handleReset,
    setPublishData,
  };
}
