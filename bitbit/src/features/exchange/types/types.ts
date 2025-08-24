// Exchange 功能模块的类型定义

export interface ExchangeItem {
  id: string;
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  category: string;
  condition: string;
  image?: string;
  images?: string[];
  location?: string;
  status: "available" | "reserved" | "sold" | "hot" | "urgent" | "new";
  seller: {
    id?: string;
    name: string;
    avatar?: string;
    rating: number;
    totalSales?: number;
    soldCount: number;
    joinDate?: string;
    initials: string;
    responseRate?: string;
    responseTime?: string;
  };
  stats: {
    views: number;
    likes: number;
    comments: number;
  };
  timeAgo: string;
  publishedAt?: string;
  specifications?: Array<
    { label: string; value: string } | { key: string; value: string }
  >;
  exchangePreferences?: string[];
  contactMethod?: "platform" | "phone" | "wechat";
  contactInfo?: string;
  deliveryOptions?: {
    shipping: boolean;
    freeShipping: boolean;
    pickup: boolean;
    meetup: boolean;
    localOnly: boolean;
  };
  paymentMethods?: {
    cash: boolean;
    bankTransfer: boolean;
    wechatPay: boolean;
    alipay: boolean;
  };
}

export interface ExchangeCategory {
  id: string;
  name: string;
  icon: string;
}

export interface ExchangeCondition {
  id: string;
  name: string;
  description: string;
}

export interface ExchangeFilters {
  searchTerm?: string;
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  condition?: string;
  location?: string;
  sortBy?: "newest" | "price_asc" | "price_desc" | "popularity";
}

export interface PublishFormData {
  title: string;
  category: string;
  customCategory?: string;
  condition: string;
  customCondition?: string;
  price: number;
  originalPrice?: number;
  description: string;
  location: string;
  images: File[];
  specifications: Array<{ key: string; value: string }>;
  exchangePreferences: string[];
  contactMethod: "platform" | "phone" | "wechat";
  contactInfo?: string;
  deliveryOptions: {
    shipping: boolean;
    freeShipping: boolean;
    pickup: boolean;
    meetup: boolean;
    localOnly: boolean;
  };
  paymentMethods: {
    cash: boolean;
    bankTransfer: boolean;
    wechatPay: boolean;
    alipay: boolean;
  };
  paymentQRCodes: File[];
}

export interface ExchangeFormData {
  offerType: "money" | "exchange";
  offerPrice?: number;
  exchangeItem?: {
    title: string;
    description: string;
    images: File[];
  };
  message: string;
  contactMethod: "platform" | "phone" | "wechat";
  contactInfo?: string;
}

export interface PurchaseFormData {
  contactMethod: "platform" | "phone" | "wechat";
  contactInfo?: string;
  message: string;
  paymentMethod?: string;
}

export interface ExchangeListProps {
  items: ExchangeItem[];
  layout?: "grid" | "list";
  loading?: boolean;
  onItemClick?: (item: ExchangeItem) => void;
  onExchange?: (item: ExchangeItem) => void;
  onLike?: (item: ExchangeItem) => void;
}

export interface ExchangeCardProps {
  item: ExchangeItem;
  layout?: "grid" | "list" | "compact" | "sidebar";
  onClick?: () => void;
  onExchange?: () => void;
  onLike?: () => void;
  isLiked?: boolean;
}

export interface PublishStepProps {
  formData: PublishFormData;
  onUpdate: (data: Partial<PublishFormData>) => void;
  onNext?: () => void;
  onPrev?: () => void;
  isValid?: boolean;
}

export type PublishStep = 1 | 2 | 3 | 4 | 5;

export interface PublishStepConfig {
  id: PublishStep;
  name: string;
  description: string;
  component: React.ComponentType<PublishStepProps>;
}
