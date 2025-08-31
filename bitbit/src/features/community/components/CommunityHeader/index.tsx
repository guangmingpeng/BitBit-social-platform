import React from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Button } from "@/components/ui";

interface CommunityHeaderProps {
  className?: string;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ className }) => {
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "社区", current: true },
  ];

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Breadcrumb items={breadcrumbItems} />
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate("/")}
        className="flex items-center gap-2"
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        返回首页
      </Button>
    </div>
  );
};

export default CommunityHeader;
