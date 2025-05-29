import React, { useState, useEffect } from "react";
import { Button, Space, Tag, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import DataTable from "../../../components/data-table";
import BaseButton from "../../../components/form/base-button";
import { useNavigate } from "react-router-dom";

interface User {
  key: string;
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

const Projects: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
        key: `user-${i}`,
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "Viewer",
        status: i % 4 === 0 ? "inactive" : "active",
        createdAt: new Date(Date.now() - Math.random() * 10000000000)
          .toISOString()
          .split("T")[0],
      }));
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (record: User) => {
    console.log("Edit user:", record);
  };

  const handleDelete = (record: User) => {
    console.log("Delete user:", record);
  };


  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        const color =
          role === "Admin" ? "red" : role === "Editor" ? "blue" : "green";
        return <Tag color={color}>{role}</Tag>;
      },
      filters: [
        { text: "Admin", value: "Admin" },
        { text: "Editor", value: "Editor" },
        { text: "Viewer", value: "Viewer" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
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
        <div>Filter</div>
        <BaseButton label="Add Project" type="primary" onClick={() => navigate("/projects/add")} />
      </div>
      <DataTable
        columns={columns}
        dataSource={users}
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
