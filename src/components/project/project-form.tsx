import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  Select,
  DatePicker,
  Button,
  Card,
  Row,
  Col,
  message,
  Spin,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import type { ProjectData } from "../../types";
import { CUSTOMERS, MANAGERS, STAFF, STATUS } from "../../constants";
import FormInput from "../form/form-input";
import ErrorMessage from "../form/error-message";
import { projectFormSchema } from "../../validation";
import { zodResolver } from "@hookform/resolvers/zod";

const { Option } = Select;

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProjectData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      customer: "",
      referenceNumber: "",
      projectName: "",
      projectNumber: "",
      areaLocation: "",
      address: "",
      dueDate: "",
      contact: "",
      manager: "",
      staff: "",
      status: "",
      email: "",
    },
  });

  useEffect(() => {
    if (isEditMode && id) {
      getProjectDetails(id);
    }
  }, [id, isEditMode]);

  const getProjectDetails = async (projectId: string) => {
    setLoading(true);
    try {
      // Replace with actual API call
      const projectDetails: ProjectData = {
        id: projectId,
        customer: "1",
        referenceNumber: "REF-2024-001",
        projectName: "Website Redesign",
        projectNumber: "PRJ-001",
        areaLocation: "Downtown",
        address: "123 Main Street, City",
        dueDate: "2024-12-31",
        contact: "john.doe@example.com",
        manager: "1",
        staff: "1",
        status: "in-progress",
        email: "project@example.com",
      };

      setValue("customer", projectDetails.customer);
      setValue("referenceNumber", projectDetails.referenceNumber);
      setValue("projectName", projectDetails.projectName);
      setValue("projectNumber", projectDetails.projectNumber);
      setValue("areaLocation", projectDetails.areaLocation);
      setValue("address", projectDetails.address);
      setValue("dueDate", projectDetails.dueDate);
      setValue("contact", projectDetails.contact);
      setValue("manager", projectDetails.manager);
      setValue("staff", projectDetails.staff);
      setValue("status", projectDetails.status);
      setValue("email", projectDetails.email);
    } catch (error: any) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProjectData) => {
    console.log('data', data);
    // setLoading(true);
    // try {
    //   const formattedData = {
    //     ...data,
    //     dueDate: data.dueDate ? data.dueDate : null,
    //   };

    //   if (isEditMode) {
    //     console.log("Updating project:", { id, ...formattedData });
    //     message.success("Project updated successfully!");
    //   } else {
    //     console.log("Creating new project:", formattedData);
    //     message.success("Project created successfully!");
    //   }

    //   navigate("/projects");
    // } catch (error) {
    //   console.error("Error saving project:", error);
    //   message.error("Failed to save project");
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleCancel = () => {
    navigate("/projects");
  };

  if (loading && isEditMode) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "50px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card
      title={isEditMode ? "Edit Project" : "Add New Project"}
      style={{ maxWidth: 1200, margin: "0 auto" }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Controller
              name="customer"
              control={control}
              render={({ field }) => (
                <>
                  <label>Customer</label>
                  <Select
                    {...field}
                    placeholder="Select customer"
                    showSearch
                    optionFilterProp="children"
                    className="w-full"
                  >
                    {CUSTOMERS.map((customer) => (
                      <Option key={customer.id} value={customer.id}>
                        {customer.name}
                      </Option>
                    ))}
                  </Select>
                </>
              )}
            />
            <ErrorMessage message={errors?.customer?.message} />
          </Col>

          <Col xs={24} md={8}>
            <Controller
              name="referenceNumber"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  placeholder="Enter your reference number"
                  error={errors?.referenceNumber?.message}
                  label="Reference Number"
                />
              )}
            />
          </Col>

          <Col xs={24} md={8}>
            <Controller
              name="projectName"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  placeholder="Enter your project name"
                  error={errors?.projectName?.message}
                  label="Project Name"
                />
              )}
            />
          </Col>

          <Col xs={24} md={8}>
            <Controller
              name="projectNumber"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  placeholder="Enter your project number"
                  error={errors?.projectNumber?.message}
                  label="Project Number"
                />
              )}
            />
          </Col>

          <Col xs={24} md={8}>
            <Controller
              name="areaLocation"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  placeholder="Enter your project area location"
                  error={errors?.areaLocation?.message}
                  label="Area Location"
                />
              )}
            />
          </Col>

          <Col xs={24} md={8}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  placeholder="Enter your project address"
                  error={errors?.address?.message}
                  label="Address"
                />
              )}
            />
          </Col>

          <Col xs={24} md={8}>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <>
                  <label>Due Date</label>
                  <DatePicker
                    {...field}
                    style={{ width: "100%" }}
                    placeholder="Select Due Date"
                    suffixIcon={<CalendarOutlined />}
                  />
                </>
              )}
            />
            <ErrorMessage message={errors?.dueDate?.message} />
          </Col>

          <Col xs={24} md={8}>
            <Controller
              name="contact"
              control={control}
              render={({ field }) => (
                <FormInput
                  {...field}
                  placeholder="Enter your contact"
                  error={errors?.contact?.message}
                  label="Contact"
                />
              )}
            />
          </Col>

          <Col xs={24} md={8}>
            <Controller
              name="manager"
              control={control}
              render={({ field }) => (
                <>
                  <label>Manager</label>
                  <Select
                    {...field}
                    placeholder="Select project manager"
                    showSearch
                    optionFilterProp="children"
                    className="w-full"
                  >
                    {MANAGERS.map((manager) => (
                      <Option key={manager.id} value={manager.id}>
                        {manager.name}
                      </Option>
                    ))}
                  </Select>
                </>
              )}
            />
            <ErrorMessage message={errors?.manager?.message} />
          </Col>

          <Col xs={24} md={8}>
            <Controller
              name="staff"
              control={control}
              render={({ field }) => (
                <>
                  <label>Staff</label>
                  <Select
                    {...field}
                    placeholder="Select project staff"
                    showSearch
                    optionFilterProp="children"
                    className="w-full"
                  >
                    {STAFF.map((staff) => (
                      <Option key={staff.id} value={staff.id}>
                        {staff.name}
                      </Option>
                    ))}
                  </Select>
                </>
              )}
            />
            <ErrorMessage message={errors?.staff?.message} />
          </Col>

          <Col xs={24} md={8}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <>
                  <label>Status</label>
                  <Select
                    {...field}
                    placeholder="Select project status"
                    className="w-full"
                  >
                    {STATUS.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </>
              )}
            />
            <ErrorMessage message={errors?.status?.message} />
          </Col>

          <Col xs={24} md={8}>
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
          </Col>
        </Row>

        <Row justify="start" style={{ marginTop: 24 }}>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ marginRight: 8, minWidth: 120 }}
            >
              {isEditMode ? "Update" : "Add Now"}
            </Button>
            <Button onClick={handleCancel} style={{ minWidth: 120 }}>
              Cancel
            </Button>
          </Col>
        </Row>
      </form>
    </Card>
  );
};

export default ProjectForm;
