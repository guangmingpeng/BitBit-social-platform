import { type FC, useState } from "react";
import { Card, CardContent, Tag } from "@/components/ui";
import {
  ActivityHeader,
  ActivityBasicInfo,
  OrganizerInfo,
  ActivityLocation,
} from "@/features/activities/components/ActivityDetail";
import {
  AVAILABLE_CATEGORIES,
  getAllCategories,
} from "@/shared/constants/categories";
import type { ActivityFormData } from "./ActivityForm";
import type { Activity } from "@/shared/types";
import dayjs from "dayjs";

interface ActivityPreviewProps {
  formData: ActivityFormData;
  className?: string;
}

const ActivityPreview: FC<ActivityPreviewProps> = ({ formData, className }) => {
  const [isLiked, setIsLiked] = useState(false);

  // 将File对象转换为预览URL
  const getImagePreviewUrls = (files: File[]): string[] => {
    return files.map((file) => URL.createObjectURL(file));
  };

  const previewImageUrls =
    formData.images.length > 0 ? getImagePreviewUrls(formData.images) : [];

  // 获取分类信息
  const getCategoryInfo = (categoryId: string) => {
    const allCategories = getAllCategories();
    const category = allCategories.find((cat) => cat.id === categoryId);
    if (category) {
      return {
        id: category.id,
        nameZh: category.nameZh,
        icon: category.icon,
      };
    }

    // 如果找不到分类，返回默认值
    return {
      id: categoryId,
      nameZh: categoryId,
      icon: "📋",
    };
  };

  const categoryInfo = getCategoryInfo(formData.category);

  // 获取有效的分类值（兼容老的硬编码类型）
  const getValidCategory = (
    category: string
  ): "music" | "food" | "learning" | "reading" => {
    // 优先检查新的分类ID
    if (AVAILABLE_CATEGORIES.some((cat) => cat.id === category)) {
      // 映射到旧的类型以保持兼容性
      const mapping: Record<string, "music" | "food" | "learning" | "reading"> =
        {
          music: "music",
          food: "food",
          learning: "learning",
          reading: "reading",
          sports: "learning", // 映射到学习类别
          outdoor: "learning",
          tech: "learning",
          travel: "learning",
          movie: "music", // 映射到艺术类别
          photography: "music",
          fitness: "learning",
          gaming: "learning",
          pets: "reading", // 映射到心理类别
          fashion: "reading",
          home: "reading",
          finance: "learning",
          career: "learning",
          social: "reading",
          charity: "reading",
        };
      return mapping[category] || "learning";
    }

    // 保持原有的硬编码分类支持
    const validCategories = ["music", "food", "learning", "reading"];
    return validCategories.includes(category)
      ? (category as "music" | "food" | "learning" | "reading")
      : "learning";
  };

  // 模拟活动数据，基于表单数据
  const previewActivity: Activity = {
    id: "preview",
    title: formData.title || "请输入活动标题",
    description: formData.description || "请填写活动描述...",
    category: getValidCategory(formData.category),
    // 只显示日期，不重复时间
    date:
      formData.startDate && formData.endDate
        ? `${new Date(formData.startDate).toLocaleDateString(
            "zh-CN"
          )} - ${new Date(formData.endDate).toLocaleDateString("zh-CN")}`
        : formData.startDate
        ? new Date(formData.startDate).toLocaleDateString("zh-CN")
        : "请选择活动日期",
    // 只显示时间，不包含日期
    time:
      formData.startDate && formData.endDate
        ? `${new Date(formData.startDate).toLocaleTimeString("zh-CN", {
            hour: "2-digit",
            minute: "2-digit",
          })} - ${new Date(formData.endDate).toLocaleTimeString("zh-CN", {
            hour: "2-digit",
            minute: "2-digit",
          })}`
        : formData.startDate
        ? new Date(formData.startDate).toLocaleTimeString("zh-CN", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "请选择活动时间",
    location: formData.isOnline
      ? formData.meetingLink || "请输入会议链接"
      : formData.location || "请输入活动地点",
    maxParticipants: formData.maxParticipants,
    currentParticipants: 0,
    organizer: {
      id: "current-user",
      username: "当前用户",
      email: "current@example.com",
      avatar: "",
      bio: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    images: previewImageUrls,
    price: formData.fee,
    isFree: formData.fee === 0,
    status: "draft",
    tags: formData.tags,
    startTime: formData.startDate
      ? new Date(formData.startDate).toISOString()
      : new Date().toISOString(),
    endTime: formData.endDate
      ? new Date(formData.endDate).toISOString()
      : new Date().toISOString(),
    capacity: formData.maxParticipants,
    coverImage: previewImageUrls.length > 0 ? previewImageUrls[0] : undefined,
    registrationDeadline: formData.registrationDeadline,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    detailContent: formData.description || "请填写活动详细内容...",
  };

  const handleShare = () => {
    console.log("分享活动（预览模式）");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleFollow = () => {
    console.log("关注组织者（预览模式）");
  };

  const handleViewLocationDetails = () => {
    console.log("查看详细地址（预览模式）");
  };

  const handleNavigate = () => {
    console.log("导航到活动地点（预览模式）");
  };

  return (
    <div className={className}>
      <div className="min-h-screen bg-gray-50 relative">
        {/* 头部图片区域 */}
        <ActivityHeader
          activity={previewActivity}
          onShare={handleShare}
          onLike={handleLike}
          isLiked={isLiked}
        />

        {/* 内容卡片 */}
        <div className="relative -mt-8">
          <Card className="overflow-hidden rounded-t-3xl">
            <CardContent className="p-6 space-y-6">
              {/* 预览模式提示 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-700">
                  <svg
                    className="w-5 h-5"
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
                  <span className="font-medium">预览模式</span>
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  这是您正在编辑的活动的预览效果，所有互动功能暂时禁用
                </p>
              </div>

              {/* 活动基本信息 */}
              <ActivityBasicInfo activity={previewActivity} />

              {/* 组织者信息 */}
              <OrganizerInfo
                activity={previewActivity}
                onFollow={handleFollow}
              />

              {/* 活动分类显示 */}
              {formData.category && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    活动分类
                  </h3>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{categoryInfo.icon}</span>
                    <span className="font-medium text-gray-900">
                      {categoryInfo.nameZh}
                    </span>
                  </div>
                </div>
              )}

              {/* 活动描述 */}
              {(formData.description || formData.requirements) && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    活动详情
                  </h3>
                  {formData.description && (
                    <div className="prose max-w-none text-gray-600">
                      <div className="whitespace-pre-wrap break-words leading-relaxed text-sm">
                        {formData.description}
                      </div>
                    </div>
                  )}
                  {formData.requirements && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        参与要求
                      </h4>
                      <div className="text-gray-600">
                        <div className="whitespace-pre-wrap break-words leading-relaxed text-sm">
                          {formData.requirements}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 活动地点 */}
              <ActivityLocation
                activity={previewActivity}
                onViewDetails={handleViewLocationDetails}
                onNavigate={handleNavigate}
              />

              {/* 联系信息 */}
              {formData.contactInfo && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    联系方式
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{formData.contactInfo}</p>
                  </div>
                </div>
              )}

              {/* 在线会议信息 */}
              {formData.isOnline && formData.meetingLink && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    在线会议
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-700 mb-2">
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
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium">在线活动</span>
                    </div>
                    <p className="text-sm text-blue-600">
                      会议链接: {formData.meetingLink}
                    </p>
                  </div>
                </div>
              )}

              {/* 时间安排 */}
              {formData.schedule && formData.schedule.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    时间安排
                  </h3>
                  <div className="space-y-3">
                    {formData.schedule.map((item, index) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                              <span className="text-lg">
                                {item.icon || "📅"}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              {item.time && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-md font-mono">
                                  {dayjs(item.time).format("MM月DD日 HH:mm")}
                                </span>
                              )}
                              <h4 className="font-medium text-gray-900">
                                {item.title || `时间安排 ${index + 1}`}
                              </h4>
                            </div>
                            {item.description && (
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 注意事项 */}
              {formData.notices && formData.notices.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    注意事项
                  </h3>
                  <div className="space-y-2">
                    {formData.notices.map((notice, index) => (
                      <div
                        key={notice.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          notice.important
                            ? "bg-amber-50 border-amber-400"
                            : "bg-gray-50 border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-0.5">
                            {notice.important ? (
                              <svg
                                className="w-4 h-4 text-amber-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-4 h-4 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <p
                            className={`text-sm leading-relaxed flex-1 ${
                              notice.important
                                ? "text-amber-800"
                                : "text-gray-700"
                            }`}
                          >
                            {notice.content || `注意事项 ${index + 1}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 标签展示 */}
              {formData.tags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    活动标签
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Tag key={index} variant="secondary" size="sm">
                        #{tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}

              {/* 操作按钮区域（禁用状态） */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <button
                    disabled
                    className="flex-1 bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-medium cursor-not-allowed"
                  >
                    立即报名（预览模式）
                  </button>
                  <button
                    disabled
                    className="px-6 py-3 border border-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                  >
                    评论
                  </button>
                </div>
                <button
                  disabled
                  className="w-full py-2 text-gray-500 text-sm cursor-not-allowed"
                >
                  创建类似活动（预览模式）
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ActivityPreview;
