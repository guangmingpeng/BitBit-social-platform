import type { ExchangeCategory, ExchangeCondition } from "./types/types";

/**
 * 交换商品分类
 */
export const EXCHANGE_CATEGORIES: ExchangeCategory[] = [
  { id: "", name: "全部", icon: "📂" },
  { id: "数码产品", name: "数码产品", icon: "📱" },
  { id: "服装", name: "服装", icon: "👔" },
  { id: "家居", name: "家居", icon: "🏠" },
  { id: "图书", name: "书籍", icon: "📚" },
  { id: "家电", name: "家电", icon: "🔌" },
  { id: "其他", name: "其他", icon: "📦" },
];

/**
 * 详细分类（用于发布）
 */
export const DETAILED_CATEGORIES: ExchangeCategory[] = [
  { id: "数码产品", name: "数码产品", icon: "📱" },
  { id: "服装服饰", name: "服装服饰", icon: "👔" },
  { id: "家居生活", name: "家居生活", icon: "🏠" },
  { id: "图书文具", name: "图书文具", icon: "📚" },
  { id: "家用电器", name: "家用电器", icon: "🔌" },
  { id: "运动户外", name: "运动户外", icon: "⚽" },
  { id: "美妆护肤", name: "美妆护肤", icon: "💄" },
  { id: "母婴用品", name: "母婴用品", icon: "🍼" },
  { id: "汽车用品", name: "汽车用品", icon: "🚗" },
  { id: "乐器音响", name: "乐器音响", icon: "🎵" },
  { id: "游戏玩具", name: "游戏玩具", icon: "🎮" },
  { id: "自定义", name: "其他 (自定义)", icon: "✏️" },
];

/**
 * 商品成色
 */
export const EXCHANGE_CONDITIONS: ExchangeCondition[] = [
  { id: "new", name: "全新", description: "未使用过的新品" },
  { id: "like-new", name: "几乎全新", description: "使用极少，无明显瑕疵" },
  { id: "95-new", name: "95新", description: "轻微使用痕迹，功能完好" },
  { id: "90-new", name: "9成新", description: "有一定使用痕迹，功能正常" },
  { id: "85-new", name: "8.5成新", description: "明显使用痕迹，功能正常" },
  { id: "80-new", name: "8成新", description: "较多使用痕迹，功能正常" },
  { id: "custom", name: "自定义", description: "自定义成色描述" },
];

/**
 * 状态配置
 */
export const STATUS_CONFIG = {
  available: { label: "在售", color: "bg-primary-100 text-primary-500" },
  reserved: { label: "已预定", color: "bg-coral-100 text-coral-500" },
  sold: { label: "已售出", color: "bg-gray-200 text-text-tertiary" },
  hot: { label: "火热", color: "bg-sunflower-100 text-sunflower-500" },
  urgent: { label: "急售", color: "bg-lavender-100 text-lavender-500" },
  new: { label: "新品", color: "bg-mint-100 text-mint-500" },
};

/**
 * 规格参数预设
 */
export const SPECIFICATION_PRESETS: Record<string, string[]> = {
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

/**
 * 联系方式选项
 */
export const CONTACT_METHODS = [
  {
    id: "platform",
    name: "站内消息",
    description: "通过平台内置消息系统联系，安全可靠",
  },
  {
    id: "phone",
    name: "手机号码",
    description: "直接电话联系，更加便捷",
  },
  {
    id: "wechat",
    name: "微信号",
    description: "通过微信沟通交流",
  },
] as const;

/**
 * 配送方式选项
 */
export const DELIVERY_OPTIONS = [
  { id: "shipping", name: "快递配送" },
  { id: "freeShipping", name: "包邮" },
  { id: "pickup", name: "上门自提" },
  { id: "meetup", name: "线下见面" },
  { id: "localOnly", name: "仅限同城" },
] as const;

/**
 * 支付方式选项
 */
export const PAYMENT_METHODS = [
  { id: "cash", name: "现金交易" },
  { id: "bankTransfer", name: "银行转账" },
  { id: "wechatPay", name: "微信支付" },
  { id: "alipay", name: "支付宝" },
] as const;
