/**
 * 滚动工具函数
 * 提供页面滚动的各种实用功能
 */

/**
 * 平滑滚动到页面顶部
 */
export const scrollToTop = (behavior: ScrollBehavior = "smooth") => {
  window.scrollTo({
    top: 0,
    behavior,
  });
};

/**
 * 平滑滚动到指定元素
 * @param selector 元素选择器
 * @param offset 偏移量（用于考虑固定头部等）
 * @param behavior 滚动行为
 */
export const scrollToElement = (
  selector: string,
  offset: number = 0,
  behavior: ScrollBehavior = "smooth"
) => {
  // 延迟执行，确保页面已经渲染
  setTimeout(() => {
    const element = document.querySelector(selector);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior,
      });
    } else {
      // 如果找不到目标元素，回退到滚动到顶部
      scrollToTop(behavior);
    }
  }, 100);
};

/**
 * 滚动到指定的页面部分（通过ID）
 * @param sectionId 部分ID
 * @param offset 偏移量
 * @param behavior 滚动行为
 */
export const scrollToSection = (
  sectionId: string,
  offset: number = 80,
  behavior: ScrollBehavior = "smooth"
) => {
  scrollToElement(`#${sectionId}`, offset, behavior);
};

/**
 * 导航后的智能滚动
 * 根据不同的页面和路径决定滚动策略
 */
export const smartScrollAfterNavigation = (pathname: string) => {
  // 延迟执行，确保路由已经完成且页面已渲染
  setTimeout(() => {
    if (pathname.includes("/profile/trades")) {
      // 对于订单页面，滚动到订单区域
      scrollToElement('[data-section="trades"]', 100);
    } else if (pathname.includes("/profile/following")) {
      // 对于关注列表，滚动到列表区域
      scrollToElement('[data-section="follow-list"]', 100);
    } else if (pathname.includes("/notifications")) {
      // 对于通知页面，滚动到通知列表
      scrollToElement('[data-section="notifications"]', 100);
    } else if (pathname.includes("/profile/settings")) {
      // 对于设置页面，滚动到顶部
      scrollToTop();
    } else {
      // 其他页面滚动到顶部
      scrollToTop();
    }
  }, 200);
};
