import React from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";

export interface BaseButtonProps extends ButtonProps {
  label: string;
  type?: "primary" | "default" | "dashed" | "text" | "link";
  htmlType?: "button" | "submit" | "reset";
  size?: "small" | "middle" | "large";
  loading?: boolean;
  className?: string;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  label,
  type = "primary",
  htmlType = "submit",
  size = "large",
  loading = false,
  className,
  ...rest
}) => {
  return (
    <Button
      type={type}
      htmlType={htmlType}
      size={size}
      loading={loading}
      {...rest}
      className={`form-button ${className || ""}`}
    >
      {label}
    </Button>
  );
};

export default BaseButton;
