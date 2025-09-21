import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { hideToast } from "@/store/slices/uiSlice";
import { cn } from "@/shared/utils/cn";

const Toast: React.FC = () => {
  const dispatch = useDispatch();
  const { show, message, type } = useSelector(
    (state: RootState) => state.ui.toast
  );

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000); // 3秒后自动隐藏

      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  // Toast 居中显示
  const toastPosition = {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div className="fixed z-[9999] pointer-events-none" style={toastPosition}>
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-[400px] transform transition-all duration-300 ease-out pointer-events-auto",
          getStyles(),
          show
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 -translate-y-2"
        )}
      >
        <span className="text-xl">{getIcon()}</span>
        <span className="flex-1 text-sm">{message}</span>
        <button
          onClick={() => dispatch(hideToast())}
          className="hover:bg-white/20 rounded p-1 transition-colors text-white flex-shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
