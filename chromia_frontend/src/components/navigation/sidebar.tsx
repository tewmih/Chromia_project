"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LiaPlusCircleSolid } from "react-icons/lia";
import { AiOutlineHome, AiOutlineCalendar } from "react-icons/ai";
import { Modal } from "../ui/Modal";
import { FcAbout } from "react-icons/fc";
import { IoMdAnalytics } from "react-icons/io";
import AddModalContent from "@/utility/AddModalContent";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false); // Fix for hydration errors

  // Ensure the component only renders on the client
  useEffect(() => {
    setHydrated(true);
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  if (!hydrated) {
    return null; // Prevent rendering on the server
  }

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-35"
      } bg-fuchsia-950 h-screen p-4 border-r border-gray-700
       text-gray-300 transition-all duration-300 mt-16 z-30 fixed`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="mb-4 text-gray-400 hover:text-white focus:outline-none"
      >
        {isCollapsed ? "▶" : "◀"}
      </button>

      {/* Sidebar Content */}
      <ul className="space-y-4">
        <li>
          <Link
            href="/home"
            className={`flex items-center gap-3 px-4 py-2 rounded-md ${
              pathname === "/home"
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            <AiOutlineHome size={20} />
            <span className={isCollapsed ? "hidden" : ""}>To-Dos</span>
          </Link>
        </li>
        <li>
          <div
            className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-800 hover:text-white`}
            onClick={() => setModalOpen(true)}
          >
            <LiaPlusCircleSolid size={20} />
            <span className={isCollapsed ? "hidden" : ""}>Add Task</span>
          </div>
          {/* Modal for adding a task */}
          <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <AddModalContent setModalOpen={setModalOpen} />
          </Modal>
        </li>
        <li>
          <Link
            href="/upcoming"
            className={`flex items-center gap-3 px-4 py-2 rounded-md ${
              pathname === "/upcoming"
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            <AiOutlineCalendar size={20} />
            <span className={isCollapsed ? "hidden" : ""}>Upcoming</span>
          </Link>
        </li>
        <li>
          <Link
            href="/completed"
            className={`flex items-center gap-3 px-4 py-2 rounded-md ${
              pathname === "/completed"
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            <AiOutlineCalendar size={20} />
            <span className={isCollapsed ? "hidden" : ""}>Completed</span>
          </Link>
        </li>
        <li>
          <Link
            href="/analaytics"
            className={`flex items-center gap-3 px-4 py-2 rounded-md ${
              pathname === "/about"
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            <IoMdAnalytics />
            <span className={isCollapsed ? "hidden" : ""}>Analaytics</span>
          </Link>
        </li>
        <li>
          <Link
            href="/features"
            className={`flex items-center gap-3 px-4 py-2 rounded-md ${
              pathname === "/about"
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-800 hover:text-white"
            }`}
          >
            <FcAbout />
            <span className={isCollapsed ? "hidden" : ""}>Features</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
