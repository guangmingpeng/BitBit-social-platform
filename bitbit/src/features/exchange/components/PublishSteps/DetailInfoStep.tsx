import React, { useState } from "react";
import { Input, Button } from "@/components/ui";
import type { PublishStepProps } from "../../types/types";

/**
 * 发布表单第二步：详细信息
 */
export const DetailInfoStep: React.FC<PublishStepProps> = ({
  formData,
  onUpdate,
}) => {
  const [newSpec, setNewSpec] = useState({ key: "", value: "" });
  const [newPreference, setNewPreference] = useState("");

  // 根据分类预设的规格参数
  const getPresetSpecifications = (category: string) => {
    const presets: Record<string, string[]> = {
      数码产品: ["品牌", "型号", "颜色", "存储容量", "屏幕尺寸", "电池容量"],
      服装服饰: ["品牌", "尺码", "颜色", "材质", "适用季节", "风格"],
      家居生活: ["品牌", "材质", "尺寸", "颜色", "适用空间", "风格"],
      图书文具: ["书名/品牌", "作者/型号", "出版社", "ISBN", "版本", "语言"],
      家用电器: ["品牌", "型号", "功率", "尺寸", "颜色", "能效等级"],
      运动户外: ["品牌", "型号", "尺码", "材质", "适用运动", "颜色"],
      美妆护肤: ["品牌", "产品名称", "规格", "适用肤质", "保质期", "产地"],
      母婴用品: ["品牌", "型号", "适用年龄", "材质", "颜色", "安全认证"],
      汽车用品: ["品牌", "型号", "适用车型", "材质", "颜色", "安装方式"],
      乐器音响: ["品牌", "型号", "材质", "颜色", "功率", "接口类型"],
      游戏玩具: ["品牌", "型号", "适用年龄", "材质", "颜色", "电池类型"],
    };
    return presets[category] || ["品牌", "型号", "颜色", "材质"];
  };

  const addSpecification = () => {
    if (newSpec.key.trim() && newSpec.value.trim()) {
      const updatedSpecs = [...formData.specifications, { ...newSpec }];
      onUpdate({ specifications: updatedSpecs });
      // 添加后清空表单，方便继续添加下一个属性
      setNewSpec({ key: "", value: "" });
    }
  };

  const removeSpecification = (index: number) => {
    const updatedSpecs = formData.specifications.filter((_, i) => i !== index);
    onUpdate({ specifications: updatedSpecs });
  };

  // 快速添加预设规格
  const addPresetSpec = (specKey: string) => {
    // 如果已经添加到表单中，则不处理
    if (isSpecAdded(specKey)) return;

    // 直接填入规格名称输入框
    setNewSpec({ key: specKey, value: "" });
  };

  // 检查是否已经添加了某个规格
  const isSpecAdded = (specKey: string) => {
    return formData.specifications.some((spec) => spec.key === specKey);
  };

  const addExchangePreference = () => {
    if (
      newPreference.trim() &&
      !formData.exchangePreferences.includes(newPreference)
    ) {
      const updatedPreferences = [
        ...formData.exchangePreferences,
        newPreference,
      ];
      onUpdate({ exchangePreferences: updatedPreferences });
      setNewPreference("");
    }
  };

  const removeExchangePreference = (preference: string) => {
    const updatedPreferences = formData.exchangePreferences.filter(
      (p) => p !== preference
    );
    onUpdate({ exchangePreferences: updatedPreferences });
  };

  const presetSpecs = getPresetSpecifications(formData.category);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-text-primary">详细信息</h3>

      {/* 商品规格 */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          商品规格参数
        </label>
        <p className="text-sm text-text-secondary">
          添加商品的详细规格信息，有助于买家了解商品。可以点击下方推荐参数快速填入，或手动输入自定义参数。
        </p>

        {/* 预设规格快速添加 */}
        {formData.category && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="text-sm font-semibold text-blue-800">
                推荐规格参数
              </div>
              <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                点击填入规格名称
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {presetSpecs.map((spec) => {
                const isAdded = isSpecAdded(spec);
                const isSelected = newSpec.key === spec;

                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => addPresetSpec(spec)}
                    className={`
                      px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2
                      ${
                        isAdded
                          ? "bg-green-50 border-green-200 text-green-700 cursor-default shadow-sm"
                          : isSelected
                          ? "bg-blue-500 border-blue-500 text-white shadow-md"
                          : "bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm"
                      }
                    `}
                    disabled={isAdded}
                  >
                    {isAdded ? (
                      <>
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {spec}
                      </>
                    ) : isSelected ? (
                      <>
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {spec}
                      </>
                    ) : (
                      <>+ {spec}</>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 text-xs text-blue-600">
              💡 选择合适的规格参数有助于买家更好地了解您的商品
            </div>
          </div>
        )}

        {/* 已添加的规格 */}
        {formData.specifications.length > 0 && (
          <div className="space-y-2">
            {formData.specifications.map((spec, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <span className="font-medium text-text-primary">
                    {spec.key}:
                  </span>{" "}
                  <span className="text-text-secondary">{spec.value}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeSpecification(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 添加新规格 */}
        <div className="flex gap-2">
          <Input
            placeholder="规格名称"
            value={newSpec.key}
            onChange={(e) => setNewSpec({ ...newSpec, key: e.target.value })}
            className="flex-1"
            onKeyPress={(e) => {
              if (
                e.key === "Enter" &&
                newSpec.key.trim() &&
                newSpec.value.trim()
              ) {
                e.preventDefault();
                addSpecification();
              }
            }}
          />
          <Input
            placeholder="规格值"
            value={newSpec.value}
            onChange={(e) => setNewSpec({ ...newSpec, value: e.target.value })}
            className="flex-1"
            onKeyPress={(e) => {
              if (
                e.key === "Enter" &&
                newSpec.key.trim() &&
                newSpec.value.trim()
              ) {
                e.preventDefault();
                addSpecification();
              }
            }}
          />
          <Button
            type="button"
            onClick={addSpecification}
            variant="primary"
            size="sm"
            disabled={!newSpec.key.trim() || !newSpec.value.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 shadow-md hover:shadow-lg transition-all duration-200"
          >
            添加
          </Button>
        </div>
      </div>

      {/* 交换偏好 */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          交换偏好
        </label>
        <p className="text-sm text-text-secondary">
          如果愿意以物换物，可以添加你希望交换的物品类型
        </p>

        {/* 已添加的偏好 */}
        {formData.exchangePreferences.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.exchangePreferences.map((preference) => (
              <span
                key={preference}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700"
              >
                {preference}
                <button
                  type="button"
                  onClick={() => removeExchangePreference(preference)}
                  className="ml-2 text-primary-500 hover:text-primary-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* 添加新偏好 */}
        <div className="flex gap-2">
          <Input
            placeholder="如：数码产品、图书文具等"
            value={newPreference}
            onChange={(e) => setNewPreference(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addExchangePreference();
              }
            }}
          />
          <Button
            type="button"
            onClick={addExchangePreference}
            variant="outline"
            size="sm"
            disabled={!newPreference.trim()}
          >
            添加
          </Button>
        </div>
      </div>
    </div>
  );
};
