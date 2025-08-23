import React, { forwardRef } from "react";
import { cn } from "@/shared/utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      hover = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      "bg-white",
      "rounded-lg",
      "transition-all",
      "duration-250",
    ];

    const variants = {
      default: ["border", "border-gray-200"],
      elevated: ["shadow-card"],
      outlined: ["border-2", "border-gray-200"],
    };

    const paddings = {
      none: "",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    const hoverStyles = hover
      ? ["hover:shadow-card", "hover:-translate-y-0.5", "cursor-pointer"]
      : [];

    return (
      <div
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          hoverStyles,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

// Card子组件
export const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-subtitle font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-body text-text-secondary", className)}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props}>
    {children}
  </div>
));

CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center pt-4", className)} {...props}>
    {children}
  </div>
));

CardFooter.displayName = "CardFooter";

export default Card;
