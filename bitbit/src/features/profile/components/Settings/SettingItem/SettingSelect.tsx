import React from "react";
import { SettingItem } from "./SettingItem";

interface SettingSelectProps {
  icon?: string;
  iconColor?: string;
  title: string;
  description?: string;
  value: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
  onChange: (value: string) => void;
}

export const SettingSelect: React.FC<SettingSelectProps> = ({
  icon,
  iconColor,
  title,
  description,
  value,
  options,
  disabled = false,
  onChange,
}) => {
  return (
    <SettingItem
      icon={icon}
      iconColor={iconColor}
      title={title}
      description={description}
    >
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </SettingItem>
  );
};
