import React, { useState } from "react";
import { Card, CardContent, Badge, Avatar } from "@/components/ui";
import type { PublishStepProps } from "../../types/types";

/**
 * 发布表单第五步：预览发布
 * 复用商品详情页的布局和样式
 */
export const PreviewStep: React.FC<PublishStepProps> = ({ formData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 模拟当前用户信息
  const currentUser = {
    name: "您的姓名",
    avatar: "",
    rating: 5.0,
    totalSales: 0,
    joinDate: "刚刚加入",
    initials: "您",
  };

  const nextImage = () => {
    if (formData.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % formData.images.length);
    }
  };

  const prevImage = () => {
    if (formData.images.length > 1) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + formData.images.length) % formData.images.length
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-green-600">👁</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-text-primary">商品预览</h3>
          <p className="text-sm text-text-secondary">
            这是您的商品在发布后的展示效果
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 左侧：图片展示区域 */}
        <div className="space-y-4">
          {/* 主图片 */}
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {formData.images.length > 0 ? (
                  <>
                    <img
                      src={URL.createObjectURL(
                        formData.images[currentImageIndex]
                      )}
                      alt="商品图片"
                      className="w-full h-full object-cover"
                    />
                    {formData.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          ←
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          →
                        </button>
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {formData.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentImageIndex
                                  ? "bg-white"
                                  : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 text-4xl">📷</div>
                      <p>暂无图片</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 缩略图 */}
          {formData.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {formData.images.slice(0, 5).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square bg-gray-100 rounded overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex
                      ? "border-primary-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`缩略图 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 右侧：商品信息 */}
        <div className="space-y-6">
          {/* 商品基本信息 */}
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* 标题和价格 */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-text-primary">
                  {formData.title || "商品标题"}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-secondary">
                    {formData.condition || "全新"} |{" "}
                    {formData.category || "未分类"}
                  </span>
                  <span className="text-sm text-text-tertiary">•</span>
                  <span className="text-sm text-text-tertiary">
                    {formData.location || "未设置地区"}
                  </span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary-500">
                    ¥{formData.price?.toLocaleString() || "0"}
                  </span>
                  {formData.originalPrice &&
                    formData.originalPrice > formData.price && (
                      <>
                        <span className="text-lg text-text-tertiary line-through">
                          ¥{formData.originalPrice.toLocaleString()}
                        </span>
                        <Badge variant="secondary" className="ml-2">
                          省 ¥
                          {(
                            formData.originalPrice - formData.price
                          ).toLocaleString()}
                        </Badge>
                      </>
                    )}
                </div>
              </div>

              {/* 统计信息 */}
              <div className="flex items-center gap-6 text-sm text-text-tertiary">
                <span className="flex items-center gap-1">
                  <span>👁</span>0 浏览
                </span>
                <span className="flex items-center gap-1">
                  <span>❤</span>0 喜欢
                </span>
                <span className="flex items-center gap-1">
                  <span>💬</span>0 评论
                </span>
                <span className="flex items-center gap-1">
                  <span>🕒</span>
                  刚刚发布
                </span>
              </div>

              {/* 商品描述 */}
              {formData.description && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-text-primary">
                    商品描述
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {formData.description}
                  </p>
                </div>
              )}

              {/* 商品规格 */}
              {formData.specifications &&
                formData.specifications.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-text-primary">
                      商品规格
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {formData.specifications.map((spec, index) => (
                        <div
                          key={index}
                          className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
                        >
                          <span className="text-text-secondary">
                            {spec.key}
                          </span>
                          <span className="text-text-primary font-medium">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* 交换偏好 */}
              {formData.exchangePreferences &&
                formData.exchangePreferences.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-text-primary">
                      交换偏好
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.exchangePreferences.map((preference, index) => (
                        <Badge key={index} variant="secondary">
                          {preference}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>

          {/* 卖家信息 */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                卖家信息
              </h3>
              <div className="flex items-center gap-4">
                <Avatar size="lg" className="flex-shrink-0">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} />
                  ) : (
                    <span className="text-xl font-semibold">
                      {currentUser.initials}
                    </span>
                  )}
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-text-primary">
                      {currentUser.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-text-secondary">
                        {currentUser.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-text-tertiary space-y-1">
                    <p>成功交易: {currentUser.totalSales} 次</p>
                    <p>加入时间: {currentUser.joinDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 提示信息 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-500 text-xl">💡</span>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">发布提示</p>
            <p>
              请确认所有信息准确无误。发布后您的商品将出现在二手交换列表中，其他用户可以浏览并联系您进行交换。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
