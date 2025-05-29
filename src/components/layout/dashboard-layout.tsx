import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "./dashboard-sidebar";
import DashboardHeader from "./dashboard-header";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] =
    useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileDrawerOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileDrawerOpen(!mobileDrawerOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleCloseMobileDrawer = () => {
    setMobileDrawerOpen(false);
  };

  const showLogoutModal = (): void => {
    setIsLogoutModalVisible(true);
  };

  const handleLogoutConfirm = (): void => {
    setIsLogoutModalVisible(false);
    handleLogout();
  };

  const handleLogoutCancel = (): void => {
    setIsLogoutModalVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    navigate("/login");
  };

  return (
    <>
      <div className="dashboard-layout">
        {/* Header */}
        <DashboardHeader
          onToggleSidebar={handleToggleSidebar}
          onLogout={showLogoutModal}
        />

        {/* Sidebar */}
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          mobileOpen={mobileDrawerOpen}
          isMobile={isMobile}
          onClose={handleCloseMobileDrawer}
          onLogout={showLogoutModal}
        />

        {/* Main Content */}
        <div
          className={`dashboard-content ${
            !isMobile && sidebarCollapsed ? "sidebar-collapsed" : ""
          }`}
        >
          {children}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ExclamationCircleOutlined
              style={{ color: "#faad14", fontSize: "20px" }}
            />
            <span>Confirm Logout</span>
          </div>
        }
        open={isLogoutModalVisible}
        onOk={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        okText="Yes, Logout"
        cancelText="Cancel"
        okType="primary"
        centered
        width={400}
        maskClosable={false}
        keyboard={false}
      >
        <div style={{ padding: "16px 0" }}>
          <p style={{ margin: 0, fontSize: "16px", color: "#595959" }}>
            Are you sure you want to logout?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default DashboardLayout;
