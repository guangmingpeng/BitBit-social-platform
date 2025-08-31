export interface BaseCardProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "outlined" | "elevated" | "flat";
  size?: "sm" | "md" | "lg";
  clickable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  onHover?: () => void;
}

export interface CardLayout {
  layout?: "default" | "compact" | "minimal" | "horizontal" | "list";
}

export interface CardActions {
  showActions?: boolean;
  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "danger";
    disabled?: boolean;
  };
  secondaryActions?: Array<{
    label: string;
    icon?: string;
    onClick: () => void;
    variant?: "ghost" | "outline";
    disabled?: boolean;
  }>;
}

export interface CardStats {
  showStats?: boolean;
  stats?: Array<{
    icon?: string;
    label: string;
    value: number | string;
    onClick?: () => void;
  }>;
}

export interface CardMeta {
  showMeta?: boolean;
  meta?: {
    author?: {
      name: string;
      avatar?: string;
      isVerified?: boolean;
    };
    publishTime?: string;
    category?: string;
    tags?: string[];
    status?: {
      text: string;
      variant?: "success" | "warning" | "error" | "info" | "default";
    };
  };
}
