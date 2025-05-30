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

  const handleLogout = () => {
    localStorage.removeItem("login-user");
    localStorage.removeItem("token");
    successToast("User Logout Successfull");
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#e0f7fa] to-[#fce4ec] p-6">
      <div className="w-[90%] max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            👋 Welcome, {user?.name}
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2.5 rounded-full hover:opacity-90 transition shadow-lg hover:shadow-xl"
          >
            <FiLogOut className="text-xl" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-3xl shadow-xl backdrop-blur-xl bg-white/70 border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead>
              <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 uppercase text-xs font-bold tracking-wider">
                {["#", "Name", "Created At", "Role", "Status", "Action"].map(
                  (col) => (
                    <th key={col} className="px-6 py-5 text-left">
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((id) => (
                <tr
                  key={id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200 ease-in-out"
                >
                  <td className="px-6 py-5 font-semibold text-gray-800">
                    {id}
                  </td>

                  <td className="px-6 py-5 flex items-center gap-4">
                    <img
                      src={userImg}
                      alt="user"
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-400 shadow-sm"
                    />
                    <span className="font-medium text-gray-900">
                      Soham Chogale
                    </span>
                  </td>

                  <td className="px-6 py-5 text-gray-700">2025-05-30</td>
                  <td className="px-6 py-5 text-blue-600 font-medium">Admin</td>

                  <td className="px-6 py-5">
                    <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
                      <span className="w-2 h-2 bg-green-500 rounded-full " />
                      Active
                    </span>
                  </td>

                  <td className="px-6 py-5 flex items-center gap-4 text-xl">
                    <IoIosSettings className="text-blue-500 text-2xl hover:scale-110 transition-transform duration-200 cursor-pointer" />
                    <TiDelete className="text-red-500 text-3xl hover:scale-110 transition-transform duration-200 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-5 border-t border-gray-200 bg-white/80">
            <span className="text-sm text-gray-600">
              Showing <strong>1</strong> to <strong>5</strong> of{" "}
              <strong>25</strong> results
            </span>
            <div className="inline-flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition">
                Prev
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2  ${
                    page === 1
                      ? "bg-blue-500 text-white shadow"
                      : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                  } transition`}
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition">
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
