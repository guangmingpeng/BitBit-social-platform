/**
 * 开发调试信息组件
 * 仅在开发环境显示当前配置状态
 */

import React from "react";
import { devConfig } from "@/config/dev.config";

const DebugInfo: React.FC = () => {
  // 只在开发环境显示
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50 bg-black bg-opacity-75 text-white p-3 rounded text-xs font-mono">
      <div className="mb-2 font-bold">Debug Info:</div>
      <div>Mode: {import.meta.env.MODE}</div>
      <div>
        Show Debug Components:{" "}
        {devConfig.showDebugComponents ? "true" : "false"}
      </div>
      <div>Branch: {devConfig.branch}</div>
      <div>Is Dev Branch: {devConfig.isDevBranch ? "true" : "false"}</div>
      <div>
        ENV Variable:{" "}
        {import.meta.env.VITE_SHOW_DEBUG_COMPONENTS || "undefined"}
      </div>
    </div>
  );
};

export default DebugInfo;
