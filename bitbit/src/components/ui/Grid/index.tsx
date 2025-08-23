import React from "react";
import { cn } from "@/shared/utils/cn";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  responsive?: boolean;
}

const Grid: React.FC<GridProps> = ({
  className,
  cols = 1,
  gap = "md",
  responsive = true,
  children,
  ...props
}) => {
  const colsConfig = {
    1: "grid-cols-1",
    2: responsive ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2",
    3: responsive ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-3",
    4: responsive ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-4",
    5: responsive ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-5" : "grid-cols-5",
    6: responsive ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-6" : "grid-cols-6",
  };

  const gapConfig = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  };

  return (
    <div
      className={cn("grid", colsConfig[cols], gapConfig[gap], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Grid;
