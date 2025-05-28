import React from 'react';
import { Form, Input, Button, Card, Typography, Space, Divider } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { signupFormSchema, type SignupFormData } from '../../validation';

const { Title, Text } = Typography;

const SignupForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Signup data:', data);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        }}
        bodyStyle={{ padding: '32px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
            Create Account
          </Title>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            Join us today and get started
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Email Field */}
            <div>
              <Form.Item
                label="Email"
                validateStatus={errors.email ? 'error' : ''}
                help={errors.email?.message}
                style={{ marginBottom: 0 }}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
                      placeholder="Enter your email"
                      size="large"
                      style={{ borderRadius: '8px' }}
                    />
                  )}
                />
              </Form.Item>
            </div>

            {/* Username Field */}
            <div>
              <Form.Item
                label="Username"
                validateStatus={errors.username ? 'error' : ''}
                help={errors.username?.message}
                style={{ marginBottom: 0 }}
              >
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                      placeholder="Choose a username"
                      size="large"
                      style={{ borderRadius: '8px' }}
                    />
                  )}
                />
              </Form.Item>
            </div>

            {/* Password Field */}
            <div>
              <Form.Item
                label="Password"
                validateStatus={errors.password ? 'error' : ''}
                help={errors.password?.message}
                style={{ marginBottom: 0 }}
              >
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                      placeholder="Create a strong password"
                      size="large"
                      style={{ borderRadius: '8px' }}
                    />
                  )}
                />
              </Form.Item>
            </div>

            {/* Submit Button */}
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isSubmitting}
              style={{
                width: '100%',
                borderRadius: '8px',
                height: '48px',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </Space>
        </form>

        <Divider style={{ margin: '24px 0' }} />

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">
            Already have an account?{' '}
            <Link 
              to="/login" 
              style={{ 
                color: '#1890ff', 
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Sign In
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default SignupForm;