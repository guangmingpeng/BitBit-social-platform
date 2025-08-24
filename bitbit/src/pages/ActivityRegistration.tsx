import { type FC, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { getActivityById } from "@/shared/data/activities";

interface RegistrationForm {
  name: string;
  phone: string;
  email: string;
  note: string;
  emergencyContact: string;
  emergencyPhone: string;
}

const ActivityRegistration: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RegistrationForm>({
    name: "",
    phone: "",
    email: "",
    note: "",
    emergencyContact: "",
    emergencyPhone: "",
  });

  // 获取活动详情
  const activity = id ? getActivityById(id) : null;

  if (!activity) {
    return (
      <Container size="lg" className="py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            活动不存在
          </h1>
          <p className="text-text-secondary mb-6">
            抱歉，您查找的活动不存在或已被删除。
          </p>
          <Button onClick={() => navigate("/activities")}>返回活动列表</Button>
        </div>
      </Container>
    );
  }

  const categoryConfig = {
    music: { variant: "music" as const, label: "音乐", emoji: "🎵" },
    food: { variant: "food" as const, label: "美食", emoji: "🍽️" },
    learning: { variant: "learning" as const, label: "学习", emoji: "📚" },
    reading: { variant: "reading" as const, label: "阅读", emoji: "📖" },
  };

  const isFull = activity.currentParticipants >= activity.maxParticipants;

  const handleInputChange = (field: keyof RegistrationForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isFull) {
      alert("活动已满员，无法报名");
      return;
    }

    // 基本验证
    if (!formData.name || !formData.phone) {
      alert("请填写必填项：姓名和手机号");
      return;
    }

    setIsSubmitting(true);

    try {
      // 模拟 API 调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("报名信息:", {
        activityId: activity.id,
        activityTitle: activity.title,
        ...formData,
      });

      alert("报名成功！我们会尽快与您联系确认。");
      navigate(`/activities/${activity.id}`);
    } catch (error) {
      console.error("报名失败:", error);
      alert("报名失败，请稍后重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "活动", href: "/activities" },
    { label: activity.title, href: `/activities/${activity.id}` },
    { label: "活动报名", current: true },
  ];

  return (
    <Container size="lg" className="py-6 space-y-6">
      {/* 面包屑导航 */}
      <Breadcrumb items={breadcrumbItems} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：报名表单 */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-text-primary mb-2">
                  活动报名
                </h1>
                <p className="text-text-secondary">
                  请填写以下信息完成活动报名
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 基本信息 */}
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    基本信息
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        姓名 <span className="text-error">*</span>
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="请输入您的姓名"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        手机号 <span className="text-error">*</span>
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="请输入您的手机号"
                        type="tel"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        邮箱
                      </label>
                      <Input
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="请输入您的邮箱（选填）"
                        type="email"
                      />
                    </div>
                  </div>
                </div>

                {/* 紧急联系人 */}
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-4">
                    紧急联系人
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        联系人姓名
                      </label>
                      <Input
                        value={formData.emergencyContact}
                        onChange={(e) =>
                          handleInputChange("emergencyContact", e.target.value)
                        }
                        placeholder="紧急联系人姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        联系人电话
                      </label>
                      <Input
                        value={formData.emergencyPhone}
                        onChange={(e) =>
                          handleInputChange("emergencyPhone", e.target.value)
                        }
                        placeholder="紧急联系人电话"
                        type="tel"
                      />
                    </div>
                  </div>
                </div>

                {/* 备注 */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    备注信息
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleInputChange("note", e.target.value)
                    }
                    placeholder="有什么想要告诉组织者的信息吗？（选填）"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* 提交按钮 */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting || isFull}
                    className="flex-1"
                    size="lg"
                  >
                    {isSubmitting
                      ? "提交中..."
                      : isFull
                      ? "活动已满"
                      : "确认报名"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/activities/${activity.id}`)}
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

        {/* 右侧：活动信息 */}
        <div>
          <Card className="sticky top-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">
                活动信息
              </h2>

              {/* 活动图片 */}
              {activity.images && activity.images.length > 0 && (
                <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                  <img
                    src={activity.images[0]}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Tag
                      variant={categoryConfig[activity.category].variant}
                      size="sm"
                    >
                      {categoryConfig[activity.category].emoji}{" "}
                      {categoryConfig[activity.category].label}
                    </Tag>
                  </div>
                </div>
              )}

              {/* 活动基本信息 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-text-primary line-clamp-2">
                  {activity.title}
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Icon name="calendar" size="sm" />
                    <span>
                      {activity.date} {activity.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Icon name="location" size="sm" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Icon name="users" size="sm" />
                    <span>
                      {activity.currentParticipants}/{activity.maxParticipants}{" "}
                      人
                    </span>
                  </div>
                </div>

                {/* 价格 */}
                <div className="pt-3 border-t border-gray-100">
                  <div className="text-lg font-bold text-primary-500">
                    {activity.isFree ? "免费活动" : `¥${activity.price}`}
                  </div>
                  {!activity.isFree && (
                    <div className="text-sm text-text-secondary">每人费用</div>
                  )}
                </div>

                {/* 状态提示 */}
                {isFull && (
                  <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                    <div className="flex items-center gap-2 text-error text-sm">
                      <span>⚠️</span>
                      <span>活动已满员</span>
                    </div>
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

export default ActivityRegistration;
