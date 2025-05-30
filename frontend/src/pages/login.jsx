import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaRegUserCircle, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../utils/tost";

const Base_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${Base_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await res.json();
      console.log(result);

      const { message, token, user, success } = result;
      if (success === true) {
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("login-user", JSON.stringify(user));
        successToast(message);
        setLoading(false);
        navigate("/home");
      } else {
        errorToast(message || "Login failed");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errorToast("Error during login");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-[400px] bg-[#1E2C51] p-6 rounded-xl shadow-md text-white relative m-2">
      <div className="mb-6 flex justify-center">
        <FaRegUserCircle className="text-7xl my-1 font-extralight text-[#79839E] rounded-full shadow-lg" />
      </div>

      <form onSubmit={handleLoginUser} className="space-y-4">
        <div className="flex items-center gap-3 bg-[#2D3E6C] px-4 py-3 rounded-md">
          <label className="text-[#00F4E2]">
            <FaUserAlt />
          </label>
          <span className="text-gray-400">|</span>
          <input
            required
            name="email"
            value={loginInfo.email}
            onChange={handleInput}
            type="email"
            placeholder="User Email"
            className="bg-transparent outline-none flex-1 text-white placeholder-gray-300"
          />
        </div>

        <div className="flex items-center gap-3 bg-[#2D3E6C] px-4 py-3 rounded-md">
          <label className="text-[#00F4E2]">
            <FaUnlockKeyhole />
          </label>
          <span className="text-gray-400">|</span>
          <input
            required
            name="password"
            value={loginInfo.password}
            onChange={handleInput}
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none flex-1 text-white placeholder-gray-300"
          />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-[#00F4E2]" />
          <label className="text-white">Remember Me</label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#00F4E2] text-white font-semibold rounded-md hover:bg-[#00dfce] transition cursor-pointer flex items-center justify-center"
        >
          {loading ? <FaSpinner className="animate-spin text-xl" /> : "LOGIN"}
        </button>
        <p className="text-sm text-gray-300 text-center">
          Don't have an account?{" "}
          <Link
            to="/ragister"
            className="text-[#00F4E2] font-medium hover:underline hover:text-[#00dfce] transition"
          >
            SIGN UP
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
