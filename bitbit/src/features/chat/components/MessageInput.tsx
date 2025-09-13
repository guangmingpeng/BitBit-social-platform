import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/shared/utils/cn";

interface MessageInputProps {
  onSend: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  placeholder = "输入消息...",
  disabled = false,
  maxLength = 1000,
  className,
}) => {
  const [content, setContent] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmedContent = content.trim();
    if (!trimmedContent || disabled) return;

    onSend(trimmedContent);
    setContent("");

    // 重置文本域高度
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [content, disabled, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && !isComposing) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend, isComposing]
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;

      if (value.length <= maxLength) {
        setContent(value);
      }

      // 自适应高度
      const textarea = e.target;
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    },
    [maxLength]
  );

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);

  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false);
  }, []);

  const canSend = content.trim().length > 0 && !disabled;

  return (
    <div
      className={cn(
        "flex items-end gap-2 p-4 bg-white border-t border-gray-200",
        className
      )}
    >
      {/* 文本输入区域 */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={cn(
            "w-full resize-none border border-gray-300 rounded-lg px-3 py-2",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            "text-sm leading-relaxed",
            "min-h-[40px] max-h-[120px]",
            disabled && "bg-gray-100 cursor-not-allowed"
          )}
          style={{ height: "auto" }}
        />

        {/* 字数统计 */}
        {maxLength && (
          <div className="absolute bottom-1 right-2 text-xs text-gray-400">
            {content.length}/{maxLength}
          </div>
        )}
      </div>

      {/* 发送按钮 */}
      <button
        type="button"
        onClick={handleSend}
        disabled={!canSend}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
          canSend
            ? "bg-primary-500 text-white hover:bg-primary-600 active:scale-95"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        )}
        aria-label="发送消息"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
