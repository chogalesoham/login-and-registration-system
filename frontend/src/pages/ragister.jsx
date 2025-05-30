import React, { useState } from "react";
import {
  FaRegCalendarAlt,
  FaUserAlt,
  FaRegUserCircle,
  FaSpinner,
} from "react-icons/fa";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../utils/tost";

const Base_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${Base_URL}/auth/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerInfo),
      });

      const result = await res.json();

      const { success, message } = result;

      if (success) {
        successToast("User Registered Successfully");
        setLoading(false);
        navigate("/");
      } else {
        errorToast(message || "Registration failed");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errorToast("Error in User Registration");
      console.error("Error in User Registration:", error);
    }
  };

  return (
    <div className="w-[400px] bg-[#1E2C51] p-6 rounded-xl shadow-md text-white relative m-2">
      <div className="mb-6 flex justify-center">
        <FaRegUserCircle className="text-7xl my-1 font-extralight text-[#79839E] rounded-full shadow-lg" />
      </div>

      <form onSubmit={handleRegisterUser} className="space-y-4">
        <div className="flex items-center gap-3 bg-[#2D3E6C] px-4 py-3 rounded-md">
          <label className="text-[#00F4E2]">
            <FaUserAlt />
          </label>
          <span className="text-gray-400">|</span>
          <input
            required
            name="name"
            value={registerInfo.name}
            onChange={handleInput}
            type="text"
            placeholder="Username"
            className="bg-transparent outline-none flex-1 text-white placeholder-gray-300"
          />
        </div>

        <div className="flex items-center gap-3 bg-[#2D3E6C] px-4 py-3 rounded-md">
          <label className="text-[#00F4E2]">
            <FaRegCalendarAlt />
          </label>
          <span className="text-gray-400">|</span>
          <input
            required
            name="dob"
            value={registerInfo.dob}
            onChange={handleInput}
            type="date"
            className="bg-transparent outline-none flex-1 text-white placeholder-gray-300 appearance-none"
          />
        </div>

        <div className="flex items-center gap-3 bg-[#2D3E6C] px-4 py-3 rounded-md">
          <label className="text-[#00F4E2]">
            <MdEmail />
          </label>
          <span className="text-gray-400">|</span>
          <input
            required
            name="email"
            value={registerInfo.email}
            onChange={handleInput}
            type="email"
            placeholder="Email"
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
            value={registerInfo.password}
            onChange={handleInput}
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none flex-1 text-white placeholder-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#00F4E2] text-white font-semibold rounded-md hover:bg-[#00dfce] transition cursor-pointer flex items-center justify-center"
        >
          {loading ? <FaSpinner className="animate-spin text-xl" /> : "SIGN UP"}
        </button>
        <p className="text-sm text-gray-300 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-[#00F4E2] font-medium hover:underline hover:text-[#00dfce] transition"
          >
            LOGIN
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
