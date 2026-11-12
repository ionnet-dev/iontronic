import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@ionnet/iontronic/styles.css";
import { IontronicProvider } from "@ionnet/iontronic/react";
import "./docs/docs.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IontronicProvider>
      <App />
    </IontronicProvider>
  </StrictMode>,
);
