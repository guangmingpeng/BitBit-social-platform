import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

interface NavigationEntry {
  pathname: string;
  fromSource?: string;
  timestamp: number;
}

export const useSmartNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stack, setStack] = useState<NavigationEntry[]>([]);

  // 记录导航历史
  useEffect(() => {
    const currentEntry: NavigationEntry = {
      pathname: location.pathname,
      fromSource: location.state?.fromSource,
      timestamp: Date.now(),
    };

    console.log("Recording navigation:", currentEntry);

    setStack((prevStack) => {
      // 检查是否已存在相同路径的记录
      const existingIndex = prevStack.findIndex(
        (entry) => entry.pathname === currentEntry.pathname
      );

      if (existingIndex !== -1) {
        // 如果已存在，更新该记录并移除之后的所有记录
        const newStack = [...prevStack];
        newStack[existingIndex] = currentEntry;
        return newStack.slice(0, existingIndex + 1);
      } else {
        // 如果不存在，添加到栈顶
        return [...prevStack, currentEntry];
      }
    });
  }, [location.pathname, location.state?.fromSource]);

  const smartGoBack = () => {
    const currentPath = location.pathname;
    const fromSource = location.state?.fromSource;
    const originalSource = location.state?.originalSource;
    const isRegisterPage = currentPath.includes("/register");
    const isPostDetailPage = currentPath.match(/^\/community\/[^/]+$/);

    console.log("=== Smart Go Back Debug ===");
    console.log("Current path:", currentPath);
    console.log("From source:", fromSource);
    console.log("Original source:", originalSource);
    console.log(
      "Stack:",
      stack.map((s) => ({ path: s.pathname, from: s.fromSource }))
    );

    // 1. 处理帖子详情页的返回
    if (isPostDetailPage) {
      if (fromSource === "community") {
        console.log("→ 帖子详情页返回社区");
        navigate("/community", { replace: true });
        return;
      } else if (fromSource === "home") {
        console.log("→ 帖子详情页返回首页");
        navigate("/", { replace: true });
        return;
      } else if (fromSource === "profile") {
        console.log("→ 帖子详情页返回个人资料");
        const profileTab = location.state?.profileTab || "activities";
        navigate(`/profile/${profileTab}`, { replace: true });
        return;
      }

      // 兜底：从栈中查找前一个页面
      const currentIndex = stack.findIndex(
        (entry) => entry.pathname === currentPath
      );
      if (currentIndex > 0) {
        const previousEntry = stack[currentIndex - 1];
        console.log("→ 帖子详情页返回栈中前一个页面:", previousEntry.pathname);
        navigate(previousEntry.pathname, { replace: true });
        return;
      }

      // 最终兜底：返回社区
      console.log("→ 帖子详情页最终兜底返回社区");
      navigate("/community", { replace: true });
      return;
    }

    // 2. 处理报名页的返回
    if (isRegisterPage) {
      if (fromSource === "activity-detail") {
        // 从详情页进入报名页，返回详情页并保持原始来源
        const activityId = currentPath.match(
          /\/activities\/([^/]+)\/register/
        )?.[1];
        if (activityId) {
          // 查找详情页的原始来源（最近的一个详情页记录）
          const detailPageEntry = stack
            .slice()
            .reverse()
            .find((entry) => entry.pathname === `/activities/${activityId}`);

          const detailOriginalSource = detailPageEntry?.fromSource;

          console.log("→ 报名页返回详情页");
          console.log("→ Detail page entry:", detailPageEntry);
          console.log("→ Detail original source:", detailOriginalSource);

          navigate(`/activities/${activityId}`, {
            state: {
              fromSource: "registration",
              originalSource: detailOriginalSource, // 保持详情页的原始来源
            },
            replace: true,
          });
          return;
        }
      }

      // 其他报名页返回逻辑
      if (fromSource === "home") {
        console.log("→ 报名页返回首页");
        navigate("/", { replace: true });
        return;
      } else if (fromSource === "activities") {
        console.log("→ 报名页返回活动列表");
        navigate("/activities", { replace: true });
        return;
      } else if (fromSource === "profile") {
        console.log("→ 报名页返回个人资料");
        const profileTab = location.state?.profileTab || "activities";
        navigate(`/profile/${profileTab}`, { replace: true });
        return;
      }

      // 兜底：返回活动列表
      console.log("→ 报名页兜底返回活动列表");
      navigate("/activities", { replace: true });
      return;
    }

    // 3. 处理活动详情页的返回
    if (currentPath.match(/^\/activities\/[^/]+$/)) {
      if (fromSource === "registration") {
        // 从报名页返回到详情页，现在需要返回到详情页的原始来源
        console.log("→ 详情页处理从报名页返回的情况");
        console.log("→ Original source from state:", originalSource);

        if (originalSource === "home") {
          console.log("→ 从详情页返回首页");
          navigate("/", { replace: true });
          return;
        } else if (originalSource === "activities") {
          console.log("→ 从详情页返回活动列表");
          navigate("/activities", { replace: true });
          return;
        } else if (originalSource === "profile") {
          console.log("→ 从详情页返回个人资料");
          const profileTab = location.state?.profileTab || "activities";
          navigate(`/profile/${profileTab}`, { replace: true });
          return;
        }

        // 如果没有 originalSource，兜底返回活动列表
        console.log("→ 详情页兜底返回活动列表");
        navigate("/activities", { replace: true });
        return;
      }

      // 处理直接来源
      if (fromSource === "home") {
        console.log("→ 详情页直接返回首页");
        navigate("/", { replace: true });
        return;
      } else if (fromSource === "activities") {
        console.log("→ 详情页直接返回活动列表");
        navigate("/activities", { replace: true });
        return;
      } else if (fromSource === "profile") {
        console.log("→ 详情页直接返回个人资料");
        const profileTab = location.state?.profileTab || "activities";
        navigate(`/profile/${profileTab}`, { replace: true });
        return;
      }

      // 兜底：从栈中查找前一个页面
      const currentIndex = stack.findIndex(
        (entry) => entry.pathname === currentPath
      );
      if (currentIndex > 0) {
        const previousEntry = stack[currentIndex - 1];
        if (!previousEntry.pathname.includes("/register")) {
          console.log("→ 详情页返回栈中前一个页面:", previousEntry.pathname);
          navigate(previousEntry.pathname, { replace: true });
          return;
        }
      }

      // 最终兜底：返回活动列表
      console.log("→ 详情页最终兜底返回活动列表");
      navigate("/activities", { replace: true });
      return;
    }

    // 4. 处理交换详情页的返回
    const isExchangeDetailPage = currentPath.match(/^\/exchange\/[^/]+$/);
    if (isExchangeDetailPage) {
      if (fromSource === "home") {
        console.log("→ 交换详情页返回首页");
        navigate("/", { replace: true });
        return;
      } else if (fromSource === "exchange") {
        console.log("→ 交换详情页返回交换列表");
        navigate("/exchange", { replace: true });
        return;
      } else if (fromSource === "profile") {
        console.log("→ 交换详情页返回个人资料");
        const profileTab = location.state?.profileTab || "activities";
        navigate(`/profile/${profileTab}`, { replace: true });
        return;
      }

      // 兜底：从栈中查找前一个页面
      const currentIndex = stack.findIndex(
        (entry) => entry.pathname === currentPath
      );
      if (currentIndex > 0) {
        const previousEntry = stack[currentIndex - 1];
        console.log("→ 交换详情页返回栈中前一个页面:", previousEntry.pathname);
        navigate(previousEntry.pathname, { replace: true });
        return;
      }

      // 最终兜底：返回交换列表
      console.log("→ 交换详情页最终兜底返回交换列表");
      navigate("/exchange", { replace: true });
      return;
    }

    // 5. 其他页面的通用返回逻辑
    if (stack.length > 1) {
      const previousEntry = stack[stack.length - 2];
      console.log("→ 通用返回逻辑，返回:", previousEntry.pathname);
      navigate(previousEntry.pathname, { replace: true });
    } else {
      console.log("→ 通用返回逻辑，返回首页");
      navigate("/", { replace: true });
    }
  };

  const navigateWithSource = (source: string) => {
    return (to: string, state?: Record<string, unknown>) => {
      console.log(`Navigate with source: ${source} to ${to}`);
      navigate(to, {
        state: {
          fromSource: source,
          ...state,
        },
      });
    };
  };

  return {
    smartGoBack,
    navigateWithSource,
    stack,
  };
};

// 为了兼容性，也提供默认导出
export default useSmartNavigation;
