import { ConfigProvider } from "antd";
import "./App.css";
import { BrowserRouter, useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const AppRoutes = () => useRoutes(routes);
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1890ff",
            borderRadius: 8,
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          },
          components: {
            Form: {
              labelFontSize: 14,
              labelColor: "#262626",
            },
            Input: {
              controlHeight: 48,
              fontSize: 16,
            },
            Button: {
              controlHeight: 48,
              fontSize: 16,
            },
          },
        }}
      >
        <AppRoutes />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
