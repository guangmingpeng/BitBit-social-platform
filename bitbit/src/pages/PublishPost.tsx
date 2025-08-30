import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/ui";
import { CommunityPostForm } from "@/features/community/components/CommunityPostForm";
import PostPreview from "@/features/community/components/PostPreview";
import type { CommunityPostFormData } from "@/features/community/components/CommunityPostForm";

const PublishPost: React.FC = () => {
  const navigate = useNavigate();
  const previewRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CommunityPostFormData>({
    title: "",
    content: "",
    category: "",
    tags: [],
    images: [],
    isPrivate: false,
    allowComments: true,
  });

  const handleSubmit = async (formData: CommunityPostFormData) => {
    setIsSubmitting(true);

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("发布帖子:", formData);

      // 发布成功后跳转到社区页面
      navigate("/community", {
        replace: true,
        state: { message: "帖子发布成功！" },
      });
    } catch (error) {
      console.error("发布失败:", error);
      alert("发布失败，请重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/community");
  };

  // 处理字段焦点，滚动预览到对应位置
  const handleFieldFocus = (fieldName: string) => {
    if (!previewRef.current) return;

    const fieldScrollMap: { [key: string]: number } = {
      title: 0,
      content: 100,
      category: 200,
      images: 300,
      tags: 400,
      isPrivate: 450,
      allowComments: 500,
    };

    const scrollOffset = fieldScrollMap[fieldName] || 0;
    previewRef.current.scrollTo({
      top: scrollOffset,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container size="full" className="py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            发布新帖子
          </h1>
          <p className="text-text-secondary">
            分享你的想法，与社区成员交流互动
          </p>
        </div>

        {/* 左右分栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：编辑表单 - 占用更多空间 */}
          <div className="lg:col-span-2 space-y-6 max-h-screen overflow-y-auto pr-4">
            <div className="bg-white rounded-lg p-1">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-blue-700">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span className="font-medium">编辑模式</span>
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  在左侧编辑帖子内容，右侧会实时显示预览效果
                </p>
              </div>
            </div>

            <CommunityPostForm
              initialData={formData}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
              onChange={setFormData}
              onFieldFocus={handleFieldFocus}
            />
          </div>

          {/* 右侧：实时预览 - 占用较少空间且独立滚动 */}
          <div className="lg:col-span-1 lg:sticky lg:top-6 lg:h-screen">
            <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3 shadow-sm">
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="font-medium text-sm">实时预览</h3>
              </div>
              <p className="text-xs text-gray-600">
                发布后的效果预览，支持智能滚动同步
              </p>
            </div>

            <div
              ref={previewRef}
              className="max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            >
              <PostPreview formData={formData} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PublishPost;
