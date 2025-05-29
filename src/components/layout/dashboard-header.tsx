import React from "react";
import { Dropdown, Space, Avatar, Select } from "antd";
import { MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { getUser } from "../../utils";
import { useTranslation } from "react-i18next";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  onLogout?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onToggleSidebar,
  onLogout,
}) => {
  const user: any = getUser();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

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
            {t("projectPilot")}
          </Link>
        </div>

        <div className="header-right">
          <Space size="middle">
            <div>
              <Select
                defaultValue={i18n.language}
                style={{ width: 150 }}
                onChange={handleLanguageChange}
              >
                <Select.Option value="en">English</Select.Option>
                <Select.Option value="fr">Français</Select.Option>
              </Select>
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
