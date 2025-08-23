import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/shared/utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav
      className={cn("flex items-center space-x-1 text-sm", className)}
      aria-label="面包屑导航"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <svg
              className="w-4 h-4 text-gray-400 mx-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {item.current ? (
            <span className="text-text-primary font-medium" aria-current="page">
              {item.label}
            </span>
          ) : item.href ? (
            <Link
              to={item.href}
              className="text-text-secondary hover:text-primary-500 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-text-secondary">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
