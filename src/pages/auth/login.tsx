import React from "react";
import { Card, Typography, Divider, Button, Input, Space } from "antd";
import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type LoginFormValues } from "../../validation";
import ErrorMessage from "../../components/form/error-message";
import FormInput from "../../components/form/form-input";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    console.log("Login form submitted:", values);
    // Handle login logic here
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
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <Card style={{ borderRadius: "12px" }}>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <Title level={2} style={{ marginBottom: "8px", color: '#1890ff' }}>
                Welcome Back
              </Title>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                Please sign in to your account
              </Text>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <div>
                  <label>
                    Email
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        {...field}
                        placeholder="Enter your email"
                        error={errors.email?.message}
                      />
                    )}
                  />
                  <ErrorMessage message={errors?.email?.message} />
                </div>

                <div>
                  <label >
                    Password
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="Enter your password"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        status={errors.password ? "error" : ""}
                      />
                    )}
                  />
                  <ErrorMessage message={errors?.password?.message} />
                </div>

                <Text>
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </Text>

                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    background:
                      "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: 500,
                  }}
                >
                  Sign In
                </Button>
              </Space>
            </form>

            <Divider>
              <Text type="secondary">or</Text>
            </Divider>

            {/* Sign Up Link */}
            <div style={{ textAlign: "center" }}>
              <Text type="secondary">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: "#1890ff",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  Sign Up
                </Link>
              </Text>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
