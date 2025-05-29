import React from "react";
import { Menu, Drawer } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { SIDEBAR_MENU_ITEMS } from "../../constants";

interface DashboardSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  collapsed,
  mobileOpen,
  isMobile,
  onClose,
  onLogout,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getSelectedKey = () => {
    const currentPath = location.pathname;

    const exactMatch = SIDEBAR_MENU_ITEMS.find(
      (item) => item.path === currentPath
    );
    if (exactMatch) {
      return [exactMatch.key];
    }

    const partialMatch = SIDEBAR_MENU_ITEMS.find(
      (item) =>
        item.path !== "/" &&
        currentPath.startsWith(item.path) &&
        currentPath !== "/"
    );

    if (partialMatch) {
      return [partialMatch.key];
    }

    return ["dashboard"];
  };

  const handleMenuClick = (key: string) => {
    const menuItem = SIDEBAR_MENU_ITEMS.find((item) => item.key === key);
    if (menuItem) {
      navigate(menuItem.path);
      if (isMobile) {
        onClose();
      }
    }
  };

  const antSIDEBAR_MENU_ITEMS = SIDEBAR_MENU_ITEMS.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: <span className="menu-item-text">{item.label}</span>,
    onClick: () => handleMenuClick(item.key),
  }));

  const SidebarContent = () => (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Menu
        mode="inline"
        selectedKeys={getSelectedKey()}
        className={`sidebar-menu ${collapsed && !isMobile ? "collapsed" : ""}`}
        items={antSIDEBAR_MENU_ITEMS}
        inlineCollapsed={collapsed && !isMobile}
        style={{
          border: "none",
          background: "transparent",
          flex: 1,
        }}
      />

      <div className="sidebar-footer">
        <button
          className={`logout-btn `}
          onClick={onLogout}
          title="Logout"
        >
          <LogoutOutlined />
          {!collapsed && !isMobile && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {!isMobile && (
        <div className={`desktop-sidebar ${collapsed ? "collapsed" : ""}`}>
          <SidebarContent />
        </div>
      )}

      {isMobile && (
        <Drawer
          title="Menu"
          placement="left"
          onClose={onClose}
          open={mobileOpen}
          width={256}
          bodyStyle={{ padding: 0 }}
          headerStyle={{
            borderBottom: "1px solid #f0f0f0",
            marginBottom: 0,
          }}
        >
          <SidebarContent />
        </Drawer>
      )}
    </>
  );
};

export default DashboardSidebar;
