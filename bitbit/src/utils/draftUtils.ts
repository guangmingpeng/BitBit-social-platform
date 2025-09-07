import type { ActivityFormData } from "@/features/activities/components/ActivityForm";
import type { CommunityPostFormData } from "@/features/community/components/CommunityPostForm";
import type { PublishFormData } from "@/features/exchange/types";
import type { Draft } from "@/shared/data/profileMockData";

/**
 * 计算活动表单的完成度
 * @param formData 活动表单数据
 * @returns 完成度百分比 (0-100)
 */
export const calculateActivityProgress = (
  formData: ActivityFormData
): number => {
  const requiredFields = [
    "title",
    "description",
    "category",
    "startDate",
    "endDate",
    "location",
  ];

  const optionalFields = [
    "maxParticipants",
    "registrationDeadline",
    "tags",
    "images",
    "requirements",
    "contactInfo",
    "schedule",
    "notices",
  ];

  let completedRequired = 0;
  let completedOptional = 0;

  // 检查必填字段
  requiredFields.forEach((field) => {
    const value = formData[field as keyof ActivityFormData];
    if (
      value &&
      ((typeof value === "string" && value.trim()) ||
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === "number" && value > 0))
    ) {
      completedRequired++;
    }
  });

  // 检查可选字段
  optionalFields.forEach((field) => {
    const value = formData[field as keyof ActivityFormData];
    if (
      value &&
      ((typeof value === "string" && value.trim()) ||
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === "number" && value > 0))
    ) {
      completedOptional++;
    }
  });

  // 必填字段权重70%，可选字段权重30%
  const requiredWeight = 0.7;
  const optionalWeight = 0.3;

  const requiredProgress =
    (completedRequired / requiredFields.length) * requiredWeight;
  const optionalProgress =
    (completedOptional / optionalFields.length) * optionalWeight;

  return Math.round((requiredProgress + optionalProgress) * 100);
};

/**
 * 将草稿数据转换为活动表单数据
 * @param draft 草稿数据
 * @returns 活动表单数据
 */
export const convertDraftToActivityForm = (draft: Draft): ActivityFormData => {
  // 这是一个简化的转换，实际项目中需要根据草稿的具体存储格式来实现
  // 暂时使用草稿的基本信息，其他字段使用默认值
  // 注意：草稿中的images是string[]，而表单需要File[]，这里暂时使用空数组
  return {
    title: draft.title || "",
    description: draft.content || "",
    category: "",
    startDate: "",
    endDate: "",
    location: "",
    maxParticipants: 20,
    registrationDeadline: "",
    fee: 0,
    tags: [],
    images: [], // 草稿恢复时，图片需要单独处理
    requirements: "",
    contactInfo: "",
    isOnline: false,
    meetingLink: "",
    schedule: [],
    notices: [],
  };
};

/**
 * 计算帖子表单的完成度
 * @param formData 帖子表单数据
 * @returns 完成度百分比 (0-100)
 */
export const calculatePostProgress = (
  formData: CommunityPostFormData
): number => {
  const requiredFields = ["title", "content", "category"];
  const optionalFields = ["tags", "images"];

  let completedRequired = 0;
  let completedOptional = 0;

  // 检查必填字段
  requiredFields.forEach((field) => {
    const value = formData[field as keyof CommunityPostFormData];
    if (
      value &&
      ((typeof value === "string" && value.trim()) ||
        (Array.isArray(value) && value.length > 0))
    ) {
      completedRequired++;
    }
  });

  // 检查可选字段
  optionalFields.forEach((field) => {
    const value = formData[field as keyof CommunityPostFormData];
    if (value && Array.isArray(value) && value.length > 0) {
      completedOptional++;
    }
  });

  // 必填字段权重80%，可选字段权重20%
  const requiredWeight = 0.8;
  const optionalWeight = 0.2;

  const requiredProgress =
    (completedRequired / requiredFields.length) * requiredWeight;
  const optionalProgress =
    (completedOptional / optionalFields.length) * optionalWeight;

  return Math.round((requiredProgress + optionalProgress) * 100);
};

/**
 * 计算商品表单的完成度
 * @param formData 商品表单数据
 * @returns 完成度百分比 (0-100)
 */
export const calculateExchangeProgress = (
  formData: PublishFormData
): number => {
  const requiredFields = [
    "title",
    "category",
    "condition",
    "price",
    "description",
    "location",
  ];
  const optionalFields = [
    "images",
    "specifications",
    "exchangePreferences",
    "contactInfo",
  ];

  let completedRequired = 0;
  let completedOptional = 0;

  // 检查必填字段
  requiredFields.forEach((field) => {
    const value = formData[field as keyof PublishFormData];
    if (
      value &&
      ((typeof value === "string" && value.trim()) ||
        (typeof value === "number" && value > 0) ||
        (Array.isArray(value) && value.length > 0))
    ) {
      completedRequired++;
    }
  });

  // 检查可选字段
  optionalFields.forEach((field) => {
    const value = formData[field as keyof PublishFormData];
    if (
      value &&
      ((typeof value === "string" && value.trim()) ||
        (Array.isArray(value) && value.length > 0))
    ) {
      completedOptional++;
    }
  });

  // 必填字段权重75%，可选字段权重25%
  const requiredWeight = 0.75;
  const optionalWeight = 0.25;

  const requiredProgress =
    (completedRequired / requiredFields.length) * requiredWeight;
  const optionalProgress =
    (completedOptional / optionalFields.length) * optionalWeight;

  return Math.round((requiredProgress + optionalProgress) * 100);
};

/**
 * 将草稿数据转换为帖子表单数据
 * @param draft 草稿数据
 * @returns 帖子表单数据
 */
export const convertDraftToPostForm = (draft: Draft): CommunityPostFormData => {
  return {
    title: draft.title || "",
    content: draft.content || "",
    category: "",
    tags: [],
    images: [], // 草稿恢复时，图片需要单独处理
    isPrivate: false,
    allowComments: true,
  };
};

/**
 * 将草稿数据转换为商品表单数据
 * @param draft 草稿数据
 * @returns 商品表单数据
 */
export const convertDraftToExchangeForm = (draft: Draft): PublishFormData => {
  return {
    title: draft.title || "",
    category: "",
    condition: "",
    price: 0,
    description: draft.content || "",
    location: "",
    images: [], // 草稿恢复时，图片需要单独处理
    specifications: [],
    exchangePreferences: [],
    contactMethod: "platform",
    deliveryOptions: {
      shipping: false,
      freeShipping: false,
      pickup: false,
      meetup: false,
      localOnly: false,
    },
    paymentMethods: {
      cash: false,
      bankTransfer: false,
      wechatPay: false,
      alipay: false,
    },
    paymentQRCodes: [],
  };
};
export const convertActivityFormToDraft = (
  formData: ActivityFormData,
  draftId?: string
): Draft => {
  const progress = calculateActivityProgress(formData);

  // 将File[]转换为string[]（实际应用中需要上传文件并获取URL）
  const imageUrls = formData.images.map(
    (_, index) =>
      `https://picsum.photos/300/200?random=draft-${
        draftId || Date.now()
      }-${index}`
  );

  return {
    id: draftId || `draft-${Date.now()}`,
    type: "activity",
    title: formData.title || "未命名活动",
    content: formData.description || "",
    lastEditTime: new Date().toLocaleString("zh-CN"),
    images: imageUrls,
    progress,
  };
};

/**
 * 将帖子表单数据转换为草稿数据
 * @param formData 帖子表单数据
 * @param draftId 草稿ID（可选，新草稿时为空）
 * @returns 草稿数据
 */
export const convertPostFormToDraft = (
  formData: CommunityPostFormData,
  draftId?: string
): Draft => {
  const progress = calculatePostProgress(formData);

  // 将File[]转换为string[]（实际应用中需要上传文件并获取URL）
  const imageUrls = formData.images.map(
    (_, index) =>
      `https://picsum.photos/300/200?random=post-draft-${
        draftId || Date.now()
      }-${index}`
  );

  return {
    id: draftId || `draft-${Date.now()}`,
    type: "post",
    title: formData.title || "未命名帖子",
    content: formData.content || "",
    lastEditTime: new Date().toLocaleString("zh-CN"),
    images: imageUrls,
    progress,
  };
};

/**
 * 将商品表单数据转换为草稿数据
 * @param formData 商品表单数据
 * @param draftId 草稿ID（可选，新草稿时为空）
 * @returns 草稿数据
 */
export const convertExchangeFormToDraft = (
  formData: PublishFormData,
  draftId?: string
): Draft => {
  const progress = calculateExchangeProgress(formData);

  // 将File[]转换为string[]（实际应用中需要上传文件并获取URL）
  const imageUrls = formData.images.map(
    (_, index) =>
      `https://picsum.photos/300/200?random=exchange-draft-${
        draftId || Date.now()
      }-${index}`
  );

  return {
    id: draftId || `draft-${Date.now()}`,
    type: "exchange",
    title: formData.title || "未命名商品",
    content: formData.description || "",
    lastEditTime: new Date().toLocaleString("zh-CN"),
    images: imageUrls,
    progress,
  };
};
