import React from "react";
import { Button } from "@/components/ui";

interface PublishStatusModalProps {
  status: "loading" | "success" | "error";
  error?: string;
  onRetry?: () => void;
  onSuccess?: () => void;
  onContinue?: () => void;
  onViewList?: () => void;
}

const PublishStatusModal: React.FC<PublishStatusModalProps> = ({
  status,
  error,
  onRetry,
  onSuccess,
  onContinue,
  onViewList,
}) => {
  if (status === "loading") {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"></div>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          正在发布商品...
        </h3>
        <p className="text-text-secondary">请稍候，我们正在处理您的商品信息</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <div className="w-8 h-8 text-green-500">✓</div>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          发布成功！
        </h3>
        <p className="text-text-secondary mb-6">您的商品已成功发布到二手市场</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onViewList}>
            查看商品列表
          </Button>
          <Button variant="primary" onClick={onContinue}>
            继续发布
          </Button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <div className="w-8 h-8 text-red-500">✕</div>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          发布失败
        </h3>
        <p className="text-text-secondary mb-6">
          {error || "发布过程中出现了问题，请稍后重试"}
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onSuccess}>
            返回编辑
          </Button>
          <Button variant="primary" onClick={onRetry}>
            重新发布
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default PublishStatusModal;
