export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: "music" | "food" | "learning" | "reading";
  date: string;
  time: string;
  location: string;
  startTime: string;
  endTime: string;
  capacity: number;
  currentParticipants: number;
  maxParticipants: number;
  organizer: User;
  status: "draft" | "published" | "cancelled" | "completed";
  tags: string[];
  images?: string[];
  coverImage?: string;
  price?: number;
  isFree?: boolean;
  detailContent?: string;
  registrationDeadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExchangeItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: "new" | "like-new" | "good" | "fair" | "poor";
  images: string[];
  owner: User;
  status: "available" | "reserved" | "sold";
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  parentId?: string;
  replies?: Comment[];
  createdAt: string;
  updatedAt: string;
}
