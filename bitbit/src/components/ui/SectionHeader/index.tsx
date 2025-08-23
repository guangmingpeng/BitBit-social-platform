import React from "react";
import Button from "../Button";
import { cn } from "@/shared/utils/cn";

export interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText,
  onActionClick,
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
      {actionText && (
        <Button
          variant="ghost"
          size="sm"
          className="text-primary-600 hover:text-primary-500"
          onClick={onActionClick}
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;
