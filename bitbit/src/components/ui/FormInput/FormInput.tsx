import { type InputHTMLAttributes, forwardRef } from "react";

interface FormInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string;
  error?: string;
  required?: boolean;
  variant?: "default" | "gray" | "white";
  showEyeIcon?: boolean;
  onEyeClick?: () => void;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      required = false,
      variant = "default",
      showEyeIcon = false,
      onEyeClick,
      ...props
    },
    ref
  ) => {
    const getInputClasses = () => {
      const baseClasses =
        "w-full h-[60px] px-6 rounded-xl text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#4E6FFF] focus:ring-opacity-50";

      switch (variant) {
        case "gray":
          return `${baseClasses} bg-[#F9F9FB] border-[1.5px] border-[#E0E0E6] text-[#222222] placeholder-[#999999]`;
        case "white":
          return `${baseClasses} bg-white border-[1.5px] border-[#E0E0E6] text-[#222222] placeholder-[#999999]`;
        default:
          return `${baseClasses} bg-white border-[1.5px] border-[#E0E0E6] text-[#222222] placeholder-[#999999]`;
      }
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-base font-medium text-[#222222]">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            className={`${getInputClasses()} ${
              error ? "border-red-500 ring-red-200" : ""
            } ${showEyeIcon ? "pr-16" : ""}`}
            {...props}
          />

          {showEyeIcon && (
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#999999] hover:text-[#666666] transition-colors"
              onClick={onEyeClick}
            >
              <span className="text-base">👁</span>
            </button>
          )}
        </div>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
