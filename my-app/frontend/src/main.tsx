import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ReadingsProvider } from "./contexts/ReadingsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ReadingsProvider>
          <App />
        </ReadingsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
