import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import AllRouteFunction from "./routes/Root.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AllRouteFunction />
    </AuthProvider>
  </StrictMode>
);
