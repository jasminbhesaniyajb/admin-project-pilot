import React from "react";
import { Dropdown, Space, Avatar } from "antd";
import { MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { getUser } from "../../utils";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  onLogout?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onToggleSidebar,
  onLogout,
}) => {
  const user: any = getUser()
  
  const userMenuItems: MenuProps["items"] = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: onLogout,
    },
  ];

  return (
    <>
      <div className="dashboard-header">
        <div className="header-left">
          <button
            className="hamburger-btn"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <MenuOutlined />
          </button>

          <Link to="/dashboard" className="logo">
            LOGO
          </Link>
        </div>

        <div className="header-right">
          <Space size="middle">
            {/* Language Selector */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
              }}
            >
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAyMCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjE0IiBmaWxsPSIjMDEyMTY5Ii8+CjxwYXRoIGQ9Ik0wIDBoMjB2MkgwVjB6bTAgNGgyMHYySDB2LTJ6bTAgNGgyMHYySDB2LTJ6IiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDEyMTY5Ii8+CjwvZz4KPC9zdmc+"
                alt="English"
                style={{ width: "20px", height: "14px" }}
              />
              <span style={{ fontSize: "14px", color: "#595959" }}>
                English
              </span>
            </div>

            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <div className="user-dropdown">
                <div className="user-info">
                  <Avatar size={32}>{user.userName.charAt(0)}</Avatar>
                  <div className="user-details">
                    <div className="user-name">{user.userName}</div>
                  </div>
                </div>
              </div>
            </Dropdown>
          </Space>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
