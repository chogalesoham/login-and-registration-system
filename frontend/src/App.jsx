import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userImg from "./assets/user.avif";
import { TiDelete } from "react-icons/ti";
import { IoIosSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { successToast } from "./utils/tost";

const App = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("login-user"));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("login-user");
    localStorage.removeItem("token");
    successToast("User Logout Successful");
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

  const tableData = [
    {
      id: 1,
      name: "Soham Chogale",
      date: "2025-05-30",
      role: "Admin",
      status: "Active",
      image: userImg,
    },
    {
      id: 2,
      name: "Nikhil Chogale",
      date: "2025-04-28",
      role: "Editor",
      status: "Active",
      image: userImg,
    },
    {
      id: 3,
      name: "Riya Sharma",
      date: "2025-03-15",
      role: "Viewer",
      status: "Inactive",
      image: userImg,
    },
    {
      id: 4,
      name: "Aarav Mehta",
      date: "2025-01-12",
      role: "Admin",
      status: "Active",
      image: userImg,
    },
    {
      id: 5,
      name: "Priya Patel",
      date: "2024-12-20",
      role: "Editor",
      status: "Inactive",
      image: userImg,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#e0f7fa] to-[#fce4ec] px-4 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800">
            👋 Welcome, {user?.name}
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2.5 rounded-full hover:opacity-90 transition shadow-lg"
          >
            <FiLogOut className="text-xl" />
            <span className="font-semibold text-sm sm:text-base">Logout</span>
          </button>
        </div>

        {/* Table Container */}
        <div className=" rounded-2xl overflow-x-auto shadow-lg backdrop-blur-md bg-white/80 border border-gray-200">
          <table className="w-full text-sm sm:text-base text-gray-700 min-w-[600px] ">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs sm:text-sm font-bold tracking-wide">
                {["#", "Name", "Created At", "Role", "Status", "Action"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-4 py-4 text-left whitespace-nowrap"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-4 font-semibold text-gray-800">
                    {row.id}
                  </td>
                  <td className="px-4 py-4 flex items-center gap-3">
                    <img
                      src={row.image}
                      alt={row.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-400"
                    />
                    <span className="text-gray-900 font-medium">
                      {row.name}
                    </span>
                  </td>
                  <td className="px-4 py-4">{row.date}</td>
                  <td className="px-4 py-4 text-blue-600 font-medium">
                    {row.role}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-2 font-semibold ${
                        row.status === "Active"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          row.status === "Active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 flex items-center gap-3 text-xl">
                    <IoIosSettings className="text-blue-500 hover:scale-110 transition-transform cursor-pointer" />
                    <TiDelete className="text-red-500 hover:scale-110 transition-transform cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t border-gray-200 bg-white/80 gap-3">
            <span className="text-xs sm:text-sm text-gray-600">
              Showing <strong>1</strong> to <strong>5</strong> of{" "}
              <strong>25</strong> results
            </span>
            <div className="inline-flex gap-2">
              <button className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition">
                Prev
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg ${
                    page === 1
                      ? "bg-blue-500 text-white shadow"
                      : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                  } transition`}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-1 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
