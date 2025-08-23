import React, { forwardRef, useEffect } from "react";
import { cn } from "@/shared/utils/cn";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
  className?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      size = "md",
      children,
      className,
      closeOnOverlayClick = true,
      closeOnEscape = true,
    },
    ref
  ) => {
    // 处理ESC键关闭
    useEffect(() => {
      if (!closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && open) {
          onClose();
        }
      };

      if (open) {
        document.addEventListener("keydown", handleEscape);
        // 禁止body滚动
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [open, onClose, closeOnEscape]);

    if (!open) return null;

    const sizes = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
      full: "max-w-full mx-4",
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={handleOverlayClick}
      >
        {/* 背景遮罩 */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Modal内容 */}
        <div
          ref={ref}
          className={cn(
            "relative w-full bg-white rounded-lg shadow-modal max-h-[90vh] overflow-auto",
            sizes[size],
            className
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

// Modal子组件
export const ModalHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    closable?: boolean;
    onClose?: () => void;
  }
>(({ className, children, closable = true, onClose, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between p-6 border-b border-gray-200",
      className
    )}
    {...props}
  >
    {children}
    {closable && onClose && (
      <button
        type="button"
        onClick={onClose}
        className="p-1 ml-3 text-text-tertiary hover:text-text-primary transition-colors rounded-lg hover:bg-gray-100"
        aria-label="关闭"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    )}
  </div>
));

ModalHeader.displayName = "ModalHeader";

export const ModalTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-title-3 font-semibold text-text-primary", className)}
    {...props}
  >
    {children}
  </h2>
));

ModalTitle.displayName = "ModalTitle";

export const ModalBody = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props}>
    {children}
  </div>
));

ModalBody.displayName = "ModalBody";

export const ModalFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-end gap-3 p-6 border-t border-gray-200",
      className
    )}
    {...props}
  >
    {children}
  </div>
));

ModalFooter.displayName = "ModalFooter";

export default Modal;
