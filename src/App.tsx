import { ConfigProvider } from "antd";
import "./App.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
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
        {/* <AppRoutes /> */}
        <RouterProvider router={router} />
      </ConfigProvider>
  );
}

export default App;
