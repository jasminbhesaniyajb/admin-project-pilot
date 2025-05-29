import { Card, Col, Row, Statistic } from "antd";
import React from "react";

function DashboardHome() {
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Projects"
              value={28}
            //   prefix={<ProjectOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Projects"
              value={15}
            //   prefix={<UserOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={125000}
            //   prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Estimates"
              value={8}
              valueStyle={{ color: "#f5222d" }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Activities" style={{ marginBottom: "24px" }}>
        <p>Recent project updates and activities will be displayed here.</p>
      </Card>
    </>
  );
}

export default DashboardHome;
