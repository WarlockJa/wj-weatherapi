import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n.ts";
import GeolocationProvider from "@context/GeolocationProvider.tsx";
import LocalDataProvider from "./context/LocalDataProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GeolocationProvider>
      <LocalDataProvider>
        <App />
      </LocalDataProvider>
    </GeolocationProvider>
  </React.StrictMode>
);
