import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Ragister from "./pages/ragister.jsx";
import Login from "./pages/login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: "linear-gradient(to bottom, #007782, #029BA0, #00BFBA)",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ragister" element={<Ragister />} />
          <Route path="/home" element={<App />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  </StrictMode>
);
