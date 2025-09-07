import React from "react";
import { Input } from "@/components/ui";
import type { EditableUserProfile } from "../../types";

interface SocialLinksFormProps {
  data: EditableUserProfile;
  onChange: (updates: Partial<EditableUserProfile>) => void;
  isPreviewMode?: boolean;
}

// 社交平台配置
const socialPlatforms = [
  {
    key: "website" as const,
    label: "个人网站",
    icon: "🌐",
    placeholder: "https://example.com",
    description: "你的个人网站或博客",
    color: "text-gray-600",
  },
  {
    key: "github" as const,
    label: "GitHub",
    icon: "💻",
    placeholder: "https://github.com/username",
    description: "展示你的代码项目",
    color: "text-gray-900",
  },
  {
    key: "twitter" as const,
    label: "Twitter",
    icon: "🐦",
    placeholder: "https://twitter.com/username",
    description: "分享你的想法和动态",
    color: "text-blue-500",
  },
  {
    key: "instagram" as const,
    label: "Instagram",
    icon: "📷",
    placeholder: "https://instagram.com/username",
    description: "分享你的生活片段",
    color: "text-pink-500",
  },
  {
    key: "linkedin" as const,
    label: "LinkedIn",
    icon: "💼",
    placeholder: "https://linkedin.com/in/username",
    description: "职业网络和经历",
    color: "text-blue-600",
  },
  {
    key: "weibo" as const,
    label: "微博",
    icon: "📱",
    placeholder: "https://weibo.com/username",
    description: "国内社交平台",
    color: "text-red-500",
  },
];

export const SocialLinksForm: React.FC<SocialLinksFormProps> = ({
  data,
  onChange,
  isPreviewMode = false,
}) => {
  const socialLinks = data.socialLinks || {};

  // 更新社交链接
  const updateSocialLink = (
    key: keyof EditableUserProfile["socialLinks"],
    value: string
  ) => {
    onChange({
      socialLinks: {
        ...socialLinks,
        [key]: value,
      },
    });
  };

  // 验证URL格式
  const isValidUrl = (url: string): boolean => {
    if (!url) return true; // 空值是有效的
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (isPreviewMode) {
    const activeSocialLinks = socialPlatforms.filter(
      (platform) => socialLinks[platform.key]
    );

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          社交链接预览
        </h2>

        {activeSocialLinks.length > 0 ? (
          <div className="space-y-4">
            {activeSocialLinks.map((platform) => (
              <div
                key={platform.key}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <span className="text-2xl">{platform.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {platform.label}
                  </div>
                  <a
                    href={socialLinks[platform.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm ${platform.color} hover:underline`}
                  >
                    {socialLinks[platform.key]}
                  </a>
                </div>
                <span className="text-sm text-gray-500">🔗</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <div className="text-4xl mb-2">🔗</div>
            <p className="text-gray-500">暂未添加社交链接</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">社交链接</h2>
        <div className="text-sm text-gray-500">
          已添加 {Object.values(socialLinks).filter(Boolean).length}/
          {socialPlatforms.length} 个链接
        </div>
      </div>

      <p className="text-gray-600">
        添加你的社交媒体链接，让其他用户更好地了解你
      </p>

      {/* 社交链接表单 */}
      <div className="space-y-6">
        {socialPlatforms.map((platform) => {
          const value = socialLinks[platform.key] || "";
          const hasError = value && !isValidUrl(value);

          return (
            <div key={platform.key} className="space-y-2">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{platform.icon}</span>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {platform.label}
                  </label>
                  <p className="text-xs text-gray-500">
                    {platform.description}
                  </p>
                </div>
              </div>

              <Input
                value={value}
                onChange={(e) => updateSocialLink(platform.key, e.target.value)}
                placeholder={platform.placeholder}
                error={hasError ? "请输入有效的URL地址" : undefined}
                className={hasError ? "border-red-300" : ""}
              />

              {value && isValidUrl(value) && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <span>✓</span>
                  <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    链接有效，点击预览
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* URL格式提示 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">链接格式提示</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 请输入完整的URL地址，包含 http:// 或 https://</li>
              <li>• 确保链接可以正常访问</li>
              <li>• 社交链接会在你的个人资料页面显示</li>
              <li>• 你可以随时修改或删除这些链接</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 隐私提醒 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <h4 className="font-medium text-yellow-900 mb-1">隐私提醒</h4>
            <p className="text-sm text-yellow-700">
              添加的社交链接会根据你的隐私设置向其他用户展示。
              如果你不希望某些信息被公开，请在隐私设置中调整可见性。
            </p>
          </div>
        </div>
      </div>

      {/* 链接预览 */}
      {Object.values(socialLinks).some(Boolean) && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">预览</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex flex-wrap gap-3">
              {socialPlatforms
                .filter((platform) => socialLinks[platform.key])
                .map((platform) => (
                  <a
                    key={platform.key}
                    href={socialLinks[platform.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${platform.color}`}
                  >
                    <span>{platform.icon}</span>
                    <span className="text-sm font-medium">
                      {platform.label}
                    </span>
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
