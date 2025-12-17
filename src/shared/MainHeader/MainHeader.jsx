/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMenu, IoNotificationsOutline, IoChatbubbleEllipses, IoClose } from "react-icons/io5";
import Chat from "../../pages/chat/Chat";

const MainHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        if (!event.target.closest('.chat-icon-button')) {
          setShowChat(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="relative w-full px-3 sm:px-4 lg:px-5">
      <header className="shadow-sm rounded-lg border border-slate-200 overflow-hidden bg-white">
        <div className="flex justify-between items-center px-3 sm:px-5 md:px-10 h-[60px] sm:h-[70px] lg:h-[80px]">
          <button
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="p-2 rounded-lg hover:bg-blue-50 active:bg-blue-100 focus:outline-none transition-colors duration-200"
          >
            <IoMenu className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification */}
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => navigate('/notifications')}
              className="relative p-2 rounded-full border border-blue-600 hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200"
            >
              <IoNotificationsOutline className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] px-1 leading-none font-semibold">3</span>
            </button>

            {/* Profile */}
            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src="/userimg.png"
                className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded-full border-2 border-blue-100"
                alt="User Avatar"
              />
              <div className="hidden sm:block">
                <h3 className="hidden md:block text-blue-600 text-sm lg:text-base font-semibold leading-tight">
                  Mr. Admin
                </h3>
                <p className="text-blue-600 text-xs sm:text-sm lg:text-base font-semibold">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Overlay */}
      {showChat && (
        <div
          ref={chatRef}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowChat(false)}
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Messages</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowChat(false)}
                  className="text-white hover:text-gray-200 focus:outline-none"
                >
                  <IoClose className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-hidden flex">
              <Chat isEmbedded={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainHeader;
