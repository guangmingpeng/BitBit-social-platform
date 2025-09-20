import { useState, useEffect } from "react";

/**
 * 用于检测媒体查询匹配状态的 Hook
 * @param query - 媒体查询字符串，例如 '(min-width: 768px)'
 * @returns boolean - 媒体查询是否匹配
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // 在服务端渲染时返回 false，避免水合不匹配
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    // 再次检查是否在浏览器环境
    if (typeof window === "undefined") {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    // 设置初始值
    setMatches(mediaQueryList.matches);

    // 创建事件处理器
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 添加监听器
    mediaQueryList.addEventListener("change", handler);

    // 清理函数
    return () => {
      mediaQueryList.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}

/**
 * 预定义的响应式断点 hooks
 */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
export const useIsTablet = () =>
  useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
export const useIsMobile = () => useMediaQuery("(max-width: 767px)");
export const useIsMediumAndUp = () => useMediaQuery("(min-width: 768px)");
export const useIsSmallAndDown = () => useMediaQuery("(max-width: 767px)");
