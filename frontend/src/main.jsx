import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Ragister from "./pages/ragister.jsx";
import Login from "./pages/login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/ragister",
    element: <Ragister />,
  },
  {
    path: "/home",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: "linear-gradient(to bottom, #007782, #029BA0, #00BFBA)",
      }}
    >
      <RouterProvider router={router} />
      <Toaster />
    </div>
  </StrictMode>
);
