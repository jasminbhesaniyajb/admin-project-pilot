import React from "react";
import { Card, Typography, Divider, Input, Space } from "antd";
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
import BaseButton from "../../components/form/base-button";

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
    <div
      className="form-container"
    >
      <div className="form-card">
        <Card style={{ borderRadius: "12px" }}>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <Title
                level={2}
                style={{ marginBottom: "8px", color: "#1890ff" }}
              >
                Login to Account
              </Title>
              <Text type="secondary" style={{ fontSize: "16px" }}>
                Please enter your email and password to continue
              </Text>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <div>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        {...field}
                        placeholder="Enter your email"
                        error={errors.email?.message}
                        label="Email"
                      />
                    )}
                  />
                </div>

                <div>
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
                  <a href="#" className="form-link">
                    Forgot password?
                  </a>
                </Text>

                <BaseButton label="Sign In" />
              </Space>
            </form>

            <Divider>
              <Text type="secondary">or</Text>
            </Divider>

            {/* Sign Up Link */}
            <div style={{ textAlign: "center" }}>
              <Text type="secondary">
                Don't have an account?{" "}
                <Link to="/signup" className="form-link">
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
