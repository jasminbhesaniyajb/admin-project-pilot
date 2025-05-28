// components/ErrorMessage.tsx
import React from 'react';
import { Typography } from 'antd';
import type { ErrorMessageProps } from '../../types';

const { Text } = Typography;

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = 'text-sm' }) => {
  if (!message) return null;

  return (
    <Text type="danger" className={className}>
      {message}
    </Text>
  );
};

export default ErrorMessage;
