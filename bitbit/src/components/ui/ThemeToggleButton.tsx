import React from "react";
import { useTheme } from "../../shared/hooks/useTheme";

export const ThemeToggleButton: React.FC = () => {
  const { theme, actualTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
      title={`当前主题: ${theme} (${actualTheme})`}
    >
      <span className="text-xl">{actualTheme === "dark" ? "🌞" : "🌙"}</span>
    </button>
  );
};
