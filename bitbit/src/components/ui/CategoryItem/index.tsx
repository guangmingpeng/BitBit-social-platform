import React from "react";
import Card, { CardContent } from "../Card";
import { cn } from "@/shared/utils/cn";

export interface CategoryItemProps {
  id: string;
  name: string;
  icon: string;
  color?: string;
  onClick?: () => void;
  className?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  name,
  icon,
  color = "primary",
  onClick,
  className,
}) => {
  const colorClasses = {
    primary: "bg-primary-100 text-primary-600",
    coral: "bg-coral-100 text-coral-500",
    mint: "bg-mint-100 text-mint-500",
    lavender: "bg-lavender-100 text-lavender-500",
    sunflower: "bg-sunflower-100 text-sunflower-500",
  };

  return (
    <Card
      className={cn(
        "hover:shadow-md transition-all duration-300 cursor-pointer",
        className
      )}
      hover
      onClick={onClick}
    >
      <CardContent className="p-4 text-center space-y-3">
        <div
          className={cn(
            "w-12 h-12 rounded-full mx-auto flex items-center justify-center text-xl",
            colorClasses[color as keyof typeof colorClasses] ||
              colorClasses.primary
          )}
        >
          {icon}
        </div>
        <p className="font-medium text-text-primary">{name}</p>
      </CardContent>
    </Card>
  );
};

export default CategoryItem;
