import { type FC, type ButtonHTMLAttributes } from "react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "wechat";
  size?: "md" | "lg";
  children: React.ReactNode;
}

const LoadingButton: FC<LoadingButtonProps> = ({
  loading = false,
  variant = "primary",
  size = "lg",
  children,
  disabled,
  className = "",
  ...props
}) => {
  const getButtonClasses = () => {
    const baseClasses =
      "w-full rounded-[30px] font-semibold transition-all duration-200 flex items-center justify-center relative overflow-hidden";

    const sizeClasses = {
      md: "h-12 text-base",
      lg: "h-[60px] text-lg",
    };

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-[#4E6FFF] to-[#7D95FF] text-white hover:from-[#3D5BFF] hover:to-[#6C84FF] focus:ring-4 focus:ring-[#4E6FFF] focus:ring-opacity-25 shadow-[0px_4px_12px_rgba(78,111,255,0.25)]",
      secondary:
        "bg-white border-[1.5px] border-[#E0E0E6] text-[#222222] hover:bg-gray-50 hover:border-[#CCCCCC]",
      wechat:
        "bg-white border-[1.5px] border-[#E0E0E6] text-[#222222] hover:bg-gray-50 hover:border-[#CCCCCC]",
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`${getButtonClasses()} ${
        isDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <span
        className={`${
          loading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-200`}
      >
        {variant === "wechat" && !loading && (
          <span className="mr-3 text-xl">💬</span>
        )}
        {children}
      </span>
    </button>
  );
};

export default LoadingButton;
