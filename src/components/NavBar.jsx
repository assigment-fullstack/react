import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function NavBar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("logout successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="navbar bg-blue-400">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl text-white">
            Home
          </Link>
        </div>
        <div className="flex-none gap-2">
          <span className="text-white font-bold text-lg">{user.userName}</span>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://www.pngitem.com/pimgs/m/466-4660076_unknown-person-hd-png-download.png" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
