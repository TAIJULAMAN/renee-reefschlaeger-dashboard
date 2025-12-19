/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { LuUsers } from "react-icons/lu";
import { TbBrandWechat, TbReport, TbTruckDelivery } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { IoCloseSharp, IoLogOutOutline } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { BsCurrencyDollar, BsCreditCard } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { FaCalendarCheck } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={`bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 h-screen overflow-y-auto z-[60] transition-all duration-500 ease-in-out
        w-[100%] sm:w-[85%] md:w-[75%] lg:w-72 xl:w-80
        ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full shadow-none "}
        fixed top-0 left-0
        lg:static lg:translate-x-0 lg:shadow-xl
        border-r border-slate-200/60
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
      `}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-100/30 pointer-events-none"></div>

      {/* Close Button (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="absolute top-6 right-6 lg:hidden text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none p-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-[70]"
        aria-label="Close sidebar"
      >
        <IoCloseSharp className="w-5 h-5" />
      </button>

      {/* Logo Section */}
      <div className="relative flex flex-col justify-center items-center gap-2 px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
        <div className="relative">
        </div>
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            Ireland Go
          </h2>
          <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-1">Admin Dashboard</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 sm:mx-6 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

      {/* Sidebar Menu */}
      <nav className="relative mt-4 sm:mt-6 px-3 sm:px-4 pb-28 sm:pb-32">
        {/* Main Navigation Section */}
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 sm:px-3 mb-2 sm:mb-3">Main Menu</p>

          {/* Dashboard */}
          <Link to="/" onClick={handleLinkClick}>
            <li
              className={`group flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-300 ease-in-out list-none
                ${isActive("/")
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/30 scale-[1.02]"
                  : "text-slate-700 hover:bg-white/70 hover:shadow-md px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl hover:scale-[1.01]"
                }`}
            >
              <RxDashboard className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isActive("/") ? "" : "group-hover:scale-110"}`} />
              <p className="text-xs sm:text-sm font-semibold">Dashboard</p>
              {isActive("/") && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
            </li>
          </Link>

          {/* All Users */}
          <Link to="/user-details" onClick={handleLinkClick}>
            <li
              className={`group flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-300 ease-in-out list-none
                ${isActive("/user-details")
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/30 scale-[1.02]"
                  : "text-slate-700 hover:bg-white/70 hover:shadow-md px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl hover:scale-[1.01]"
                }`}
            >
              <LuUsers className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isActive("/user-details") ? "" : "group-hover:scale-110"}`} />
              <p className="text-xs sm:text-sm font-semibold">All Users</p>
              {isActive("/user-details") && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
            </li>
          </Link>

          {/* Earnings */}
          <Link to="/earnings" onClick={handleLinkClick}>
            <li
              className={`group flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-300 ease-in-out list-none
                ${isActive("/earnings")
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/30 scale-[1.02]"
                  : "text-slate-700 hover:bg-white/70 hover:shadow-md px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl hover:scale-[1.01]"
                }`}
            >
              <BsCurrencyDollar className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isActive("/earnings") ? "" : "group-hover:scale-110"}`} />
              <p className="text-xs sm:text-sm font-semibold">Earnings</p>
              {isActive("/earnings") && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
            </li>
          </Link>

          {/* Bookings */}
          <Link to="/bookings" onClick={handleLinkClick}>
            <li
              className={`group flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-300 ease-in-out list-none
                ${isActive("/bookings")
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/30 scale-[1.02]"
                  : "text-slate-700 hover:bg-white/70 hover:shadow-md px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl hover:scale-[1.01]"
                }`}
            >
              <FaCalendarCheck className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isActive("/bookings") ? "" : "group-hover:scale-110"}`} />
              <p className="text-xs sm:text-sm font-semibold">Bookings</p>
              {isActive("/bookings") && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
            </li>
          </Link>

          {/* Vehicles */}
          <Link to="/vehicles" onClick={handleLinkClick}>
            <li
              className={`group flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-300 ease-in-out list-none
                ${isActive("/vehicles")
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/30 scale-[1.02]"
                  : "text-slate-700 hover:bg-white/70 hover:shadow-md px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl hover:scale-[1.01]"
                }`}
            >
              <TbTruckDelivery className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isActive("/vehicles") ? "" : "group-hover:scale-110"}`} />
              <p className="text-xs sm:text-sm font-semibold">Vehicles</p>
              {isActive("/vehicles") && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
            </li>
          </Link>

          {/* Chat */}
          <Link to="/chat" onClick={handleLinkClick}>
            <li
              className={`group flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-300 ease-in-out list-none
                ${isActive("/chat")
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/30 scale-[1.02]"
                  : "text-slate-700 hover:bg-white/70 hover:shadow-md px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl hover:scale-[1.01]"
                }`}
            >
              <TbBrandWechat className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isActive("/chat") ? "" : "group-hover:scale-110"}`} />
              <p className="text-xs sm:text-sm font-semibold">Chat</p>
              {isActive("/chat") && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
            </li>
          </Link>
        </div>

        {/* Divider */}
        <div className="my-4 sm:my-6 mx-2 sm:mx-3 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

        {/* Settings Section */}
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 sm:px-3 mb-2 sm:mb-3">Administration</p>

          {/* Create Admin */}
          <Link to="/create-admin" onClick={handleLinkClick}>
            <li
              className={`group flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-300 ease-in-out list-none
                ${isActive("/create-admin")
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/30 scale-[1.02]"
                  : "text-slate-700 hover:bg-white/70 hover:shadow-md px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl hover:scale-[1.01]"
                }`}
            >
              <MdAdminPanelSettings className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isActive("/create-admin") ? "" : "group-hover:scale-110"}`} />
              <p className="text-xs sm:text-sm font-semibold">Create Admin</p>
              {isActive("/create-admin") && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
            </li>
          </Link>

          {/* Reports */}
          <Link to="/reports" onClick={handleLinkClick}>
            <li
              className={`group flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-300 ease-in-out list-none
                ${isActive("/reports")
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/30 scale-[1.02]"
                  : "text-slate-700 hover:bg-white/70 hover:shadow-md px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl hover:scale-[1.01]"
                }`}
            >
              <TbReport className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isActive("/reports") ? "" : "group-hover:scale-110"}`} />
              <p className="text-xs sm:text-sm font-semibold">Reports</p>
              {isActive("/reports") && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
            </li>
          </Link>

          {/* Settings */}
          <Link to="/settings" onClick={handleLinkClick}>
            <li
              className={`group flex items-center gap-2 sm:gap-3 cursor-pointer transition-all duration-300 ease-in-out list-none
                ${isActive("/settings")
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/30 scale-[1.02]"
                  : "text-slate-700 hover:bg-white/70 hover:shadow-md px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl hover:scale-[1.01]"
                }`}
            >
              <IoMdSettings className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isActive("/settings") ? "" : "group-hover:scale-110"}`} />
              <p className="text-xs sm:text-sm font-semibold">Settings</p>
              {isActive("/settings") && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
            </li>
          </Link>
        </div>
      </nav>

      {/* Logout Button - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 bg-gradient-to-t from-slate-100/80 to-transparent backdrop-blur-sm">
        <Link to="/sign-in">
          <button className="group flex items-center justify-center gap-2 sm:gap-3 w-full py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30 transition-all duration-300 text-white text-sm sm:text-base font-semibold hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/40">
            <IoLogOutOutline className="w-4 h-4 sm:w-5 sm:h-5 font-bold transition-transform duration-300 group-hover:translate-x-[-2px]" />
            <span>Logout</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
