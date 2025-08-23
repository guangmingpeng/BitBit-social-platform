import React from "react";
import { cn } from "@/shared/utils/cn";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "vertical" | "horizontal";
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
}

const Stack: React.FC<StackProps> = ({
  className,
  direction = "vertical",
  spacing = "md",
  align = "stretch",
  justify = "start",
  children,
  ...props
}) => {
  const directionConfig = {
    vertical: "flex-col",
    horizontal: "flex-row",
  };

  const spacingConfig = {
    vertical: {
      none: "space-y-0",
      xs: "space-y-1",
      sm: "space-y-2",
      md: "space-y-4",
      lg: "space-y-6",
      xl: "space-y-8",
    },
    horizontal: {
      none: "space-x-0",
      xs: "space-x-1",
      sm: "space-x-2",
      md: "space-x-4",
      lg: "space-x-6",
      xl: "space-x-8",
    },
  };

  const alignConfig = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const justifyConfig = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  return (
    <div
      className={cn(
        "flex",
        directionConfig[direction],
        spacingConfig[direction][spacing],
        alignConfig[align],
        justifyConfig[justify],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Stack;
