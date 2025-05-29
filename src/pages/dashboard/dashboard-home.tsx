import { Card, Col, Row, Statistic } from "antd";
import Chart from "react-apexcharts";
import {
  ProjectOutlined,
  DollarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function DashboardHome() {
  const { t } = useTranslation();

  const chartOptions = {
    chart: {
      id: "project-estimation",
      type: "line",
      toolbar: { show: false },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#1890ff", "#faad14"],
    legend: {
      position: "top",
    },
  };

  const chartSeries = [
    {
      name: "Projects",
      data: [10, 15, 14, 20, 18, 22],
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t("totalProjects")}
              value={28}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t("activeProjects")}
              value={15}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t("totalRevenue")}
              value={125000}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t("pendingEstimates")}
              value={8}
              valueStyle={{ color: "#f5222d" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Line Chart Section */}
      <Card title="Projects (Last 6 Months)" style={{ marginBottom: "24px" }}>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={350}
        />
      </Card>

      <Card title="Recent Activities" style={{ marginBottom: "24px" }}>
        <p>Recent project updates and activities will be displayed here.</p>
      </Card>
    </>
  );
}

export default DashboardHome;
