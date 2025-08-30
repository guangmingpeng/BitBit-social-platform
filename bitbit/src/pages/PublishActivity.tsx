import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Button,
  Tag,
  Icon,
  Breadcrumb,
  Input,
} from "@/components/ui";
import { BackButton, ImageCarousel } from "@/components/common";

interface ActivityForm {
  title: string;
  description: string;
  category: "music" | "food" | "learning" | "reading";
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxParticipants: number;
  price: number;
  isFree: boolean;
  tags: string[];
  images: string[];
  detailContent: string;
}

const PublishActivity: FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTag, setCurrentTag] = useState("");
  const [formData, setFormData] = useState<ActivityForm>({
    title: "",
    description: "",
    category: "learning",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    maxParticipants: 20,
    price: 0,
    isFree: true,
    tags: [],
    images: [],
    detailContent: "",
  });

  const categoryOptions = [
    { value: "music", label: "音乐", emoji: "🎵" },
    { value: "food", label: "美食", emoji: "🍽️" },
    { value: "learning", label: "学习", emoji: "📚" },
    { value: "reading", label: "阅读", emoji: "📖" },
  ];

  const handleInputChange = (
    field: keyof ActivityForm,
    value: string | number | boolean | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddImage = (imageUrl: string) => {
    if (imageUrl.trim() && !formData.images.includes(imageUrl.trim())) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()],
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 基本验证
    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.location
    ) {
      alert("请填写所有必填项");
      return;
    }

    if (formData.maxParticipants < 1) {
      alert("参与人数上限必须大于0");
      return;
    }

    if (!formData.isFree && formData.price <= 0) {
      alert("付费活动的价格必须大于0");
      return;
    }

    setIsSubmitting(true);

    try {
      // 模拟 API 调用
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("发布活动:", formData);

      alert("活动发布成功！");
      navigate("/activities");
    } catch (error) {
      console.error("发布失败:", error);
      alert("发布失败，请稍后重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "活动", href: "/activities" },
    { label: "发布活动", current: true },
  ];

  return (
    <Container size="lg" className="py-6 space-y-6">
      {/* 返回按钮和面包屑导航 */}
      <div className="flex items-center gap-4">
        <BackButton variant="outline" />
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：发布表单 */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  发布活动
                </h1>
                <p className="text-text-secondary">
                  填写活动信息，与更多志同道合的朋友分享
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 基本信息 */}
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    基本信息
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        活动标题 <span className="text-error">*</span>
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        placeholder="请输入活动标题"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        活动描述 <span className="text-error">*</span>
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          handleInputChange("description", e.target.value)
                        }
                        placeholder="请简要描述活动内容"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        活动分类 <span className="text-error">*</span>
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {categoryOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              handleInputChange("category", option.value)
                            }
                            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                              formData.category === option.value
                                ? "border-primary-500 bg-primary-50 text-primary-700"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-2xl mb-1">
                                {option.emoji}
                              </div>
                              <div className="text-sm font-medium">
                                {option.label}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 时间地点 */}
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    时间地点
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        活动日期 <span className="text-error">*</span>
                      </label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          handleInputChange("date", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          开始时间 <span className="text-error">*</span>
                        </label>
                        <Input
                          type="time"
                          value={formData.startTime}
                          onChange={(e) =>
                            handleInputChange("startTime", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          结束时间 <span className="text-error">*</span>
                        </label>
                        <Input
                          type="time"
                          value={formData.endTime}
                          onChange={(e) =>
                            handleInputChange("endTime", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        活动地点 <span className="text-error">*</span>
                      </label>
                      <Input
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        placeholder="请输入活动地点"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 参与人数和费用 */}
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    参与人数和费用
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        最大参与人数 <span className="text-error">*</span>
                      </label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.maxParticipants}
                        onChange={(e) =>
                          handleInputChange(
                            "maxParticipants",
                            parseInt(e.target.value) || 0
                          )
                        }
                        placeholder="请输入最大参与人数"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        活动费用
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              checked={formData.isFree}
                              onChange={() => {
                                handleInputChange("isFree", true);
                                handleInputChange("price", 0);
                              }}
                              className="mr-2"
                            />
                            免费活动
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              checked={!formData.isFree}
                              onChange={() =>
                                handleInputChange("isFree", false)
                              }
                              className="mr-2"
                            />
                            付费活动
                          </label>
                        </div>
                        {!formData.isFree && (
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) =>
                              handleInputChange(
                                "price",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            placeholder="请输入活动费用（元）"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 活动标签 */}
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    活动标签
                  </h2>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        placeholder="输入标签"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={handleAddTag}
                        variant="outline"
                      >
                        添加
                      </Button>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <Tag
                            key={index}
                            variant="secondary"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 hover:text-error transition-colors"
                            >
                              ×
                            </button>
                          </Tag>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 详细内容 */}
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    详细内容
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        活动图片
                      </label>
                      <div className="space-y-3">
                        {/* 添加图片输入 */}
                        <div className="flex gap-2">
                          <Input
                            placeholder="请输入图片链接"
                            type="url"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                const input = e.currentTarget;
                                handleAddImage(input.value);
                                input.value = "";
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              const input =
                                e.currentTarget.parentElement?.querySelector(
                                  "input"
                                ) as HTMLInputElement;
                              if (input?.value) {
                                handleAddImage(input.value);
                                input.value = "";
                              }
                            }}
                          >
                            添加
                          </Button>
                        </div>

                        {/* 已添加的图片列表 */}
                        {formData.images.length > 0 && (
                          <div className="space-y-2">
                            {formData.images.map((image, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                              >
                                <img
                                  src={image}
                                  alt={`图片 ${index + 1}`}
                                  className="w-12 h-12 object-cover rounded"
                                  onError={(e) => {
                                    (
                                      e.target as HTMLImageElement
                                    ).style.display = "none";
                                  }}
                                />
                                <span className="flex-1 text-sm text-text-secondary truncate">
                                  {image}
                                </span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveImage(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Icon
                                    name="plus"
                                    size="sm"
                                    className="rotate-45"
                                  />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        详细介绍
                      </label>
                      <textarea
                        value={formData.detailContent}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          handleInputChange("detailContent", e.target.value)
                        }
                        placeholder="详细介绍活动内容、安排、注意事项等（支持HTML）"
                        rows={8}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 提交按钮 */}
                <div className="flex gap-4 pt-6 border-t border-gray-100">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                    size="lg"
                  >
                    {isSubmitting ? "发布中..." : "发布活动"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/activities")}
                    className="flex-1"
                    size="lg"
                  >
                    取消
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* 右侧：预览 */}
        <div>
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">
                预览
              </h2>

              {/* 活动预览 */}
              <div className="space-y-3">
                {formData.images.length > 0 && (
                  <div className="relative h-32 rounded-lg overflow-hidden bg-gray-100">
                    <ImageCarousel
                      images={formData.images}
                      alt="活动图片"
                      height="128px"
                      showIndicators={formData.images.length > 1}
                      showArrows={formData.images.length > 1}
                      className="rounded-lg"
                    />
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-text-primary line-clamp-2">
                    {formData.title || "活动标题"}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                    {formData.description || "活动描述"}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  {formData.date && (
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Icon name="calendar" size="sm" />
                      <span>
                        {formData.date}{" "}
                        {formData.startTime &&
                          formData.endTime &&
                          `${formData.startTime}-${formData.endTime}`}
                      </span>
                    </div>
                  )}
                  {formData.location && (
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Icon name="location" size="sm" />
                      <span>{formData.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Icon name="users" size="sm" />
                    <span>最多 {formData.maxParticipants} 人</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <div className="text-lg font-bold text-primary-500">
                    {formData.isFree ? "免费活动" : `¥${formData.price}`}
                  </div>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {formData.tags.map((tag, index) => (
                      <Tag key={index} variant="secondary" size="sm">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default PublishActivity;
