import React from 'react';
import { Input } from 'antd';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | undefined;
  prefixIcon?: React.ReactNode;
  className?: string;
  placeholder?: string;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  error,
  prefixIcon,
  className = '',
  placeholder = '',
  type = 'text',
  ...rest
}) => {
  return (
    <Input
      prefix={prefixIcon}
      type={type}
      placeholder={placeholder}
      className={`${className}`}
      status={error ? 'error' : ''}
      {...rest}
    />
  );
};

export default FormInput;
