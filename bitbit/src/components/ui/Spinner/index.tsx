import React, { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "primary" | "white" | "gray";
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", color = "primary", ...props }, ref) => {
    const sizes = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-10 h-10",
    };

    const colors = {
      primary: "border-primary-500",
      white: "border-white",
      gray: "border-gray-400",
    };

    return (
      <div
        className={cn(
          "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
          sizes[size],
          colors[color],
          className
        )}
        role="status"
        ref={ref}
        {...props}
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export default Spinner;
