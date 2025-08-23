import React from "react";
import { cn } from "@/shared/utils/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  center?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  className,
  size = "lg",
  padding = "md",
  center = true,
  children,
  ...props
}) => {
  const sizeConfig = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "max-w-full",
  };

  const paddingConfig = {
    none: "",
    sm: "px-4",
    md: "px-6",
    lg: "px-8",
  };

  const centerConfig = center ? "mx-auto" : "";

  return (
    <div
      className={cn(
        "w-full",
        sizeConfig[size],
        paddingConfig[padding],
        centerConfig,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
