import React from "react";
import { SettingItem } from "./SettingItem";
import { Switch } from "../../../../../components/ui/Switch";

interface SettingSwitchProps {
  icon?: string;
  iconColor?: string;
  title: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export const SettingSwitch: React.FC<SettingSwitchProps> = ({
  icon,
  iconColor,
  title,
  description,
  checked,
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
      <Switch checked={checked} disabled={disabled} onChange={onChange} />
    </SettingItem>
  );
};
