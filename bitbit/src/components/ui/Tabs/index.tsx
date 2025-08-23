import React, { useState, createContext, useContext } from "react";
import { cn } from "@/shared/utils/cn";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component");
  }
  return context;
};

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "pills" | "underline";
}

export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  const activeTab = value !== undefined ? value : internalValue;

  const setActiveTab = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList: React.FC<TabsListProps> = ({
  className,
  variant = "default",
  children,
  ...props
}) => {
  const variantStyles = {
    default:
      "inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1",
    pills: "inline-flex items-center justify-center space-x-1",
    underline: "flex border-b border-gray-200",
  };

  return (
    <div
      className={cn(variantStyles[variant], className)}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
};

const TabsTrigger: React.FC<TabsTriggerProps> = ({
  className,
  value,
  children,
  ...props
}) => {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-body font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200",
        "disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-white text-text-primary shadow-light"
          : "text-text-tertiary hover:text-text-secondary",
        className
      )}
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
};

const TabsContent: React.FC<TabsContentProps> = ({
  className,
  value,
  children,
  ...props
}) => {
  const { activeTab } = useTabsContext();

  if (activeTab !== value) {
    return null;
  }

  return (
    <div
      className={cn(
        "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200",
        className
      )}
      role="tabpanel"
      data-state="active"
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
