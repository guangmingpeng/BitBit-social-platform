import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 用于合并和处理CSS类名的工具函数
 * 结合clsx和tailwind-merge，确保类名合并的正确性
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
