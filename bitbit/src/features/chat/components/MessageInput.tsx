import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/shared/utils/cn";

interface MessageInputProps {
  onSend: (
    content: string,
    type?: "text" | "image" | "emoji",
    imageFile?: File
  ) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
  presetMessage?: string; // 新增：预设消息
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  placeholder = "输入消息...",
  disabled = false,
  maxLength = 1000,
  className,
  presetMessage,
}) => {
  const [content, setContent] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 常用表情
  const commonEmojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😜",
    "🤪",
    "😝",
    "🤑",
    "🤗",
    "🤭",
    "🤫",
    "🤔",
    "🤐",
    "🤨",
    "😐",
    "😑",
    "😶",
    "😏",
    "😒",
    "🙄",
    "😬",
    "🤥",
    "😔",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "👍",
    "👎",
    "👌",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "🖕",
    "👇",
    "☝️",
    "👋",
    "🤚",
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
  ];

  // 处理预设消息
  useEffect(() => {
    if (presetMessage && presetMessage !== content) {
      setContent(presetMessage);
      // 自动调整文本域高度
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${Math.min(
          textareaRef.current.scrollHeight,
          150
        )}px`;
      }
    }
  }, [presetMessage, content]);

  const handleSend = useCallback(() => {
    if (selectedImage) {
      // 发送图片，不需要默认文本
      onSend(content.trim(), "image", selectedImage);
      setSelectedImage(null);
      setImagePreview(null);
      setContent("");
    } else {
      // 发送文本消息
      const trimmedContent = content.trim();
      if (!trimmedContent || disabled) return;
      onSend(trimmedContent, "text");
      setContent("");
    }

    // 重置文本域高度
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [content, disabled, onSend, selectedImage]);

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

      // 自适应高度，增加最大高度到150px
      const textarea = e.target;
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    },
    [maxLength]
  );

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);

  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false);
  }, []);

  const handleEmojiSelect = useCallback((emoji: string) => {
    setContent((prev) => prev + emoji);
    setShowEmojiPicker(false);

    // 聚焦到文本框并调整高度
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, []);

  const handleImageSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        setSelectedImage(file);

        // 创建图片预览
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // 清空file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    []
  );

  const handleRemoveImage = useCallback(() => {
    setSelectedImage(null);
    setImagePreview(null);
  }, []);

  const canSend = (content.trim().length > 0 || selectedImage) && !disabled;

  return (
    <div
      className={cn(
        "flex flex-col bg-white border-t border-gray-200",
        className
      )}
    >
      {/* 表情选择器 - 响应式网格 */}
      {showEmojiPicker && (
        <div className="border-b border-gray-200 p-3 bg-gray-50 max-h-40 overflow-y-auto">
          <div className="grid grid-cols-6 md:grid-cols-8 gap-2">
            {commonEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiSelect(emoji)}
                className={cn(
                  "hover:bg-gray-200 rounded transition-colors",
                  "text-xl p-2 md:text-xl md:p-1" // 移动端更大的触摸区域
                )}
                title={emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 图片预览区域 */}
      {imagePreview && (
        <div className="border-b border-gray-200 p-3 bg-gray-50">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="预览图片"
              className="max-w-48 max-h-32 rounded-lg object-cover"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              aria-label="删除图片"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 输入区域 - 响应式边距 */}
      <div className="flex items-end gap-2 p-3 md:p-4">
        {/* 功能按钮区 - 响应式尺寸 */}
        <div className="flex gap-1 mb-2">
          {/* 表情按钮 */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={cn(
              "flex items-center justify-center rounded-lg transition-colors",
              "w-9 h-9 md:w-8 md:h-8", // 移动端略大一些，便于触摸
              showEmojiPicker
                ? "bg-primary-100 text-primary-600"
                : "text-gray-500 hover:bg-gray-100"
            )}
            aria-label="选择表情"
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          {/* 图片按钮 */}
          <button
            type="button"
            onClick={handleImageSelect}
            className={cn(
              "flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors",
              "w-9 h-9 md:w-8 md:h-8" // 移动端略大一些，便于触摸
            )}
            aria-label="选择图片"
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>

          {/* 隐藏的文件输入 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

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
            rows={2}
            className={cn(
              "w-full resize-none border border-gray-300 rounded-lg transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
              "text-sm leading-relaxed min-h-[60px] max-h-[150px]",
              // 响应式内边距
              "px-3 py-3 pr-16 md:px-3 md:py-3",
              disabled && "bg-gray-100 cursor-not-allowed"
            )}
            style={{ height: "auto" }}
          />

          {/* 字数统计 - 调整位置到右下角 */}
          {maxLength && (
            <div className="absolute bottom-2 right-3 text-xs text-gray-400 pointer-events-none">
              {content.length}/{maxLength}
            </div>
          )}
        </div>

        {/* 发送按钮 - 响应式尺寸 */}
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className={cn(
            "flex items-center justify-center rounded-lg transition-all duration-200 mb-2",
            "w-11 h-11 md:w-10 md:h-10", // 移动端略大一些，便于触摸
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
    </div>
  );
};

export default MessageInput;
