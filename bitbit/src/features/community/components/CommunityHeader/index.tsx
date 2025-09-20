import React from "react";
import { Breadcrumb } from "@/components/ui";

interface CommunityHeaderProps {
  className?: string;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ className }) => {

  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "社区", current: true },
  ];

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default CommunityHeader;
