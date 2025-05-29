import React, { useState, useEffect } from "react";
import { Button, Space, Tag, message, Card, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import DataTable from "../../../components/data-table";
import BaseButton from "../../../components/form/base-button";
import { useNavigate } from "react-router-dom";
import { deleteProject, getProjectList } from "../../../api/project";
import type { ProjectData } from "../../../types";

const Projects: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [projectsList, setProjectsList] = useState<ProjectData[]>([]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getProjectList();

      setProjectsList(response?.data);
    } catch (error: any) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleEdit = (record: ProjectData) => {
    navigate(`/projects/edit/${record.id}`);
  };

  const handleDelete = (record: ProjectData) => {
    console.log("Delete user:", record);
    Modal.confirm({
      title: "Are you sure you want to delete this project?",
      content: `Project: ${record.projectName}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          message.success("Project deleted successfully");
          await deleteProject(record.id)
          await fetchProjects();
        } catch (error: any) {
          message.error("Failed to delete project");
        }
      },
    });
  };

  const columns: ColumnsType<any> = [
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (a, b) => a.projectName.localeCompare(b.projectName),
    },
    {
      title: "Reference Number",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
    },
    {
      title: "Project Number",
      dataIndex: "projectNumber",
      key: "projectNumber",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   key: "email",
    // },
    {
      title: "Manager",
      dataIndex: "manager",
      key: "manager",
    },
    {
      title: "Staff",
      dataIndex: "staff",
      key: "staff",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Area/Location",
      dataIndex: "areaLocation",
      key: "areaLocation",
    },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    // },
    // {
    //   title: "Due Date",
    //   dataIndex: "dueDate",
    //   key: "dueDate",
    //   sorter: (a, b) =>
    //     new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    // },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status?.toUpperCase() || "N/A"}
        </Tag>
      ),
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            danger
            size="small"
          />
        </Space>
      ),
    },
  ];

  return (
    <Card title="Projects Management">
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <BaseButton
          label="Add Project"
          type="primary"
          onClick={() => navigate("/projects/add")}
        />
      </div>
      <DataTable
        columns={columns}
        dataSource={projectsList}
        loading={loading}
        rowKey="key"
        defaultPageSize={20}
        showSizeChanger={true}
        showQuickJumper={true}
        showTotal={true}
      />
    </Card>
  );
};

export default Projects;
