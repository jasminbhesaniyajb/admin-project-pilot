import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "@ant-design/v5-patch-for-react-19";
import { worker } from "./mocks/browser";
import "antd/dist/reset.css";
import "./i18n";
import { Provider } from "react-redux";
import { store } from "./store/store";

async function prepare() {
  try {
    await worker.start();
    console.log("MSW worker started");
  } catch (error) {
    console.error("Failed to start MSW worker:", error);
  }
}

prepare()
  .then(() => {
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Root element with id='root' not found");
    }

    createRoot(rootElement).render(
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>
    );
  })
  .catch((error) => {
    console.error("Error during app initialization:", error);
  });
