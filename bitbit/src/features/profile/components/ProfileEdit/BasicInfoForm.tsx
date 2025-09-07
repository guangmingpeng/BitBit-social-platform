import React, { useState, useRef } from "react";
import { Input, Button, DateTimePicker } from "@/components/ui";
import type { EditableUserProfile } from "../../types";

interface BasicInfoFormProps {
  data: EditableUserProfile;
  onChange: (updates: Partial<EditableUserProfile>) => void;
  isPreviewMode?: boolean;
}

export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  data,
  onChange,
  isPreviewMode = false,
}) => {
  // 文件状态用于将来可能的文件处理逻辑
  const [, setAvatarFile] = useState<File | null>(null);
  const [, setCoverFile] = useState<File | null>(null);
  const [showAvatarPreview, setShowAvatarPreview] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // 处理头像上传
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      // 在实际项目中，这里会上传文件并获得URL
      // 目前我们可以使用 FileReader 预览或直接用mock数据
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange({ avatar: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理封面上传
  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverFile(file);
      // 在实际项目中，这里会上传文件并获得URL
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange({ coverImage: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理头像查看
  const handleAvatarView = () => {
    if (data.avatar) {
      setShowAvatarPreview(true);
    }
  };

  if (isPreviewMode) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          基础信息预览
        </h2>

        {/* 封面图片预览 */}
        {data.coverImage && (
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden">
            <img
              src={data.coverImage}
              alt="封面"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 用户信息预览 */}
        <div className="flex items-start gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt="头像"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-xl font-medium">
                  {data.fullName?.slice(0, 2) ||
                    data.username?.slice(0, 2) ||
                    "U"}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {data.fullName || data.username}
            </h3>
            {data.profession && (
              <p className="text-gray-600">{data.profession}</p>
            )}
            {data.location && (
              <p className="text-gray-500 text-sm">📍 {data.location}</p>
            )}
            {data.bio && <p className="text-gray-600 mt-2">{data.bio}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">基础信息</h2>

        {/* 封面图片上传 */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            个人主页封面
          </label>
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
              {data.coverImage ? (
                <img
                  src={data.coverImage}
                  alt="封面预览"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-white">
                    <div className="text-2xl mb-2">🖼️</div>
                    <p className="text-sm">点击上传封面图片</p>
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center"
              >
                <div className="text-white opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-lg">📷</span>
                </div>
              </button>
            </div>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
            />
          </div>
          <p className="text-xs text-gray-500">
            推荐尺寸：800×200px，支持 JPG、PNG 格式
          </p>
        </div>

        {/* 头像上传 */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            头像
          </label>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={handleAvatarView}
                title="点击查看头像"
              >
                {data.avatar ? (
                  <img
                    src={data.avatar}
                    alt="头像"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-xl font-medium">
                    {data.fullName?.slice(0, 2) ||
                      data.username?.slice(0, 2) ||
                      "U"}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors text-sm"
                title="更换头像"
              >
                📷
              </button>
            </div>
            <div className="flex-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => avatarInputRef.current?.click()}
              >
                更换头像
              </Button>
              <p className="text-xs text-gray-500 mt-1">
                推荐尺寸：200×200px，支持 JPG、PNG 格式
              </p>
            </div>
          </div>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </div>

        {/* 基本信息表单 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="用户名"
            value={data.username}
            onChange={(e) => onChange({ username: e.target.value })}
            placeholder="请输入用户名"
            description="用户名在平台上唯一，只能修改一次"
          />

          <Input
            label="真实姓名"
            value={data.fullName || ""}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder="请输入真实姓名"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="职业"
            value={data.profession || ""}
            onChange={(e) => onChange({ profession: e.target.value })}
            placeholder="请输入职业"
          />

          <Input
            label="所在地"
            value={data.location || ""}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="请输入所在地"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="年龄"
            type="number"
            min="13"
            max="120"
            value={data.age || ""}
            onChange={(e) =>
              onChange({
                age: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
            placeholder="请输入年龄"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              性别
            </label>
            <select
              value={data.gender || ""}
              onChange={(e) =>
                onChange({
                  gender: e.target.value as EditableUserProfile["gender"],
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            >
              <option value="">请选择性别</option>
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="other">其他</option>
              <option value="prefer_not_to_say">不愿透露</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            个人简介
          </label>
          <textarea
            value={data.bio || ""}
            onChange={(e) => onChange({ bio: e.target.value })}
            placeholder="介绍一下自己吧..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
            rows={4}
            maxLength={500}
          />
          <div className="text-xs text-gray-500 text-right">
            {(data.bio || "").length}/500
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            生日
          </label>
          <DateTimePicker
            value={data.birthDate || ""}
            onChange={(value) => onChange({ birthDate: value })}
            placeholder="选择您的生日"
            className="w-full"
            maxDate={new Date()} // 不能选择未来日期
          />
          <p className="text-xs text-gray-500">
            生日信息可以帮助我们为你推荐更合适的活动
          </p>
        </div>
      </div>

      {/* 头像预览模态框 */}
      {showAvatarPreview && data.avatar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setShowAvatarPreview(false)}
        >
          <div className="relative max-w-2xl max-h-[80vh] p-4">
            <img
              src={data.avatar}
              alt="头像预览"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setShowAvatarPreview(false)}
              className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-75 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};
