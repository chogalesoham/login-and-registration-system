import React, { useState } from "react";
import { FaRegCalendarAlt, FaUserAlt } from "react-icons/fa";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../utils/tost";

const Base_URL = import.meta.env.VITE_API_URL;

const Ragister = () => {
  const navigate = useNavigate();
  const [singinInfo, setSinginInfo] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });

  const handleInpute = (e) => {
    const { name, value } = e.target;
    setSinginInfo((prev) => ({ ...prev, [name]: value }));
    console.log(singinInfo);
  };

  const handleRagisterUser = async (e) => {
    e.preventDefault();
    try {
      const res = fetch(`${Base_URL}/auth/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(singinInfo),
      });
      successToast("User Ragister Successfull");
      navigate("/login");
    } catch (error) {
      errorToast("Error in User Ragistration");
      console.log("Error in User Ragistration");
    }
  };

  return (
    <div className="w-[400px] bg-[#1E2C51] p-6 rounded-xl shadow-md text-white relative m-2">
      <div className="mb-6 flex justify-center">
        <FaRegUserCircle className="text-7xl  my-1 font-extralight text-[#79839E] rounded-full shadow-lg" />
      </div>

      <form onSubmit={handleRagisterUser} className="space-y-4">
        <div className="flex items-center gap-3 bg-[#2D3E6C] px-4 py-3 rounded-md">
          <label className="text-[#00F4E2]">
            <FaUserAlt />
          </label>
          <span className="text-gray-400">|</span>
          <input
            required
            name="name"
            value={singinInfo.name}
            onChange={handleInpute}
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
            value={singinInfo.dob}
            onChange={handleInpute}
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
            value={singinInfo.email}
            onChange={handleInpute}
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
            value={singinInfo.password}
            onChange={handleInpute}
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none flex-1 text-white placeholder-gray-300"
          />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="accent-[#00F4E2]" />
          <label className="text-white">Remember Me</label>
        </div>

        <button className="w-full py-3 bg-[#00F4E2] text-white font-semibold rounded-md hover:bg-[#00dfce] transition cursor-pointer">
          SING IN
        </button>
        <p className="text-sm text-gray-300 text-center">
          Already have an account ?{" "}
          <Link
            to="/login"
            className="text-[#00F4E2] font-medium hover:underline hover:text-[#00dfce] transition"
          >
            LOGIN
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Ragister;
