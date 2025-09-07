import React from "react";
import { TagsInput } from "@/shared/components/TagsInput";
import { cn } from "@/shared/utils/cn";
import type { EditableUserProfile } from "../../types";

// 预定义的兴趣标签，适配 TagsInput 的 PresetTag 格式
const interestPresetTags = [
  // 音乐相关
  { label: "流行音乐", variant: "music" as const },
  { label: "古典音乐", variant: "music" as const },
  { label: "摇滚", variant: "music" as const },
  { label: "电子音乐", variant: "music" as const },
  { label: "民谣", variant: "music" as const },
  { label: "爵士", variant: "music" as const },

  // 美食相关
  { label: "中餐", variant: "food" as const },
  { label: "西餐", variant: "food" as const },
  { label: "烘焙", variant: "food" as const },
  { label: "咖啡", variant: "food" as const },
  { label: "茶文化", variant: "food" as const },
  { label: "日料", variant: "food" as const },

  // 学习相关
  { label: "编程", variant: "learning" as const },
  { label: "设计", variant: "learning" as const },
  { label: "外语", variant: "learning" as const },
  { label: "读书", variant: "reading" as const },
  { label: "写作", variant: "learning" as const },
  { label: "演讲", variant: "learning" as const },

  // 运动相关
  { label: "跑步", variant: "secondary" as const },
  { label: "健身", variant: "secondary" as const },
  { label: "游泳", variant: "secondary" as const },
  { label: "篮球", variant: "secondary" as const },
  { label: "瑜伽", variant: "secondary" as const },
  { label: "羽毛球", variant: "secondary" as const },

  // 旅行相关
  { label: "国内游", variant: "default" as const },
  { label: "出国游", variant: "default" as const },
  { label: "自驾游", variant: "default" as const },
  { label: "徒步", variant: "default" as const },
  { label: "摄影", variant: "default" as const },
  { label: "美食探店", variant: "food" as const },

  // 科技相关
  { label: "人工智能", variant: "learning" as const },
  { label: "前端开发", variant: "learning" as const },
  { label: "产品设计", variant: "learning" as const },
  { label: "数码产品", variant: "secondary" as const },
  { label: "游戏开发", variant: "learning" as const },
  { label: "创业", variant: "secondary" as const },

  // 艺术相关
  { label: "绘画", variant: "reading" as const },
  { label: "手工", variant: "secondary" as const },
  { label: "音乐创作", variant: "music" as const },
  { label: "文学", variant: "reading" as const },
  { label: "书法", variant: "reading" as const },

  // 娱乐相关
  { label: "电影", variant: "default" as const },
  { label: "游戏", variant: "default" as const },
  { label: "动漫", variant: "default" as const },
  { label: "综艺", variant: "default" as const },
  { label: "桌游", variant: "default" as const },
];

interface InterestsFormProps {
  data: EditableUserProfile;
  onChange: (updates: Partial<EditableUserProfile>) => void;
  isPreviewMode?: boolean;
}

export const InterestsForm: React.FC<InterestsFormProps> = ({
  data,
  onChange,
  isPreviewMode = false,
}) => {
  // 将 interests 对象数组转换为简单的字符串数组，适配 TagsInput
  const interestTags = (data.interests || []).map((interest) => interest.name);

  // 处理标签变化
  const handleTagsChange = (tags: string[]) => {
    // 将字符串数组转换回 interests 对象数组
    const newInterests = tags.map((tag, index) => ({
      id: Date.now().toString() + index,
      name: tag,
      category: getTagCategory(tag),
      isPrimary: index < 5, // 前5个设为主要兴趣
    }));

    onChange({ interests: newInterests });
  };

  // 根据标签名称推断分类
  const getTagCategory = (tagName: string): string => {
    const preset = interestPresetTags.find((tag) => tag.label === tagName);
    if (preset) {
      switch (preset.variant) {
        case "music":
          return "music";
        case "food":
          return "food";
        case "learning":
          return "learning";
        case "reading":
          return "learning";
        default:
          return "other";
      }
    }
    return "other";
  };

  if (isPreviewMode) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          兴趣爱好预览
        </h2>

        {interestTags.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">我的兴趣</h3>
            <div className="text-sm text-gray-600 mb-3">
              以下是其他用户看到你的个人卡片时显示的兴趣标签（与 UserCard
              保持一致）：
            </div>

            {/* 模拟 UserCard 的显示方式 */}
            <div className="flex flex-wrap justify-center gap-2 p-4 bg-gray-50 rounded-lg">
              {data.interests?.slice(0, 3).map((interest) => (
                <span
                  key={interest.id}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium"
                >
                  {interest.name}
                </span>
              ))}
              {data.interests && data.interests.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                  +{data.interests.length - 3}
                </span>
              )}
            </div>

            {/* 完整的兴趣列表 */}
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-700 mb-3">
                完整兴趣列表
              </h4>
              <div className="flex flex-wrap gap-2">
                {data.interests?.map((interest) => (
                  <span
                    key={interest.id}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      interest.isPrimary
                        ? "bg-blue-100 text-blue-600 border border-blue-300"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {interest.name}
                    {interest.isPrimary && " ⭐"}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ⭐ 标记的是主要兴趣，会在推荐算法中获得更高权重
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">🎯</div>
            <p>还没有添加兴趣爱好</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">兴趣爱好</h2>
        <p className="text-gray-600">
          选择您感兴趣的标签，这将帮助我们为您推荐相关的活动和内容。最多可选择
          15 个标签。
        </p>
      </div>

      <TagsInput
        tags={interestTags}
        onTagsChange={handleTagsChange}
        title="选择兴趣标签"
        placeholder="输入您的兴趣爱好..."
        maxTags={15}
        showPresets={true}
        presetTags={interestPresetTags}
        description="选择或添加您感兴趣的标签，前5个将作为主要兴趣显示"
      />

      {data.interests && data.interests.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-700 mb-2">
            主要兴趣 (前5个标签)
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.interests?.slice(0, 5).map((interest) => (
              <span
                key={interest.id}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium border border-blue-300"
              >
                {interest.name} ⭐
              </span>
            ))}
          </div>
          <p className="text-xs text-blue-600 mt-2">
            主要兴趣将在您的个人主页上重点展示
          </p>
        </div>
      )}
    </div>
  );
};
