"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LiaPlusCircleSolid } from "react-icons/lia";
import { AiOutlineHome, AiOutlineCalendar } from "react-icons/ai";
import { Modal } from "./Modal";
import { FcAbout } from "react-icons/fc";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false); // Fix for hydration errors
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  // Ensure the component only renders on the client
  useEffect(() => {
    setHydrated(true);
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, description, priority });
    setModalOpen(false);
  };

  if (!hydrated) {
    return null; // Prevent rendering on the server
  }

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-fuchsia-950 h-screen p-4 border-r border-gray-700 text-gray-300 transition-all duration-300`}
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
            <form
              onSubmit={handleSubmit}
              method="dialog"
              className="flex flex-col gap-6 bg-gray-800 p-8 rounded-lg shadow-lg text-white w-full max-w-md"
            >
              <h3 className="font-bold text-2xl text-center">Add New Task</h3>

              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold">
                  Task Name
                </label>
                <input
                  id="name"
                  className="h-10 bg-gray-700 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Enter task name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-semibold">
                  Description
                </label>
                <textarea
                  id="description"
                  className="h-20 bg-gray-700 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="priority" className="text-sm font-semibold">
                  Priority
                </label>
                <select
                  id="priority"
                  className="h-10 bg-gray-700 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="" disabled>
                    Select priority
                  </option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-500 transition-transform transform hover:scale-105"
              >
                Submit
              </button>
            </form>
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
