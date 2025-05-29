import React from "react";
import { Input } from "antd";
import ErrorMessage from "./error-message";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | undefined;
  prefixIcon?: React.ReactNode;
  className?: string;
  placeholder?: string;
  type?: string;
  label?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  error,
  prefixIcon,
  className = "",
  placeholder = "",
  type = "text",
  label,
  ...rest
}) => {
  return (
    <>
      {label && <label>{label}</label>}
      <Input
        prefix={prefixIcon}
        type={type}
        placeholder={placeholder}
        className={`${className}`}
        status={error ? "error" : ""}
        {...rest}
      />
      <ErrorMessage message={error} />
    </>
  );
};

export default FormInput;
