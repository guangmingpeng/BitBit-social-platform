import { useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark" | "auto";

interface UseThemeReturn {
  theme: Theme;
  actualTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setThemeState] = useState<Theme>("auto");
  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");

  // 检测系统主题偏好
  const getSystemTheme = useCallback((): "light" | "dark" => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  }, []);

  // 应用主题到DOM
  const applyTheme = useCallback((themeToApply: "light" | "dark") => {
    const root = document.documentElement;

    if (themeToApply === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }

    setActualTheme(themeToApply);
  }, []);

  // 更新实际主题
  const updateActualTheme = useCallback(
    (currentTheme: Theme) => {
      let newActualTheme: "light" | "dark";

      if (currentTheme === "auto") {
        newActualTheme = getSystemTheme();
      } else {
        newActualTheme = currentTheme;
      }

      applyTheme(newActualTheme);
    },
    [getSystemTheme, applyTheme]
  );

  // 设置主题
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem("theme", newTheme);
      updateActualTheme(newTheme);
    },
    [updateActualTheme]
  );

  // 切换主题（在light和dark之间切换）
  const toggleTheme = useCallback(() => {
    if (theme === "auto") {
      // 如果当前是auto，根据系统主题决定切换方向
      const systemTheme = getSystemTheme();
      setTheme(systemTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "light" ? "dark" : "light");
    }
  }, [theme, getSystemTheme, setTheme]);

  // 监听系统主题变化
  useEffect(() => {
    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => updateActualTheme("auto");

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, updateActualTheme]);

  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const initialTheme = savedTheme || "auto";

    setThemeState(initialTheme);
    updateActualTheme(initialTheme);
  }, [updateActualTheme]);

  return {
    theme,
    actualTheme,
    setTheme,
    toggleTheme,
  };
};
