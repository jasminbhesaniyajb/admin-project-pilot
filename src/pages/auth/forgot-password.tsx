import React from "react";
import { Card, Typography, Divider, Input, Space, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LockOutlined } from "@ant-design/icons";
import ErrorMessage from "../../components/form/error-message";
import FormInput from "../../components/form/form-input";
import BaseButton from "../../components/form/base-button";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordFormSchema } from "../../validation";
import { forgotPassword } from "../../api/auth";

const { Title, Text } = Typography;

type ForgotPasswordValues = z.infer<typeof forgotPasswordFormSchema>;

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    try {
      const res = await forgotPassword(values);
      message.success(res.data?.message || "Password updated successfully");
      navigate("/login");
    } catch (error: any) {
      message.error(error || "Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <Card style={{ borderRadius: "12px" }}>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <Title level={2} style={{ marginBottom: 8, color: "#1890ff" }}>
                Forgot Password
              </Title>
              <Text type="secondary">Reset your password using email</Text>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      {...field}
                      placeholder="Enter your email"
                      label="Email"
                      error={errors.email?.message}
                    />
                  )}
                />
                <div>
                  <label className="form-label">New Password</label>
                  <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        placeholder="Enter new password"
                        prefix={<LockOutlined className="text-gray-400" />}
                        status={errors?.newPassword ? "error" : ""}
                      />
                    )}
                  />
                  <ErrorMessage message={errors?.newPassword?.message} />
                </div>
                <BaseButton
                  htmlType="submit"
                  loading={isSubmitting}
                  label="Reset Password"
                  className="w-full"
                />
              </Space>
            </form>

            <Divider>
              <Text type="secondary">or</Text>
            </Divider>

            <div style={{ textAlign: "center" }}>
              <Text type="secondary">
                Remember your password?{" "}
                <Link to="/login" className="form-link">
                  Sign In
                </Link>
              </Text>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
