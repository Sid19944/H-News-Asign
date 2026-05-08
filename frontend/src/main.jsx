import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <div
    className="h-screen"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgb(200, 200, 200) 2px, transparent 2px)",
      backgroundSize: "40px 40px",
    }}
  >
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </div>,
);
