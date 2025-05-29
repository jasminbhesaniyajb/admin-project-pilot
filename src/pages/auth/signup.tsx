import React from "react";
import { Input, Card, Typography, Space, Divider } from "antd";
import {
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { signupFormSchema, type SignupFormData } from "../../validation";
import FormInput from "../../components/form/form-input";
import ErrorMessage from "../../components/form/error-message";
import BaseButton from "../../components/form/base-button";

const { Title, Text } = Typography;

const SignupForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Signup data:", data);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="form-container">
      <Card className="form-card">
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
            Create an Account
          </Title>
          <Text type="secondary" style={{ fontSize: "14px" }}>
            Create a account to continue
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
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
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <FormInput
                    {...field}
                    placeholder="Enter your username"
                    error={errors?.username?.message}
                    label="Username"
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
                    status={errors.password ? "error" : ""}
                  />
                )}
              />
              <ErrorMessage message={errors?.password?.message} />
            </div>

            <BaseButton label="Sign Up" loading={isSubmitting} />
          </Space>
        </form>

        <Divider style={{ margin: "24px 0" }} />

        <div style={{ textAlign: "center" }}>
          <Text type="secondary">
            Already have an account?{" "}
            <Link to="/login" className="form-link">
              Sign In
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default SignupForm;
