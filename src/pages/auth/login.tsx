import React from "react";
import { Card, Typography, Divider, Input, Space, message } from "antd";
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
import { Link, useNavigate } from "react-router-dom";
import BaseButton from "../../components/form/base-button";
import { login } from "../../api/auth";
import { setToken, setUser } from "../../utils";

const { Title, Text } = Typography;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await login(values);
      if (response.status === 401) {
        message.error(response.data.message || "Invalid email or password");
        return;
      }
      if (response.status === 200) {
        const { token, user } = response.data;
        setToken(token);
        setUser(user);
        message.success(response.data.message);
        navigate("/");
      }
    } catch (error: any) {
      message.error(error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
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
                        error={errors?.email?.message}
                        label="Email"
                      />
                    )}
                  />
                </div>

                <div>
                  <label>Password</label>
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
                        status={errors?.password ? "error" : ""}
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

                <BaseButton
                  htmlType="submit"
                  label="Sign In"
                  className="w-full"
                  loading={isSubmitting}
                />
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
